module.exports = function (app) {
    app.use('/', require('./routes/passport'));
};