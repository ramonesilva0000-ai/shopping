/* ===========================================================
   Kipchimatt Supermarket — App logic
   - Pure vanilla JS, no build step.
   - State persisted to localStorage so cart/wishlist/orders survive reloads.
   =========================================================== */
(() => {
  "use strict";

  // ---------- DEPARTMENTS ----------
  const CATEGORIES = [
    { id: "fresh",       name: "Fresh Produce",   emoji: "🥬" },
    { id: "bakery",      name: "Bakery",          emoji: "🥖" },
    { id: "dairy",       name: "Dairy & Eggs",    emoji: "🥛" },
    { id: "butchery",    name: "Butchery",        emoji: "🥩" },
    { id: "pantry",      name: "Pantry",          emoji: "🌾" },
    { id: "beverages",   name: "Beverages",       emoji: "🥤" },
    { id: "household",   name: "Household",       emoji: "🧴" },
    { id: "baby",        name: "Baby & Mom",      emoji: "🍼" },
    { id: "beauty",      name: "Health & Beauty", emoji: "💄" },
    { id: "electronics", name: "Electronics",     emoji: "📺" },
    { id: "stationery",  name: "Stationery",      emoji: "📚" },
    { id: "kitchen",     name: "Kitchen",         emoji: "🍳" },
  ];

  // ---------- PRODUCT CATALOG ----------
  // Prices in KSh. `was` is the previous price (used for the "save X%" badge).
  const PRODUCTS = [
    // Fresh produce
    { id: "p1",  name: "Sukuma Wiki (Kale) - 1 bunch",     price: 30,  was: 40,  cat: "fresh", emoji: "🥬", unit: "per bunch", rating: 4.7, deal: true,  isNew: false },
    { id: "p2",  name: "Tomatoes - 1 kg",                   price: 120, was: 150, cat: "fresh", emoji: "🍅", unit: "per kg",    rating: 4.6, deal: true,  isNew: false },
    { id: "p3",  name: "Sweet Bananas - 1 kg",              price: 90,  was: null,cat: "fresh", emoji: "🍌", unit: "per kg",    rating: 4.5 },
    { id: "p4",  name: "Avocado (Hass) - 4 pcs",            price: 200, was: 240, cat: "fresh", emoji: "🥑", unit: "pack of 4", rating: 4.8, deal: true },
    { id: "p5",  name: "Red Onions - 1 kg",                 price: 110, was: null,cat: "fresh", emoji: "🧅", unit: "per kg",    rating: 4.4 },
    { id: "p6",  name: "Mangoes (Apple) - 6 pcs",           price: 350, was: null,cat: "fresh", emoji: "🥭", unit: "pack of 6", rating: 4.9, isNew: true },
    { id: "p7",  name: "Carrots - 1 kg",                    price: 80,  was: null,cat: "fresh", emoji: "🥕", unit: "per kg",    rating: 4.5 },
    { id: "p8",  name: "Pineapple - 1 pc",                  price: 180, was: 220, cat: "fresh", emoji: "🍍", unit: "each",      rating: 4.6, deal: true },

    // Bakery
    { id: "p10", name: "Kipchimatt White Bread 400g",       price: 65,  was: null,cat: "bakery",emoji: "🍞", unit: "400 g loaf", rating: 4.7 },
    { id: "p11", name: "Brown Bread 600g",                  price: 90,  was: null,cat: "bakery",emoji: "🥖", unit: "600 g loaf", rating: 4.5 },
    { id: "p12", name: "Mandazi - pack of 6",               price: 120, was: 150, cat: "bakery",emoji: "🥐", unit: "pack of 6",  rating: 4.8, deal: true },
    { id: "p13", name: "Birthday Cake (Vanilla) 1kg",       price: 1500,was: null,cat: "bakery",emoji: "🎂", unit: "1 kg cake",  rating: 4.9, isNew: true },
    { id: "p14", name: "Chocolate Cookies 250g",            price: 220, was: null,cat: "bakery",emoji: "🍪", unit: "250 g pack", rating: 4.6 },

    // Dairy & eggs
    { id: "p20", name: "Brookside Fresh Milk 500ml",        price: 60,  was: null,cat: "dairy", emoji: "🥛", unit: "500 ml",     rating: 4.7 },
    { id: "p21", name: "KCC Mala 500ml",                    price: 70,  was: null,cat: "dairy", emoji: "🥛", unit: "500 ml",     rating: 4.6 },
    { id: "p22", name: "Eggs - tray of 30",                 price: 480, was: 540, cat: "dairy", emoji: "🥚", unit: "tray of 30", rating: 4.8, deal: true },
    { id: "p23", name: "Cheddar Cheese 250g",               price: 380, was: null,cat: "dairy", emoji: "🧀", unit: "250 g",      rating: 4.5 },
    { id: "p24", name: "Butter (Blue Band) 500g",           price: 320, was: null,cat: "dairy", emoji: "🧈", unit: "500 g",      rating: 4.6 },
    { id: "p25", name: "Yoghurt - Strawberry 500ml",        price: 150, was: 180, cat: "dairy", emoji: "🍶", unit: "500 ml",     rating: 4.7, deal: true },

    // Butchery
    { id: "p30", name: "Beef (with bone) - 1 kg",           price: 650, was: null,cat: "butchery", emoji:"🥩", unit:"per kg",    rating: 4.6 },
    { id: "p31", name: "Goat Meat - 1 kg",                  price: 750, was: null,cat: "butchery", emoji:"🍖", unit:"per kg",    rating: 4.7 },
    { id: "p32", name: "Whole Chicken - 1.2 kg",            price: 750, was: 850, cat: "butchery", emoji:"🍗", unit:"each",      rating: 4.8, deal: true },
    { id: "p33", name: "Beef Sausages 500g",                price: 380, was: null,cat: "butchery", emoji:"🌭", unit:"500 g pack", rating: 4.5 },
    { id: "p34", name: "Tilapia Fish (whole) - 1 kg",       price: 520, was: null,cat: "butchery", emoji:"🐟", unit:"per kg",    rating: 4.6 },

    // Pantry
    { id: "p40", name: "Soko Maize Flour 2kg",              price: 195, was: 220, cat: "pantry", emoji:"🌾", unit:"2 kg pack",  rating: 4.7, deal: true },
    { id: "p41", name: "Pembe Wheat Flour 2kg",             price: 230, was: null,cat: "pantry", emoji:"🌾", unit:"2 kg pack",  rating: 4.5 },
    { id: "p42", name: "Mwea Rice (Pishori) 2kg",           price: 480, was: 540, cat: "pantry", emoji:"🍚", unit:"2 kg pack",  rating: 4.9, deal: true },
    { id: "p43", name: "Kabras Sugar 2kg",                  price: 360, was: null,cat: "pantry", emoji:"🟫", unit:"2 kg pack",  rating: 4.6 },
    { id: "p44", name: "Salt 1kg",                          price: 45,  was: null,cat: "pantry", emoji:"🧂", unit:"1 kg",       rating: 4.5 },
    { id: "p45", name: "Cooking Oil (Rina) 3L",             price: 1100,was: 1300,cat: "pantry", emoji:"🛢️", unit:"3 L",        rating: 4.8, deal: true },
    { id: "p46", name: "Royco Mchuzi Mix 200g",             price: 180, was: null,cat: "pantry", emoji:"🥫", unit:"200 g",      rating: 4.5 },
    { id: "p47", name: "Tea Leaves (Kericho) 500g",         price: 320, was: null,cat: "pantry", emoji:"🍵", unit:"500 g",      rating: 4.7 },

    // Beverages
    { id: "p50", name: "Coca-Cola 2L",                      price: 220, was: null,cat: "beverages", emoji:"🥤", unit:"2 L",      rating: 4.6 },
    { id: "p51", name: "Minute Maid Mango 1L",              price: 180, was: 220, cat: "beverages", emoji:"🧃", unit:"1 L",      rating: 4.5, deal: true },
    { id: "p52", name: "Dasani Water 6 x 500ml",            price: 240, was: null,cat: "beverages", emoji:"💧", unit:"6-pack",   rating: 4.6 },
    { id: "p53", name: "Tusker Lager 6 x 500ml",            price: 1500,was: 1700,cat: "beverages", emoji:"🍺", unit:"6-pack",   rating: 4.7, deal: true },
    { id: "p54", name: "Java Coffee Beans 250g",            price: 650, was: null,cat: "beverages", emoji:"☕", unit:"250 g",    rating: 4.8 },

    // Household
    { id: "p60", name: "Omo Detergent 2kg",                 price: 540, was: 620, cat: "household", emoji:"🧺", unit:"2 kg",     rating: 4.7, deal: true },
    { id: "p61", name: "Harpic Toilet Cleaner 750ml",       price: 280, was: null,cat: "household", emoji:"🚽", unit:"750 ml",   rating: 4.5 },
    { id: "p62", name: "Toilet Paper - 10 pack",            price: 350, was: null,cat: "household", emoji:"🧻", unit:"10-pack",  rating: 4.6 },
    { id: "p63", name: "Dishwashing Liquid 1L",             price: 220, was: null,cat: "household", emoji:"🧼", unit:"1 L",      rating: 4.5 },
    { id: "p64", name: "Charcoal Stove (Jiko)",             price: 1200,was: null,cat: "household", emoji:"🔥", unit:"each",     rating: 4.7 },

    // Baby & Mom
    { id: "p70", name: "Pampers Diapers Size 4 (40)",       price: 1450,was: 1650,cat: "baby", emoji:"🍼", unit:"pack of 40",   rating: 4.8, deal: true },
    { id: "p71", name: "NAN Infant Formula 400g",           price: 1300,was: null,cat: "baby", emoji:"🥛", unit:"400 g",        rating: 4.7 },
    { id: "p72", name: "Baby Wipes - 80 sheets",            price: 250, was: null,cat: "baby", emoji:"🧻", unit:"80 sheets",    rating: 4.6 },
    { id: "p73", name: "Cerelac Wheat 400g",                price: 480, was: null,cat: "baby", emoji:"🍚", unit:"400 g",        rating: 4.7 },

    // Health & Beauty
    { id: "p80", name: "Colgate Toothpaste 100ml",          price: 180, was: null,cat: "beauty", emoji:"🪥", unit:"100 ml",     rating: 4.7 },
    { id: "p81", name: "Lifebuoy Soap (4-pack)",            price: 240, was: 280, cat: "beauty", emoji:"🧼", unit:"4-pack",     rating: 4.5, deal: true },
    { id: "p82", name: "Nivea Body Lotion 400ml",           price: 520, was: null,cat: "beauty", emoji:"🧴", unit:"400 ml",     rating: 4.6 },
    { id: "p83", name: "Always Sanitary Pads (10)",         price: 180, was: null,cat: "beauty", emoji:"🌸", unit:"10 pads",    rating: 4.7 },
    { id: "p84", name: "Panadol 24 tablets",                price: 220, was: null,cat: "beauty", emoji:"💊", unit:"24 tabs",    rating: 4.5 },

    // Electronics
    { id: "p90", name: "Samsung 43\" Smart TV",             price: 38500,was: 45000, cat:"electronics", emoji:"📺", unit:"each",   rating: 4.7, deal: true, isNew: true },
    { id: "p91", name: "Hotpoint Microwave 20L",            price: 9500, was: null,  cat:"electronics", emoji:"🍲", unit:"each",   rating: 4.5 },
    { id: "p92", name: "Ramtons Blender 500W",              price: 4200, was: 4900,  cat:"electronics", emoji:"🫙", unit:"each",   rating: 4.6, deal: true },
    { id: "p93", name: "Solar Lantern (Sun King)",          price: 1800, was: null,  cat:"electronics", emoji:"🔦", unit:"each",   rating: 4.8 },
    { id: "p94", name: "Anker Power Bank 20000mAh",         price: 2900, was: null,  cat:"electronics", emoji:"🔋", unit:"each",   rating: 4.7, isNew: true },
    { id: "p95", name: "Bluetooth Speaker (JBL Go)",        price: 3400, was: 3900,  cat:"electronics", emoji:"🔊", unit:"each",   rating: 4.6, deal: true },
    { id: "p96", name: "Iron Box (Ramtons)",                price: 1800, was: null,  cat:"electronics", emoji:"♨️", unit:"each",   rating: 4.5 },

    // Stationery
    { id: "p100",name: "Exercise Books 32-pg (10-pack)",    price: 320, was: 380, cat: "stationery", emoji:"📒", unit:"10-pack", rating: 4.6, deal: true },
    { id: "p101",name: "Bic Pens (10-pack)",                price: 150, was: null,cat: "stationery", emoji:"🖊️", unit:"10-pack", rating: 4.5 },
    { id: "p102",name: "School Bag (Medium)",               price: 1400,was: null,cat: "stationery", emoji:"🎒", unit:"each",    rating: 4.7 },

    // Kitchen
    { id: "p110",name: "Non-stick Frying Pan 28cm",         price: 1800,was: 2100, cat:"kitchen", emoji:"🍳", unit:"each",       rating: 4.6, deal: true },
    { id: "p111",name: "Set of 6 Glass Tumblers",           price: 850, was: null, cat:"kitchen", emoji:"🥃", unit:"set of 6",   rating: 4.5 },
    { id: "p112",name: "Pressure Cooker 5L",                price: 3200,was: null, cat:"kitchen", emoji:"🍲", unit:"each",       rating: 4.8, isNew: true },
  ];

  // ---------- STATE ----------
  const STORE_KEY = "kipchimatt:v1";
  const defaultState = {
    cart: {},                 // { productId: qty }
    wishlist: [],             // [productId]
    user: null,               // { name, phone, email }
    orders: [],               // [order]
    rewardsPoints: 240,       // demo seed
    promo: null,              // applied promo code
  };
  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return structuredClone(defaultState);
      return { ...structuredClone(defaultState), ...JSON.parse(raw) };
    } catch { return structuredClone(defaultState); }
  }
  function saveState() {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  }

  // ---------- HELPERS ----------
  const $  = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const fmt = n => "KSh " + Math.round(n).toLocaleString("en-KE");
  const findProduct = id => PRODUCTS.find(p => p.id === id);
  const stars = r => "★★★★★".slice(0, Math.round(r)) + "☆☆☆☆☆".slice(0, 5 - Math.round(r));

  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("is-show"), 2200);
  }

  function openModal(html) {
    $("#modalBody").innerHTML = html;
    $("#modal").hidden = false;
  }
  function closeModal() { $("#modal").hidden = true; }

  // ---------- ROUTING ----------
  function navigate(view, opts={}) {
    $$(".view").forEach(v => v.hidden = true);
    const target = $(`.view[data-view="${view}"]`);
    if (target) target.hidden = false;
    window.scrollTo({ top: 0, behavior: "instant" });

    if (view === "catalog") renderCatalog(opts);
    if (view === "cart")    renderCart();
    if (view === "checkout")renderCheckout();
    if (view === "offers")  renderOffers();
    if (view === "account") renderAccount();
    if (view === "orders")  renderOrders();
    if (view === "wishlist")renderWishlist();
    if (view === "product") renderProduct(opts.productId);
  }

  // ---------- CATALOG / FILTERS ----------
  let catalogState = {
    cat: "all",
    q: "",
    minPrice: null,
    maxPrice: null,
    minRating: 0,
    onlyDeals: false,
    onlyInStock: true,
    sort: "relevance",
  };

  function applyFilters() {
    let list = PRODUCTS.slice();
    if (catalogState.cat !== "all") list = list.filter(p => p.cat === catalogState.cat);
    if (catalogState.q) {
      const q = catalogState.q.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q));
    }
    if (catalogState.minPrice != null) list = list.filter(p => p.price >= catalogState.minPrice);
    if (catalogState.maxPrice != null) list = list.filter(p => p.price <= catalogState.maxPrice);
    if (catalogState.minRating)        list = list.filter(p => p.rating >= catalogState.minRating);
    if (catalogState.onlyDeals)        list = list.filter(p => p.deal);

    switch (catalogState.sort) {
      case "price-asc":  list.sort((a,b) => a.price - b.price); break;
      case "price-desc": list.sort((a,b) => b.price - a.price); break;
      case "rating":     list.sort((a,b) => b.rating - a.rating); break;
      case "newest":     list.sort((a,b) => (b.isNew?1:0) - (a.isNew?1:0)); break;
    }
    return list;
  }

  function renderCatalog(opts={}) {
    if (opts.cat) catalogState.cat = opts.cat;
    if (opts.q != null) catalogState.q = opts.q;

    // Title
    const cat = CATEGORIES.find(c => c.id === catalogState.cat);
    let title = cat ? `${cat.emoji} ${cat.name}` : "All products";
    if (catalogState.q) title = `Results for "${catalogState.q}"`;
    $("#catalogTitle").textContent = title;

    // Filter sidebar - categories
    const fc = $("#filterCategories");
    fc.innerHTML = `
      <li><label><input type="radio" name="cat" value="all" ${catalogState.cat==="all"?"checked":""}> All <span class="count">${PRODUCTS.length}</span></label></li>
      ${CATEGORIES.map(c => {
        const n = PRODUCTS.filter(p => p.cat === c.id).length;
        return `<li><label><input type="radio" name="cat" value="${c.id}" ${catalogState.cat===c.id?"checked":""}> ${c.emoji} ${c.name} <span class="count">${n}</span></label></li>`;
      }).join("")}
    `;
    fc.querySelectorAll('input[name="cat"]').forEach(r => {
      r.addEventListener("change", e => { catalogState.cat = e.target.value; renderCatalog(); });
    });

    $("#sortBy").value = catalogState.sort;

    const list = applyFilters();
    $("#catalogCount").textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
    $("#catalogGrid").innerHTML = list.length
      ? list.map(productCard).join("")
      : `<p class="muted" style="grid-column:1/-1">No products match your filters. Try clearing them.</p>`;
    bindProductCards($("#catalogGrid"));
  }

  // ---------- PRODUCT CARD ----------
  function productCard(p) {
    const onWish = state.wishlist.includes(p.id);
    const save = p.was ? Math.round((1 - p.price / p.was) * 100) : 0;
    return `
      <article class="product" data-id="${p.id}">
        <div class="product__media" data-action="view">
          <div class="product__badges">
            ${p.deal  ? `<span class="tag tag--deal">SAVE ${save}%</span>` : ""}
            ${p.isNew ? `<span class="tag tag--new">NEW</span>` : ""}
          </div>
          <button class="product__wish ${onWish?"is-on":""}" data-action="wish" aria-label="Save to wishlist">${onWish?"♥":"♡"}</button>
          <span aria-hidden="true">${p.emoji}</span>
        </div>
        <div class="product__name" data-action="view">${p.name}</div>
        <div class="product__rating">${stars(p.rating)} <span>${p.rating.toFixed(1)}</span></div>
        <div class="product__unit">${p.unit}</div>
        <div class="product__price">
          <span class="product__price-now">${fmt(p.price)}</span>
          ${p.was ? `<span class="product__price-old">${fmt(p.was)}</span><span class="product__price-save">-${save}%</span>` : ""}
        </div>
        <button class="btn btn--gold product__cta" data-action="add">Add to cart</button>
      </article>`;
  }

  function bindProductCards(root) {
    root.querySelectorAll(".product").forEach(card => {
      const id = card.dataset.id;
      card.addEventListener("click", e => {
        const action = e.target.closest("[data-action]")?.dataset.action;
        if (action === "add")  { e.stopPropagation(); addToCart(id); }
        else if (action === "wish") { e.stopPropagation(); toggleWishlist(id); }
        else if (action === "view") { navigate("product", { productId: id }); }
      });
    });
  }

  // ---------- PRODUCT DETAIL ----------
  function renderProduct(id) {
    const p = findProduct(id);
    if (!p) { navigate("home"); return; }
    const save = p.was ? Math.round((1 - p.price / p.was) * 100) : 0;
    const onWish = state.wishlist.includes(p.id);
    $("#pdp").innerHTML = `
      <div class="pdp__media">${p.emoji}</div>
      <div>
        <span class="muted">${(CATEGORIES.find(c=>c.id===p.cat)||{}).name||""}</span>
        <h1 class="pdp__title">${p.name}</h1>
        <div class="product__rating">${stars(p.rating)} <span>${p.rating.toFixed(1)} · 100+ reviews</span></div>
        <div class="pdp__price-row">
          <span class="pdp__price-now">${fmt(p.price)}</span>
          ${p.was ? `<span class="pdp__price-old">${fmt(p.was)}</span><span class="pdp__price-save">SAVE ${save}%</span>`:""}
        </div>
        <p class="muted">${p.unit}. Sourced fresh from trusted Kenyan suppliers and quality-checked at our distribution centre.</p>
        <div class="pdp__cta">
          <div class="pdp__qty" id="pdpQty">
            <button data-d="-1">−</button>
            <input id="pdpQtyVal" type="number" min="1" value="1" />
            <button data-d="1">+</button>
          </div>
          <button class="btn btn--gold btn--lg" id="pdpAdd">Add to cart</button>
          <button class="btn btn--ghost btn--lg" id="pdpWish">${onWish?"♥ Saved":"♡ Save"}</button>
        </div>
        <div class="pdp__meta">
          <div><strong>Delivery</strong> Same-day in major towns</div>
          <div><strong>Returns</strong> 7-day easy returns</div>
          <div><strong>Payment</strong> M-Pesa, Card, Cash on Delivery</div>
          <div><strong>Stock</strong> In stock at 4 branches</div>
        </div>
      </div>
    `;
    $("#pdpQty").addEventListener("click", e => {
      const d = e.target.dataset.d;
      if (!d) return;
      const inp = $("#pdpQtyVal");
      inp.value = Math.max(1, (parseInt(inp.value)||1) + parseInt(d));
    });
    $("#pdpAdd").addEventListener("click", () => {
      const q = Math.max(1, parseInt($("#pdpQtyVal").value)||1);
      addToCart(id, q);
    });
    $("#pdpWish").addEventListener("click", () => { toggleWishlist(id); renderProduct(id); });
  }

  // ---------- CART ----------
  function cartItems() {
    return Object.entries(state.cart).map(([id, qty]) => ({ p: findProduct(id), qty })).filter(x => x.p);
  }
  function cartSubtotal()  { return cartItems().reduce((s, x) => s + x.p.price * x.qty, 0); }
  function cartItemCount() { return Object.values(state.cart).reduce((s,n) => s+n, 0); }

  function addToCart(id, qty=1) {
    state.cart[id] = (state.cart[id] || 0) + qty;
    saveState(); refreshHeader();
    const p = findProduct(id);
    toast(`✓ Added ${p.name.split(" - ")[0]} to cart`);
  }
  function setCartQty(id, qty) {
    if (qty <= 0) delete state.cart[id];
    else state.cart[id] = qty;
    saveState(); refreshHeader();
  }

  function renderCart() {
    const items = cartItems();
    const v = $("#cartView");
    if (!items.length) {
      v.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty__emoji">🛒</div>
          <h2>Your cart is empty</h2>
          <p class="muted">Add some fresh produce, pantry staples or electronics to get started.</p>
          <button class="btn btn--primary btn--lg" data-route="home">Continue shopping</button>
        </div>`;
      return;
    }
    const sub = cartSubtotal();
    const delivery = sub >= 3000 ? 0 : 200;
    const promoOff = state.promo ? promoDiscount(sub) : 0;
    const total = Math.max(0, sub - promoOff) + delivery;
    v.innerHTML = `
      <div class="cart__lines">
        ${items.map(({p, qty}) => `
          <div class="cart-line" data-id="${p.id}">
            <div class="cart-line__media">${p.emoji}</div>
            <div>
              <div class="cart-line__name">${p.name}</div>
              <div class="cart-line__price">${fmt(p.price)} <small class="muted">/ ${p.unit}</small></div>
              <div class="cart-line__qty">
                <button data-d="-1">−</button><span>${qty}</span><button data-d="1">+</button>
              </div>
              <a class="cart-line__remove" href="#" data-remove>Remove</a>
            </div>
            <div class="cart-line__total">${fmt(p.price * qty)}</div>
          </div>`).join("")}
      </div>
      <aside class="summary">
        <h3>Order summary</h3>
        <div class="summary__row"><span>Subtotal (${cartItemCount()} items)</span><span>${fmt(sub)}</span></div>
        <div class="summary__row"><span>Delivery</span><span>${delivery ? fmt(delivery) : "FREE"}</span></div>
        ${promoOff ? `<div class="summary__row"><span>Promo (${state.promo})</span><span>-${fmt(promoOff)}</span></div>` : ""}
        <div class="summary__row summary__row--total"><span>Total</span><strong>${fmt(total)}</strong></div>
        <form class="summary__promo" id="promoForm">
          <input type="text" placeholder="Promo code (try KIPCHIM10)" value="${state.promo||""}" />
          <button class="btn btn--ghost">Apply</button>
        </form>
        <button class="btn btn--gold btn--block btn--lg" data-route="checkout">Proceed to Checkout</button>
        <p class="muted" style="margin-top:10px;font-size:.8rem;text-align:center">Earn <strong>${Math.floor(total/100)}</strong> KipChim points on this order ⭐</p>
      </aside>
    `;
    // bind
    v.querySelectorAll(".cart-line").forEach(line => {
      const id = line.dataset.id;
      line.querySelectorAll(".cart-line__qty button").forEach(b => {
        b.addEventListener("click", () => {
          const d = parseInt(b.dataset.d);
          setCartQty(id, (state.cart[id]||0) + d);
          renderCart();
        });
      });
      line.querySelector("[data-remove]").addEventListener("click", e => {
        e.preventDefault();
        setCartQty(id, 0);
        renderCart();
      });
    });
    $("#promoForm").addEventListener("submit", e => {
      e.preventDefault();
      const code = e.target.querySelector("input").value.trim().toUpperCase();
      if (!code) { state.promo = null; saveState(); renderCart(); return; }
      if (PROMO_CODES[code]) {
        state.promo = code;
        saveState(); renderCart();
        toast(`✓ Promo "${code}" applied`);
      } else {
        toast("✗ Invalid promo code");
      }
    });
  }

  const PROMO_CODES = {
    "KIPCHIM10": { type: "pct", value: 10, label: "10% off" },
    "FRESH50":   { type: "flat", value: 50, label: "KSh 50 off" },
    "MAMA200":   { type: "flat", value: 200, label: "KSh 200 off" },
  };
  function promoDiscount(subtotal) {
    const code = PROMO_CODES[state.promo];
    if (!code) return 0;
    if (code.type === "pct")  return Math.round(subtotal * code.value / 100);
    if (code.type === "flat") return code.value;
    return 0;
  }

  // ---------- WISHLIST ----------
  function toggleWishlist(id) {
    const i = state.wishlist.indexOf(id);
    if (i >= 0) { state.wishlist.splice(i, 1); toast("Removed from wishlist"); }
    else        { state.wishlist.push(id); toast("♥ Saved to wishlist"); }
    saveState(); refreshHeader();
    // refresh any visible product card icon
    document.querySelectorAll(`.product[data-id="${id}"] .product__wish`).forEach(b => {
      const on = state.wishlist.includes(id);
      b.classList.toggle("is-on", on);
      b.textContent = on ? "♥" : "♡";
    });
  }
  function renderWishlist() {
    const items = state.wishlist.map(findProduct).filter(Boolean);
    $("#wishlistEmpty").hidden = items.length > 0;
    $("#wishlistGrid").innerHTML = items.map(productCard).join("");
    bindProductCards($("#wishlistGrid"));
  }

  // ---------- CHECKOUT ----------
  let checkoutStep = 1;
  let checkoutData = {
    deliveryType: "delivery", // delivery | pickup
    branch: "Eldoret — Uganda Road",
    address: { name:"", phone:"", line1:"", town:"Eldoret", notes:"" },
    payment: "mpesa",         // mpesa | card | cod
    mpesaPhone: "",
    redeemPoints: false,
  };

  function renderCheckout() {
    const items = cartItems();
    const v = $("#checkoutView");
    if (!items.length) {
      navigate("cart");
      return;
    }
    const sub = cartSubtotal();
    const delivery = checkoutData.deliveryType === "pickup" ? 0 : (sub >= 3000 ? 0 : 200);
    const promoOff = state.promo ? promoDiscount(sub) : 0;
    const pointsOff = checkoutData.redeemPoints ? Math.min(state.rewardsPoints * 0.5, sub - promoOff) : 0;
    const total = Math.max(0, sub - promoOff - pointsOff) + delivery;

    v.innerHTML = `
      <div>
        <div class="checkout__steps">
          <div class="step ${checkoutStep===1?"is-active":checkoutStep>1?"is-done":""}">1. Delivery</div>
          <div class="step ${checkoutStep===2?"is-active":checkoutStep>2?"is-done":""}">2. Payment</div>
          <div class="step ${checkoutStep===3?"is-active":""}">3. Confirm</div>
        </div>
        <div class="checkout__panel">${checkoutStep===1?stepDelivery():checkoutStep===2?stepPayment():stepConfirm(total)}</div>
      </div>
      <aside class="summary">
        <h3>Your order</h3>
        ${items.map(({p,qty}) => `
          <div class="summary__row"><span>${p.emoji} ${p.name.split(" - ")[0]} × ${qty}</span><span>${fmt(p.price*qty)}</span></div>
        `).join("")}
        <div class="summary__row" style="border-top:1px solid var(--line);margin-top:8px;padding-top:8px"><span>Subtotal</span><span>${fmt(sub)}</span></div>
        <div class="summary__row"><span>Delivery</span><span>${delivery?fmt(delivery):"FREE"}</span></div>
        ${promoOff?`<div class="summary__row"><span>Promo (${state.promo})</span><span>-${fmt(promoOff)}</span></div>`:""}
        ${pointsOff?`<div class="summary__row"><span>KipChim points</span><span>-${fmt(pointsOff)}</span></div>`:""}
        <div class="summary__row summary__row--total"><span>Total</span><strong>${fmt(total)}</strong></div>
      </aside>
    `;
    bindCheckout();
  }

  function stepDelivery() {
    const d = checkoutData;
    return `
      <h3>How would you like to receive your order?</h3>
      <label class="delivery-option ${d.deliveryType==='delivery'?'is-active':''}">
        <input type="radio" name="dt" value="delivery" ${d.deliveryType==='delivery'?'checked':''}>
        <div><strong>🚚 Home delivery</strong><small>Same-day in Eldoret/Nairobi/Kisumu/Nakuru/Mombasa. Free above KSh 3,000.</small></div>
      </label>
      <label class="delivery-option ${d.deliveryType==='pickup'?'is-active':''}">
        <input type="radio" name="dt" value="pickup" ${d.deliveryType==='pickup'?'checked':''}>
        <div><strong>🏪 In-store pickup</strong><small>Free. Ready in 1 hour at your selected branch.</small></div>
      </label>

      ${d.deliveryType === "pickup" ? `
        <div class="field"><label>Pick from branch</label>
          <select name="branch">
            <option ${d.branch==='Eldoret — Uganda Road'?'selected':''}>Eldoret — Uganda Road</option>
            <option ${d.branch==='Eldoret — Kapsoya'?'selected':''}>Eldoret — Kapsoya</option>
            <option ${d.branch==='Nairobi — Kasarani'?'selected':''}>Nairobi — Kasarani</option>
            <option ${d.branch==='Kitale — Kenyatta Street'?'selected':''}>Kitale — Kenyatta Street</option>
          </select>
        </div>
      ` : `
        <div class="field-row">
          <div class="field"><label>Full name</label><input name="name" required value="${d.address.name}" placeholder="Jane Wanjiku"></div>
          <div class="field"><label>Phone</label><input name="phone" required value="${d.address.phone}" placeholder="0712 345 678"></div>
        </div>
        <div class="field"><label>Delivery address</label><input name="line1" required value="${d.address.line1}" placeholder="House no. / Estate / Street"></div>
        <div class="field"><label>Town</label>
          <select name="town">
            ${["Eldoret","Nairobi","Kisumu","Nakuru","Mombasa","Kitale","Nyeri","Kakamega"].map(t=>`<option ${d.address.town===t?'selected':''}>${t}</option>`).join("")}
          </select>
        </div>
        <div class="field"><label>Delivery notes (optional)</label><textarea name="notes" rows="2" placeholder="Gate code, landmark, etc.">${d.address.notes}</textarea></div>
      `}

      <div style="display:flex;justify-content:space-between;margin-top:14px">
        <button class="btn btn--ghost" data-route="cart">← Back to cart</button>
        <button class="btn btn--primary btn--lg" id="goPayment">Continue to payment →</button>
      </div>`;
  }

  function stepPayment() {
    const d = checkoutData;
    return `
      <h3>Payment method</h3>
      <label class="pay-option ${d.payment==='mpesa'?'is-active':''}">
        <input type="radio" name="pm" value="mpesa" ${d.payment==='mpesa'?'checked':''}>
        <div><strong>📱 M-Pesa Express (STK Push)</strong><small>You'll get a prompt on your phone. Fast and secure.</small></div>
      </label>
      ${d.payment==='mpesa' ? `<div class="field" style="margin-left:32px"><label>M-Pesa phone number</label><input name="mpesaPhone" placeholder="0712 345 678" value="${d.mpesaPhone||d.address.phone}"></div>` : ""}

      <label class="pay-option ${d.payment==='card'?'is-active':''}">
        <input type="radio" name="pm" value="card" ${d.payment==='card'?'checked':''}>
        <div><strong>💳 Card (Visa / Mastercard)</strong><small>Encrypted via our secure payment gateway.</small></div>
      </label>
      <label class="pay-option ${d.payment==='cod'?'is-active':''}">
        <input type="radio" name="pm" value="cod" ${d.payment==='cod'?'checked':''}>
        <div><strong>💵 Cash on Delivery</strong><small>Pay the rider when your order arrives. Available up to KSh 10,000.</small></div>
      </label>

      <div class="field" style="margin-top:14px;padding:14px;background:var(--green-l);border-radius:10px">
        <label><input type="checkbox" name="redeem" ${d.redeemPoints?'checked':''}> Redeem ${state.rewardsPoints} KipChim points (worth ${fmt(state.rewardsPoints*0.5)})</label>
      </div>

      <div style="display:flex;justify-content:space-between;margin-top:14px">
        <button class="btn btn--ghost" id="backDelivery">← Back</button>
        <button class="btn btn--primary btn--lg" id="goConfirm">Review order →</button>
      </div>`;
  }

  function stepConfirm(total) {
    const d = checkoutData;
    return `
      <h3>One last look</h3>
      <p><strong>Delivery:</strong> ${d.deliveryType === "delivery"
        ? `${d.address.name}, ${d.address.phone} — ${d.address.line1}, ${d.address.town}`
        : `Pickup at ${d.branch}`}</p>
      <p><strong>Payment:</strong> ${d.payment === "mpesa" ? `M-Pesa (${d.mpesaPhone||d.address.phone})` : d.payment === "card" ? "Card" : "Cash on Delivery"}</p>
      <p><strong>Total to pay:</strong> ${fmt(total)}</p>
      <p class="muted">By placing this order you agree to Kipchimatt's terms of sale and our privacy policy.</p>
      <div style="display:flex;justify-content:space-between;margin-top:14px">
        <button class="btn btn--ghost" id="backPayment">← Back</button>
        <button class="btn btn--gold btn--lg" id="placeOrder">Place order ✓</button>
      </div>`;
  }

  function bindCheckout() {
    if (checkoutStep === 1) {
      $$('input[name="dt"]').forEach(r => r.addEventListener("change", e => {
        checkoutData.deliveryType = e.target.value; renderCheckout();
      }));
      const $form = $(".checkout__panel");
      $form.querySelectorAll("input[name],select[name],textarea[name]").forEach(el => {
        el.addEventListener("input", () => {
          const n = el.name;
          if (n === "branch") checkoutData.branch = el.value;
          else if (["name","phone","line1","town","notes"].includes(n)) checkoutData.address[n] = el.value;
        });
      });
      $("#goPayment").addEventListener("click", () => {
        if (checkoutData.deliveryType === "delivery") {
          const a = checkoutData.address;
          if (!a.name || !a.phone || !a.line1) { toast("Please fill all required fields"); return; }
        }
        checkoutStep = 2; renderCheckout();
      });
    }
    if (checkoutStep === 2) {
      $$('input[name="pm"]').forEach(r => r.addEventListener("change", e => {
        checkoutData.payment = e.target.value; renderCheckout();
      }));
      const $mp = $('input[name="mpesaPhone"]');
      if ($mp) $mp.addEventListener("input", e => checkoutData.mpesaPhone = e.target.value);
      const $rd = $('input[name="redeem"]');
      if ($rd) $rd.addEventListener("change", e => { checkoutData.redeemPoints = e.target.checked; renderCheckout(); });
      $("#backDelivery").addEventListener("click", () => { checkoutStep = 1; renderCheckout(); });
      $("#goConfirm").addEventListener("click", () => { checkoutStep = 3; renderCheckout(); });
    }
    if (checkoutStep === 3) {
      $("#backPayment").addEventListener("click", () => { checkoutStep = 2; renderCheckout(); });
      $("#placeOrder").addEventListener("click", placeOrder);
    }
  }

  function placeOrder() {
    if (checkoutData.payment === "mpesa") {
      openModal(`
        <h2>📱 M-Pesa STK Push sent</h2>
        <p>Check your phone <strong>${checkoutData.mpesaPhone||checkoutData.address.phone||"(your number)"}</strong> and enter your M-Pesa PIN to authorize the payment.</p>
        <div style="display:flex;align-items:center;gap:8px;color:var(--muted);margin:14px 0">
          <span class="spinner" style="display:inline-block;width:14px;height:14px;border:2px solid var(--green);border-top-color:transparent;border-radius:50%;animation:spin 1s linear infinite"></span>
          Waiting for confirmation…
        </div>
        <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
      `);
      setTimeout(() => { closeModal(); finalizeOrder(); }, 1800);
    } else {
      finalizeOrder();
    }
  }

  function finalizeOrder() {
    const items = cartItems();
    const sub = cartSubtotal();
    const delivery = checkoutData.deliveryType === "pickup" ? 0 : (sub >= 3000 ? 0 : 200);
    const promoOff = state.promo ? promoDiscount(sub) : 0;
    const pointsOff = checkoutData.redeemPoints ? Math.min(state.rewardsPoints * 0.5, sub - promoOff) : 0;
    const total = Math.max(0, sub - promoOff - pointsOff) + delivery;

    const order = {
      id: "KCM-" + Date.now().toString().slice(-6),
      placedAt: new Date().toISOString(),
      items: items.map(({p,qty}) => ({ id:p.id, name:p.name, emoji:p.emoji, price:p.price, qty })),
      subtotal: sub, delivery, promoOff, pointsOff, total,
      delivery_type: checkoutData.deliveryType,
      address: checkoutData.deliveryType === "delivery" ? {...checkoutData.address} : null,
      branch: checkoutData.deliveryType === "pickup" ? checkoutData.branch : null,
      payment: checkoutData.payment,
      status: checkoutData.payment === "cod" ? "pending" : "paid",
      pointsEarned: Math.floor(total/100),
    };
    state.orders.unshift(order);
    if (checkoutData.redeemPoints) state.rewardsPoints = Math.max(0, state.rewardsPoints - Math.floor(pointsOff*2));
    state.rewardsPoints += order.pointsEarned;
    state.cart = {};
    state.promo = null;
    saveState(); refreshHeader();

    checkoutStep = 1;
    checkoutData.redeemPoints = false;

    $("#main").scrollIntoView({behavior:"instant"});
    $$(".view").forEach(v => v.hidden = true);
    const home = $('.view[data-view="home"]');
    home.hidden = false;
    openModal(`
      <div style="text-align:center">
        <div style="font-size:3.5rem">🎉</div>
        <h2>Order placed!</h2>
        <p>Order <strong>${order.id}</strong> has been received.</p>
        <p class="muted">${order.delivery_type === "delivery" ? "We'll dispatch your order shortly. ETA 1–4 hours." : "Your order will be ready for pickup in 1 hour."}</p>
        <p>You earned <strong>${order.pointsEarned} KipChim points</strong> ⭐</p>
        <div style="display:flex;gap:10px;justify-content:center;margin-top:16px">
          <button class="btn btn--ghost" data-close>Continue shopping</button>
          <button class="btn btn--primary" id="viewOrder">Track order</button>
        </div>
      </div>
    `);
    $("#viewOrder").addEventListener("click", () => { closeModal(); navigate("orders"); });
  }

  // ---------- ORDERS ----------
  function renderOrders() {
    const v = $("#ordersView");
    if (!state.orders.length) {
      v.innerHTML = `<p class="muted">You haven't placed any orders yet. <a href="#" data-route="home">Start shopping →</a></p>`;
      return;
    }
    v.innerHTML = state.orders.map(o => {
      const stepIdx = o.status === "delivered" ? 4 : o.status === "shipped" ? 3 : o.status === "paid" ? 2 : 1;
      const date = new Date(o.placedAt).toLocaleString("en-KE", { dateStyle: "medium", timeStyle: "short" });
      return `
        <div class="order">
          <div class="order__head">
            <div>
              <div class="order__id">${o.id}</div>
              <div class="muted" style="font-size:.85rem">Placed ${date} · ${fmt(o.total)}</div>
            </div>
            <span class="order__status status-${o.status}">${o.status}</span>
          </div>
          <div class="order__items">${o.items.map(i => `${i.emoji} ${i.name.split(" - ")[0]} × ${i.qty}`).join(" · ")}</div>
          <div class="tracker">
            ${["Placed","Paid","Packed","Out for delivery","Delivered"].map((label, i) => `
              <div class="tracker__step ${i < stepIdx ? "is-done":""}">
                <div class="tracker__dot">${i < stepIdx ? "✓" : ""}</div>
                <span>${label}</span>
              </div>
            `).join("")}
          </div>
        </div>`;
    }).join("");
  }

  // ---------- ACCOUNT ----------
  let accountTab = "overview";
  function renderAccount() {
    const v = $("#accountView");
    if (!state.user) {
      v.innerHTML = `
        <div class="account__panel" style="grid-column:1/-1;max-width:420px;margin:0 auto">
          <h2>Sign in to Kipchimatt</h2>
          <p class="muted">Sign in or create your account in seconds. Your data is safe with us.</p>
          <form id="signinForm">
            <div class="field"><label>Full name</label><input name="name" required placeholder="Jane Wanjiku"></div>
            <div class="field"><label>Phone</label><input name="phone" required placeholder="0712 345 678"></div>
            <div class="field"><label>Email (optional)</label><input name="email" type="email" placeholder="jane@example.com"></div>
            <button class="btn btn--primary btn--block btn--lg">Continue</button>
          </form>
        </div>`;
      v.style.gridTemplateColumns = "1fr";
      $("#signinForm").addEventListener("submit", e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        state.user = data; saveState(); refreshHeader(); renderAccount();
        toast(`Welcome, ${data.name.split(" ")[0]}!`);
      });
      return;
    }
    v.style.gridTemplateColumns = "240px 1fr";
    v.innerHTML = `
      <nav class="account-nav">
        ${["overview","profile","addresses","rewards","orders","logout"].map(t => `
          <button data-tab="${t}" class="${accountTab===t?'is-active':''}">
            ${({overview:"📋 Overview",profile:"👤 Profile",addresses:"📍 Addresses",rewards:"⭐ Rewards",orders:"📦 Orders",logout:"🚪 Sign out"})[t]}
          </button>`).join("")}
      </nav>
      <div class="account__panel">${accountPanel()}</div>
    `;
    v.querySelectorAll(".account-nav button").forEach(b => {
      b.addEventListener("click", () => {
        const t = b.dataset.tab;
        if (t === "logout") {
          state.user = null; saveState(); refreshHeader(); renderAccount();
          toast("Signed out");
          return;
        }
        if (t === "orders") { navigate("orders"); return; }
        accountTab = t; renderAccount();
      });
    });
    bindAccountPanel();
  }

  function accountPanel() {
    const u = state.user;
    if (accountTab === "overview") {
      return `
        <h2>Welcome back, ${u.name.split(" ")[0]} 👋</h2>
        <p class="muted">Here's a quick view of your account.</p>
        <div class="rewards">
          <div class="reward-card">
            <h4>KipChim Points</h4>
            <div class="big">${state.rewardsPoints}</div>
            <p style="margin:6px 0 0">Worth ${fmt(state.rewardsPoints*0.5)} at checkout.</p>
          </div>
          <div class="reward-card reward-card--gold">
            <h4>Total orders</h4>
            <div class="big">${state.orders.length}</div>
            <p style="margin:6px 0 0">Lifetime spend ${fmt(state.orders.reduce((s,o)=>s+o.total,0))}</p>
          </div>
        </div>
        <h3 style="margin-top:24px">Quick actions</h3>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn--primary" data-route="home">Continue shopping</button>
          <button class="btn btn--ghost" data-route="orders">View orders</button>
          <button class="btn btn--ghost" data-route="wishlist">My wishlist (${state.wishlist.length})</button>
        </div>`;
    }
    if (accountTab === "profile") {
      return `
        <h2>Profile</h2>
        <form id="profileForm">
          <div class="field-row">
            <div class="field"><label>Full name</label><input name="name" value="${u.name||''}"></div>
            <div class="field"><label>Phone</label><input name="phone" value="${u.phone||''}"></div>
          </div>
          <div class="field"><label>Email</label><input name="email" type="email" value="${u.email||''}"></div>
          <button class="btn btn--primary">Save changes</button>
        </form>`;
    }
    if (accountTab === "addresses") {
      return `
        <h2>Saved addresses</h2>
        <p class="muted">Save your delivery addresses for faster checkout.</p>
        <div style="border:1px dashed var(--line);padding:18px;border-radius:10px">
          <strong>Home</strong><br/>
          <span class="muted">${u.name}, ${u.phone}<br/>House 12, Kapsoya Estate, Eldoret</span><br/>
          <button class="btn btn--ghost btn--sm" style="margin-top:8px">Edit</button>
        </div>
        <button class="btn btn--primary" style="margin-top:14px">+ Add new address</button>`;
    }
    if (accountTab === "rewards") {
      return `
        <h2>⭐ KipChim Rewards</h2>
        <p>Earn 1 point for every <strong>KSh 100</strong> spent. 100 points = <strong>KSh 50 off</strong>.</p>
        <div class="rewards">
          <div class="reward-card">
            <h4>Your balance</h4>
            <div class="big">${state.rewardsPoints} pts</div>
            <p>Equivalent to ${fmt(state.rewardsPoints*0.5)}</p>
          </div>
          <div class="reward-card reward-card--gold">
            <h4>Tier</h4>
            <div class="big">${state.rewardsPoints>=500?"Gold":state.rewardsPoints>=200?"Silver":"Bronze"}</div>
            <p>Next tier at ${state.rewardsPoints>=500?"—":state.rewardsPoints>=200?"500 pts":"200 pts"}</p>
          </div>
        </div>
        <h3 style="margin-top:24px">How to earn more</h3>
        <ul style="padding-left:20px">
          <li>Shop online and in-store</li>
          <li>Refer a friend → get 50 bonus points</li>
          <li>Birthday month → 2x points</li>
        </ul>`;
    }
    return "";
  }

  function bindAccountPanel() {
    const f = $("#profileForm");
    if (f) f.addEventListener("submit", e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      state.user = { ...state.user, ...data };
      saveState(); refreshHeader();
      toast("✓ Profile saved");
    });
  }

  // ---------- OFFERS ----------
  function renderOffers() {
    const list = PRODUCTS.filter(p => p.deal);
    $("#offersGrid").innerHTML = list.map(productCard).join("");
    bindProductCards($("#offersGrid"));
  }

  // ---------- HEADER REFRESH ----------
  function refreshHeader() {
    $("#cartBadge").textContent = cartItemCount();
    $("#cartTotalMini").textContent = Math.round(cartSubtotal()).toLocaleString("en-KE");
    $("#wishlistCount").textContent = state.wishlist.length;
    $("#accountName").textContent = state.user ? state.user.name.split(" ")[0] : "Sign in";
  }

  // ---------- HOMEPAGE ----------
  function renderHome() {
    // departments
    $("#catGrid").innerHTML = CATEGORIES.map(c => `
      <div class="cat-card" data-cat="${c.id}">
        <span class="cat-card__emoji">${c.emoji}</span>
        <div class="cat-card__name">${c.name}</div>
        <div class="cat-card__count">${PRODUCTS.filter(p=>p.cat===c.id).length} items</div>
      </div>
    `).join("");

    // deals
    const deals = PRODUCTS.filter(p => p.deal).slice(0, 8);
    $("#dealsGrid").innerHTML = deals.map(productCard).join("");
    bindProductCards($("#dealsGrid"));

    // fresh
    $("#freshGrid").innerHTML = PRODUCTS.filter(p => p.cat==="fresh").slice(0,8).map(productCard).join("");
    bindProductCards($("#freshGrid"));

    // electronics
    $("#electronicsGrid").innerHTML = PRODUCTS.filter(p => p.cat==="electronics").slice(0,8).map(productCard).join("");
    bindProductCards($("#electronicsGrid"));

    // search categories
    const sc = $("#searchCategory");
    sc.innerHTML = `<option value="all">All categories</option>` +
      CATEGORIES.map(c => `<option value="${c.id}">${c.emoji} ${c.name}</option>`).join("");
  }

  // ---------- GLOBAL EVENTS ----------
  function bindGlobal() {
    document.addEventListener("click", e => {
      const route = e.target.closest("[data-route]")?.dataset.route;
      const cat = e.target.closest("[data-cat]")?.dataset.cat;
      if (cat) { e.preventDefault(); navigate("catalog", { cat }); return; }
      if (route) { e.preventDefault(); navigate(route); return; }
      if (e.target.matches("[data-close]") || e.target.closest("[data-close]")) {
        closeModal();
      }
    });

    $("#searchForm").addEventListener("submit", e => {
      e.preventDefault();
      const q = $("#searchInput").value.trim();
      const cat = $("#searchCategory").value;
      navigate("catalog", { q, cat });
    });

    $("#allCategoriesBtn").addEventListener("click", () => navigate("catalog", { cat: "all" }));

    $("#sortBy").addEventListener("change", e => { catalogState.sort = e.target.value; renderCatalog(); });
    $("#applyPrice").addEventListener("click", () => {
      catalogState.minPrice = parseInt($("#priceMin").value) || null;
      catalogState.maxPrice = parseInt($("#priceMax").value) || null;
      renderCatalog();
    });
    $("#clearFilters").addEventListener("click", () => {
      catalogState = { cat:"all", q:"", minPrice:null, maxPrice:null, minRating:0, onlyDeals:false, onlyInStock:true, sort:"relevance" };
      $("#priceMin").value = ""; $("#priceMax").value = "";
      $("#onlyDeals").checked = false; $("#onlyInStock").checked = true;
      renderCatalog();
    });
    $("#onlyDeals").addEventListener("change", e => { catalogState.onlyDeals = e.target.checked; renderCatalog(); });
    document.addEventListener("change", e => {
      if (e.target.name === "rating") {
        const checked = $$('input[name="rating"]:checked').map(c=>parseInt(c.value));
        catalogState.minRating = checked.length ? Math.min(...checked) : 0;
        renderCatalog();
      }
    });
  }

  // ---------- INIT ----------
  function init() {
    $("#year").textContent = new Date().getFullYear();
    bindGlobal();
    renderHome();
    refreshHeader();
    navigate("home");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
