const { createUser, findUserByEmail } = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "my_super_secret_key";

exports.signup = async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json({ message: "Account created successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY);

    res.status(200).json({ message: "login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports. getProfile = async (req, res)=>{
  try{
    const user = await findUserByEmail(req.user.email);
    if(!user){
      return res.status(404).json({message : "User not found"});
    }
    const {password, ...safeUser} = user;
    res.status(200).json(safeUser);
  }
  catch(error){
    res.status(500).json({message : error.message});
  }
};
