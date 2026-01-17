const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all staff (guards and maids) for a society
const getAll = async (req, res) => {
  try {
    const societyId = req.user.societyId;
    const { type } = req.query; // 'guard' or 'maid'
    
    const where = { societyId };
    if (type === 'guard') where.role = 'GUARD';
    else if (type === 'maid') where.role = 'MAID';
    else where.role = { in: ['GUARD', 'MAID'] };
    
    const staff = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        profileImg: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: staff });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get guards only
const getGuards = async (req, res) => {
  try {
    const societyId = req.user.societyId;
    const guards = await prisma.user.findMany({
      where: { societyId, role: 'GUARD' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        status: true,
        profileImg: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: guards });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get maids only
const getMaids = async (req, res) => {
  try {
    const societyId = req.user.societyId;
    // Maids are tracked differently - they might be in a separate table or as vendors
    // For now, returning vendors with serviceType 'Housekeeping'
    const maids = await prisma.vendor.findMany({
      where: { societyId, serviceType: 'Housekeeping' },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: maids });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add staff member
const create = async (req, res) => {
  try {
    const { name, email, phone, role, password } = req.body;
    const societyId = req.user.societyId;
    const bcrypt = require('bcryptjs');
    
    const hashedPassword = await bcrypt.hash(password || 'Staff@123', 10);
    
    const staff = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        role: role.toUpperCase(),
        password: hashedPassword,
        societyId,
        status: 'ACTIVE'
      }
    });
    
    const { password: _, ...staffData } = staff;
    res.status(201).json({ success: true, data: staffData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update staff status
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const staff = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { status }
    });
    res.json({ success: true, data: staff });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete staff
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: parseInt(id) }
    });
    res.json({ success: true, message: 'Staff member removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAll, getGuards, getMaids, create, updateStatus, remove };
