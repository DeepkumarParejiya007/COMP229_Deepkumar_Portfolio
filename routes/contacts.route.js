const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

// Route definitions
router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContactById);
router.post('/', contactController.createContact);
router.put('/:id', contactController.updateContactById);
router.delete('/:id', contactController.deleteContactById);
router.delete('/', contactController.deleteAllContacts);

module.exports = router;
