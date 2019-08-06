const PhoneModels = require('../models/phoneModels');

exports.all = (req, res) => {
    PhoneModels.all((err, items) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            let id = 1;
            items.forEach((item) => {
                id += 0.1;
                item.id = Math.round(id * 100) / 100;
            });
            const data = [{
                id: "root",
                value: "Phones",
                open: true,
                data: items
            }];
            res.send(data);
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
    const modelName = req.body.value;
	const phoneModel = {
		value: modelName
    };
    const query = {value: modelName};
    PhoneModels.findOne(query, (err, item) => {
        if (err) {
             res.send({error: "An error has occured"});
        }
        else if (item) {
            res.send({error: "The model exists!"});
        }
        else {
            PhoneModels.create(phoneModel, (err, result) => {
                if (err) {
                    res.send({error: "An error has occured"});
                }
                else {
                    result.ops[0].id = result.insertedId;
                    res.send(result.ops[0]);
                }
            });
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

