const PhoneModels = require('../models/phoneModels');

exports.all = (req, res) => {
    PhoneModels.all((err, items) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            items.forEach((item) => {
                item.id = item._id;
            });
            res.send(items);
        }
    })
}

exports.findById = (req, res) => {
    const id = req.params.id;
	PhoneModels.findById(id, (err, item) => {
		if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(item);
        }
	});
};

exports.create = (req, res) => {
	const phoneModel = {
		value: req.body.value
    };
    
	PhoneModels.create(phoneModel, (err, result) => {
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
    const phoneModel = {
        value: req.body.value
    };

	PhoneModels.update(id, phoneModel, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(phoneModel);
        }
		}
	);
};

exports.delete = (req, res) => {
    const id = req.params.id;
	PhoneModels.delete(id, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
	});
};

