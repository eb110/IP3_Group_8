exports.honda = (req,res) => {
    res.render('honda/honda', {apiWiki: []});
}

exports.civic = (req,res) => {
    res.render('honda/civic');
}

exports.crv = (req,res) => {
    res.render('honda/crv');
}

exports.hrv = (req,res) => {
    res.render('honda/hrv');
}