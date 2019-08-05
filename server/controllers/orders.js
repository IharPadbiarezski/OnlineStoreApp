const Orders = require('../models/orders');

exports.all = (req, res) => {
    Orders.all((err, items) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            let customId = 0;
            items.forEach((item) => {
                item.id = item._id;
                customId += 1;
                item.customId = customId;
            });
            res.send(items);
        }
    })
}

exports.findById = (req, res) => {
    const id = req.params.id;
	Orders.findById(id, (err, item) => {
		if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(item);
        }
	});
};

exports.create = (req, res) => {
	const order = {
		Name: req.body.Name,
		Email: req.body.Email,
		Phone: req.body.Phone,
		DeliveryType: req.body.DeliveryType,
		DeliveryAddress: req.body.DeliveryAddress,
		PaymentType: req.body.PaymentType,
		Product: req.body.Product,
		Amount: req.body.Amount,
		OrderDate: req.body.OrderDate,
        Status: req.body.Status,
        ClientName: req.body.ClientName,
        ReasonId: req.body.ReasonId || ""
    };
    
	Orders.create(order, (err, result) => {
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
    const order = {
        Name: req.body.Name,
		Email: req.body.Email,
		Phone: req.body.Phone,
		DeliveryType: req.body.DeliveryType,
		DeliveryAddress: req.body.DeliveryAddress,
		PaymentType: req.body.PaymentType,
		Product: req.body.Product,
		Amount: req.body.Amount,
		OrderDate: req.body.OrderDate,
        Status: req.body.Status,
        ReasonId: req.body.ReasonId
    };

	Orders.update(id, order, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(order);
        }
		}
	);
};

exports.delete = (req, res) => {
    const id = req.params.id;
	Orders.delete(id, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
	});
};
