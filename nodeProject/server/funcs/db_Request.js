var mongoose = require('mongoose');

var exports = (module.exports = {});

exports.send_db_request = function (link) {
    var fds = mongoose.connect(link);
    var col = mongoose.model("_apimonitor");
    var res = col.findOne();
    console.log(res);
}