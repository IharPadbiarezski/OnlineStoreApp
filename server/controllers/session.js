const Sessions = require('../models/session');

exports.login = (req, res) => {
    const query = {Email: req.body.email}
    Sessions.findOne(query, (err, item) => {
        if (err) {
             res.send({error: "An error has occured"});
        }
        else if (req.body.password === item.Password) {
            const user = {
                id: item._id,
                name: item.Name
            }
            req.session.user = user;
            res.send(user);
        }
        else {
            res.send(null);
        }
    });
}

exports.status = (req, res) => {
    res.send(req.session.user || null);
}

exports.logout = (req, res) => {
    delete req.session.user;
    res.send({});
}

exports.register = (req, res) => {
    const query = {Email: req.body.email}
    Sessions.findOne(query, (err, item) => {
        if (err) {
             res.send({error: "An error has occured"});
        }
        else if (item) {
            res.send({error: "The email has already been taken"});
        }
        else {
            const user = {
                Name: req.body.name,
                Email: req.body.email,
                Password: req.body.password,
                CreationDate: req.body.date
            }
            Sessions.create(user, (err, result) => {
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
}
