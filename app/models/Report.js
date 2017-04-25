const mongoose = require('mongoose');
//const UserSchema = require('./User.js');

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    title: {type: String, required: true},
    location: {
        longitude: {type: Number, required: true},
        latitude: {type: Number, required: true}
    }
    //user: {type: UserSchema, required: false}

});

const ReportModel = mongoose.model('Report', ReportSchema);

ReportSchema.index({ title: 1 }, { unique: false });

ReportModel.findReportById = (ReportId, callback) => {
    ReportModel.findById(ReportId, (err, data) => {
        if (err) return callback(err)
        return callback(null, data)
    })
}

ReportModel.createReport = (ReportData, callback) => {
    const newReport = new ReportModel(ReportData)
    newReport.save((err, data) => {
        if(err) return callback(err)
        return callback(null, data)
    })
}

ReportModel.deleteReport = (ReportId, callback) => {
    ReportModel.find( { id:ReportId } ).remove();
    return callback(null, null);
}

module.exports = ReportModel;
