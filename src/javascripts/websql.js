/* global app, LOGLEVEL */

app.storage.webSQL = {
  db: null,
  init: function(){
    app.storage.webSQL.loadDatabase();
    app.storage.webSQL.createDatabase();
  },
  databaseError: function(transaction, error){
    app.debug.toLog(LOGLEVEL.ERROR, "Database Error: " + error.message, error);
  },
  loadDatabase: function(){
    app.storage.webSQL.db = openDatabase('jokes', '1.0', 'Jokes Database', 2 * 1024 * 1024);
  },
  createDatabase: function(){
    app.storage.webSQL.db.transaction(function (tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS `Jokes` ( \
                   `id`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, \
                   `api` INTEGER NOT NULL,\
                   `jokeid`  TEXT NOT NULL UNIQUE,\
                   `title` NUMERIC,\
                   `content` TEXT,\
                   `nsfw`  INTEGER )');
    });
  },
  insertJoke: function(api, jokeid, title, content, nsfw){
    app.storage.webSQL.db.transaction(function (tx) {
      tx.executeSql('INSERT INTO Jokes (id, api, jokeid, title, content, nsfw) VALUES (NULL, ?, ?, ?, ?, ?)', [api, jokeid, title, content, nsfw], app.storage.webSQL.getMaxJokeID());
    });
  },
  readJoke: function(id, callback){
    var jokes = [];
    var query = id != null ? 'SELECT * FROM Jokes WHERE id = "' + id + '"' : 'SELECT * FROM Jokes';

    app.storage.webSQL.db.transaction(function (tx) {
      tx.executeSql(query, [], function (tx, results) {
        var len = results.rows.length, i;
        for (i = 0; i < len; i++){
          var row = results.rows.item(i);
          jokes[i] = {
            id: row['id'],
            api: row['api'],
            jokeid: row['jokeid'],
            title: row['title'],
            content: row['content'],
            nsfw: row['nsfw']
          };
        }
        callback(jokes);
      }, app.storage.webSQL.databaseError);
    });
  },
  getMaxJokeID: function(){
    app.storage.webSQL.db.transaction(function (tx) {
      tx.executeSql('SELECT max(id) FROM Jokes', [], function (tx, result) {
        app.handleJokeID(result);
      }, app.storage.webSQL.databaseError);
    });
  }
};
