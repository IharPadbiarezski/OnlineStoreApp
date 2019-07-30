const MongoClient = require("mongodb").MongoClient;

let state = {
	db: null,
	uri: "mongodb+srv://user:xbsoftware@grok-0r2y1.mongodb.net/test?retryWrites=true&w=majority"
};

exports.connect = (done) => {
	if (state.db) {
		return done();
	}
	const client = new MongoClient(state.uri, {useNewUrlParser: true});
	client.connect((err, db) => {
		if (err) {
			return done(err);
		}
		state.db = db.db("Grok");
		done();
	});
};

exports.get = () => state.db;