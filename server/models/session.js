const ObjectID = require("mongodb").ObjectID;
const db = require("../config/db");

exports.findOne = (query, cb) => {
	db.get().collection("clients").findOne(query, (err, item) => {
			cb(err, item);
		}
	);
}

exports.find = (query, cb) => {
	db.get().collection("clients").find(query, (err, item) => {
			cb(err, item);
		}
	);
}

exports.create = (user, cb) => {
	db.get().collection("clients").insertOne(user, (err, result) => {
		cb(err, result);
	});
};

exports.update = (id, user, cb) => {
	db.get().collection("clients").update({_id: new ObjectID(id)}, user, (err) => {
			cb(err);
		}
	);
};

