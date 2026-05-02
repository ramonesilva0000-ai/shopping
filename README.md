# Kipchimatt Supermarket — Online Shopping App

> **Mali safi, bei poa. Delivered to your door.**
>
> A demo-ready prototype of the Kipchimatt online shopping experience.
> Built to be opened by directors in any browser — no install, no backend.

---

## 🚀 How to demo it (30 seconds)

1. Download / clone this folder.
2. Double-click `index.html` — it opens in any modern browser.
3. That's it. The app is fully interactive: browse, search, add to cart, check out with M-Pesa, track orders, sign in, redeem points.

> Cart, wishlist, account and orders are persisted to the browser's `localStorage`, so the experience survives page reloads — useful when handing the laptop around the boardroom.

---

## 🎯 The pitch (one paragraph)

Kipchimatt's loyal customers already trust us in-store. **They are doing more of their shopping online every year — and right now they are giving that money to Naivas, Carrefour, Quickmart and Glovo.** This app brings the full Kipchimatt experience online: same low prices, same fresh produce, plus M-Pesa Express checkout, same-day delivery, in-store pickup, and a KipChim Rewards loyalty programme to deepen retention. We can launch a working pilot in **8–12 weeks**, starting with one branch, and use the data to scale.

---

## 🛒 What customers can do today (in this prototype)

| Customer need | Implemented |
|---|---|
| Browse departments (Fresh, Bakery, Dairy, Butchery, Pantry, Beverages, Household, Baby, Beauty, Electronics, Stationery, Kitchen) | ✅ |
| Search products by keyword and category | ✅ |
| Filter by category, price range, rating, deals, in-stock | ✅ |
| Sort by price, rating, newest, relevance | ✅ |
| Product detail page with quantity selector | ✅ |
| Add to cart / update quantities / remove | ✅ |
| Wishlist (save for later) | ✅ |
| Promo codes (try **`KIPCHIM10`**, **`FRESH50`**, **`MAMA200`**) | ✅ |
| 3-step checkout: Delivery → Payment → Confirm | ✅ |
| Home delivery **or** in-store pickup at branch | ✅ |
| **M-Pesa Express (STK push)** simulated | ✅ |
| Card and Cash on Delivery options | ✅ |
| **KipChim Rewards** — earn 1pt per KSh 100, redeem at checkout | ✅ |
| Order placement + order tracking timeline | ✅ |
| Account: sign-in, profile, addresses, rewards, orders | ✅ |
| Help / FAQ centre | ✅ |
| Free delivery threshold (KSh 3,000) | ✅ |
| Mobile-responsive (phones, tablets, desktop) | ✅ |
| Kipchimatt brand colours (green + gold) throughout | ✅ |

---

## 💚 Brand

- **Primary green** `#0f7a3a` — freshness, trust, the Kipchimatt mark.
- **Deep green** `#0a5a2a` — headers, hovers.
- **Gold** `#ffd02e` — calls-to-action, highlights, the "K" mark.
- **Red** `#e63946` — deals & savings tags only (used sparingly).
- **Ink** `#0f1420` — body text and footer.

The mark is a gold **K** on a green tile — easily printable on shopping bags, receipts, delivery vans and uniforms.

---

## 💸 Why this drives revenue

1. **Capture e-commerce share before competitors deepen theirs.** Naivas and Carrefour are aggressive online; every month we delay we cede market share.
2. **Higher basket size online.** Industry data: e-commerce baskets in Kenyan retail are 30–60% larger than walk-in.
3. **Loyalty data we currently don't have.** Every checkout becomes a data point: who buys what, when and where. Targeted promotions become possible.
4. **M-Pesa Express reduces cart abandonment.** STK push is the fastest, lowest-friction payment in Kenya.
5. **In-store pickup converts online traffic into in-store visits.** Customers come in for pickup, leave with extra items.
6. **KipChim Rewards** — repeat-purchase rate goes up materially once a points scheme is in play.

---

## 🛠 Recommended build plan (post-pitch)

**Phase 1 — Pilot (8–12 weeks, 1 branch: Eldoret Uganda Road)**
- Production-grade frontend (Next.js or React + Vite)
- Backend API (Node/Express or Django) + PostgreSQL
- Real M-Pesa Daraja API integration (STK Push, C2B confirmation)
- Inventory feed from existing POS (CSV/API bridge to start)
- Rider dispatch via WhatsApp + simple admin dashboard
- iOS / Android via Progressive Web App (installable, push notifications)

**Phase 2 — Scale (months 4–6)**
- All branches
- Native mobile apps (React Native)
- Loyalty programme integrated with in-store POS
- Customer service desk + chat
- Marketing automation (cart abandonment SMS, weekly deals)

**Phase 3 — Optimise (months 7–12)**
- Personalised recommendations
- Subscriptions ("monthly shopping list")
- Corporate / SACCO bulk ordering
- Express 30-min delivery in dense urban zones

---

## 📁 Project layout

```
shopping/
├── index.html      # App shell, all sections / views
├── styles.css      # Kipchimatt brand styles, mobile-responsive
├── app.js          # All app logic (catalog, cart, checkout, orders…)
└── README.md       # This document
```

No build step. No dependencies. Opens straight in a browser.

---

## 🧪 Suggested demo script for the directors

1. **Open `index.html`.** Land on the homepage — point out departments, hot deals, the M-Pesa banner, the loyalty banner.
2. **Search "milk"** in the top bar. Show search + filter sidebar.
3. **Click a product** → product detail page. Bump quantity. Add to cart.
4. **Open the cart** (top right). Apply promo code `KIPCHIM10`. Show the live total.
5. **Proceed to checkout.** Fill in delivery details. Show same-day delivery + in-store pickup options.
6. **Choose M-Pesa.** Place order — watch the simulated STK push.
7. **Track the order** on the orders page. Show the 5-stage timeline.
8. **Sign in** under "Hi there", show the Rewards balance growing.
9. Close with the **launch plan** above and ask for the green light to build Phase 1.

---

## ✋ A note on what this is *not*

This is a high-fidelity prototype meant to win the pitch — not the production system.
The production version will need: real inventory APIs, real M-Pesa integration, hardened auth, fraud checks, GDPR/Data Protection Act compliance, an admin/CMS, courier dispatch and a proper testing suite.

Let's get the green light, then we build it properly.

---

🇰🇪 Made for Kipchimatt. Made in Kenya.
