const siteRouter = require('./site');
const adminRouter = require('./admin');
const apiRouter = require('./api');

function route(app) {
    app.use('/', siteRouter);
    app.use('/admin', adminRouter);
    app.use('/api', apiRouter);

}

module.exports = route;