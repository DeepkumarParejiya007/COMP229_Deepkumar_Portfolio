const Contact = require('../models/Contact.model');

// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get contact by ID
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new contact
exports.createContact = async (req, res) => {
  const contact = new Contact({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email
  });
  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update contact by ID
exports.updateContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    contact.firstname = req.body.firstname || contact.firstname;
    contact.lastname = req.body.lastname || contact.lastname;
    contact.email = req.body.email || contact.email;

    const updatedContact = await contact.save();
    res.json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete contact by ID
exports.deleteContactById = async (req, res) => {
  try {
    const result = await Contact.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete all contacts
exports.deleteAllContacts = async (req, res) => {
  try {
    await Contact.deleteMany({});
    res.json({ message: 'All contacts deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
