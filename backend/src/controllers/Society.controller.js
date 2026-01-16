const prisma = require('../lib/prisma');

class SocietyController {
  static async getUnits(req, res) {
    try {
      const units = await prisma.unit.findMany({
        where: { societyId: req.user.societyId },
        include: { owner: true, tenant: true }
      });
      res.json(units);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateOwnership(req, res) {
    try {
      const { id } = req.params;
      const { ownerId, tenantId } = req.body;
      const unit = await prisma.unit.update({
        where: { id: parseInt(id) },
        data: { ownerId, tenantId }
      });
      res.json(unit);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async postNotice(req, res) {
    try {
      const { title, content, audience, expiresAt } = req.body;
      const notice = await prisma.notice.create({
        data: {
          title,
          content,
          audience,
          expiresAt: expiresAt ? new Date(expiresAt) : null,
          societyId: req.user.societyId
        }
      });
      res.status(201).json(notice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllSocieties(req, res) {
    try {
      const societies = await prisma.society.findMany({
        include: {
          _count: {
            select: { units: true, users: true }
          },
          users: {
            where: { role: 'ADMIN' },
            select: { name: true, email: true },
            take: 1
          }
        }
      });

      const formattedSocieties = societies.map(s => ({
        id: s.id,
        name: s.name,
        code: s.code,
        status: s.status.toLowerCase(),
        subscriptionPlan: s.subscriptionPlan,
        createdAt: s.createdAt,
        city: s.city,
        state: s.state,
        pincode: s.pincode,
        expectedUnits: s.expectedUnits,
        unitsCount: s._count.units,
        usersCount: s._count.users,
        admin: s.users[0] || { name: 'N/A', email: 'N/A', phone: 'N/A' }
      }));

      res.json(formattedSocieties);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateSocietyStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const society = await prisma.society.update({
        where: { id: parseInt(id) },
        data: { status: status.toUpperCase() }
      });
      res.json(society);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createSociety(req, res) {
    try {
      const {
        name,
        address,
        city,
        state,
        pincode,
        units,
        plan,
        adminName,
        adminEmail,
        adminPassword,
        adminPhone
      } = req.body;

      // Generate a unique code
      const code = name.toUpperCase().substring(0, 3) + Math.floor(1000 + Math.random() * 9000);

      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash(adminPassword || 'password123', 10);

      const society = await prisma.society.create({
        data: {
          name,
          address,
          city,
          state,
          pincode,
          code,
          status: 'PENDING',
          subscriptionPlan: plan.toUpperCase(),
          expectedUnits: parseInt(units) || 0,
          users: {
            create: {
              name: adminName,
              email: adminEmail,
              password: hashedPassword,
              phone: adminPhone,
              role: 'ADMIN'
            }
          }
        },
        include: {
          users: true
        }
      });

      res.status(201).json(society);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateSociety(req, res) {
    try {
      const { id } = req.params;
      const { name, address, city, state, pincode, subscriptionPlan } = req.body;
      const society = await prisma.society.update({
        where: { id: parseInt(id) },
        data: {
          name,
          address,
          city,
          state,
          pincode,
          subscriptionPlan: subscriptionPlan?.toUpperCase()
        }
      });
      res.json(society);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteSociety(req, res) {
    try {
      const { id } = req.params;
      // Note: This might fail if there are dependent records.
      // In a real app, we might want to soft delete or cascade.
      await prisma.society.delete({
        where: { id: parseInt(id) }
      });
      res.json({ message: 'Society deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getStats(req, res) {
    try {
      const stats = await prisma.society.groupBy({
        by: ['status'],
        _count: true
      });

      const formattedStats = {
        ACTIVE: 0,
        PENDING: 0,
        INACTIVE: 0
      };

      stats.forEach(item => {
        formattedStats[item.status] = item._count;
      });

      res.json(formattedStats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = SocietyController;
