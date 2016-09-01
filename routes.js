const router = require('koa-router')();
const invitations = require('./controllers/invitations');

router.get('token', '/token', ctx => {
  ctx.body = {
    token: require('jsonwebtoken').sign({}, require('./config').sharedSecret)
  };
});

router.get('token', '/token/merchant', ctx => {
  ctx.body = {
    token: require('jsonwebtoken').sign({claim: 'merchant', 'sub': 123}, require('./config').sharedSecret)
  };
});

router.get('/clients', (ctx, next) => {
  if (ctx.state.user.claim !== 'merchant') {
    ctx.status = 401;
    ctx.body = 'Merchant only';
  } else {
    return next();
  }
}, invitations.getAll);

module.exports = router;
