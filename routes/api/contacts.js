const express = require('express');

const ctrl = require('../../controllers/contactsControllers');

const { validateBody } = require('../../middlewares');

const schemas = require('../../schemas/schemaContacts');

// Создаёт не новый сервер, а добавляет к существующему 'api.js'
const router = express.Router();
// -------------------------------

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

router.put(
  '/:contactId',
  validateBody(schemas.addSchema),
  ctrl.updateContactById
);

router.delete('/:contactId', ctrl.deleteContact);

module.exports = router;
