const PaymentTypes = require("../models/paymentTypes");

exports.all = (req, res) => {
    PaymentTypes.all((err, items) => {
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
	PaymentTypes.findById(id, (err, item) => {
		if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(item);
        }
	});
};

exports.create = (req, res) => {
	const paymentType = {
		value: req.body.value
    };
    
	PaymentTypes.create(paymentType, (err, result) => {
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
    const paymentType = {
        value: req.body.value
    };

	PaymentTypes.update(id, paymentType, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(paymentType);
        }
		}
	);
};

exports.delete = (req, res) => {
    const id = req.params.id;
	PaymentTypes.delete(id, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
	});
};

