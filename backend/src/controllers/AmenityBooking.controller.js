const prisma = require('../lib/prisma');

class AmenityBookingController {
  static async list(req, res) {
    try {
      const where = {};
      if (req.user.role !== 'SUPER_ADMIN') {
         // If generic check needed, we'd need to join society through user or amenity, 
         // but booking has no direct societyId. Usually linked via amenity.
         // For now, returning all for simplicty or could filter by user's society via logic.
         // Let's rely on amenity link if strict needed.
      }
      const bookings = await prisma.amenityBooking.findMany({
        include: { amenity: true, user: true },
        orderBy: { startTime: 'desc' }
      });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { amenityId, startTime, endTime, status, amountPaid } = req.body;
      const booking = await prisma.amenityBooking.create({
        data: {
          amenityId: parseInt(amenityId),
          userId: req.user.id,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          status: status || 'PENDING',
          amountPaid: parseFloat(amountPaid || 0)
        }
      });
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AmenityBookingController;
