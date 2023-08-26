const { httpError } = require('../helpers');

const validateBody = schema => {
  const func = (req, res, next) => {
    // --------------------
    if (!req.body || Object.keys(req.body).length === 0) {
      throw httpError(400, 'missing fields');
    }
    // --------------------
    // Вытягиваю тело запроса
    const bodyData = req.body;
    // Проверка на валидацию тело body
    const { error } = schema.validate(bodyData);
    // Если есть ошибка по валидации, выводим её
    if (error) {
      next(httpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
