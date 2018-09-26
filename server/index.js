var {app} = require('./server.js')
var PORT = 3000;

app.listen(PORT, () => {
  console.log('connected to server');
});

module.exports = PORT;