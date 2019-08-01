const Sessions = require('../models/session');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

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

exports.resetPassword = (req, res) => {

    const clientEmail = req.body.email;
    const query = {Email: clientEmail};
    Sessions.findOne(query, (err, item) => {
        if (err) {
             res.send({error: "An error has occured"});
        }
        else if (item) {
            
            async function main() {            
                let transporter = nodemailer.createTransport({
                    service: "Gmail",
                    auth: {
                        user: "YOUR.MAIL",
                        pass: "YOUR.PASSWORD"
                  }
                });
                let token;
                crypto.randomBytes(20, (err, buf) => {
                    if (err) {
                        res.send({error: "An error has occured"});
                    }
                    token = buf.toString('hex');
                   
                    transporter.sendMail({
                        from: "ipadbiarezski@gmail.com",
                        to: clientEmail,
                        subject: "Reset Password", 
                        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
                        
        
                        Please click on the following link, or paste this into your browser to complete the process:
                        
                        
                        http://${req.headers.host}/reset/${token}
        
        
                        If you did not request this, please ignore this email and your password will remain unchanged.
                        
                        `
                        });
                        
                        res.send({success: `An e-mail has been sent to ${clientEmail} with futher instructions.`});
                      })
                }
              
              main().catch(console.error);
        }
        else {
            res.send({error: "Sorry, the user with this email address in not found"});
        }
    });
}
