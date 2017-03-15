const mongoose = require('mongoose');
const UserSchema = require('User');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: {type: String, required: true },
    username: (type: UserSchema.username, required: true),
    minimumExists: (type: Boolean, required: true),
    minimumCap: (type: Number, required: true),
    rsvpStrict: (type: Boolean, required: true)
});

const EventModel = mongoose.model('Event', UserSchema);

EventSchema.index({ username: 1 }, { unique: false });
