const path = require("../config/path");
const sessionController = require("../controllers/session");

module.exports = (app) => {
    app.post(`${path.login}`, sessionController.login);
    app.post(`${path.status}`, sessionController.status);
    app.post(`${path.logout}`, sessionController.logout);

	// app.post(`${path.session}`, sessionController.all);
	// app.get(`${path.session}:id`, sessionController.findById);
	// app.delete(`${path.session}:id`, sessionController.delete);
    // app.post(`${path.login}`,  (req, res) => {
    //     if (req.body.user === "admin" && req.body.pass === "1"){
    //         const user = { id:1, name:"Admin" };
    //         console.log(req.session)
    //         req.session.user = user;
    //         res.send(user);
    //     } else {
    //         res.send(null);
    //     }
    // });

    // app.post(path.status, (req, res) => {
    //     res.send(req.session.user || null);
    // });

    // app.post(path.logout, (req, res) => {
    //     delete req.session.user;
    //     res.send({});
    // });

    // app.post(path.register, (req, res, next) => {
    //     console.log(req.body)
        // if (req.body.password !== req.body.passwordConf) {
        //     var err = new Error('Passwords do not match.');
        //     err.status = 400;
        //     res.send("passwords dont match");
        //     return next(err);
        //   }
        
        //   if (req.body.email &&
        //     req.body.username &&
        //     req.body.password &&
        //     req.body.passwordConf) {
        
        //     var userData = {
        //       email: req.body.email,
        //       username: req.body.username,
        //       password: req.body.password,
        //     }
        
        //     User.create(userData, function (error, user) {
        //       if (error) {
        //         return next(error);
        //       } else {
        //         req.session.userId = user._id;
        //         return res.redirect('/profile');
        //       }
        //     });
        
        //   } else if (req.body.logemail && req.body.logpassword) {
        //     User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
        //       if (error || !user) {
        //         var err = new Error('Wrong email or password.');
        //         err.status = 401;
        //         return next(err);
        //       } else {
        //         req.session.userId = user._id;
        //         return res.redirect('/profile');
        //       }
        //     });
        //   } else {
        //     var err = new Error('All fields required.');
        //     err.status = 400;
        //     return next(err);
        //   }
    // });

    // sessionController.create);
	// app.put(`${path.session}:id`, sessionController.update);
};
