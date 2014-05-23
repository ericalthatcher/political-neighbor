var http = require('http'),
    url = require('url');

http.createServer(function(req, res) {
  var uri = url.parse(req.url).pathname,
      reqpath = '';

  if (uri !== '/favicon.ico') {
    reqpath = uri;

    var options = {
      host:'puppetdb-app01-prod.ops.puppetlabs.net',
      port: 8080,
      path: reqpath
      //pfx: fs.readFileSync('server.pfx')
    };

    http.get(options, function(puppetdbres) {
      console.log('HTTP Response for ' + reqpath + ':', puppetdbres.statusCode)
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');
      puppetdbres.pipe(res);
    }).on('error', function(e) {
      console.log('Error: ' + e.message);
    });
  }
}).listen(8080);
