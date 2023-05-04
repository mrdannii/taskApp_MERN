const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator"); //for validation of data body
const bcrypt = require("bcryptjs"); // for encrypting the password

var jwt = require('jsonwebtoken');
const JWT_SECRET="DevelopBy$MRDANNII"

//Create User POST(/api/auth/createuser)
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
      const securePass = await bcrypt.hash(req.body.password,salt);
      //creating a new users
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePass,
      });
      const data={
        user:{id:user.id}
      }

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

module.exports = router;
