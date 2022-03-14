require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
var os = require('os');
var ifaces = os.networkInterfaces();


app.use(morgan("short"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());



app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'content-type, x-access-token'); //1
    next();
});
  

Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;
  
    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }
  
      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log(ifname + ':' + alias, iface.address);
      } else {
        // this interface has only one ipv4 adress
        console.log(ifname, iface.address);
      }
      ++alias;
    });
});


app.use('/api/test', require('./routers/test'));
