const express = require('express');
const prisma = require('../lib/prisma');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const vendors = await prisma.vendor.findMany({ where: { societyId: req.user.societyId } });
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticate, authorize(['ADMIN']), async (req, res) => {
  try {
    const vendor = await prisma.vendor.create({
      data: { ...req.body, societyId: req.user.societyId }
    });
    res.status(201).json(vendor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
