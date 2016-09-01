const db = require('../db');

module.exports = {
  getAll: async ctx => {
    ctx.body = await db.getCollection('patients').find({merchantId: ctx.state.user.sub});
  }
};
