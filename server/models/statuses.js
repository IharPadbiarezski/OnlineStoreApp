const ObjectID = require("mongodb").ObjectID;
const db = require("../config/db");

exports.all = (cb) => {
	db.get().collection("statuses").find().toArray((err, items) => {
		cb(err, items);
	});
};

exports.findById = (id, cb) => {
	db.get().collection("statuses").findOne({_id: new ObjectID(id)}, (err, item) => {
		cb(err, item);
	});
};

exports.create = (status, cb) => {
	db.get().collection("statuses").insertOne(status, (err, result) => {
		cb(err, result);
	});
};

exports.update = (id, status, cb) => {
	db.get().collection("statuses").updateOne({_id: new ObjectID(id)}, status, (err) => {
			cb(err);
		}
	);
};

exports.delete = (id, cb) => {
	db.get().collection("statuses").deleteOne({_id: ObjectID(id)}, (err) => {
			cb(err);
		}
	);
}
