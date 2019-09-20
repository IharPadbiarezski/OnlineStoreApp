const Phones = require("../models/phones");

exports.all = (req, res) => {
    Phones.all((err, items) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            items.forEach((item) => {
                item.id = item._id;
                item.amount = 0;
            });
            res.send(items);
        }
    })
}

exports.findById = (req, res) => {
    const id = req.params.id;
	Phones.findById(id, (err, item) => {
		if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(item);
        }
	});
};

exports.create = (req, res) => {
	const phone = {
        image: req.body.image,
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating
    };
    
	Phones.create(phone, (err, result) => {
		if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            result.ops[0].id = result.insertedId;
            res.send(result.ops[0]);
        }
	});
};

exports.update = (req, res) => {
    const id = req.params.id;
    const phone = {
        image: req.body.image,
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating
    };

	Phones.update(id, phone, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(phone);
        }
		}
	);
};

exports.delete = (req, res) => {
    const id = req.params.id;
	Phones.delete(id, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
	});
};

