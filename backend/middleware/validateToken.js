var jwt = require('jsonwebtoken');


module.exports = async function validateToken(req, res, next) {
  const auhorizationHeader = req.headers.authorization;
  let result;

  if (!auhorizationHeader) {
    return res.status(401).json({
      error: true,
      message: "Access token is missing",
    });
  }

  const token = req.headers.authorization;

  const options = {
    expiresIn: "100000h",
  };

  try {
    const decodedJwt = jwt.verify(token, 'secret' ,options)
    console.log(decodedJwt)

    if(decodedJwt.data !== 'admin'){
      return res.status(401).json({
        error: true,
        message: "Not Authorized",
      });

    }
    

    next();
  } catch (error) {
    console.error(error);

    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        error: true,
        message: "Token expired",
      });
    }

    return res.status(403).json({
      error: true,
      message: "Authentication error",
    });
  }
}

