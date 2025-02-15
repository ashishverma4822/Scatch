const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')("development:mongoose");

mongoose.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(()=>{
    dbgr("Connected to MongoDB!");
})
.catch(()=>{
    dbgr("Failed to connect to MongoDB!");
})

module.exports = mongoose.connection;