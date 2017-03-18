const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const UserSchema = new Schema({
    email: { type: String, required: true },
    //username: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true},
    reputation: { type: Number, required: true}
});

//Create the user model
const UserModel = mongoose.model('User', UserSchema);

//Ensure that
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ username: 1 }, { unique: true });

UserModel.findUserById = (userId, callback) => {
    UserModel.findById(userId, (err, data) => {
        if (err) return callback(err)
        return callback(null, data)
    })
}

UserModel.createUser = (userData, callback) => {
    const newUser = new UserModel(userData);
    newUser.save((err, data) => {
        if (err) return callback(err)
        return callback(null, data)
    })
}

UserModel.updateUser = (userData, callback) => {
    if (userData.email) {
            
    }
}

//Export the user model
module.exports = UserModel;
