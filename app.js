const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const { refreshRoleCredentials } = require('./configurations');
const app = express();
app.use(bodyParser.json());



require('dotenv').config();

app.use(cors({
    origin: true,
    credentials: true
}));


app.use(require('./routes'));


app.get('/', (req, res) => {
    res.send('server is running')
});

app.post('/auth/token',(req,res)=>{
    res.send(res.json)
})

app.get('/auth/stsTokens',(req,res)=>{
    res.send(res.json)
})

app.get('/marketplace/getMarketplace', (req,res)=>{
    res.send(res.json)
})


/**
setting a default port.
 */
let port = process.env.PORT ? process.env.PORT : 2000;


app.listen(port, () => {
    console.log('listening to port ' + port)
});
