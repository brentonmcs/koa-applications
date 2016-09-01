let router = require('koa-router')();
let invitations = require('./controllers/invitations');

router.get('token', '/token', ctx => {
  ctx.body = {
    token: require('jsonwebtoken').sign({},  'shared-secret')
  };
});

router.get('clients', '/clients', invitations.getAll);

module.exports = router;
