import bcrypt from 'bcrypt';
import {User} from '../models/tables.js';
import JWT from 'jsonwebtoken';

class UserController { 
  async signUp(req, res, next) {
    const {nickname, email, password} = req.body;

    if(!nickname || !email || !password) {
      return res.status(400).json({message: 'Nickname, email and password are required'});
    }

    const candidateNickname = await User.findOne({where: {nickname}});
    if(candidateNickname) {
      return res.status(409).json({message: 'User with such nickname already exists'});
    }

    const candidateEmail = await User.findOne({where: {email}});
    if(candidateEmail) {
      return res.status(409).json({message: 'User with such email already exists'});
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUserData = {nickname, email, password: hashedPassword};
      const newUser = await User.create(newUserData);
      return res.status(201).json({success: `Welcome to the forms, ${newUser.nickname}`});
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  }

  async login(req, res, next) {
    const cookies = req.cookies;
    const {email, password} = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Email and password are required'});

    const user = await User.findOne({where: {email}});

    if(!user) {
      return res.status(401).json({message: 'Such user doesn\'t exist' });
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match) {
      return res.status(401).json({message: 'Wrong password'});
    }

    const jwtData = {
      id: user.id,
      nickname: user.nickname, 
      email: user.email,
    };

    const privateKey = process.env.ACCESS_TOKEN_SECRET;
    const accessToken = JWT.sign(jwtData, privateKey, {expiresIn: '7d'});

    const refreshPrivateKey = process.env.REFRESH_TOKEN_SECRET; 
    const refreshToken = JWT.sign(jwtData, refreshPrivateKey, {expiresIn: '10d'});

    // Changed to let keyword
    let newRefreshTokenArray = cookies?.refreshToken
      ? user.refreshTokens.filter(rt => rt !== cookies.refreshToken)
      : user.refreshTokens;

    /* 
      Scenario added here: 
        1) User logs in but never uses RT and does not logout 
        2) RT is stolen
        3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
    */  
    if(cookies?.refreshToken) {
      const { refreshToken } = cookies;

      const foundToken = await User.findOne({where: {refreshTokens: [refreshToken]}});
      // Detected refresh token reuse - clear out ALL previous refresh tokens
      if(!foundToken) newRefreshTokenArray = [];

      res.clearCookie('refreshToken', {httpOnly: true, sameSite: 'None', secure: true});
      res.clearCookie('accessToken', {httpOnly: true, sameSite: 'None', secure: true});
    }

    // Saving refreshToken with current user
    const newRefreshTokens = newRefreshTokenArray ? [...newRefreshTokenArray, refreshToken] : [refreshToken];
    await user.update({refreshTokens: newRefreshTokens});

    // Creates Secure Cookie with refresh token
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 10 * 24 * 60 * 60 * 1000 });
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000 });

    return res.json({success: true});
  }

  async refreshToken(req, res) {
    const cookies = req.cookies;
    
    if(!cookies?.refreshToken) return res.status(401).json({message: 'No jwt refresh token'});

    const privateRefreshKey = process.env.REFRESH_TOKEN_SECRET;
    const {refreshToken} = cookies;
    res.clearCookie('refreshToken', {httpOnly: true, sameSite: 'None', secure: true});
    res.clearCookie('accessToken', {httpOnly: true, sameSite: 'None', secure: true});

    const user = await User.findOne({where: {refreshTokens: [refreshToken]}});

    // Detected refresh token reuse 
    if(!user) {
      JWT.verify(refreshToken, privateRefreshKey, async (err, decoded) => {
        if(err) return res.status(403).json({message: 'Forbidden'});
        // Delete refresh tokens of hacked user
        const hackedUser = await User.findOne({where: {nickname: decoded.nickname}});
        await hackedUser.update({refreshTokens: []});
      });
      return res.status(403).json({message: 'Forbidden'});
    }
    const newRefreshTokenArray = user.refreshTokens.filter(rt => rt !== refreshToken); 

    try {
      const decoded = JWT.verify(refreshToken, privateRefreshKey);

      if (user.nickname !== decoded.nickname) return res.status(403).json({message: 'Forbidden'});

      // Refresh token was still valid
      const jwtData = {
        id: decoded.id, 
        nickname: decoded.nickname, 
        email: decoded.email
      };
      const privateKey = process.env.ACCESS_TOKEN_SECRET;
      
      const accessToken = JWT.sign(jwtData, privateKey, {expiresIn: '7d'});
     
      const newRefreshToken = JWT.sign(jwtData, privateRefreshKey, {expiresIn: '7d'});
      // Saving refreshTokens with current user
      user.update({refreshTokens: [...newRefreshTokenArray, newRefreshToken]});
      
      // Creates Secure Cookie with refresh token
      res.cookie('refreshToken', newRefreshToken, {httpOnly: true, secure: true, sameSite: 'None', maxAge: 10 * 24 * 60 * 60 * 1000});
      res.cookie('accessToken', accessToken, {httpOnly: true, secure: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000});

      return res.json({success: true});
    } catch (error) {
      // expired refresh token
      await user.update({refreshTokens: [...newRefreshTokenArray]});
      return res.status(403).json({message: 'Forbidden'});
    }
  }

  async logOut(req, res) {
    // On client, also delete the accessToken
    const cookies = req.cookies;
    
    if (!cookies?.refreshToken) {
      return res.status(204).json({message: 'No content'});
    }
    const {refreshToken} = cookies;

    // Is refreshToken in db?
    const user = await User.findOne({ where: {refreshTokens: [refreshToken]} });
    if (user) {
      // Delete refreshToken in db
      const filteredTokens = user.refreshTokens.filter(rt => rt !== refreshToken);
      await user.update({refreshTokens: filteredTokens});
    }

    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
    res.clearCookie('accessToken', { httpOnly: true, sameSite: 'None', secure: true });
    return res.status(204).json({message: 'User has been log out'});
  }

  async getMe(req, res) {
    const {id} = req.user;
    const user = await User.findByPk(id);
    return res.json(user);
  }
}

export default new UserController(); 