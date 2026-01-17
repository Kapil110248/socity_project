const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// List all documents for a society
const getAll = async (req, res) => {
  try {
    const societyId = req.user.societyId;
    const { category } = req.query;
    
    const where = { societyId };
    if (category) where.category = category;
    
    const documents = await prisma.document.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: documents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single document
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await prisma.document.findUnique({
      where: { id: parseInt(id) }
    });
    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }
    res.json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create document
const create = async (req, res) => {
  try {
    const { title, category, fileUrl } = req.body;
    const societyId = req.user.societyId;
    
    const document = await prisma.document.create({
      data: {
        title,
        category,
        fileUrl,
        societyId
      }
    });
    res.status(201).json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete document
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.document.delete({
      where: { id: parseInt(id) }
    });
    res.json({ success: true, message: 'Document deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAll, getById, create, remove };
