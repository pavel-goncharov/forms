import JWT from 'jsonwebtoken';

function verifyJWT(req, res, next) {
  const cookies = req.cookies;

  if(!cookies?.accessToken) return res.status(401).json({message: 'No token'});

  const { accessToken } = cookies;
  const privateKey = process.env.ACCESS_TOKEN_SECRET;
  JWT.verify(accessToken, privateKey, (err, decoded) => {
    // Invalid token
    if (err) return res.status(403).json({message: 'Invalid token'});

    req.user = decoded;
    next();
  });
}

export default verifyJWT;