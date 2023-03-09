const mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECT,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => console.log("Connection stablished successfully!!..."))
.catch((err) => console.log("bad connection" + err));