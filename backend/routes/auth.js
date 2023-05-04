const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator"); //for validation of data body
const bcrypt = require("bcryptjs"); // for encrypting the password
var jwt = require("jsonwebtoken");
const JWT_SECRET = "DevelopBy$MRDANNII";

const fetchuser = require("../middleware/fetchuser");

//ROUTE 1: Create User POST(/api/auth/createuser)
router.post(
  "/createuser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Enter a Valid Password").isLength({ min: 6 }),
  ],
  //checking for errors in data entry and returning errors
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Checking for same users
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Email Already Used" });
    }
    try {
      //securing the user password
      const salt = await bcrypt.genSalt(10);
      const securePass = await bcrypt.hash(req.body.password, salt);
      //creating a new users
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePass,
      });
      const data = {
        user: { id: user.id },
      };

      const auth_token = jwt.sign(data, JWT_SECRET);
      // console.log(jwt_data);
      res.json(auth_token);
    } catch (error) {
      //catching for error in creating a user
      console.error(error.message);
      res.status(500).send("Opps Something Went Wrong");
    }
  }
);

//ROUTE 2: Authenticate a user POST(/api/auth/login)
router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password Can't be Blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please use correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please use correct credentials" });
      }

      const data = {
        user: { id: user.id },
      };

      const auth_token = jwt.sign(data, JWT_SECRET);
      res.json({ auth_token });
    } catch (error) {
      //catching for error in loging in a user
      console.error(error.message);
      res.status(500).send("Opps Something Went Wrong");
    }
  }
);

//ROUTE 3: GETTING A USER DETAILS GET(/api/auth/getuser) -login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    res.send({ user });
  } catch (error) {
    //catching for error in getting a user
    console.error(error.message);
    res.status(500).send("Opps Something Went Wrong");
  }
});
module.exports = router;
