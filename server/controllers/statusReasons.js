const StatusReasons = require("../models/statusReasons");

exports.all = (req, res) => {
    StatusReasons.all((err, items) => {
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
	StatusReasons.findById(id, (err, item) => {
		if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(item);
        }
	});
};

exports.create = (req, res) => {
	const statusReason = {
		OrderId: req.body.OrderId,
		Reason: req.body.Reason
    };
    
	StatusReasons.create(statusReason, (err, result) => {
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
    const statusReason = {
        OrderId: req.body.OrderId,
		Reason: req.body.Reason
    };

	StatusReasons.update(id, statusReason, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(statusReason);
        }
		}
	);
};

exports.delete = (req, res) => {
    const id = req.params.id;
	StatusReasons.delete(id, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
	});
};
