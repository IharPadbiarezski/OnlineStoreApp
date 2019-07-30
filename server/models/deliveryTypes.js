const ObjectID = require("mongodb").ObjectID;
const db = require("../config/db");

exports.all = (cb) => {
	db.get().collection("deliveryTypes").find().toArray((err, items) => {
		cb(err, items);
	});
};

exports.findById = (id, cb) => {
	db.get().collection("deliveryTypes").findOne({_id: new ObjectID(id)}, (err, item) => {
		cb(err, item);
	});
};

exports.create = (deliveryType, cb) => {
	db.get().collection("deliveryTypes").insertOne(deliveryType, (err, result) => {
		cb(err, result);
	});
};

exports.update = (id, deliveryType, cb) => {
	db.get().collection("deliveryTypes").update({_id: new ObjectID(id)}, deliveryType, (err) => {
			cb(err);
		}
	);
};

exports.delete = (id, cb) => {
	db.get().collection("deliveryTypes").deleteOne({_id: ObjectID(id)}, (err) => {
			cb(err);
		}
	);
}
