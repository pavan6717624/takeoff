//Install express server
const express = require('express');
const path = require('path');


const compression = require('compression')




var forceSsl = require('force-ssl-heroku');


const app = express();
app.use(forceSsl);
app.use(compression())

// Serve only the static files form the dist directory
app.use(express.static('./dist/takeoff'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/takeoff/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
