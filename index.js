let express = require("express");
let app = express();

let route_1 = require("./routes/route-1");
app.use("/", route_1);

app.listen(3000, function () {
    console.log("App listening on port 3000");
});