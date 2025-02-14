const contacts = require('../models/contacts');
const { httpError, ctrlWrapper } = require('../helpers');

const getAllContacts = async (req, res, next) => {
  // try {
  //   const result = await contacts.listContacts();
  //   res.json(result);
  // } catch (error) {
  //   // res.status(500).json({
  //   //   message: 'Server error',
  //   // });
  //   next(error);
  // }

  // Пример выноса try catch в отдельную функцию
  const result = await contacts.listContacts();
  res.json(result);
};

const getById = async (req, res, next) => {
  try {
    // Вытягиваю динамическое свойство
    const { contactId } = req.params;

    const result = await contacts.getContactById(contactId);

    if (!result) {
      // Функция для обработки ошибок
      throw httpError(404, 'Not found');
      // Если такого контакта нет, выводим сообщ. и добавляем статус ошибки
      // return res.status(404).json({
      //   message: 'Not found',
      // });

      // Если такого контакта нет, выводим сообщ. и добавляем статус ошибки v2
      // const error = new Error('Not found');
      // error.status = 404;
      // throw error;
    }

    res.json(result);
  } catch (error) {
    // // res.status(500).json({
    // //   message: 'Server error',
    // // });

    // const { status = 500, message = 'Server error' } = error;
    // res.status(status).json({
    //   message,
    // });
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    // // Вытягиваю тело запроса
    const bodyData = req.body;

    const result = await contacts.addContact(bodyData);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    // Вытягиваю тело запроса
    const bodyData = req.body;

    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, bodyData);

    // Если нет объекта с таким id
    if (!result) {
      // Функция для обработки ошибок
      throw httpError(404, 'Not found');
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

    if (!result) {
      // Функция для обработки ошибок
      throw httpError(404, 'Not found');
    }

    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  // getAllContacts,
  getAllContacts: ctrlWrapper(getAllContacts),
  getById,
  addContact,
  updateContactById,
  deleteContact,
};
