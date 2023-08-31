// Подключаемся к базе данных
const mongoose = require('mongoose');

const { DB_NOST } = process.env;

const app = require('./app');

// mongoose.set('strictQuery', true);

mongoose
  .connect(DB_NOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(3000);
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log('Server running. Use our API on port: 3000');
// });
