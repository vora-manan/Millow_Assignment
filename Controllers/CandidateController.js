const mongoose = require('mongoose');

const Candidate = require('../Models/Candidate');
const CandidateJob = require('../Models/CandidateJob');
const CompanyJob = require('../Models/CompanyJob');

exports.registerCandidate = (req, res, next) => {
    if (req.body.email_id && req.body.name) {
        Candidate.find({ email_id: req.body.email_id }).then(result => {
            if (result[0] !== undefined) {
                res.status(200).json({ msg: "email exists" });
            }
            else {
                const name = req.body.name;
                const email_id = req.body.email_id;
                const details = req.body.details;
                const college = req.body.college;
                Candidate.create({
                    name: name,
                    email_id: email_id,
                    details: details,
                    college: college
                }).then(result => {
                    res.status(200).json({ msg: "Created" });
                });
            }
        });
    }
    else {
        res.status(200).json({ msg: "Enter details" });
    }
};
exports.applyJob = (req, res, next) => {
    companyjob_id = req.params.job_id;
    candidate_id = req.body.candidate_id;
    CompanyJob.findById(companyjob_id).then(result => {
        if (result === null) {
            return res.status(200).json({ msg: "Job does not exist" });
        }
        Candidate.findById(candidate_id).then(result => {
            console.log(result);
            if (result === null) {
                return res.status(200).json({ msg: "Candidate does not exist" });
            }
            CandidateJob.find({ candidate_id: candidate_id, companyjob_id: companyjob_id }).then(result => {
                if (result[0] === undefined) {
                    CandidateJob.create({
                        candidate_id: candidate_id,
                        companyjob_id: companyjob_id
                    }).then(result => {
                        res.status(200).json({ msg: "Applied" });
                    }).catch(err => {
                        console.log(err);
                    });
                }
                else {
                    res.status(200).json({ msg: "Already aplied" });
                }
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        });
    });
};
exports.getJobs = (req, res, next) => {
    candidate_id = req.params.candidate_id;
    if (mongoose.Types.ObjectId.isValid(candidate_id)) {
        Candidate.findById(candidate_id).then(
            result => {
                if (result === null)
                    return res.status(200).json({ msg: "Candidate does not exist" });
                CandidateJob.find({ candidate_id: candidate_id }).populate('companyjob_id').exec().then(
                    result => {
                        const finalResult = result.map(elem => {
                            console.log(elem.companyjob_id._id);
                            return (
                                CompanyJob.findById(elem.companyjob_id._id).populate('company_id').exec()
                            );
                        });
                        Promise.all(finalResult).then(resulto => {
                            res.status(200).json({ Jobs: resulto });
                        }).catch(err => {
                            console.log(err);
                        });
                    }
                ).catch(error => {
                    console.log(error);
                });
            }
        ).catch(err1 => {
            console.log(err1);
        });
    }
    else {
        return res.status(200).json({ msg: "Candidate does not exist" });
    }
};