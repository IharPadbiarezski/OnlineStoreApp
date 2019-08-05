const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const session = require("express-session");
const routes = require("./routes");
const db = require("./config/db");
const cors = require("cors");

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
	secret: "Hello World!",
	resave: true,
	saveUninitialized: true,
	cookie: { maxAge: 60*60*1000*24*7 }
}));

app.use(fileUpload());

app.use(cors());

db.connect((err) => {
	if (err) {
		return console.log(err);
	}
	routes(app);
	app.listen(port, () => {
		console.log(`App listening on port ${port}!`);
	});
});
