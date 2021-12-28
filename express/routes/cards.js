const express = require("express");
const router = express.Router();
const { generateUploadUrl } = require("../services/storageS3");

router.post("", async (req, res) => {
  try {
    const type = req.body.type;
    if (!type) {
      return res.status(400).json("invalid request body");
    }
    const data = await generateUploadUrl(type);
    return res.json(data);
  } catch (e) {
    return res.status(500).json(e.message);
  }
});

module.exports = router;
