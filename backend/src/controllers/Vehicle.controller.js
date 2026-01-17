const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// List all vehicles for a society
const getAll = async (req, res) => {
  try {
    const societyId = req.user.societyId;
    
    // Get all parking slots with vehicle info
    const vehicles = await prisma.parkingSlot.findMany({
      where: { 
        societyId,
        vehicleNumber: { not: null }
      },
      include: {
        unit: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: vehicles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Register vehicle
const register = async (req, res) => {
  try {
    const { slotId, vehicleNumber, vehicleType, ownerName } = req.body;
    
    const vehicle = await prisma.parkingSlot.update({
      where: { id: parseInt(slotId) },
      data: {
        vehicleNumber,
        type: vehicleType,
        status: 'ALLOCATED'
      }
    });
    res.json({ success: true, data: vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove vehicle from slot
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    
    const vehicle = await prisma.parkingSlot.update({
      where: { id: parseInt(id) },
      data: {
        vehicleNumber: null,
        status: 'VACANT',
        allocatedToUnitId: null
      }
    });
    res.json({ success: true, message: 'Vehicle removed from slot' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get vehicle statistics
const getStats = async (req, res) => {
  try {
    const societyId = req.user.societyId;
    
    const [total, twoWheeler, fourWheeler] = await Promise.all([
      prisma.parkingSlot.count({ 
        where: { societyId, vehicleNumber: { not: null } } 
      }),
      prisma.parkingSlot.count({ 
        where: { societyId, type: '2-Wheeler', vehicleNumber: { not: null } } 
      }),
      prisma.parkingSlot.count({ 
        where: { societyId, type: '4-Wheeler', vehicleNumber: { not: null } } 
      })
    ]);
    
    res.json({
      success: true,
      data: {
        total,
        twoWheeler,
        fourWheeler
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAll, register, remove, getStats };
