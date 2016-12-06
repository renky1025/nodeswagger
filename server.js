const config = require('dotenv').config();
const app = require('./app/index');
console.log(config);
app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
});