// controllers/companyController.js
const Company = require('../model/company.model');
const { uploadToImageKit } = require('../util/util');

// 1. Register Company
const registerCompany = async (req, res) => {

  const { companyName, description, location } = req.body;

  if (!companyName || !description || !location) {
    return res.status(400).json({ success: false, message: 'All main fields are required.' });
  }

  const existingCompany = await Company.findOne({ companyName: companyName });
  if (existingCompany) {
    return res.status(409).json({ success: false, message: 'Company already exists.' });
  }

  let logo;
  if (req.file) {
    logo = await uploadToImageKit(req.file.buffer, req.file.originalname, '/job-portal/logos');
  }

  const company = await Company.create({
    companyName: companyName ,
    description,
    logo,
    location,
    createdBy: req.user.userId
  });

  res.status(201).json({ 
    message:"company register successfully",
     data: company 
  });
};

// 2. Get My Companies
const getMyCompanies = async (req, res) => {
  const companies = await Company.find({ createdBy: req.user.userId }).sort({ createdAt: -1 });

  res.status(200).json({ 
    message:"data fetched successfully",
     count: companies.length, 
     data: companies 
    });
};

const getAllCompanies = async (req, res) => {
  const companies = await Company.find(); 
  res.status(200).json({ 
    message:"data find successfully",
     data: companies
   });
};

module.exports = { registerCompany, getMyCompanies ,getAllCompanies};