import bcrypt from 'bcrypt';
import ApiError from '../error/ApiError.js';
import {User} from '../models/tables.js';
import generateJwt from '../utils/generateJwt.js';

class userController {
  
  async signUp(req, res, next) {
    const {nickname, email, password} = req.body;
    if(!nickname || !email || !password) {
      return next(ApiError.badRequest('Incorrect email or password'));
    }

    const candidateNickname = await User.findOne({where: {nickname}});
    if(candidateNickname) {
      return next(ApiError.badRequest('User with such nickname already exists'));
    }

    const candidateEmail = await User.findOne({where: {email}});
    if(candidateEmail) {
      return next(ApiError.badRequest('User with such email already exists'));
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({nickname, email, password: hashPassword});
    const token = generateJwt(user.id, user.nickname, user.email);

    return res.json({token});
  }

  async login(req, res, next) {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});
    if(!user) {
      return next(ApiError.internal('Such a user doesn\'t exist'));
    }

    let comparePassword = bcrypt.compareSync(password, user.password);
    if(!comparePassword) {
      return next(ApiError.internal('Wrong password'));
    }

    const token = generateJwt(user.id, user.nickname, user.email);
    return res.json({token});
  }
}

export default new userController(); 