const path = require('path');
const express = require('express');

module.exports = {
    app: function () {
        const app = express();
        const indexPath = path.join(__dirname, 'index.html');
        // const publicPath = express.static(path.join(___dirname, '../web/dist'));
        const publicPath = express.static(path.join(__dirname, '../web/src'));
        app.use('/publish', publicPath);
        app.get('/', function (_, res) {
            res.sendFile(indexPath);
        });
        return app;
    }
};