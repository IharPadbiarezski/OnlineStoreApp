const Clients = require("../models/clients");

exports.all = (req, res) => {
    Clients.all((err, items) => {
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
	Clients.findById(id, (err, item) => {
		if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(item);
        }
	});
};

exports.create = (req, res) => {
	const client = {
        Name: req.body.Name,
        Email: req.body.Email,
        CreationDate: req.body.CreationDate,
        Password: req.body.Password
    };
    
	Clients.create(client, (err, result) => {
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
    const client = {
        Name: req.body.Name,
        Email: req.body.Email,
        CreationDate: req.body.CreationDate,
        Password: req.body.Password
    };

	Clients.update(id, client, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(client);
        }
		}
	);
};

exports.delete = (req, res) => {
    const id = req.params.id;
	Clients.delete(id, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
	});
};
