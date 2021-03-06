const ObjectID = require("mongodb").ObjectID;
const db = require("../config/db");

exports.all = (cb) => {
	db.get().collection("phoneModels").find().toArray((err, items) => {
		cb(err, items);
	});
};

exports.findById = (id, cb) => {
	db.get().collection("phoneModels").findOne({_id: new ObjectID(id)}, (err, item) => {
		cb(err, item);
	});
};

exports.create = (user, cb) => {
	db.get().collection("phoneModels").insertOne(user, (err, result) => {
		cb(err, result);
	});
};

exports.update = (id, user, cb) => {
	db.get().collection("phoneModels").update({_id: new ObjectID(id)}, user, (err) => {
			cb(err);
		}
	);
};

exports.delete = (id, cb) => {
	db.get().collection("phoneModels").deleteOne({_id: ObjectID(id)}, (err) => {
			cb(err);
		}
	);
}

exports.findOne = (searchField, cb) => {
	db.get().collection("phoneModels").findOne(searchField, (err, item) => {
			cb(err, item);
		}
	);
}
