const express = require('express');
const prisma = require('../lib/prisma');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/slots', authenticate, async (req, res) => {
  try {
    const slots = await prisma.parkingSlot.findMany({ where: { societyId: req.user.societyId } });
    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/slots/:id/allocate', authenticate, authorize(['ADMIN']), async (req, res) => {
  try {
    const slot = await prisma.parkingSlot.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(slot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
