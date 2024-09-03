const ContactUs = require('../models/ContactUs');

exports.submitContactForm = async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    const newContact = new ContactUs({
      email,
      subject,
      message
    });

    await newContact.save();

    res.status(200).json({ message: 'Message received successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save the message' });
  }
};
