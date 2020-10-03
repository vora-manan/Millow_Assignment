const express = require('express');
const CandidateJob = require('../Models/CandidateJob');
const Company = require('../Models/Company');
const CompanyJob = require('../Models/CompanyJob');
const mongoose = require('mongoose');
exports.registerCompany = (req, res, next) => {
    if (req.body.name) {
        Company.find({ name: req.body.name }).then(result => {
            if (result[0] !== undefined) {
                res.status(200).json({ msg: "Choose another name" });
            }
            else {
                Company.create({
                    name: req.body.name,
                    location: req.body.location,
                    details: req.body.details
                }).then(result => {
                    res.status(200).json("Company created");
                }).catch(err => {
                    console.log(err);
                });
            }
        });
    }
    else {
        res.status(200).json({ msg: "Enter name" });
    }

};
exports.registerJob = (req, res, next) => {
    company_id = req.params.company_id;
    Company.findById(company_id).then(result => {
        if (result === null) {
            res.status(200).json({ msg: "Company does not exist" });
        }
        else {
            if (!req.body.job || !req.body.job_details)
                res.status(200).json({ msg: "Please fill the details" });
            CompanyJob.find({ company_id: company_id, job: req.body.job }).then(result => {
                if (result[0] === undefined) {
                    CompanyJob.create({
                        company_id: company_id,
                        job: req.body.job,
                        job_details: req.body.job_details
                    })
                        .then(result => {
                            res.status(200).json({ msg: "Job Created" });
                        }).catch(err => {
                            console.log(err);
                        });
                }
                else {
                    res.status(200).json({ msg: "Job already exists" });
                }
            });
        }
    })
        .catch(err => {
            console.log(err);
        });
};
exports.findCandidates = (req, res, next) => {
    job_id = req.params.job_id;
    if (mongoose.Types.ObjectId.isValid(job_id)) {
        CompanyJob.findById(job_id).then(
            result => {
                console.log(result);
                if (result === null)
                    return res.status(200).json({ msg: "Job does not exist" });
                CandidateJob.find({ companyjob_id: job_id }).populate('candidate_id').exec().then(
                    result => {
                        const finalResult = result.map(elem => {
                            return {
                                status: elem.status,
                                candidate: elem.candidate_id
                            };
                        });
                        res.status(200).json({ Candidates: finalResult });
                    }
                ).catch(err => {
                    console.log(err);
                });
            }
        ).catch(err => {
            console.log(err);
        });
    }
    else {
        return res.status(200).json({ msg: "Job does not exist" });
    }
};
exports.updateStatus = (req, res, next) => {
    const job_id = req.params.job_id;
    const candidate_id = req.params.candidate_id;
    const statusUpdate = req.body.status;
    CandidateJob.findOneAndUpdate({ companyjob_id: job_id, candidate_id: candidate_id }, { status: statusUpdate }).then(
        result => {
            if (result === null)
                return res.status(200).json({ msg: "Does not exist" });
            res.status(200).json({ msg: "Changes applied" });
        }).catch(err => {
            console.log(err);
        });
};

exports.getStatus = (req, res, next) => {
    const job_id = req.params.job_id;
    const candidate_id = req.params.candidate_id;
    CandidateJob.findOne({ companyjob_id: job_id, candidate_id: candidate_id }).then(
        result => {
            if (result === null)
                return res.status(200).json({ msg: "Does not exist" });
            res.status(200).json({ Original_Status: result.status });
        }).catch(err => {
            console.log(err);
        });
};
