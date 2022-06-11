import JWT from 'jsonwebtoken';

export default function generateJwt(id, nickname, email) {
  const user = {id, nickname, email};
  const privateKey = process.env.PRIVATE_KEY;
  const optionsToken = {expiresIn: '7d'};
  const token = JWT.sign(user, privateKey, optionsToken);
  return token; 
}