const asyncHandler = require("../Middleware/asyncHandler");
const Domain = require("../Models/DomainModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel")

//create a domain card record
const addDomain = asyncHandler(async (req, res) => {
    const { domainName, dnsRecords } = req.body;
   
  
    if (!domainName || !dnsRecords ) {
      res.status(400).json({ message: "Please enter all the fields" });
      return;
    }

  
    const user = await User.findOne({ email: req.user.email });
  
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
  
    const availableDomain = await Domain.findOne({ domainName });
  
    if (availableDomain) {
      res.status(400).json({ message: "Domain name already exists!!" });
      return;
    }
  
    const newDomain = await Domain.create({
        domainName, dnsRecords 
    });
  
    console.log(newDomain);
  
    if (newDomain) {
      res.status(200).json({
        message: "Domain successfully created",
        domainName, 
        dnsRecords 
      });
    } else {
      res.status(400).json({ message: "Invalid data" });
    }
  });

  module.exports = {addDomain}