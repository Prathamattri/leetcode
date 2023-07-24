const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;
const { createUser, getUser } = require("./db");
const config = require("config");
const cors = require("cors");

//token generation and encryption libraries
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//middleware for Parsing requset body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// @route  /signup
// @method POST
// @access public
// @desc   Register a new user

app.post("/signup", async (req, res) => {
  try {
    let { username, password } = req.body;
    const user = await getUser(username);

    if (user[0].length !== 0)
      return res.status(401).json({ msg: "User already exists" });

    //Encrypting the password
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    const result = await createUser(username, password);

    //Sending jwt token to the user
    jwt.sign(
      { userId: result[0].insertId },
      config.get("jwtSecret"),
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) throw err;
        return res.status(201).json({ token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// @route  /login
// @method POST
// @access public
// @desc   Login existing user

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await getUser(username);

    if (user[0].length === 0)
      return res.status(401).json({ msg: "Invalid Credentials!" });

    const isMatch = await bcrypt.compare(password, user[0][0].password);
    if (!isMatch) 
	  return res.status(401).json({ msg: "Invalid Credentials!" });

	  
    //Sending jwt token to the user
    jwt.sign(
		{ userId: user[0][0].id },
		config.get("jwtSecret"),
		{
		  expiresIn: "1d",
		},
		(err, token) => {
		  if (err) throw err;
		  return res.status(201).json({token});
		}
	  );
 
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
