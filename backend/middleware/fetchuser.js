var jwt = require("jsonwebtoken");
const JWT_SECRET = "DevelopBy$MRDANNII";

const fetchuser = (req, res, next) => {
  //get the user for JWT
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please use a Valid Token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please use a Valid Token" });
  }
};

module.exports = fetchuser;
