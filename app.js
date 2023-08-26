const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const moment = require('moment');
const fs = require('fs/promises');

const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// При каждом обращении к серверу, записываются данные в файл 'server.log'
app.use(async (req, res, next) => {
  const date = moment().format('DD-MM-YYYY_hh:mm:ss');
  const { method, url } = req;
  await fs.appendFile('./public/server.log', `\n${method} ${url} ${date}`);
  next();
});
// -------------------------------
// Вывод в консоль для дебага кода
app.use(logger(formatsLogger));
// -------------------------------

app.use(cors());

// Проверка тела запроса и парсит
app.use(express.json());
// -------------------------------

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
