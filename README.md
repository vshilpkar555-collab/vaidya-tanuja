# Vaidya Tanuja Jatav — Ayurvedic Wellness Platform

A full-featured React web application for Vaidya Tanuja Jatav's Ayurvedic wellness clinic.

## 📁 Project Structure

```
src/
├── App.js                        ← Root app + page router
├── index.js                      ← React entry point
│
├── context/
│   └── AppContext.js             ← Global state (cart, wishlist, user, dosha, toast)
│
├── data/
│   ├── images.js                 ← All image URLs (swap doctor photo here)
│   ├── products.js               ← 8 Ayurvedic products with real data
│   ├── quizData.js               ← Dosha quiz questions & result info
│   ├── appointmentData.js        ← Consultation types, time slots, booked slots
│   └── botResponses.js           ← AI chatbot response map
│
├── components/
│   ├── Navbar.js                 ← Sticky navigation bar
│   ├── ProductCard.js            ← Reusable product card
│   ├── Icon.js                   ← SVG icon component
│   └── Mandala.js                ← Decorative SVG mandala
│
├── pages/
│   ├── HomePage.js               ← Hero, doshas, featured products, about, footer
│   ├── ShopPage.js               ← Product listing with search, filter, sort
│   ├── ProductDetailPage.js      ← Full product view with tabs
│   ├── DoshaQuizPage.js          ← 8-question Prakriti quiz with result
│   ├── BookAppointmentPage.js    ← 3-step appointment booking with calendar
│   ├── AIConsultPage.js          ← AI chatbot consultation
│   ├── CartPage.js               ← Shopping cart with order summary
│   └── AccountPage.js            ← Login / sign-up / order history
│
└── styles/
    └── GlobalStyles.css          ← All global CSS variables, animations, utilities
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🖼️ Replacing the Doctor Photo

1. Open `src/data/images.js`
2. Replace the `doctor` URL with your actual hosted image URL:
   ```js
   doctor: 'https://your-hosting.com/vaidya-tanuja-photo.jpg',
   ```

Recommended hosting: **Cloudinary** (free), **Imgur**, or your own server.

## 📦 Features

| Feature | Description |
|---|---|
| 🏠 Home Page | Hero, Dosha overview, featured products, appointment CTA, testimonials |
| 🛍️ Shop | Filter by category, search, sort, dosha-based recommendations |
| 📋 Product Detail | Image, benefits, ingredients, usage tabs, add to cart |
| 🔬 Dosha Quiz | 8-question Prakriti assessment with personalized result |
| 📅 Book Appointment | 3-step booking: type → calendar → details → confirmation |
| 🤖 AI Consult | Keyword-based Ayurvedic chatbot with booking integration |
| 🛒 Cart | Quantity control, coupon field, shipping calculation |
| 👤 Account | Login/signup, order history, admin detection |

## 🎨 Design System

All design tokens are in `src/styles/GlobalStyles.css` as CSS variables:

```css
--green: #2D5A27      /* Primary brand green */
--gold:  #C9A84C      /* Accent gold */
--cream: #FDFBF7      /* Background */
```

## 🔧 Customisation

- **Add products**: Edit `src/data/products.js`
- **Change consultation types**: Edit `src/data/appointmentData.js`
- **Add bot responses**: Edit `src/data/botResponses.js`
- **New pages**: Create in `src/pages/` and add to router in `src/App.js`

## 📞 Admin Access

To access admin view, sign in with email: `admin@vaidyatanuja.com`
# vaidya-tanuja
