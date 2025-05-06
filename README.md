# SerialTrack

A simple, effective, and evolving product warranty tracking system for electronics or hardware shops. Designed to help shopkeepers log, track, and manage product serial numbers, model numbers, customer details, and warranty replacements.

---

## ✨ Features

- 🔐 **Add Product**  
  Save new products with serial number, model number, customer name, and purchase date.

- 🔍 **Find Product**  
  Instantly search by serial number to check:
  - Customer info
  - Purchase date
  - Warranty status (based on your shop’s policy)
  - Whether the product was already replaced

- 🔁 **Replace Product**  
  If a product is under warranty and faulty, you can:
  - Click “Replace”
  - Enter new serial number
  - Automatically update and track replacement history

- 📊 **Dashboard**  
  Visual stats for:
  - Total added products
  - Total replacements
  - Monthly and yearly insights

---

## 🚧 Upcoming Feature: Multi-Tenant Support

> We are actively working on a major feature: **Multi-Shop (Multi-Tenant) support**.  
> This will allow:
> - Multiple shop accounts (each with their own data)
> - Products and replacements will be visible only within each shop
> - Ideal for scaling into a SaaS platform

Stay tuned! 🎯

---

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** MongoDB
- **Styling:** Tailwind CSS
- **Backend:** API Routes (server actions)

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/harpreetsingh9/serialtrack.git

# Install dependencies
cd serialtrack
npm install

# Set up environment variables in .env.local
MONGODB_URI=your_mongo_uri
BASE_URL='http://localhost:3000'

# Run the app
npm run dev
```

## 🤝 Contributing

Contributions are welcome! Here’s how you can help:

- 🐛 Report bugs  
- 📈 Suggest features  
- 🛠️ Submit pull requests  
- 🌍 Help with multi-tenant/shop feature

To contribute:

1. Fork the repository  
2. Create your feature branch  
   > git checkout -b feature/your-feature-name
3. Commit your changes
    > git commit -m "Add your feature"
4. Push to the branch
    > git push origin feature/your-feature-name
5. Open a Pull Request

## 🙋‍♂️ Author

Made by Harpreet Singh

- GitHub: @harpreetsingh9
- Email: singhharpreet92001@gmail.com
