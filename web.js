var express = require('express'),
    app = express(),
    logfmt = require('logfmt'),
    //crawlme = require('crawlme'),
    port;

app.configure(function() {
  //app.use(crawlme());
  app.set('port', Number(process.env.PORT) || 5000);
  app.use(express.static('target'));
  app.use(express.bodyParser());
  app.use(logfmt.requestLogger());
});

app.use(function(req, res) {
    res.sendfile('target/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Listening on ' + app.get('port'));
});