const prisma = require('../lib/prisma');

class InvoiceController {
    static async list(req, res) {
        try {
            const { status, block, search } = req.query;
            const societyId = req.user.societyId;

            const where = {
                societyId,
                ...(status && status !== 'all' ? { status: status.toUpperCase() } : {}),
                ...(block && block !== 'all' ? { unit: { block } } : {}),
                ...(search ? {
                    OR: [
                        { invoiceNo: { contains: search } },
                        { unit: { number: { contains: search } } },
                        { resident: { name: { contains: search } } }
                    ]
                } : {})
            };

            const invoices = await prisma.invoice.findMany({
                where,
                include: {
                    unit: true,
                    resident: { select: { name: true, phone: true } }
                },
                orderBy: { createdAt: 'desc' }
            });

            res.json(invoices.map(inv => ({
                id: inv.invoiceNo,
                unit: inv.unit.number,
                block: inv.unit.block,
                resident: inv.resident?.name || 'Resident',
                phone: inv.resident?.phone || 'N/A',
                amount: inv.amount,
                maintenance: inv.maintenance,
                utilities: inv.utilities,
                penalty: inv.penalty,
                dueDate: inv.dueDate.toISOString().split('T')[0],
                status: inv.status.toLowerCase(),
                paidDate: inv.paidDate ? inv.paidDate.toISOString().split('T')[0] : null,
                paymentMode: inv.paymentMode
            })));
        } catch (error) {
            console.error('List Invoices Error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async getStats(req, res) {
        try {
            const societyId = req.user.societyId;

            const stats = await prisma.invoice.groupBy({
                by: ['status'],
                where: { societyId },
                _sum: { amount: true },
                _count: { id: true }
            });

            const result = {
                totalBilled: 0,
                collected: 0,
                pending: 0,
                overdue: 0,
                pendingCount: 0,
                overdueCount: 0
            };

            stats.forEach(s => {
                const amount = s._sum.amount || 0;
                result.totalBilled += amount;
                if (s.status === 'PAID') {
                    result.collected = amount;
                } else if (s.status === 'PENDING') {
                    result.pending = amount;
                    result.pendingCount = s._count.id;
                } else if (s.status === 'OVERDUE') {
                    result.overdue = amount;
                    result.overdueCount = s._count.id;
                }
            });

            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const { unitId, amount, issueDate, dueDate, description } = req.body;
            const societyId = req.user.societyId;

            console.log('Creating single invoice:', { unitId, amount, issueDate, dueDate, societyId });

            const unit = await prisma.unit.findFirst({
                where: {
                    id: parseInt(unitId),
                    societyId
                },
                include: { owner: true, tenant: true }
            });

            if (!unit) {
                console.error(`Unit not found for ID: ${unitId} in Society: ${societyId}`);
                return res.status(404).json({ error: 'Unit not found' });
            }

            const invoiceNo = `INV-${Date.now().toString().slice(-6)}`;

            const invoice = await prisma.invoice.create({
                data: {
                    invoiceNo,
                    societyId,
                    unitId: unit.id,
                    residentId: unit.tenantId || unit.ownerId, // Fallback to owner if no tenant
                    amount: parseFloat(amount),
                    maintenance: parseFloat(amount), // Assuming generic amount is maintenance for now
                    utilities: 0,
                    dueDate: new Date(dueDate),
                    status: 'PENDING',
                    description: description || null
                }
            });


            res.status(201).json(invoice);
        } catch (error) {
            console.error('Create Invoice Error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async generateBills(req, res) {
        try {
            const { month, dueDate, block, maintenanceAmount, utilityAmount, lateFee } = req.body;
            const societyId = req.user.societyId;

            // Fetch all units in the society/block
            const units = await prisma.unit.findMany({
                where: {
                    societyId,
                    ...(block && block !== 'all' ? { block } : {})
                }
            });

            const yearMonth = month.replace('-', ''); // jan-2025 -> jan2025
            const createdInvoices = [];

            for (const unit of units) {
                const invoiceNo = `INV-${yearMonth}-${unit.block}${unit.number}-${Date.now().toString().slice(-4)}`;

                const invoice = await prisma.invoice.create({
                    data: {
                        invoiceNo,
                        societyId,
                        unitId: unit.id,
                        residentId: unit.tenantId || unit.ownerId,
                        amount: parseFloat(maintenanceAmount || 0) + parseFloat(utilityAmount || 0),
                        maintenance: parseFloat(maintenanceAmount || 0),
                        utilities: parseFloat(utilityAmount || 0),
                        dueDate: new Date(dueDate),
                        status: 'PENDING'
                    }
                });
                createdInvoices.push(invoice);
            }

            res.status(201).json({ message: `${createdInvoices.length} bills generated successfully`, count: createdInvoices.length });
        } catch (error) {
            console.error('Generate Bills Error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async markAsPaid(req, res) {
        try {
            const { invoiceNo } = req.params;
            const { paymentMode } = req.body;

            const invoice = await prisma.invoice.update({
                where: { invoiceNo },
                data: {
                    status: 'PAID',
                    paidDate: new Date(),
                    paymentMode: paymentMode || 'CASH'
                }
            });

            // Also record this as a transaction
            await prisma.transaction.create({
                data: {
                    type: 'INCOME',
                    category: 'Maintenance',
                    amount: invoice.amount,
                    date: new Date(),
                    description: `Payment for Invoice ${invoiceNo}`,
                    paymentMethod: (paymentMode || 'CASH').toUpperCase(),
                    status: 'PAID',
                    societyId: invoice.societyId,
                    invoiceNo: invoice.invoiceNo,
                    receivedFrom: invoice.residentId ? undefined : 'Resident' // We should ideally link user here but schema uses String
                }
            });

            res.json(invoice);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = InvoiceController;
