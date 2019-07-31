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
