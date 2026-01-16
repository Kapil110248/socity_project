const prisma = require('../lib/prisma');

class ComplaintController {
  static async list(req, res) {
    try {
      const { status, category, priority, search } = req.query;
      const where = {
        societyId: req.user.societyId
      };

      if (req.user.role === 'RESIDENT') {
        where.reportedById = req.user.id;
      }

      if (status) where.status = status;
      if (category) where.category = category;
      if (priority) where.priority = priority;
      if (search) {
        where.OR = [
          { title: { contains: search } },
          { description: { contains: search } }
        ];
      }

      const complaints = await prisma.complaint.findMany({
        where,
        include: {
          reportedBy: { select: { name: true, email: true } },
          assignedTo: { select: { name: true } }
        },
        orderBy: { createdAt: 'desc' }
      });

      res.json(complaints);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { title, description, category, priority, images } = req.body;
      const complaint = await prisma.complaint.create({
        data: {
          title,
          description,
          category,
          priority: priority || 'MEDIUM',
          images,
          societyId: req.user.societyId,
          reportedById: req.user.id
        }
      });
      res.status(201).json(complaint);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const complaint = await prisma.complaint.update({
        where: { id: parseInt(id) },
        data: { status }
      });
      res.json(complaint);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async assign(req, res) {
    try {
      const { id } = req.params;
      const { assignedToId } = req.body;
      const complaint = await prisma.complaint.update({
        where: { id: parseInt(id) },
        data: { assignedToId }
      });
      res.json(complaint);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async addComment(req, res) {
    try {
      const { id } = req.params;
      const { message } = req.body;
      const comment = await prisma.complaintComment.create({
        data: {
          complaintId: parseInt(id),
          userId: req.user.id,
          message
        }
      });
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ComplaintController;
