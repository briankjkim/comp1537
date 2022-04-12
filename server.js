const express = require('express')
const app = express()
const bodyparser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://kkjin0330:jo9hlg52iYr686x9@cluster0.msyad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const unicornSchema = new mongoose.Schema({
    name: String,
    weight: Number,
    loves: [String]
});
const unicornModel = mongoose.model("unicorns", unicornSchema);


app.use(bodyparser.urlencoded({
    extended: true
}));


app.listen(process.env.PORT || 5000, function (err) {
    if (err)
        console.log(err);
})


app.get('/contact', function (req, res) {
    res.send('Hi there, here is my <a href="mailto:kkim226@my.bcit.ca"> email </a>.')
})


app.use(express.static("public"))


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
})


app.post("/findUnicornByName", function (req, res) {
    console.log("req. has been received")
    console.log(req.body.unicornName)

    unicornModel.find({
        name: req.body.unicornName
    }, function (err, unicorns) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + unicorns);
        }
        res.send(unicorns);
    });


})

app.post("/findUnicornByFood", function (req, res) {
    console.log("req. has been received")
    console.log(req.body.appleIsChecked)
    console.log(req.body.carrotIsChecked)
    aList = []

    if (req.body.appleIsChecked == "checked")
        aList.push("apple")

    if (req.body.carrotIsChecked == "checked")
        aList.push("carrot")

    unicornModel.find({
        loves: {
            $in: aList
        }
    }, function (err, unicorns) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + unicorns);
        }
        res.send(unicorns);
    });


})



// app.get('/', function(req, res) {
//     res.sendFile(__dirname + "./index.html");
// })

// app.get('/code.js', function(req, res) {
//     res.sendFile(__dirname + "/code.js");
// })