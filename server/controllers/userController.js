import bcrypt from 'bcrypt';
import {User} from '../models/tables.js';
import JWT from 'jsonwebtoken';

class UserController {
  
  async signUp(req, res, next) {
    const {nickname, email, password} = req.body;

    if(!nickname || !email || !password) {
      return res.status(400).json({message: 'Nickname, email and password are required.'});
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
      return res.status(201).json({success: `New user ${newUser.nickname} created.`});
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  }

  async login(req, res, next) {
    const cookies = req.cookies;
    const {email, password} = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Nickname and password are required.'});

    const user = await User.findOne({where: {email}});

    if(!user) {
      return res.status(401).json({message: 'Such user doesn\'t exist.' });
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
    const token = JWT.sign(jwtData, privateKey, {expiresIn: '7d'});

    const refreshPrivateKey = process.env.REFRESH_TOKEN_SECRET; 
    const newRefreshToken = JWT.sign(jwtData, refreshPrivateKey, {expiresIn: '10d'});

    // Changed to let keyword
    let newRefreshTokenArray = !cookies?.jwt ? 
      user.refreshTokens : 
      user.refreshTokens.filter(rt => rt !== cookies.jwt);

    /* 
      Scenario added here: 
        1) User logs in but never uses RT and does not logout 
        2) RT is stolen
        3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
    */  
    if(cookies?.jwt) {
      const refreshTokens = cookies.jwt;
      const foundToken = await User.findOne({where: refreshTokens});
      // Detected refresh token reuse - clear out ALL previous refresh tokens
      if(!foundToken) newRefreshTokenArray = [];

      res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
    }

    // Saving refreshToken with current user
    const refreshTokenCurrentUser = newRefreshTokenArray ? [...newRefreshTokenArray, newRefreshToken] : [newRefreshToken];
    user.update({refreshTokens: refreshTokenCurrentUser});

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000 });

    return res.json({token});
  }

  async refreshToken(req, res) {
    const cookies = req.cookies;
    
    if(!cookies?.jwt) return res.sendStatus(401);

    const privateRefreshKey = process.env.REFRESH_TOKEN_SECRET;
    const refreshTokens = cookies.jwt;
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});

    const user = await User.findOne({where: {refreshTokens}});

    // Detected refresh token reuse 
    if(!user) {
      JWT.verify(refreshTokens, privateRefreshKey, async (err, decoded) => {
        //Forbidden
        if(err) return res.sendStatus(403);
        // Delete refresh tokens of hacked user
        const hackedUser = await User.findOne({where: {nickname: decoded.nickname}});
        await hackedUser.update({refreshTokens: []});
      });
      // Forbidden
      return res.sendStatus(403);
    }

    const newRefreshTokenArray = user.refreshTokens.filter(rt => rt !== refreshToken); 

    // Forbidden
    JWT.verify(refreshTokens, privateRefreshKey, async (err, decoded) => {
        // expired refresh token
        if(err) {
          await user.update({refreshTokens: [...newRefreshTokenArray]});
        }
        if(err || user.nickname !== decoded.nickname) return res.sendStatus(403);

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
        res.cookie('jwt', newRefreshToken, {httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000});

        res.json({accessToken});
    });
  }

  async logOut(req, res) {
    // On client, also delete the accessToken
    const cookies = req.cookies;
    
    if (!cookies?.jwt) {
      console.log('???', cookies);
      return res.status(204).json({message: 'No content'});
    }
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const user = await User.findOne({ refreshTokens: refreshToken });
    if (!user) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
      return res.status(204).json({message: 'Don\'t update token in database'});
    }

    // Delete refreshToken in db
    const filteredTokens = user.refreshTokens.filter(rt => rt !== refreshToken);
    user.update({refreshTokens: filteredTokens});

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.status(204).json({message: 'User has been log out'});
  }

  async getNickname(req, res) {
    const id = req.params.id;
    const nicknameAuthor = await User.findByPk(id).then(user => user.nickname);
    return res.json(nicknameAuthor);
  }
}

export default new UserController(); 