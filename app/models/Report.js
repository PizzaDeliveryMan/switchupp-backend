const mongoose = require('mongoose');

const crate = require('mongoose-crate')
const LocalFS = require('mongoose-crate-localfs')
const GraphicsMagic = require('mongoose-crate-gm')

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
    votescore: {type: Number, required: true},
    voteuser: [userid],
    image: {type: String, required: true}
    //user: {type: UserSchema, required: false}

});

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
