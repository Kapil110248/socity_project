const prisma = require('../lib/prisma');

class ServiceInquiryController {
  static async listInquiries(req, res) {
    try {
      console.log('List Inquiries Request:', { role: req.user.role, societyId: req.user.societyId });
      const where = {};
      if (req.user.role !== 'SUPER_ADMIN' && req.user.role !== 'super_admin') {
        where.societyId = req.user.societyId;
      }

      const inquiries = await prisma.serviceInquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' }
      });
      res.json(inquiries);
    } catch (error) {
      console.error('List Inquiries Error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  static async assignVendor(req, res) {
    try {
      const { id } = req.params;
      const { vendorId, vendorName } = req.body;
      console.log('Assign Vendor Request:', { id, vendorId, vendorName, userRole: req.user.role });
      
      const inquiry = await prisma.serviceInquiry.update({
        where: { id },
        data: {
          vendorId: vendorId.toString(),
          vendorName,
          status: 'booked'
        }
      });
      res.json(inquiry);
    } catch (error) {
      console.error('Assign Vendor Error:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ServiceInquiryController;
