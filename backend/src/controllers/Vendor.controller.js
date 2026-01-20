const prisma = require('../lib/prisma');

class VendorController {
  static async listSocietalVendors(req, res) {
    try {
      console.log('Listing vendors for user:', req.user.id, 'Role:', req.user.role, 'Society:', req.user.societyId);
      const vendors = await prisma.vendor.findMany({
        where: {
          OR: [
            { societyId: req.user.societyId },
            { societyId: null }
          ]
        }
      });
      console.log('Found vendors:', vendors.length);
      res.json(vendors);
    } catch (error) {
      console.error('List Vendors Error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  static async createVendor(req, res) {
    try {
      const { name, serviceType, contact, email, address, societyId } = req.body;
      
      // If SUPER_ADMIN, we can either take societyId from body (for societal vendor) 
      // or set it to null (for platform vendor).
      // If ADMIN, we strictly use their own societyId.
      let socId = null;
      if (req.user.role === 'SUPER_ADMIN') {
        socId = societyId || null;
      } else {
        socId = req.user.societyId || null;
      }

      const vendor = await prisma.vendor.create({
        data: { 
          name, 
          serviceType, 
          contact, 
          email, 
          address,
          societyId: socId 
        }
      });
      res.status(201).json(vendor);
    } catch (error) {
      console.error('Create Vendor Error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  static async listAllVendors(req, res) {
    try {
      const vendors = await prisma.vendor.findMany({
        include: { society: { select: { name: true } } }
      });
      res.json(vendors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateVendorStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const vendor = await prisma.vendor.update({
        where: { id: parseInt(id) },
        data: { status: status.toUpperCase() }
      });
      res.json(vendor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteVendor(req, res) {
    try {
      const { id } = req.params;
      await prisma.vendor.delete({
        where: { id: parseInt(id) }
      });
      res.json({ message: 'Vendor deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getStats(req, res) {
    try {
      const totalVendors = await prisma.vendor.count();
      const societyConnections = await prisma.vendor.count({
        where: { societyId: { not: null } }
      });
      // Mock rating for now
      const avgPartnerRating = 4.8;

      res.json({
        totalVendors,
        societyConnections,
        avgPartnerRating
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = VendorController;
