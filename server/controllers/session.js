const Sessions = require('../models/session');
const crypto = require('crypto');

exports.login = (req, res) => {
    const query = {Email: req.body.email}
    Sessions.findOne(query, (err, item) => {
        const password = req.body.password;
        const salt = item.Salt;
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
        if (err) {
             res.send({error: "An error has occured"});
        }
        else if (hash === item.Password) {
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
            const password = req.body.password;
            const salt = crypto.randomBytes(16).toString('hex');
            const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
            const user = {
                Name: req.body.name,
                Email: req.body.email,
                Password: hash,
                CreationDate: req.body.date,
                Salt: salt
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
