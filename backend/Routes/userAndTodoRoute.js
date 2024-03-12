const express = require("express");

const {
  registerUser,
  loginUser
} = require("../Controller/userController");

const {addDomain} = require("../Controller/domainController")

const errorHandler = require("../Middleware/errorHandler");
const token = require("../Middleware/validateToken");




const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/addDomain",token, addDomain);



router.use(errorHandler);

module.exports = router;
