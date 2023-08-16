const express = require('express');

const ctrl = require('../../controllers/contactsControllers');

// Создаёт не новый сервер, а добавляет к существующему 'api.js'
const router = express.Router();
// -------------------------------

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', ctrl.getById);

router.post('/', ctrl.addContact);

router.put('/:contactId', ctrl.updateContactById);

router.delete('/:contactId', ctrl.deleteContact);

module.exports = router;
