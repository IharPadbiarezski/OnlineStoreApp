const DeliveryTypes = require('../models/deliveryTypes');

exports.all = (req, res) => {
    DeliveryTypes.all((err, items) => {
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
	DeliveryTypes.findById(id, (err, item) => {
		if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(item);
        }
	});
};

exports.create = (req, res) => {
	const deliveryType = {
		value: req.body.value
    };
    
	DeliveryTypes.create(deliveryType, (err, result) => {
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
    const deliveryType = {
        value: req.body.value
    };

	DeliveryTypes.update(id, deliveryType, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(deliveryType);
        }
		}
	);
};

exports.delete = (req, res) => {
    const id = req.params.id;
	DeliveryTypes.delete(id, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
	});
};
