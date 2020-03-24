exports.mercedes = (req,res) => {
    res.render('mercedes/mercedes', {zestaw: []});
}

exports.a_class = (req,res) => {
    res.render('mercedes/a_class');
}

exports.b_class = (req,res) => {
    res.render('mercedes/b_class');
}

exports.c_class = (req,res) => {
    res.render('mercedes/c_class');
}
