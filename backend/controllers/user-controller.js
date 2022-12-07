require("dotenv").config();
require("../service/connection").connect();

const bcrypt = require("bcryptjs");
const { error } = require("console");
const jwt = require("jsonwebtoken");

const User = require("../model/user");

exports.save = async (req, res, next) => {
  try {
    const { first_name, last_name, birth, email, password } = req.body;
    if (!(email && password && first_name && last_name)) {
      res
        .status(401)
        .send({ status: "error", message: "Missing required fields" });
    }

    const beforeUser = await User.findOne({ email });
    if (beforeUser) {
      res.status(409).send({ status: "error", message: "User already exists" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      birth,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    user.token = jwt_generated({ user_id: user._id, email });

    res.status(200).json(user);
  } catch (err) {
    res.status(501).send({ status: "error", message: err.message });
  }
};

exports.update = async (req, res, next) => {
  try {
    const { email } = req.params;
    const { first_name, last_name, birth, password } = req.body;

    if (!email) {
      res.status(400).send("E-mail missing");
    }

    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ email });

    if (user) {
      user.first_name = first_name;
      user.last_name = last_name;
      user.birth = birth;
      user.password = encryptedPassword;

      user.save();
      res.status(200).json(user);
    } else {
      res.status(400).send("Invalid User");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { email } = req.params;

    if (!email) {
      res.status(400).send("E-mail missing");
    }

    const user = await User.findOne({ email });

    if (user) {
      user.delete();
      res
        .status(200)
        .send({ status: "success", message: "User deleted successfully" });
    } else {
      res.status(400).send("Invalid User");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.findByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    if (!email) {
      res.status(400).send("E-mail missing");
    }
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email }).select("+password").exec();

    if (user && (await bcrypt.compare(password, user.password))) {
      /* Retorna Token */
      res.status(200).json({
        _id: user._id,
        email: email,
        token: jwt_generated({ user_id: user._id, email }),
      });
    } else {
      res.status(401).send({ status: "error", message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};

function jwt_generated(params = {}) {
  return jwt.sign(
    {
      params,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "1h",
    }
  );
}
