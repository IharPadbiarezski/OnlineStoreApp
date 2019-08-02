const ObjectID = require("mongodb").ObjectID;
const db = require("../config/db");

exports.findOne = (searchField, cb) => {
	db.get().collection("clients").findOne(searchField, (err, item) => {
			cb(err, item);
		}
	);
}

exports.find = (searchField, cb) => {
	db.get().collection("clients").find(searchField, (err, item) => {
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
