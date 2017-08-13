/* global app */

app.storage.webSQL = {
  db: null,
  init: function(){
    app.storage.webSQL.loadDatabase();
    app.storage.webSQL.createDatabase();
  },
  loadDatabase: function(){
    app.storage.webSQL.db = openDatabase('jokes', '1.0', 'Jokes Database', 2 * 1024 * 1024);
  },
  createDatabase: function(){
    app.storage.webSQL.db.transaction(function (tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS `Jokes` ( \
                   `id`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, \
                   `api` INTEGER NOT NULL,\
                   `jokeId`  TEXT NOT NULL UNIQUE,\
                   `title` NUMERIC,\
                   `content` TEXT,\
                   `nsfw`  INTEGER )');
    });
  },
  insertJoke: function(api, jokeid, title, content, nsfw){
    app.storage.webSQL.db.transaction(function (tx) {
      tx.executeSql('INSERT INTO Jokes (id, api, jokeId, title, content, nsfw) VALUES (NULL, ?, ?, ?, ?, ?)', [api, jokeid, title, content, nsfw]);
    });
  },
  readJokes: function(id, callback){
    var jokes = [];
    app.storage.webSQL.db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM Jokes WHERE id = ?', [id], function (tx, results) {
        var len = results.rows.length, i;
        for (i = 0; i < len; i++){
          var row = results.rows.item(i);
          jokes[i] = {
            id: row['id'],
            api: row['api'],
            jokeId: row['jokeId'],
            title: row['title'],
            content: row['content'],
            nsfw: row['nsfw']
          };
        }
        callback(jokes);
      }, null);
    });
  },
  readJoke: function(){
    app.storage.webSQL.db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM Jokes', [], function (tx, results) {

      }, null);
    });
  }
};
