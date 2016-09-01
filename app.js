const Koa = require('koa');
const app = new Koa();
const router = require('./routes');
const config = require('./config');
const jwt = require('koa-jwt');

app.use(async function (ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async function (ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(async function (ctx, next) {
  const uuid = require('node-uuid').v4();
  ctx.set('X-Corelation-Id', uuid);
  await next();
});

const db = require('./db');

db.connect('mongodb://localhost:27017/mydatabase');
app.use(jwt({ secret: config.sharedSecret }).unless({ path: [/^\/token/] }));
app.use(router.routes()).use(router.allowedMethods()).listen(3000);
