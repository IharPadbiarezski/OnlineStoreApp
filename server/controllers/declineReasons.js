const DeclineReasons = require('../models/declineReasons');

exports.all = (req, res) => {
    DeclineReasons.all((err, items) => {
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
	DeclineReasons.findById(id, (err, item) => {
		if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(item);
        }
	});
};

exports.create = (req, res) => {
	const declineReason = {
        OrderId: req.body.OrderId,
        Reason: req.body.Reason
    };
    
	DeclineReasons.create(declineReason, (err, result) => {
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
    const declineReason = {
        OrderId: req.body.OrderId,
        Reason: req.body.Reason
    };

	DeclineReasons.update(id, declineReason, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(declineReason);
        }
		}
	);
};

exports.delete = (req, res) => {
    const id = req.params.id;
	DeclineReasons.delete(id, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
	});
};
