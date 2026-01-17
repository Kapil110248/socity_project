const prisma = require('../lib/prisma');

class ServiceCategoryController {
  static async listCategories(req, res) {
    try {
      const categories = await prisma.serviceCategory.findMany({
        include: { variants: true }
      });
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createCategory(req, res) {
    try {
      const { id, name, description, icon, color, variants } = req.body;
      const category = await prisma.serviceCategory.create({
        data: {
          id,
          name,
          description,
          icon,
          color,
          variants: {
            create: variants || []
          }
        },
        include: { variants: true }
      });
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name, description, icon, color, variants } = req.body;
      
      // Sanitize variants (remove IDs to fresh create them)
      const sanitizedVariants = (variants || []).map(v => ({
        name: v.name,
        price: v.price,
        description: v.description
      }));

      const category = await prisma.$transaction(async (tx) => {
        // Delete existing variants
        await tx.serviceVariant.deleteMany({ where: { categoryId: id } });

        // Update category and create new variants
        return await tx.serviceCategory.update({
          where: { id },
          data: {
            name,
            description,
            icon,
            color,
            variants: {
              create: sanitizedVariants
            }
          },
          include: { variants: true }
        });
      });

      res.json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      await prisma.serviceVariant.deleteMany({ where: { categoryId: id } });
      await prisma.serviceCategory.delete({ where: { id } });
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ServiceCategoryController;
