const monk = require('monk');
// const wrap = require('co-monk');

const state = {
  db: null
};

exports.connect = function(url) {
  if (state.db) return;
  state.db = monk(url);
};

exports.getCollection = function(collectionName) {
  return state.db.get(collectionName);
};

exports.close = function(done) {
  if (state.db) {
    state.db.close((err, result) => {
      state.db = null;
      state.mode = null;
      done(err);
    });
  }
};
