# Kipchimatt — Your Reliable Partner, online

> A high-fidelity prototype for the Kipchimchim Group board.
>
> **The pitch in one line:** *You modernised the name to K-matt at 25 years. The next chapter is digital — and it has to be unmistakably ours, not a clone of Naivas.*

---

## 🚀 Demo it in 30 seconds

1. Open the GitHub Pages URL (or double-click `index.html`).
2. The whole app runs in the browser. No backend, no install, no internet needed after first load.
3. Cart, wishlist, account, orders and Pamoja Cart persist via `localStorage` — survives reloads, useful when handing the laptop around the boardroom.

---

## 🎯 What makes this NOT just another shopping app

Six features no Kenyan supermarket app currently has. Each one solves a real Kenyan shopping pain point that Naivas, Carrefour, Quickmart, Jumia and Glovo all ignore.

| | Feature | Solves |
|---|---|---|
| 👨‍👩‍👧 | **Pamoja Cart** | One shared cart for a family or chama. Mum adds maziwa from her phone, dad adds nyama from his, you add electronics from yours. Hits bulk-discount thresholds together. **Zero competitor offers this.** |
| 🍳 | **Mpishi** | Pick a Kenyan recipe (ugali na sukuma, pilau, mukimo, chapati & beans, githeri…). The app auto-adds every ingredient sized to your family. Eliminates "ah, I forgot dhania" trips. |
| 💰 | **Bei Yangu** | "I have KSh 2,000 this week." A slider builds a smart basket that maximises calories, freshness and variety per shilling. Massive for low-and-middle-income shoppers. |
| ✈️ | **Tuma Nyumbani** | Diaspora and Nairobi-based Kenyans send shopping straight to relatives upcountry — with a recorded voice note attached. Untapped multi-billion-shilling remittance flow. |
| 🐢 | **Lipa Pole Pole** | Buy-now-pay-later in 3 monthly M-Pesa instalments. Eligible on any item ≥ KSh 5,000. Zero interest. Drives big-ticket conversion (TVs, fridges, cookers). |
| 🏪 | **Mama Mboga Pickup** | Partner with neighbourhood kiosks as last-mile collection points. Mama earns a tip per pickup. Customer skips the boda fee. **Turns competitors-by-default into allies.** |

Plus the table stakes done right:

- **📱 M-Pesa Express** (STK push, simulated — Daraja-ready)
- **🛵 Live boda tracking** with animated map and ETA on every order
- **📈 Bei Tracker** — 30-day price history chart on every product. Anti-inflation transparency Kenyans will love.
- **🎙️ Voice search** in Swahili AND English ("Tafuta unga ya Soko")
- **⭐ KipChim Rewards** — 1pt per KSh 100, redeem at checkout, daily spin-the-wheel for bonus
- **📞 USSD `*483*KCM#` and WhatsApp 0700 547 244** for non-smartphone users
- **🧾 Receipt scan** → earn points on in-store purchases too (bridges offline shopping into the loyalty programme)

---

## 💚 Brand

The app uses our brand mark — gold **K** on a deep green tile — and a green-and-gold palette as a sensible default.

> **Note on colours:** I couldn't pull confirmed brand hex codes from public sources (the website and social pages blocked automated fetches). If you want the prototype to match the new K-matt brand identity exactly, share a logo file or branch storefront photo and I'll re-skin it.

**Tagline used:** "Your Reliable Partner" (our official one).

**House brands featured prominently in the catalog:**
- Kipchimatt Bread (white & brown)
- Mbogo Tea
- Keben Tea
- Valley Sugar
- Mbogo Water

---

## 📍 Branches wired into the app

All 11 Kipchimatt locations are real options for branch pickup, Mama Mboga area routing, and Tuma Nyumbani targets:

Kapsoit Main · Kapsoit Mini · Ainamoi · Litein Prime · Litein Square · Mogogosiek · Nandi Hills · Kapsabet Heights · Kapsabet Express · Mosoriot · Eldoret (Serani Mall)

---

## 💸 Why this drives revenue (talking points for the directors)

1. **Capture e-commerce share before competitors deepen theirs.** Naivas and Carrefour are pushing online aggressively. Each month we delay we cede market share — and once habit forms, it's hard to win back.
2. **Bypass the Glovo/Jumia tax.** Direct ordering means we keep 100% of the margin instead of 18-25% to a marketplace.
3. **Higher basket size online.** Kenyan e-commerce baskets run 30-60% larger than walk-in. Our prototype's "Bei Yangu" and "Mpishi" features push baskets even higher by design.
4. **Loyalty data we currently can't access.** Every checkout becomes a data point: who buys what, when, where. Targeted promotions become possible. Predictive restocking becomes possible.
5. **Pamoja Cart is a moat.** Once a chama or family adopts a shared cart, switching cost is real — they'd lose their group history. Naivas can't copy this overnight.
6. **Tuma Nyumbani opens a remittance-adjacent revenue line.** Diaspora Kenyans send ~$4B/year home. Even a small slice of that, captured as basket revenue, is significant.
7. **Mama Mboga partnership is PR gold AND last-mile economics.** It turns the political narrative ("supermarkets vs mama mbogas") on its head.
8. **The K-matt rebrand creates the perfect launch window.** A new name, a new digital experience, one announcement. The story tells itself.

---

## 🛠 Build plan if approved

**Phase 1 — Pilot (8–12 weeks · 2 branches: Eldoret Serani Mall + Litein)**
- Production frontend: Next.js
- Backend: Node + PostgreSQL on AWS (Kenya region soon, SA region today)
- M-Pesa Daraja API integration (STK Push, C2B)
- Inventory feed bridge from existing POS (CSV/API)
- Boda dispatch via WhatsApp + simple ops dashboard
- Installable PWA (works on any Android, no Play Store needed)
- 50 mama mboga partners onboarded for pickup

**Phase 2 — Scale (months 4–6)**
- All 11 branches
- Native Android/iOS via React Native
- Loyalty integrated with in-store POS (one wallet across channels)
- Receipt OCR pipeline
- Marketing automation (cart abandonment SMS, weekly price drops, Mpishi recipe-of-the-week)

**Phase 3 — Optimise (months 7–12)**
- Personalised recommendations
- "Monthly shopping" subscriptions
- Corporate / SACCO bulk ordering portal
- Express 30-min delivery in dense urban zones (Eldoret CBD)
- USSD ordering live on Safaricom

---

## 🧪 Boardroom demo script

1. **Open the URL.** Spin-the-wheel pops up — director gets a welcome coupon. Sets the tone: this is fun, this is theirs.
2. **Hero strip.** Read the tagline aloud: *"Your reliable partner — online."* Point out the live shopper count and "25 years · Now K-matt · Welcome to digital" badge.
3. **The "ONLY ON KIPCHIMATT" tiles.** Tap each — Pamoja, Mpishi, Bei Yangu, Tuma, Lipa, Mama Mboga. Director sees: this is fundamentally different.
4. **Mpishi demo.** Click *Pilau ya Nyama* → slide servings up to 8 → tap "Add 5 ingredients to cart". Watch the cart fill instantly.
5. **Bei Yangu demo.** Set budget to KSh 2,000 → watch the smart basket auto-build with a progress bar. Tap "Add all to cart".
6. **Pamoja demo.** Open Pamoja Cart → click "Add demo member" twice → notice avatars now appear on cart items showing who added what.
7. **Voice search.** Tap the 🎙️ icon → demo plays back "Tafuta unga ya Soko" → catalog filters automatically.
8. **PDP with Bei Tracker.** Open any product → scroll to the 30-day price chart. Show the "Bei imeshuka 8% in 30 days — good time to buy" verdict. Anti-inflation transparency.
9. **Checkout with Lipa Pole Pole.** Add Samsung TV → checkout → choose Lipa → see the 3-instalment schedule.
10. **Place order with M-Pesa STK push.** Watch the simulated push.
11. **Track the order.** Show the live boda map with the rider animation.
12. **Close with the build plan.** Ask for the green light to launch Phase 1.

---

## 📁 Project layout

```
shopping/
├── index.html      # App shell (all views: home, catalog, cart, checkout, Pamoja, Mpishi, Bei Yangu, Tuma, Lipa, Mama Mboga, account, orders, wishlist, help)
├── styles.css      # Brand styles, all components, mobile-responsive
├── app.js          # All app logic — vanilla JS, no dependencies
└── README.md       # This pitch document
```

Open `index.html` directly in any browser — no build step, no npm, no internet.

---

## ✋ This is a prototype, not the production system

This deck-on-a-page wins the pitch. The production version will need: real inventory APIs, real M-Pesa Daraja integration, hardened auth, fraud checks, Data Protection Act compliance, an admin/CMS, courier dispatch, and a proper test suite.

Get the green light. Then we build it properly.

---

🇰🇪 Built for the Kipchimchim Group · Kericho · 25 years and counting.
