const appi = require('./app');

appi.set('port', process.env.PORT || 8080);

const server = appi.listen(appi.get('port'), () => {
    console.log(`Listening on ${server.address().port}`);
});