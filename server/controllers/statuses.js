const Statuses = require('../models/statuses');

exports.all = (req, res) => {
    Statuses.all((err, items) => {
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
	Statuses.findById(id, (err, item) => {
		if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(item);
        }
	});
};

exports.create = (req, res) => {
	const status = {
		value: req.body.value
    };
    
	Statuses.create(status, (err, result) => {
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
    const status = {
        value: req.body.value
    };

	Statuses.update(id, status, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(status);
        }
		}
	);
};

exports.delete = (req, res) => {
    const id = req.params.id;
	Statuses.delete(id, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
	});
};
