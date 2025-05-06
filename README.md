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

## 📍 Real-World Usage

This app has been actively used **since 2022** in a real world shop environment.  
It has handled hundreds of product warranty entries and replacements **without any issues**.

### ✅ Benefits observed:
- Reduced manual paper work
- No need to rely on mobile Excel sheets, which are often compact and hard to use
- Fast and easy UI for adding/finding/replacing products, especially on mobile 📱
- Saves time and helps staff stay organized with minimal training 🔧

> 📱 *The app is optimized for mobile usage — much easier and faster than managing Excel on small screens.*
> Built with practicality, not just theory. 😉

## 🌗 UI & Design

- Supports **both Light and Dark themes**
- Clean, **minimalist UI** for distraction-free usage
- Responsive layout for desktops and mobile
- Mobile first design

---

## 🖼️ Image-to-Serial Feature (Experimental)

SerialTrack also includes an **experimental image upload feature** using `tesseract.js` (OCR library). With this:

- You can **upload a product label image**
- The system automatically **extracts the serial number** by detecting text
- It captures the 4 characters **just before the word `rt`**
- If your products's serial numbers have any other pattern you can modify in the code

⚠️ *Note: This feature is still experimental and may not always extract the correct number. Manual verification is recommended after auto-filling.*

---

## 📷 Screenshots

<img width="293" alt="comp-1" src="https://github.com/user-attachments/assets/970bf94b-9162-45d1-ad12-058f3065f50f" /> 

<img width="291" alt="comp-2" src="https://github.com/user-attachments/assets/6b5bc10b-4442-4b78-a9a6-de5fa2c365aa" /> 

<img width="294" alt="comp-3" src="https://github.com/user-attachments/assets/8e024786-02ef-4839-a1b7-d852be473c7f" /> 

<img width="293" alt="comp-4" src="https://github.com/user-attachments/assets/afcd6c22-9857-4346-8ff3-3334a4de6847" /> 

<img width="295" alt="comp-5" src="https://github.com/user-attachments/assets/6ab85b4e-cebb-494c-8321-8b62517a19a9" /> 

<img width="294" alt="comp-6" src="https://github.com/user-attachments/assets/3ec5c70a-f39e-43c8-b6e3-6da3187607fe" />  


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

---

## 📄 License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this project, even for commercial purposes, as long as you provide proper credit.

🔗 Full license text is available in the [LICENSE](./LICENSE) file.
