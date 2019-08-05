const ObjectID = require("mongodb").ObjectID;
const db = require("../config/db");

exports.all = (cb) => {
	db.get().collection("declineReasons").find().toArray((err, items) => {
		cb(err, items);
	});
};

exports.findById = (id, cb) => {
	db.get().collection("declineReasons").findOne({_id: new ObjectID(id)}, (err, item) => {
		cb(err, item);
	});
};

exports.create = (reason, cb) => {
	db.get().collection("declineReasons").insertOne(reason, (err, result) => {
		cb(err, result);
	});
};

exports.update = (id, reason, cb) => {
	db.get().collection("declineReasons").updateOne({_id: new ObjectID(id)}, reason, (err) => {
			cb(err);
		}
	);
};

exports.delete = (id, cb) => {
	db.get().collection("declineReasons").deleteOne({_id: ObjectID(id)}, (err) => {
			cb(err);
		}
	);
}

exports.findOne = (query, cb) => {
	db.get().collection("declineReasons").findOne(query, (err, item) => {
			cb(err, item);
		}
	);
}
