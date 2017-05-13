const mongoose = require('mongoose');

const crate = require('mongoose-crate')
const LocalFS = require('mongoose-crate-localfs')
const GraphicsMagic = require('mongoose-crate-gm')

const UserModel = require('../models/User.js');

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    title: {type: String, required: true},

    locname: { type: String, required: true },
    /*TEMP location: {
        longitude: {type: Number, required: true},
        latitude: {type: Number, required: true},
    },*/

    desc: {type: String, required: true },
    author: {type: String, required: true},
    image: {type: String, required: true},
    votescore: {type: Number, required: true},
    //voteuser: {type: [UserModel.id]},



    createdAt: {type: Date, required: true},
    category: { type: String, required: false },
    visible: {type: Boolean, required: true }
    //user: {type: UserSchema, required: false}

});
/*
ReportSchema.plugin(crate, {
  storage: new LocalFS({
    directory: '/public/u'
  }),
  fields: {
    image: {
      processor: new GraphicsMagic({
        tmpDir: '/tmp', // Where transformed files are placed before storage, defaults to os.tmpdir()
        formats: ['JPEG', 'GIF', 'PNG'], // Supported formats, defaults to ['JPEG', 'GIF', 'PNG', 'TIFF']
        transforms: {
          original: {
            // keep the original file
          },
          small: {
            resize: '150x150',
            format: '.jpg'
          },
          medium: {
            resize: '250x250',
            format: '.jpg'
          }
        }
      })
    }
  }
})
*/
const ReportModel = mongoose.model('Report', ReportSchema);

ReportSchema.index({ title: 1 }, { unique: false });

ReportModel.findReportById = (ReportId, callback) => {
    ReportModel.findById(ReportId, (err, data) => {
        if (err) return callback(err)
        return callback(null, data)
    })
}

// Fetch Newest Reports
ReportModel.getNewest = (nothing, callback) => {
    console.log("There has been a request")
    ReportModel.find({}, {}, { sort: { 'createdAt' : -1 } }, (err, reports) => {
        if (err) return callback(err);
        return callback(null, reports);
    })
    /*ReportModel.findOne().sort({created_at: -1}) => (err, report) {
        if (err) return callback(err);
        return callback(null, report);
    });*/
}

// Fetch Most Voted Reports
ReportModel.getMostVoted = (nothing, callback) => {
    console.log("There has been a request")
    ReportModel.find({}, {}, { sort: { 'votescore' : -1 } }, (err, reports) => {
        if (err) return callback(err);
        return callback(null, reports);
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
