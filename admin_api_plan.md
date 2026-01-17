# Admin API Integration Plan

## 1. Schema Updates Required
Add these models to `backend/prisma/schema.prisma`:

```prisma
model Meeting {
  id          Int      @id @default(autoincrement())
  title       String
  description String?  @db.Text
  date        DateTime
  time        String
  location    String
  attendees   Json?
  status      String   @default("SCHEDULED")
  societyId   Int
  society     Society  @relation(fields: [societyId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Asset {
  id           Int      @id @default(autoincrement())
  name         String
  category     String
  value        Float
  purchaseDate DateTime
  status       String   @default("ACTIVE")
  societyId    Int
  society      Society  @relation(fields: [societyId], references: [id])
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model PurchaseRequest {
  id            Int      @id @default(autoincrement())
  item          String
  quantity      Int
  estimatedCost Float
  urgency       String
  status        String   @default("OPEN")
  requestedById Int
  requestedBy   User     @relation(fields: [requestedById], references: [id])
  societyId     Int
  society       Society  @relation(fields: [societyId], references: [id])
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Document {
  id        Int      @id @default(autoincrement())
  title     String
  category  String
  fileUrl   String
  societyId Int
  society   Society  @relation(fields: [societyId], references: [id])
  createdAt DateTime @default(now())
}
```

---

## 2. Dashboard Aggregation API
**Endpoint:** `GET /society/admin-dashboard-stats`
**Controller:** `Society.controller.js` -> `getAdminStats`

**Response Structure:**
```json
{
  "userStats": { "total": 1003, "active": 856, "pending": 32, "defaulters": 2 },
  "unitStats": { "total": 450, "occupied": 412, "vacant": 38 },
  "financialStats": {
    "maintenance": { "total": 1245000, "collected": 1085000, "pending": 160000 },
    "outstanding": 195000
  },
  "activityStats": { "openComplaints": 28, "todaysVisitors": 42, "openMeetings": 3 }
}
```

---

## 3. Module-wise API List

### A. Resident Management
| Action | Method | Endpoint |
|--------|--------|----------|
| List Residents | GET | `/society/members` |
| Add Resident | POST | `/auth/register` |
| Approve/Block | PATCH | `/auth/:id/status` |
| Delete | DELETE | `/auth/:id` |

### B. Complaints / Helpdesk
| Action | Method | Endpoint |
|--------|--------|----------|
| List | GET | `/complaints` |
| Update Status | PATCH | `/complaints/:id/status` |
| Assign Staff | PATCH | `/complaints/:id/assign` |

### C. Financials
| Action | Method | Endpoint |
|--------|--------|----------|
| List Invoices | GET | `/billing/invoices` |
| Generate | POST | `/billing/invoices/generate` |
| Defaulters | GET | `/billing/defaulters` |

### D. Amenities
| Action | Method | Endpoint |
|--------|--------|----------|
| List | GET | `/amenities` |
| Bookings | GET | `/amenities/bookings` |
| Add | POST | `/amenities` |

### E. Meetings (NEW)
| Action | Method | Endpoint |
|--------|--------|----------|
| List | GET | `/meetings` |
| Create | POST | `/meetings` |

### F. Assets (NEW)
| Action | Method | Endpoint |
|--------|--------|----------|
| List | GET | `/assets` |
| Add | POST | `/assets` |

### G. Vendors
| Action | Method | Endpoint |
|--------|--------|----------|
| List | GET | `/vendors` |
| Add | POST | `/vendors` |
| Payouts | GET | `/payouts` |

---

## 4. Implementation Steps

1. **Schema**: Add 4 new models above to `schema.prisma`
2. **Migrate**: Run `npx prisma migrate dev`
3. **Controllers**: Create `Meeting.controller.js`, `Asset.controller.js`, `PurchaseRequest.controller.js`, `Document.controller.js`
4. **Routes**: Register in `backend/src/routes/index.js`
5. **Frontend Config**: Add endpoints to `frontend/src/config/api.config.ts`
6. **Services**: Create `meeting.service.ts`, `asset.service.ts` etc.
7. **UI**: Connect Admin Dashboard to new services
