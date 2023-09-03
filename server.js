// Подключаемся к базе данных
const mongoose = require('mongoose');
const app = require('./app');

const { DB_NOST, PORT = 3000 } = process.env;

// mongoose.set('strictQuery', true);
// const DB_NOST =
//   'mongodb+srv://Vitaliy:V24207730vt@cluster0000.rzj8lv7.mongodb.net/db-contacts?retryWrites=true&w=majority';
mongoose
  .connect(DB_NOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connection successful');
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log('Server running. Use our API on port: 3000');
// });
