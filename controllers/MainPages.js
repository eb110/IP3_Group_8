

exports.home = (req,res) => {
    res.render('home');
}

exports.homeLogged = (req,res) => {
    res.render('homeLogged');
}

exports.login = (req,res) => {
    res.render('login'); 
    }


exports.registration = (req,res) => {
    res.render('registration');
}

exports.contact = (req,res) => {
    res.render('contact');
}
