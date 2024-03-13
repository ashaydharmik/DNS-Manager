const express = require("express");

const {
  registerUser,
  loginUser
} = require("../Controller/userController");

const {addDomain, getAllDomains, updateDomain, fetchSingleDomain, deleteDomain} = require("../Controller/domainController")

const errorHandler = require("../Middleware/errorHandler");
const token = require("../Middleware/validateToken");




const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/addDomain",token, addDomain);

router.get("/allDomain",token, getAllDomains);

router.put('/updateDomain/:_id',token, updateDomain);

router.get('/fetchSingleDomain/:_id',token, fetchSingleDomain);

router.delete('/deleteDomain/:_id',token, deleteDomain);

router.use(errorHandler);

module.exports = router;
