const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true }
    author: {type: String, required: true },
    dateCreated: {type: Date, required: true};
});

const ReportModel = mongoose.model('Comment', CommentSchema);

CommentSchema.index({ title: 1 }, { unique: false });

ReportModel.findCommentById = (CommentId, callback)
