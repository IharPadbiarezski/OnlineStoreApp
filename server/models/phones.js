const ObjectID = require("mongodb").ObjectID;
const db = require("../config/db");

exports.all = (cb) => {
	db.get().collection("phones").find().toArray((err, items) => {
		cb(err, items);
	});
};

exports.findById = (id, cb) => {
	db.get().collection("phones").findOne({_id: new ObjectID(id)}, (err, item) => {
		cb(err, item);
	});
};

exports.create = (user, cb) => {
	db.get().collection("phones").insertOne(user, (err, result) => {
		cb(err, result);
	});
};

exports.update = (id, user, cb) => {
	db.get().collection("phones").update({_id: new ObjectID(id)}, user, (err) => {
			cb(err);
		}
	);
};

exports.delete = (id, cb) => {
	db.get().collection("phones").deleteOne({_id: ObjectID(id)}, (err) => {
			cb(err);
		}
	);
}
