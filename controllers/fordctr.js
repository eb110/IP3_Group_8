exports.ford = (req,res) => {
    res.render('ford/ford', {zestaw: []});
}

exports.mustang = (req,res) => {
    res.render('ford/mustang');
}

exports.fiesta = (req,res) => {
    res.render('ford/fiesta');
}

exports.focus = (req,res) => {
    res.render('ford/focus');
}
