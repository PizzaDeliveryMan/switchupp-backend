const mongoose = require('mongoose');
const filePluginLib = require('mongoose-file');
const filePlugin = filePluginLib.filePlugin;
const make_upload_to_model = filePluginLib.make_upload_to_model;

const uploads_base = path.join(__dirname, "uploads");
const uploads = path.join(uploads_base, "u");

//const UserSchema = require('./User.js');

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    title: {type: String, required: true},
    locname: { type: String, required: true },
    /*location: {
        longitude: {type: Number, required: true},
        latitude: {type: Number, required: true},
    },*/
    desc: {type: String, required: true },
    user: {type: String, required: true},

    image: {type: String, required: true}
    //user: {type: UserSchema, required: false}

});

ReportSchema.plugin(filePlugin, {
	name: "photo",
	upload_to: make_upload_to_model(uploads, 'photos'),
	relative_to: uploads_base
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
