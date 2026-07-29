# SerialTrack 🚀

**SerialTrack** is a modern, production-ready, multi-tenant SaaS platform for **universal serial-number-based product tracking and warranty management**.

Originally built for compressor tracking, SerialTrack has been completely restructured and modernized into a generic multi-tenant SaaS platform suitable for tracking any serial-number-based hardware or electronic components—from AC Compressors, Indoor/Outdoor Units, and PCB Boards to Refrigerators, Washing Machine Parts, and Electronic Spare Parts.

---

## ✨ Key Features & Architecture

### 🏢 Multi-Tenant Workspace Architecture
- **Complete Data Isolation**: Each business or shop operates within its own workspace (`/w/{workspaceSlug}/dashboard`).
- **Dynamic Onboarding**: Fast onboarding flow (`/onboarding`) to create workspace slugs automatically.
- **Team Invitations & Link Sharing**: Shareable invite links (`/accept-invite?token=...`) allowing Owners/Admins to invite team members with specific roles.
- **Role-Based Access Control (RBAC)**:
  - **Owner**: Full workspace administrative access.
  - **Admin**: User and team management, reports, and workspace settings.
  - **Manager**: Manage products, replacements, and analytics.
  - **Employee**: Add new products, search records, and process replacements.
  - **Viewer**: Read-only product inspection.

### 🌐 Universal Product & Warranty Management
- **Generic Product Catalog**: Supports custom product categories (Air Conditioners, Refrigerators, Washing Machines, PCBs, Motors, etc.).
- **Dynamic Bulk Registration**: Add multiple serial numbers and models under a single customer entry effortlessly.
- **Instant Product Search**: Search records instantly by serial number, brand, or product name.
- **Immutable Replacement History**: Replacement history is recorded without overwriting old product records, keeping a complete audit trail.

### 🎨 Modern SaaS UI/UX
- **Design Philosophy**: Minimal, clean, dark-mode primary interface inspired by modern SaaS platforms (Linear, Vercel, Dub).
- **SEO-Optimized Marketing Site**: Server-side rendered landing page (`/`), pricing, and auth pages.
- **Responsive Layout**: Desktop sidebar navigation with mobile-optimized views.

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI & Icons**: Tailwind CSS 4, Lucide Icons, Motion (Framer Motion)
- **Authentication**: `better-auth` with MongoDB Adapter
- **Database & ORM**: MongoDB, Mongoose
- **Language**: JavaScript / TypeScript

---

## 📁 Directory Structure

```text
app/
 ├── (marketing)/           # Server-side rendered Marketing Landing Page
 ├── (auth)/                # Auth Pages (Login / Signup)
 ├── onboarding/            # Post-signup Workspace Creation Flow
 ├── accept-invite/         # Team Invitation Link Handler
 ├── w/
 │    └── [workspaceSlug]/  # Multi-Tenant Workspace Routes
 │         ├── dashboard/   # Workspace Analytics & Stats
 │         ├── products/
 │         │    ├── add/    # Dynamic Multi-Row Product Registration
 │         │    └── search/ # Instant Product Lookup & Replacements
 │         ├── team/        # Team Management & Invite Link Generation
 │         └── reports/     # Monthly & Replacement Trend Reports
 ├── api/                   # Multi-Tenant API Route Handlers
models/                     # Mongoose Schemas (Product, Customer, Invite, ReplacementHistory)
lib/                        # Better-Auth Configuration & Utilities
```

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/harpreetsingh9/WarrantyManager.git
cd WarrantyManager
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_super_secret_key
BETTER_AUTH_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🙋‍♂️ Author

Made by **Harpreet Singh**

- **GitHub**: [@harpreetsingh9](https://github.com/harpreetsingh9)
- **Email**: singhharpreet92001@gmail.com

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.
