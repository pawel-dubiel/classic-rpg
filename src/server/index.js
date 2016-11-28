import express from 'express';

let app = express();

app.get('/', function(req, res) {
    //todo authentication, api
    res.status(200).send('ok');
});

app.get('/version', function(req, res) {

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        message: `game server - version: 0.0.1`
    }));


});

app.listen(3000, function() {
    console.log('listening on port 3000!')
});


export default app;