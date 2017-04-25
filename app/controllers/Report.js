const express = require('express')
const router = express.Router()

const Report = require('../models/Report');


router.get('/:ReportId', (req, res) => {
    const ReportId = req.params.ReportId;
    Report.findReportById(ReportId, (err, _Report) => {
        if (!_Report) return res.status(400).send("There's no Report here.");
        return res.send(_Report);
    })
})

router.post('/', (req, res) => {
    const report = req.body
    Report.createReport(report, (err, data) => {
        if (err) return res.status(400).send(err)
        return res.send(data)
    })
})

router.delete('/:ReportId', (req, res) => {
    const ReportId = req.params.ReportId;
    Report.deleteReport(ReportId, (err, _Report) => {
        if (!_Report) return res.status(400).send("There's no report here.");
        return res.send(_Report);
    })
})



module.exports = router;
