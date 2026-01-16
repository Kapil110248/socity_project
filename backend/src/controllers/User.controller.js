const prisma = require('../lib/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
  static async register(req, res) {
    try {
      const { email, password, name, phone, role, societyCode } = req.body;

      // Check if user exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Find society if code provided
      let societyId = null;
      if (societyCode) {
        const society = await prisma.society.findUnique({ where: { code: societyCode } });
        if (!society) {
          return res.status(400).json({ error: 'Invalid society code' });
        }
        societyId = society.id;
      }

      // Create User
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          phone,
          role: role || 'RESIDENT',
          societyId
        }
      });

      res.status(201).json({ message: 'User registered successfully', userId: user.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find User
      const user = await prisma.user.findUnique({
        where: { email },
        include: { society: true }
      });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role, societyId: user.societyId },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role.toLowerCase(),
          society: user.society
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getMe(req, res) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        include: { society: true }
      });
      if (user) {
        user.role = user.role.toLowerCase();
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateProfile(req, res) {
    try {
      const { name, phone, profileImg } = req.body;
      const user = await prisma.user.update({
        where: { id: req.user.id },
        data: { name, phone, profileImg }
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await prisma.user.findMany({
        include: { society: true }
      });
      const formattedUsers = users.map(u => ({
        ...u,
        role: u.role.toLowerCase(),
        societyName: u.society?.name || 'N/A'
      }));
      res.json(formattedUsers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateUserStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { status: status.toUpperCase() }
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUserStats(req, res) {
    try {
      const totalAdmins = await prisma.user.count({
        where: { role: 'ADMIN' }
      });

      const activeAdmins = await prisma.user.count({
        where: { role: 'ADMIN', status: 'ACTIVE' }
      });

      const pendingAdmins = await prisma.user.count({
        where: { role: 'ADMIN', status: 'PENDING' }
      });

      const suspendedAdmins = await prisma.user.count({
        where: { role: 'ADMIN', status: 'SUSPENDED' }
      });

      res.json({
        totalAdmins,
        activeAdmins,
        pendingAdmins,
        suspendedAdmins
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
