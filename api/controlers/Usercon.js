const Usermodel = require("../Models/Usermodel");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

const getAllUsers = async (req, res) => {
  const allusers = await Usermodel.find({});
  res.json(allusers);
};

const signupUser = async (req, res) => {
  const data = req.body;
  const chk = await Usermodel.find({ email: data.email });
  if (chk[0]) {
    res.json({ status: "Email already exists" });
  } else {
    const user = await Usermodel.create(data);
    res.json({ status: "success" });
  }
};

const gsignupUser = async (req, res) => {
  const { code } = req.body;
  const data = await getCred(code);
  if (data.email) {
    const chk = await Usermodel.find({ email: data.email });
    if (chk[0]) {
      res.json({ status: "Email already exists" });
    } else {
      const user = await Usermodel.create({
        email: data.email,
        name: data.name,
        password: "",
        avatar: data.picture || "",
      });
      res.json({ status: "success" });
    }
  } else {
    res.json({ status: "failed" });
  }
};

const loginUser = async (req, res) => {
  const data = req.body;
  const chk = await Usermodel.find({ email: data?.email });
  if (chk[0]) {
    if (chk[0].password.length === 0) {
      res.json({ status: "Loggedin with google" });
    } else {
      if (chk[0].password === data.password) {
        const tok = jwt.sign({ _id: chk[0]._id }, process.env.ACCESS_SECRET);

        res.json({
          status: "success",
          user: {
            _id: chk[0]._id,
            name: chk[0].name,
            email: chk[0].email,
            avatar: chk[0].avatar,
            token: tok,
          },
        });
      } else {
        res.json({ status: "Wrong Password" });
      }
    }
  } else {
    res.json({ status: "Wrong email or user doesn't exist" });
  }
};

const gloginUser = async (req, res) => {
  const { code } = req.body;
  const data = await getCred(code);
  const chk = await Usermodel.find({ email: data?.email });
  if (chk[0]) {
    const tok = jwt.sign({ _id: chk[0]._id }, process.env.ACCESS_SECRET);
    res.json({
      status: "success",
      user: {
        _id: chk[0]._id,
        name: chk[0].name,
        email: chk[0].email,
        avatar: chk[0].avatar,
        token: tok,
      },
    });
  } else {
    res.json({ status: "Wrong email or user doesn't exist" });
  }
};

const getCred = async (code) => {
  try {
    const oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "postmessage"
    );
    const googleRes = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);

    const res = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    const userCred = await res.json();
    return userCred;
  } catch (error) {
    console.log(error);
    return {};
  }
};

module.exports = {
  getAllUsers,
  signupUser,
  loginUser,
  gloginUser,
  gsignupUser,
};
