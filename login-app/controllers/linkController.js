// linkController.js

const Link = require('../models/Link');

// Controller to handle creating a new link
exports.createLink = async (req, res) => {
  const { title, description, imageLink, url, USERID } = req.body;
  
  try {
    const newLink = await Link.create({ title, description, imageLink, url, USERID });
    res.status(201).json(newLink); // status code 201 indicates successful creation
  } catch (error) {
    console.error('Error creating link:', error);
    res.status(500).json({ error: 'Internal server error' }); // status code 500 indicates internal server error
  }
};

// Controller to handle retrieving all links
exports.getAllLinks = async (req, res) => {
  try {
    const links = await Link.find();
    res.status(200).json(links);
  } catch (error) {
    console.error('Error fetching links:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to handle retrieving links by username
exports.getLinksByID = async (req, res) => {
  const { USERID } = req.params;
  try {
    const links = await Link.find({ USERID });
    res.status(200).json(links);
  } catch (error) {
    console.error(`Error fetching links for user ${USERID}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to handle updating a link by ID
exports.updateLink = async (req, res) => {
  const { id } = req.params;
  const { title, description, imageUrl, url } = req.body;
  try {
    const updatedLink = await Link.findByIdAndUpdate(
      id,
      { title, description, imageUrl, url },
      { new: true }
    );
    if (!updatedLink) {
      return res.status(404).json({ error: 'Link not found' });
    }
    res.status(200).json(updatedLink);
  } catch (error) {
    console.error('Error updating link:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete link by ID
exports.deleteLink = async (req, res) => {
  try {
    const { id } = req.params; // Extract the link ID from the request parameters
    const link = await Link.findByIdAndDelete(id); // Use findByIdAndDelete to remove the link

    if (!link) {
      return res.status(404).json({ message: 'Link not found' }); // If link not found, send a 404 status code indicating not found
    }

    res.status(200).json({ message: 'Link deleted successfully' }); // Send success response
  } catch (error) {
    res.status(500).json({ message: 'Error deleting link', error }); // Send error response if something goes wrong
  }
};