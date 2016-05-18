var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
/*
bcrypt:
-library that that hashes your password before it saves to the database.
-prevents the clear password in the database. SECURITY 
*/


/* the user schema attributes/characteristics/fields */
var UserSchema = new Schema({
	email: { type: String, unique: true, lowercase: true},
	password: String,
	profile: {
		name: {type: String, default: ''},
		picture: {type: String, default: ''}
	},
	address: String,
	history: [{
		date: Date,
		paid: {type: Number, default: 0},
		//item: {type: Schema.Types.ObjectId, ref: ''}
	}]
});



/* Hash the password before we save to the database 
- you want to use 'pre' to save it before saving it to the database
*/
UserSchema.pre('save', function (next) {
	var user = this;
	if (!user.isModified('password')) return next();
	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, null, function (err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});




/* Compare the password in the database and the one the User types in */