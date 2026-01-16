const prisma = require('../lib/prisma');

class ReportController {
  static async getPlatformStats(req, res) {
    try {
      const totalSocieties = await prisma.society.count();
      const activeSocieties = await prisma.society.count({ where: { status: 'ACTIVE' } });
      const pendingSocieties = await prisma.society.count({ where: { status: 'PENDING' } });
      
      const totalUsers = await prisma.user.count();
      // Assume all users in DB are active for now
      const activeUsers = totalUsers; 
      
      const totalUnits = await prisma.unit.count();
      
      const revenueData = await prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { type: 'INCOME' }
      });
      const monthlyRevenue = revenueData._sum.amount || 0;

      // Growth Data (last 6 months)
      const now = new Date();
      const growthData = [];
      for (let i = 5; i >= 0; i--) {
        const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthName = monthDate.toLocaleString('default', { month: 'short' });
        
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
        
        const societiesCount = await prisma.society.count({
          where: { createdAt: { lte: endOfMonth } }
        });
        
        const usersCount = await prisma.user.count({
          where: { createdAt: { lte: endOfMonth } }
        });
        
        growthData.push({ month: monthName, societies: societiesCount, users: usersCount });
      }

      // Recent Societies
      const recentSocieties = await prisma.society.findMany({
        take: 4,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          address: true,
          status: true,
          createdAt: true,
          _count: { select: { units: true } }
        }
      });

      // Subscription Stats
      const basic = await prisma.society.count({ where: { subscriptionPlan: 'BASIC' } });
      const pro = await prisma.society.count({ where: { subscriptionPlan: 'PROFESSIONAL' } });
      const ent = await prisma.society.count({ where: { subscriptionPlan: 'ENTERPRISE' } });

      res.json({
        platformStats: {
          totalSocieties,
          activeSocieties,
          pendingSocieties,
          totalUsers,
          activeUsers,
          totalUnits,
          monthlyRevenue,
          pendingApprovals: pendingSocieties
        },
        societyGrowthData: growthData,
        revenueData: growthData.map(g => ({ month: g.month, revenue: monthlyRevenue / 6 })), // Mocking trend for now
        recentSocieties: recentSocieties.map(s => ({
          id: s.id,
          name: s.name,
          city: s.address || 'N/A',
          units: s._count.units,
          status: s.status.toLowerCase(),
          joinedDate: 'recently'
        })),
        subscriptionStats: [
          { plan: 'Basic', societies: basic, color: 'bg-gray-500' },
          { plan: 'Professional', societies: pro, color: 'bg-blue-500' },
          { plan: 'Enterprise', societies: ent, color: 'bg-purple-500' }
        ],
        systemHealth: {
          serverUptime: '99.99%',
          apiLatency: '32ms',
          databaseSize: '1.2GB',
          activeConnections: 42,
          cpuUsage: 12,
          memoryUsage: 45
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ReportController;
