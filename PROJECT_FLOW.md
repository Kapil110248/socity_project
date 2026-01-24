# Society Management System - Project Flow Documentation

This document explains the complete flow of the Society Management System, detailing "who creates what" and how data travels between the 6 key dashboards (Super Admin, Admin, Resident, Guard, Vendor, Individual).

## 1. Overview
This project is a comprehensive **Role-Based Society Management System**. It is designed to digitize all operations of a residential society, including security, billing, complaints, and facility management.

The system revolves around **6 Key Roles**, each having its own dedicated Dashboard.

---

## 2. The 6 Dashboards (Key Players)
1.  **Super Admin**: The platform owner (SaaS provider).
2.  **Admin (Society Admin)**: The manager of a specific society (e.g., RWA President).
3.  **Resident**: The people living in the society (Owners/Tenants) - Focus on Community & Living.
4.  **Guard (Security)**: The security personnel at the gate.
5.  **Vendor**: External service providers (e.g., Plumbers, Electrician agencies).
6.  **Individual**: A specialized user focused on **Personal Safety & Services** (QR Codes, Emergency Logs, Service Bookings).

---

## 3. Detailed Data Flow & Responsibilities

### Use Case 1: The Setup Flow (Who creates who?)
Data travels top-down from Super Admin to Residents.

1.  **Super Admin Dashboard**
    *   **Action**: Creates a **Society**.
    *   **Action**: Creates the first **Admin** for that Society.
    *   **Data Flow**: `Super Admin` -> `Database` (New Society & Admin User created).

2.  **Admin Dashboard (The Hub)**
    *   **Action**: Configures the Society (Towers, Blocks, Floors).
    *   **Action**: Creates **Units** (Flats).
    *   **Action**: Adds **Users** into the system:
        *   **Residents**: Assigned to specific Units.
        *   **Guards**: Assigned to Gates.
    *   **Data Flow**: `Admin` input -> `Database`. Now these users can log in to their respective dashboards.

### Use Case 2: The Visitor Flow (Security)
Connecting Residents and Guards.

1.  **Resident Dashboard**
    *   **Action**: "Expected Visitor". Resident enters details of a guest coming tomorrow.
    *   **Data Flow**: Data saved as `PENDING` visitor linked to their Unit.
    *   **Visible To**: Guard Dashboard.
2.  **Guard Dashboard**
    *   **Action**: Visitor arrives at the gate. Guard searches valid units/visitors.
    *   **Action**: If "Expected", Guard sees it and marks "Check-In".
    *   **Action**: If "Unexpected", Guard takes photo/details and sends an approval request.
    *   **Data Flow**: Notification sent to Resident.
3.  **Resident Dashboard**
    *   **Action**: Receives notification -> Clicks "Approve".
    *   **Data Flow**: Status updates to `APPROVED`.
4.  **Guard Dashboard**
    *   **Action**: Sees `APPROVED` status -> Allows entry.

### Use Case 3: The Billing & Finance Flow
Connecting Admins and Residents.

1.  **Admin Dashboard** (replaces Accountant role)
    *   **Action**: Sets up Expense heads and Maintenance charges.
    *   **Action**: "Generate Invoices" (Monthly Maintenance).
    *   **Data Flow**: Invoices are created for every Unit in the database.
2.  **Resident Dashboard**
    *   **Action**: Sees "Unpaid Invoice" notification.
    *   **Action**: Clicks "Pay Now" (Gateway integration).
    *   **Data Flow**: Payment recorded -> Invoice marked `PAID` -> Receipt generated.
3.  **Admin Dashboard**
    *   **Action**: Financial Stats update (Income vs Expense).

### Use Case 4: The Complaint & Service Flow
Connecting Residents, Admins, and Vendors.

1.  **Resident Dashboard**
    *   **Action**: "Raise Complaint" (e.g., Leaking pipe in Kitchen).
    *   **Data Flow**: New Ticket created in `OPEN` status.
2.  **Admin Dashboard**
    *   **Action**: Sees the complaint. Assigns it to a **Vendor** (Plumber Agency) or Internal Staff.
    *   **Data Flow**: Ticket updated with `AssignedTo: VendorID`.
3.  **Vendor Dashboard**
    *   **Action**: Clicks Login (if they have portal access) OR receives Notification.
    *   **Action**: Completes the job -> Marks "Resolve".
4.  **Resident Dashboard**
    *   **Action**: Sees "Resolved". Can "Re-open" if unsatisfied or "Close" & Rate the service.

### Use Case 5: The Individual Safety Flow (New)
Focus on Personal Safety and Asset Protection.

1.  **Individual Dashboard**
    *   **Action**: Generates **Emergency QR Codes** (Barcodes) for assets or personal ID.
    *   **Action**: Books Services (Pest Control, etc.).
    *   **View**: Monitors **Emergency Logs** and recent alerts related to them.
    *   **Data Flow**:  `Individual` -> `Emergency/Service System`.

---

## 4. Summary of Flows

| Role | Creates / Inputs | Consumes / Views |
| :--- | :--- | :--- |
| **Super Admin** | Societies, Admins | Platform Analytics |
| **Admin** | Buildings, Units, Staff, Residents, Notices, Polls, Invoices | All Society Data, Financial Reports, Complaints |
| **Resident** | Complaints, Visitors, Payments, Poll Votes, Marketplace Items | Community Feed, Personal Bills, Notices |
| **Guard** | Visitor Entries, Emergency Alerts, Parcel Logs | Approved/Expected Visitors List |
| **Vendor** | Job Status, Invoices (to society) | Assigned Jobs/Complaints |
| **Individual** | Emergency QR Codes, Service Bookings | Emergency Logs, Service History |

This structure ensures that **Admin** is the central controller, while **Residents/Individuals** are the consumers of community and personal services respectively, and **Guards/Vendors** are the functional executors.
