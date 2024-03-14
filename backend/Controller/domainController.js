const asyncHandler = require("../Middleware/asyncHandler");
const Domain = require("../Models/DomainModel");
const User = require("../Models/userModel")
const multer = require('multer');
const csvParser = require('csv-parser');

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


  const getAllDomains = asyncHandler(async (req, res) => {
    const domains = await Domain.find();
    if(domains){
      res.status(200).json({
        message: "Domain fetched successfully",
        domains 
      });
    }
    else{
      res.status(400).json({ message: "Domains not found" });
    }
  });

  
  const updateDomain = asyncHandler(async (req, res) => {
    const {_id} = req.params;
    const { domainName, dnsRecords } = req.body;

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const updatedDomain = await Domain.findByIdAndUpdate(
      _id,
      { domainName, dnsRecords },
      { new: true, runValidators: true }
    );
  
    if (!updatedDomain) {
      return res.status(404).json({ message: 'Domain not found' });
    }
  
    res.status(200).json({ message: 'Domain updated successfully', domain: updatedDomain });
  });
  
  const fetchSingleDomain = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const availableDomain = await Domain.findOne({ _id });
  
    if (!availableDomain) {
      res.status(404).json({ error: "Domain not found" });
    } else {
      res.status(200).json({ message: "Domain Found", availableDomain });
    }
  });

  const deleteDomain= asyncHandler(async (req, res) => {
    const { _id } = req.params;
  
    if (!_id) {
      res
        .status(400)
        .json({ error: "Invalid request. Missing created Domain ID." });
      return;
    }
  
    const deletedDomain = await Domain.findByIdAndDelete(_id);
  
    if (!deletedDomain) {
      res.status(404).json({ error: "Created Domain not found." });
    } else {
      res
        .status(200)
        .json({
          message: "Domain Successfully Deleted!!",
          domainName: deletedDomain.domainName,
        });
    }
  });


  //upload
  const uploadDomains = asyncHandler(async (req, res) => {

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
  
    const csvData = req.file.buffer.toString();
    const parsedData = parseCSV(csvData); 
  
    try {
      for (const row of parsedData) {
        const { domainName, dnsRecords } = row;

        await Domain.create({ domainName, dnsRecords });
      }
  
      res.status(200).json({ message: "Domains successfully uploaded" });
    } catch (error) {
      console.error("Error uploading domains:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  module.exports = { uploadDomains };
  


  module.exports = {addDomain, getAllDomains, updateDomain, fetchSingleDomain, deleteDomain, uploadDomains}