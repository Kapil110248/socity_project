# SOCIETY_MANAGEMENT_COMPLETE_API_SPECIFICATION

## 1. System Overview

**Objective**: To provide a robust, scalable, and secure backend for the Society Management System Frontend.
**Tech Stack**: Node.js, Express, Prisma (ORM), MySQL, JWT Authentication.
**Status**: Frontend Complete. Backend Development Required.

---

## 2. Database Design (Prisma Schema)

```prisma
// schema.prisma

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  SUPER_ADMIN
  ADMIN
  RESIDENT
  GUARD
  VENDOR
  ACCOUNTANT
}

enum ComplaintStatus {
  OPEN
  IN_PROGRESS
  RESOLVED
  CLOSED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum VisitorStatus {
  PENDING
  APPROVED
  CHECKED_IN
  CHECKED_OUT
  REJECTED
}

enum TransactionType {
  INCOME
  EXPENSE
}

enum PaymentMethod {
  CASH
  ONLINE
  UPI
  CHEQUE
}

model Society {
  id          Int      @id @default(autoincrement())
  name        String
  address     String?
  code        String   @unique // Unique code for society login/reg
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  users       User[]
  units       Unit[]
  complaints  Complaint[]
  visitors    Visitor[]
  transactions Transaction[]
  notices     Notice[]
  vendors     Vendor[]
  amenities   Amenity[]
  parkingSlots ParkingSlot[]
}

model User {
  id          Int      @id @default(autoincrement())
  email       String   @unique
  password    String   // Hashed
  name        String
  phone       String?
  role        Role     @default(RESIDENT)
  profileImg  String?
  
  societyId   Int?
  society     Society? @relation(fields: [societyId], references: [id])
  
  // Relations
  ownedUnits  Unit[]   @relation("Owner")
  rentedUnits Unit[]   @relation("Tenant")
  
  reportedComplaints Complaint[] @relation("ReportedBy")
  assignedComplaints Complaint[] @relation("AssignedTo")
  
  bookings    AmenityBooking[]
  comments    ComplaintComment[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Unit {
  id          Int      @id @default(autoincrement())
  block       String
  number      String
  floor       Int
  type        String   // 2BHK, 3BHK, Villa
  areaSqFt    Float
  
  societyId   Int
  society     Society  @relation(fields: [societyId], references: [id])
  
  ownerId     Int?
  owner       User?    @relation("Owner", fields: [ownerId], references: [id])
  
  tenantId    Int?
  tenant      User?    @relation("Tenant", fields: [tenantId], references: [id])
  
  visitors    Visitor[]
  parkingSlots ParkingSlot[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@unique([societyId, block, number])
}

model ParkingSlot {
  id          Int      @id @default(autoincrement())
  number      String
  type        String   // 4-Wheeler, 2-Wheeler
  status      String   // ALLOCATED, VACANT, VISITOR
  
  societyId   Int
  society     Society  @relation(fields: [societyId], references: [id])
  
  allocatedToUnitId Int?
  unit        Unit?    @relation(fields: [allocatedToUnitId], references: [id])
  
  vehicleNumber String?
  
  createdAt   DateTime @default(now())
}

model Complaint {
  id          Int      @id @default(autoincrement())
  title       String
  description String   @db.Text
  category    String   // maintenance, electrical, plumbing, etc.
  priority    Priority @default(MEDIUM)
  status      ComplaintStatus @default(OPEN)
  
  images      Json?    // Array of image URLs
  
  societyId   Int
  society     Society  @relation(fields: [societyId], references: [id])
  
  reportedById Int
  reportedBy   User    @relation("ReportedBy", fields: [reportedById], references: [id])
  
  assignedToId Int?
  assignedTo   User?   @relation("AssignedTo", fields: [assignedToId], references: [id])
  
  comments    ComplaintComment[]
  timeline    Json?    // Array of {action, time, user} objects
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model ComplaintComment {
  id          Int      @id @default(autoincrement())
  complaintId Int
  complaint   Complaint @relation(fields: [complaintId], references: [id])
  userId      Int
  user        User      @relation(fields: [userId], references: [id])
  message     String    @db.Text
  createdAt   DateTime @default(now())
}

model Visitor {
  id          Int      @id @default(autoincrement())
  name        String
  phone       String
  vehicleNo   String?
  purpose     String
  photo       String?
  
  status      VisitorStatus @default(PENDING)
  entryTime   DateTime?
  exitTime    DateTime?
  
  societyId   Int
  society     Society  @relation(fields: [societyId], references: [id])
  
  visitingUnitId Int
  unit           Unit    @relation(fields: [visitingUnitId], references: [id])
  
  idType      String?  // Aadhar, DL
  idNumber    String?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Transaction {
  id          Int      @id @default(autoincrement())
  type        TransactionType
  category    String   // Maintenance, Parking, Salary
  amount      Float
  date        DateTime
  description String?
  
  paymentMethod PaymentMethod
  status      String   // PAID, PENDING, OVERDUE
  
  societyId   Int
  society     Society  @relation(fields: [societyId], references: [id])
  
  invoiceNo   String?
  paidTo      String?  // Vendor Name
  receivedFrom String? // Resident Name
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Vendor {
  id          Int      @id @default(autoincrement())
  name        String
  serviceType String
  contact     String
  email       String?
  address     String?
  active      Boolean  @default(true)
  
  societyId   Int
  society     Society  @relation(fields: [societyId], references: [id])
  
  createdAt   DateTime @default(now())
}

model Notice {
  id          Int      @id @default(autoincrement())
  title       String
  content     String   @db.Text
  audience    String   // ALL, OWNERS, TENANTS
  
  societyId   Int
  society     Society  @relation(fields: [societyId], references: [id])
  
  createdAt   DateTime @default(now())
  expiresAt   DateTime?
}

model Amenity {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  chargesPerHour Float @default(0)
  
  societyId   Int
  society     Society  @relation(fields: [societyId], references: [id])
  
  bookings    AmenityBooking[]
  
  createdAt   DateTime @default(now())
}

model AmenityBooking {
  id          Int      @id @default(autoincrement())
  amenityId   Int
  amenity     Amenity  @relation(fields: [amenityId], references: [id])
  
  userId      Int
  user        User     @relation(fields: [userId], references: [id])
  
  startTime   DateTime
  endTime     DateTime
  status      String   // CONFIRMED, CANCELLED
  amountPaid  Float    @default(0)
  
  createdAt   DateTime @default(now())
}
```

---

## 3. Function Discovery & API Design

### 3.1 Authentication Module // User & Role Management

| Action | Frontend Component | API Endpoint | Method | Body Payload | Access |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Login** | `LoginPage.tsx` | `/api/auth/login` | `POST` | `{ email, password }` | Public |
| **Register** | `RegisterPage.tsx` | `/api/auth/register` | `POST` | `{ name, email, password, phone, societyCode?, unitBlock?, unitNumber? }` | Public |
| **Forgot Password** | `ForgotPassword.tsx` | `/api/auth/forgot-password` | `POST` | `{ email }` | Public |
| **Reset Password** | `ResetPassword.tsx` | `/api/auth/reset-password` | `POST` | `{ token, newPassword }` | Public |
| **Get Profile** | `ProfilePage.tsx` | `/api/auth/me` | `GET` | - | Authenticated |
| **Update Profile** | `ProfilePage.tsx` | `/api/auth/profile` | `PUT` | `{ name, phone, avatar? }` | Authenticated |

### 3.2 Complaints Module

**Base Path**: `/api/complaints`

#### 1. List Complaints
- **Button**: Dashboard Widgets, Complaints Table Filter
- **Endpoint**: `GET /`
- **Query Params**: `page`, `limit`, `status`, `category`, `priority`, `search`
- **Access**: Admin (All), Resident (Own)

#### 2. Create Complaint
- **Button**: "New Complaint" (Floating Action / Header)
- **Endpoint**: `POST /`
- **Body**:
  ```json
  {
    "title": "Water Leakage",
    "description": "Dripping from ceiling",
    "category": "plumbing",
    "priority": "HIGH",
    "images": ["url1", "url2"]
  }
  ```
- **Access**: Resident, Admin

#### 3. Update Status (Resolve/Close)
- **Button**: "Mark as Resolved", "Close Ticket"
- **Endpoint**: `PATCH /:id/status`
- **Body**: `{ "status": "RESOLVED" }`
- **Access**: Admin, Assigned Staff

#### 4. Assign Complaint
- **Button**: "Assign" (Dialog)
- **Endpoint**: `PATCH /:id/assign`
- **Body**: `{ "assignedToId": 123 }`
- **Access**: Admin

#### 5. Add Comment
- **Button**: "Send" (Chat Interface)
- **Endpoint**: `POST /:id/comments`
- **Body**: `{ "message": "Plumber is on the way." }`
- **Access**: Participants

### 3.3 Security & Visitor Module

**Base Path**: `/api/visitors`

#### 1. Check-In Visitor
- **Button**: "Check In Now" (Dialog)
- **Endpoint**: `POST /check-in`
- **Body**:
  ```json
  {
    "name": "Delivery Guy",
    "phone": "9988776655",
    "visitingUnitId": 45,
    "purpose": "Web Delivery",
    "vehicleNo": "MH02AB1234",
    "idType": "AADHAR",
    "idNumber": "1234",
    "photo": "base64_or_url"
  }
  ```
- **Access**: Guard

#### 2. Pre-Approve Visitor
- **Button**: "Add Visitor" (Resident Dashboard)
- **Endpoint**: `POST /pre-approve`
- **Body**: `{ "name", "phone", "date", "purpose" }`
- **Access**: Resident
- **Logic**: Returns a QR Code string/URL.

#### 3. Check-Out Visitor
- **Button**: "Check Out"
- **Endpoint**: `PATCH /:id/check-out`
- **Body**: -
- **Access**: Guard

#### 4. List Visitors
- **Button**: Visitor Logs Table
- **Endpoint**: `GET /`
- **Query Params**: `date`, `unitId`, `status`
- **Access**: Admin, Guard, Resident (Own)

### 3.4 Accounts & Billing (Income/Expense)

**Base Path**: `/api/transactions`

#### 1. Record Income
- **Button**: "Record Income"
- **Endpoint**: `POST /income`
- **Body**:
  ```json
  {
    "category": "maintenance",
    "amount": 5000,
    "date": "2024-01-01",
    "receivedFrom": "John Doe",
    "paymentMethod": "UPI",
    "description": "Jan Maintenance"
  }
  ```
- **Access**: Admin, Accountant

#### 2. Record Expense
- **Button**: "Record Expense"
- **Endpoint**: `POST /expense`
- **Body**: `{ "category", "amount", "paidTo", "invoiceNo", ... }`
- **Access**: Admin

#### 3. Get Financial Stats
- **Button**: Dashboard widgets (Total Income, Net Balance)
- **Endpoint**: `GET /stats`
- **Query Params**: `month`, `year`
- **Access**: Admin

### 3.5 Society & Unit Management (Admin)

**Base Path**: `/api/society`

#### 1. List Units/Residents
- **Button**: Directory Page
- **Endpoint**: `GET /units`
- **Access**: Admin, Resident (Limited view)

#### 2. Add/Update Unit Owner
- **Button**: "Add Resident", "Edit Owner"
- **Endpoint**: `PATCH /units/:id/ownership`
- **Body**: `{ "ownerId": 789, "tenantId": null }`
- **Access**: Admin

#### 3. Post Notice
- **Button**: "Create Notice"
- **Endpoint**: `POST /notices`
- **Body**: `{ "title", "content", "audience", "expiresAt" }`
- **Access**: Admin

### 3.6 Vendors Module

**Base Path**: `/api/vendors`

#### 1. List Vendors
- **Button**: Vendors Table
- **Endpoint**: `GET /`
- **Access**: Admin

#### 2. Add Vendor
- **Button**: "Add Vendor"
- **Endpoint**: `POST /`
- **Body**: `{ "name", "serviceType", "contact", "address" }`
- **Access**: Admin

### 3.7 Parking Management

**Base Path**: `/api/parking`

#### 1. List Slots
- **Button**: "View Parking"
- **Endpoint**: `GET /slots`
- **Access**: Admin, Resident

#### 2. Allocate Slot
- **Button**: "Allocate" / "Assign"
- **Endpoint**: `PATCH /slots/:id/allocate`
- **Body**: `{ "unitId": 123, "vehicleNumber": "MH..." }`
- **Access**: Admin

### 3.8 Reports & Exports

**Base Path**: `/api/reports`

#### 1. Download Report
- **Button**: "Export PDF", "Download CSV"
- **Endpoint**: `GET /download`
- **Query Params**: `type` (complaint_log, visitor_log, financial), `format` (pdf, csv), `startDate`, `endDate`
- **Access**: Admin

---

## 4. Integration Mapping & Business Logic Flow

#### Example Trace: **"Resolve Complaint"**
1. **Frontend**: User clicks "Mark as Resolved" on `ComplaintDetailDialog`.
2. **API Call**: `PATCH /api/complaints/101/status` with body `{ status: 'RESOLVED' }`.
3. **Backend Logic**:
    - Middleware checks JWT. User must be Admin or Assigned Staff.
    - Database find `Complaint` by ID.
    - Update `status` to `RESOLVED`.
    - Create a `ComplaintComment` entry: "System: Marked as Resolved".
    - **Notification**: Trigger Push/Email to the Resident who reported it.
4. **Response**: `200 OK` with updated Complaint object.
5. **UI Update**: Toast "Complaint Marked as Resolved", Badge turns Green.

#### Example Trace: **"Visitor Check-in"**
1. **Frontend**: Guard fills "New Visitor" form, takes photo, clicks "Check In".
2. **API Call**: `POST /api/visitors/check-in`.
3. **Backend Logic**:
    - Validate `visitingUnitId` exists.
    - Create `Visitor` record with `status: CHECKED_IN`, `entryTime: now()`.
    - **Notification**: Send WhatsApp/SMS to Resident of `visitingUnitId` saying "Visitor X is at the gate".
4. **Response**: `201 Created` with Visitor ID.
5. **UI Update**: Visitor added to "Currently Inside" list.

---

## 5. Security & Performance

- **Authentication**: JWT (JSON Web Tokens) with 24h expiry. Refresh tokens stored in HTTPOnly cookies.
- **Authorization**: Role-Based Access Control (RBAC) middleware on every protected route.
- **Validation**: Zod (frontend) mirrors Joi/Zod (backend) schemas.
- **Rate Limiting**: `express-rate-limit` on Auth routes (5 attempts/min) and general API (100 req/min).
- **Pagination**: All list APIs (Complaints, Visitors, Transactions) MUST support `page` and `limit` to prevent payload bloat.
- **Image Handling**: Direct upload to Cloudinary/S3; store only URLs in MySQL.

---

## 6. Setup & Seeding

1. **Super Admin**: Create a master account via Seed script.
2. **Society Creation**: Super Admin creates Society -> generates `Society Code`.
3. **Admin Registration**: Admin registers using `Society Code`.
4. **Unit Import**: CSV upload to bulk create Units (Block A-101 to D-505).
