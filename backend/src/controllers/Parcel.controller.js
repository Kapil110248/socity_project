const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// List all parcels for a society
const getAll = async (req, res) => {
  try {
    const societyId = req.user.societyId;
    const { status } = req.query;
    
    const where = { societyId };
    if (status) where.status = status;
    
    const parcels = await prisma.parcel.findMany({
      where,
      include: {
        unit: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: parcels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single parcel
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const parcel = await prisma.parcel.findUnique({
      where: { id: parseInt(id) },
      include: { unit: true }
    });
    if (!parcel) {
      return res.status(404).json({ success: false, message: 'Parcel not found' });
    }
    res.json({ success: true, data: parcel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create parcel entry
const create = async (req, res) => {
  try {
    const { unitId, courierName, trackingNumber, description, receivedBy } = req.body;
    const societyId = req.user.societyId;
    
    const parcel = await prisma.parcel.create({
      data: {
        unitId: parseInt(unitId),
        courierName,
        trackingNumber,
        description,
        receivedBy,
        status: 'PENDING',
        societyId
      }
    });
    res.status(201).json({ success: true, data: parcel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update parcel status (collected)
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, collectedBy, collectedAt } = req.body;
    
    const parcel = await prisma.parcel.update({
      where: { id: parseInt(id) },
      data: {
        status,
        collectedBy,
        collectedAt: collectedAt ? new Date(collectedAt) : new Date()
      }
    });
    res.json({ success: true, data: parcel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete parcel
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.parcel.delete({
      where: { id: parseInt(id) }
    });
    res.json({ success: true, message: 'Parcel deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAll, getById, create, updateStatus, remove };
