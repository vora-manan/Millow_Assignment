const express = require('express');
const CandidateController = require('../Controllers/CandidateController');
const CompanyController = require('../Controllers/CompanyController');
const router = express.Router();

router.route('/addCandidate').post(CandidateController.registerCandidate);
router.route('/:job_id/applyJob').post(CandidateController.applyJob);
router.route('/:candidate_id/jobs').get(CandidateController.getJobs);

router.route('/addCompany').post(CompanyController.registerCompany);
router.route('/:company_id/job').post(CompanyController.registerJob);
router.route('/:job_id/candidates').get(CompanyController.findCandidates);
router.route('/:job_id/:candidate_id/update').post(CompanyController.updateStatus);
router.route('/:job_id/:candidate_id/getStatus').get(CompanyController.getStatus);
module.exports = router;