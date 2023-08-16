const fs = require('node:fs/promises');
// Метод для соединения путей
const path = require('node:path');
// Генерация id
const crypto = require('node:crypto');

// Соединяем путь с '__dirname'
const contactsPath = path.join(__dirname, 'contacts.json');

async function read() {
  // Читаем фыйл 'contacts.json'
  const data = await fs.readFile(contactsPath, { encoding: 'utf-8' });

  return JSON.parse(data);
}

async function write(data) {
  // Записываем в фыйл 'contacts.json'
  const recordData = await fs.writeFile(contactsPath, JSON.stringify(data));

  return recordData;
}

// Возвращает все контакты
const listContacts = async () => {
  const contacts = await read();

  return contacts;
};

// Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
const getContactById = async contactId => {
  const contacts = await read();
  const objecContactId = contacts.find(cotact => cotact.id === contactId);
  if (!objecContactId) {
    return null;
  }
  // return objecContactId || null;
  return objecContactId;
};

// Возвращает объект добавленного контакта.
const addContact = async body => {
  const contacts = await read();
  const newContact = { ...body, id: crypto.randomUUID() };
  contacts.push(newContact);
  await write(contacts);
  return newContact;
};

// Возвращает объект измененного контакта. Возвращает null, если объект с таким id не найден.
const updateContact = async (id, body) => {
  const contacts = await read();

  const index = contacts.findIndex(contact => contact.id === id);

  if (index === -1) {
    return null;
  }

  const newContacts = [
    ...contacts.slice(0, index),
    { ...body, id },
    ...contacts.slice(index + 1),
  ];

  await write(newContacts);

  return { ...body, id };
};

// Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
const removeContact = async contactId => {
  const contacts = await read();

  const index = contacts.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const newContacts = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];

  await write(newContacts);

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
