// controllers/profileController.js
const multer = require('multer');
const Profile = require('../models/Profile');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Controller function to save profile
exports.saveProfile = async (req, res) => {
  upload.single('profileImage')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { name, contactNumber, email, companyName } = req.body;
    const profileImage = req.file ? req.file.path : null;

    const profile = new Profile({
      name,
      contactNumber,
      email,
      companyName,
      profileImage,
    });

    try {
      await profile.save();
      res.status(201).json({ message: 'Profile saved successfully', profile });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
