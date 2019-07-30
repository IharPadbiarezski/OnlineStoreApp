const ObjectID = require("mongodb").ObjectID;
const db = require("../config/db");

exports.all = (cb) => {
	db.get().collection("orders").find().toArray((err, items) => {
		cb(err, items);
	});
};

exports.findById = (id, cb) => {
	db.get().collection("orders").findOne({_id: new ObjectID(id)}, (err, item) => {
		cb(err, item);
	});
};

exports.create = (user, cb) => {
	db.get().collection("orders").insertOne(user, (err, result) => {
		cb(err, result);
	});
};

exports.update = (id, user, cb) => {
	db.get().collection("orders").update({_id: new ObjectID(id)}, user, (err) => {
			cb(err);
		}
	);
};

exports.delete = (id, cb) => {
	db.get().collection("orders").deleteOne({_id: ObjectID(id)}, (err) => {
			cb(err);
		}
	);
}
