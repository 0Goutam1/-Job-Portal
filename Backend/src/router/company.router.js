const express = require('express');
const companyRouter = express.Router();
const companyController = require('../controller/company.Controller');
const verify  = require('../middleware/verify.Middleware');
const isRecruiter= require('../middleware/isRecruiter')
const upload = require('../middleware/upload.Middleware');


companyRouter.post( '/',verify,isRecruiter,upload.single('logo'),companyController.registerCompany );
companyRouter.get('/my-companies', verify, isRecruiter,companyController.getMyCompanies);
companyRouter.get('/all-companies', companyController.getAllCompanies);


module.exports = companyRouter;