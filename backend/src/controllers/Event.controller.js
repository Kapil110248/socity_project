const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// List all events for a society
const getAll = async (req, res) => {
  try {
    const societyId = req.user.societyId;
    const events = await prisma.event.findMany({
      where: { societyId },
      orderBy: { date: 'desc' }
    });
    res.json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single event
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) }
    });
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create event
const create = async (req, res) => {
  try {
    const { title, description, date, time, location, category } = req.body;
    const societyId = req.user.societyId;
    
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        time,
        location,
        category,
        societyId
      }
    });
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update event
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, time, location, category, status } = req.body;
    
    const event = await prisma.event.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        date: date ? new Date(date) : undefined,
        time,
        location,
        category,
        status
      }
    });
    res.json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete event
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.event.delete({
      where: { id: parseInt(id) }
    });
    res.json({ success: true, message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
