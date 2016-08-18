'use strict';

var path = require('path');
var express = require('express');

module.exports = {
    app: function app() {
        var app = express();
        var indexPath = path.join(__dirname, 'index.html');
        // const publicPath = express.static(path.join(___dirname, '../web/dist'));
        var publicPath = express.static(path.join(__dirname, '../web/src'));
        app.use('/publish', publicPath);
        app.get('/', function (_, res) {
            res.sendFile(indexPath);
        });
        return app;
    }
};

//# sourceMappingURL=server-compiled.js.map