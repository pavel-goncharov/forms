import JWT from 'jsonwebtoken';

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  
  const token = authHeader.split(' ')[1];
  const privateKey = process.env.ACCESS_TOKEN_SECRET;
  JWT.verify(token, privateKey, (err, decoded) => {
    // Invalid token
    if (err) return res.sendStatus(403);

    req.user = decoded;
    next();
  });
}

export default verifyJWT;