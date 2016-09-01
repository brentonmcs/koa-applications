let router = require('koa-router')();
let invitations = require('./controllers/invitations');

router.get('clients', '/clients', invitations.getAll);

module.exports = router;
