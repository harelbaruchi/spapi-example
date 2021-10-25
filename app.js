const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: true,
    credentials: true
}));


app.use(require('./routes'));


app.get('/', (req, res) => {
    res.send('server is running')
});


/**
setting a default port.
 */
let port = process.env.PORT ? process.env.PORT : 2000;


app.listen(port, () => {
    console.log('listening to port ' + port)
});
