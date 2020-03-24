exports.nissan = (req,res) => {
    res.render('nissan/nissan', {zestaw: []});
}

exports.juke = (req,res) => {
    res.render('nissan/juke');
}

exports.leaf = (req,res) => {
    res.render('nissan/leaf');
}

exports.micra = (req,res) => {
    res.render('nissan/micra');
}