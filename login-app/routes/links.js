const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const Link = require('../models/Link');
const SECRET_KEY='secretkey';
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log('234',authHeader);
  const token = authHeader && authHeader.split(' ')[1]; // Assuming "Bearer <token>"

  if (!token) {
    return res.status(401).send('Access Denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("111",decoded)
    req.user = decoded; // Attach the decoded token to the request
    next();
  } catch (ex) {
    console.log(ex);
    res.status(400).send(ex);
  }
}

router.get('/user/:USERID', authenticateToken , async (req, res) => {
  try {
    const links = await Link.find({ USERID: req.params.USERID });
    res.json(links);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// POST create link
router.post('/',async (req, res) => {
  const link = new Link({
    title: req.body.title,
    description: req.body.description,
    imageLink: req.body.imageLink,
    url: req.body.url,
    USERID: req.body.USERID,
  });

  try {
    const newLink = await link.save();
    res.status(201).json(newLink);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update link
router.put('/:id',authenticateToken , getLink, async (req, res) => {
  if (req.body.title != null) {
    res.link.title = req.body.title;
  }
  if (req.body.description != null) {
    res.link.description = req.body.description;
  }
  if (req.body.imageLink != null) {
    res.link.imageLink = req.body.imageLink;
  }
  if (req.body.url != null) {
    res.link.url = req.body.url;
  }

  try {
    const updatedLink = await res.link.save();
    res.json(updatedLink);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE link
router.delete('/:id',authenticateToken , getLink, async (req, res) => {
  try {
    await Link.findByIdAndDelete(req.params.id); // Use Mongoose's findByIdAndDelete method
    res.json({ message: 'Link Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getLink(req, res, next) {
  try {
    link = await Link.findById(req.params.id);
    if (link == null) {
      return res.status(404).json({ message: 'Cannot find link' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.link = link;
  next();
}

module.exports = router;