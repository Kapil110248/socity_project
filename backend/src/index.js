const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth.routes');
const complaintRoutes = require('./routes/complaint.routes');
const visitorRoutes = require('./routes/visitor.routes');
const transactionRoutes = require('./routes/transaction.routes');
const societyRoutes = require('./routes/society.routes');
const vendorRoutes = require('./routes/vendor.routes');
const parkingRoutes = require('./routes/parking.routes');
const reportRoutes = require('./routes/report.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/society', societyRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/parking', parkingRoutes);
app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
