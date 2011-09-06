var express = require('express')
  , fs = require('fs')
  , exec = require('child_process').exec
  , app = express.createServer()
  , configPath = process.env.PWD + '/push.json'
  , configJSON = fs.readFileSync(configPath)
  , config = JSON.parse(configJSON)
  , clone = config.clone
  , port = config.port || 3003
  , pull = [
    'cd ' + clone,
    'git pull'
  ].join(' && ');
  
if(!config) console.log('You must run push from the directory your project is in.'
                      , 'Could not find config.json at'
                      , configPath);

app.post('/post-recieve', function(req, res) {
  console.log('post hook called', 'executing', pull);
  exec(pull, function(err, result) {
    console.log(err, result);
    res.send({status: 'ok'});
  });
});

app.listen(port);

console.log('Listening for a post to /post-recieve on port', port);