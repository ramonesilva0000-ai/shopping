/* ===========================================================
   Kipchimatt — app logic
   "Your Reliable Partner" · A Kipchimchim Group company
   =========================================================== */
(() => {
"use strict";

// ---------- BRAND CONSTANTS ----------
const BRANCHES = [
  { id:"kapsoit",   name:"Kapsoit" },
  { id:"litein",    name:"Litein — Tegat Building" },
  { id:"mogogosiek",name:"Mogogosiek" },
  { id:"nandi",     name:"Nandi Hills" },
  { id:"kapsabet",  name:"Kapsabet" },
  { id:"mosoriot",  name:"Mosoriot" },
  { id:"ainamoi",   name:"Ainamoi" },
  { id:"eldoret",   name:"Eldoret — Serani Mall" },
];

// ---------- DEPARTMENTS ----------
const CATEGORIES = [
  { id:"fresh",       name:"Fresh Produce",   emoji:"🥬" },
  { id:"bakery",      name:"Bakery",          emoji:"🥖" },
  { id:"dairy",       name:"Dairy & Eggs",    emoji:"🥛" },
  { id:"butchery",    name:"Butchery",        emoji:"🥩" },
  { id:"pantry",      name:"Pantry",          emoji:"🌾" },
  { id:"beverages",   name:"Beverages",       emoji:"🥤" },
  { id:"household",   name:"Household",       emoji:"🧴" },
  { id:"baby",        name:"Baby & Mom",      emoji:"🍼" },
  { id:"beauty",      name:"Health & Beauty", emoji:"💄" },
  { id:"electronics", name:"Electronics",     emoji:"📺" },
  { id:"stationery",  name:"Stationery",      emoji:"📚" },
  { id:"kitchen",     name:"Kitchen",         emoji:"🍳" },
];

// ---------- PRODUCTS (KSh) ----------
// "house" = Kipchimchim house brand (Kipchimatt Bread, Mbogo Tea/Water, Valley Sugar, Keben Tea)
const PRODUCTS = [
  // Fresh
  { id:"p1",  name:"Sukuma Wiki - 1 bunch",        price:30,  was:40,  cat:"fresh", emoji:"🥬", unit:"per bunch", rating:4.7, deal:true },
  { id:"p2",  name:"Tomatoes - 1 kg",               price:120, was:150, cat:"fresh", emoji:"🍅", unit:"per kg",    rating:4.6, deal:true },
  { id:"p3",  name:"Sweet Bananas - 1 kg",          price:90,  was:null,cat:"fresh", emoji:"🍌", unit:"per kg",    rating:4.5 },
  { id:"p4",  name:"Avocado (Hass) - 4 pcs",        price:200, was:240, cat:"fresh", emoji:"🥑", unit:"pack of 4", rating:4.8, deal:true },
  { id:"p5",  name:"Red Onions - 1 kg",             price:110, was:null,cat:"fresh", emoji:"🧅", unit:"per kg",    rating:4.4 },
  { id:"p6",  name:"Mangoes - 6 pcs",               price:350, was:null,cat:"fresh", emoji:"🥭", unit:"pack of 6", rating:4.9 },
  { id:"p7",  name:"Carrots - 1 kg",                price:80,  was:null,cat:"fresh", emoji:"🥕", unit:"per kg",    rating:4.5 },
  { id:"p8",  name:"Dhania (Coriander) bunch",      price:20,  was:null,cat:"fresh", emoji:"🌿", unit:"per bunch", rating:4.5 },
  // Bakery
  { id:"p10", name:"Kipchimatt Bread White 400g",   price:65,  was:null,cat:"bakery",emoji:"🍞", unit:"400 g",     rating:4.8, house:true },
  { id:"p11", name:"Kipchimatt Bread Brown 600g",   price:90,  was:null,cat:"bakery",emoji:"🥖", unit:"600 g",     rating:4.7, house:true },
  { id:"p12", name:"Mandazi - pack of 6",           price:120, was:150, cat:"bakery",emoji:"🥐", unit:"pack of 6", rating:4.8, deal:true },
  { id:"p13", name:"Birthday Cake (Vanilla) 1kg",   price:1500,was:null,cat:"bakery",emoji:"🎂", unit:"1 kg",      rating:4.9 },
  // Dairy
  { id:"p20", name:"Brookside Fresh Milk 500ml",    price:60,  was:null,cat:"dairy", emoji:"🥛", unit:"500 ml",    rating:4.7 },
  { id:"p21", name:"KCC Mala 500ml",                price:70,  was:null,cat:"dairy", emoji:"🥛", unit:"500 ml",    rating:4.6 },
  { id:"p22", name:"Eggs - tray of 30",             price:480, was:540, cat:"dairy", emoji:"🥚", unit:"tray of 30",rating:4.8, deal:true },
  { id:"p23", name:"Cheddar Cheese 250g",           price:380, was:null,cat:"dairy", emoji:"🧀", unit:"250 g",     rating:4.5 },
  { id:"p24", name:"Blue Band 500g",                price:320, was:null,cat:"dairy", emoji:"🧈", unit:"500 g",     rating:4.6 },
  // Butchery
  { id:"p30", name:"Beef (with bone) - 1 kg",       price:650, was:null,cat:"butchery",emoji:"🥩", unit:"per kg",   rating:4.6 },
  { id:"p31", name:"Goat Meat - 1 kg",              price:750, was:null,cat:"butchery",emoji:"🍖", unit:"per kg",   rating:4.7 },
  { id:"p32", name:"Whole Chicken - 1.2 kg",        price:750, was:850, cat:"butchery",emoji:"🍗", unit:"each",     rating:4.8, deal:true },
  { id:"p33", name:"Beef Sausages 500g",            price:380, was:null,cat:"butchery",emoji:"🌭", unit:"500 g",    rating:4.5 },
  // Pantry  (house brands prominently)
  { id:"p40", name:"Soko Maize Flour 2kg",          price:195, was:220, cat:"pantry",emoji:"🌾", unit:"2 kg",      rating:4.7, deal:true },
  { id:"p41", name:"Pembe Wheat Flour 2kg",         price:230, was:null,cat:"pantry",emoji:"🌾", unit:"2 kg",      rating:4.5 },
  { id:"p42", name:"Mwea Pishori Rice 2kg",         price:480, was:540, cat:"pantry",emoji:"🍚", unit:"2 kg",      rating:4.9, deal:true },
  { id:"p43", name:"Valley Sugar 2kg",              price:320, was:360, cat:"pantry",emoji:"🟫", unit:"2 kg",      rating:4.8, deal:true, house:true },
  { id:"p44", name:"Salt 1kg",                      price:45,  was:null,cat:"pantry",emoji:"🧂", unit:"1 kg",      rating:4.5 },
  { id:"p45", name:"Cooking Oil (Rina) 3L",         price:1100,was:1300,cat:"pantry",emoji:"🛢️",unit:"3 L",        rating:4.8, deal:true },
  { id:"p46", name:"Mbogo Tea Leaves 500g",         price:280, was:320, cat:"pantry",emoji:"🍵", unit:"500 g",     rating:4.8, deal:true, house:true },
  { id:"p47", name:"Keben Tea Leaves 250g",         price:160, was:null,cat:"pantry",emoji:"🍵", unit:"250 g",     rating:4.7, house:true },
  { id:"p48", name:"Royco Mchuzi Mix 200g",         price:180, was:null,cat:"pantry",emoji:"🥫", unit:"200 g",     rating:4.5 },
  // Beverages
  { id:"p50", name:"Coca-Cola 2L",                  price:220, was:null,cat:"beverages",emoji:"🥤",unit:"2 L",     rating:4.6 },
  { id:"p51", name:"Mbogo Water 500ml × 12",        price:240, was:300, cat:"beverages",emoji:"💧",unit:"12-pack", rating:4.7, deal:true, house:true },
  { id:"p52", name:"Minute Maid Mango 1L",          price:180, was:null,cat:"beverages",emoji:"🧃",unit:"1 L",     rating:4.5 },
  { id:"p53", name:"Tusker Lager 6 × 500ml",        price:1500,was:1700,cat:"beverages",emoji:"🍺",unit:"6-pack",  rating:4.7, deal:true },
  // Household
  { id:"p60", name:"Omo Detergent 2kg",             price:540, was:620, cat:"household",emoji:"🧺",unit:"2 kg",    rating:4.7, deal:true },
  { id:"p61", name:"Harpic 750ml",                  price:280, was:null,cat:"household",emoji:"🚽",unit:"750 ml",  rating:4.5 },
  { id:"p62", name:"Toilet Paper - 10 pack",        price:350, was:null,cat:"household",emoji:"🧻",unit:"10-pack", rating:4.6 },
  { id:"p63", name:"Dishwashing Liquid 1L",         price:220, was:null,cat:"household",emoji:"🧼",unit:"1 L",     rating:4.5 },
  // Baby
  { id:"p70", name:"Pampers Size 4 (40)",           price:1450,was:1650,cat:"baby", emoji:"🍼",unit:"40-pack",     rating:4.8, deal:true },
  { id:"p71", name:"NAN Infant Formula 400g",       price:1300,was:null,cat:"baby", emoji:"🥛",unit:"400 g",       rating:4.7 },
  { id:"p72", name:"Baby Wipes - 80",               price:250, was:null,cat:"baby", emoji:"🧻",unit:"80 sheets",   rating:4.6 },
  // Beauty
  { id:"p80", name:"Colgate Toothpaste 100ml",      price:180, was:null,cat:"beauty",emoji:"🪥",unit:"100 ml",     rating:4.7 },
  { id:"p81", name:"Lifebuoy Soap 4-pack",          price:240, was:280, cat:"beauty",emoji:"🧼",unit:"4-pack",     rating:4.5, deal:true },
  { id:"p82", name:"Nivea Lotion 400ml",            price:520, was:null,cat:"beauty",emoji:"🧴",unit:"400 ml",     rating:4.6 },
  // Electronics  (Lipa Pole Pole eligible >5000)
  { id:"p90", name:"Samsung 43\" Smart TV",         price:38500,was:45000,cat:"electronics",emoji:"📺",unit:"each",rating:4.7,deal:true },
  { id:"p91", name:"Hotpoint Microwave 20L",        price:9500, was:null, cat:"electronics",emoji:"🍲",unit:"each",rating:4.5 },
  { id:"p92", name:"Ramtons Blender 500W",          price:4200, was:4900, cat:"electronics",emoji:"🫙",unit:"each",rating:4.6, deal:true },
  { id:"p93", name:"Sun King Solar Lantern",        price:1800, was:null, cat:"electronics",emoji:"🔦",unit:"each",rating:4.8 },
  { id:"p94", name:"Anker Power Bank 20000mAh",     price:2900, was:null, cat:"electronics",emoji:"🔋",unit:"each",rating:4.7 },
  { id:"p95", name:"JBL Go Bluetooth Speaker",      price:3400, was:3900, cat:"electronics",emoji:"🔊",unit:"each",rating:4.6, deal:true },
  { id:"p96", name:"Iron Box (Ramtons)",            price:1800, was:null, cat:"electronics",emoji:"♨️",unit:"each",rating:4.5 },
  // Stationery
  { id:"p100",name:"Exercise Books 32-pg (10)",     price:320, was:380, cat:"stationery",emoji:"📒",unit:"10-pack",rating:4.6, deal:true },
  { id:"p101",name:"Bic Pens (10-pack)",            price:150, was:null,cat:"stationery",emoji:"🖊️",unit:"10-pack",rating:4.5 },
  { id:"p102",name:"School Bag (Medium)",           price:1400,was:null,cat:"stationery",emoji:"🎒",unit:"each",   rating:4.7 },
  // Kitchen
  { id:"p110",name:"Non-stick Pan 28cm",            price:1800,was:2100,cat:"kitchen",emoji:"🍳",unit:"each",      rating:4.6, deal:true },
  { id:"p111",name:"6 Glass Tumblers",              price:850, was:null,cat:"kitchen",emoji:"🥃",unit:"set of 6",  rating:4.5 },
  { id:"p112",name:"Pressure Cooker 5L",            price:3200,was:null,cat:"kitchen",emoji:"🍲",unit:"each",      rating:4.8 },
];
const findProduct = id => PRODUCTS.find(p => p.id === id);
const isLipaEligible = p => p.price >= 5000;

// ---------- RECIPES (Mpishi) ----------
const RECIPES = [
  { id:"r1", name:"Ugali na Sukuma Wiki",  emoji:"🍲", time:"30 min", serves:4, ing:[
    { id:"p40", qty:1 }, { id:"p1", qty:2 }, { id:"p5", qty:1 }, { id:"p2", qty:1 }, { id:"p45", qty:1 }
  ]},
  { id:"r2", name:"Pilau ya Nyama",         emoji:"🍛", time:"1 h",   serves:6, ing:[
    { id:"p42", qty:1 }, { id:"p30", qty:1 }, { id:"p5", qty:1 }, { id:"p7", qty:1 }, { id:"p45", qty:1 }
  ]},
  { id:"r3", name:"Chapati & Beans",        emoji:"🫓", time:"45 min",serves:4, ing:[
    { id:"p41", qty:1 }, { id:"p43", qty:1 }, { id:"p45", qty:1 }, { id:"p44", qty:1 }, { id:"p5", qty:1 }
  ]},
  { id:"r4", name:"Mukimo na Kuku",         emoji:"🍗", time:"1 h",   serves:4, ing:[
    { id:"p32", qty:1 }, { id:"p1", qty:1 }, { id:"p5", qty:1 }, { id:"p7", qty:1 }, { id:"p45", qty:1 }
  ]},
  { id:"r5", name:"Githeri",                emoji:"🥣", time:"50 min",serves:5, ing:[
    { id:"p43", qty:1 }, { id:"p5", qty:1 }, { id:"p2", qty:1 }, { id:"p7", qty:1 }, { id:"p45", qty:1 }
  ]},
  { id:"r6", name:"Mahamri & Chai",         emoji:"☕", time:"40 min",serves:6, ing:[
    { id:"p41", qty:1 }, { id:"p43", qty:1 }, { id:"p46", qty:1 }, { id:"p20", qty:2 }, { id:"p45", qty:1 }
  ]},
  { id:"r7", name:"Kuku Choma & Kachumbari",emoji:"🍖", time:"1.5 h", serves:4, ing:[
    { id:"p32", qty:1 }, { id:"p2", qty:1 }, { id:"p5", qty:1 }, { id:"p8", qty:1 }, { id:"p45", qty:1 }
  ]},
  { id:"r8", name:"Tea-time Pack",          emoji:"🍞", time:"5 min", serves:4, ing:[
    { id:"p10", qty:1 }, { id:"p24", qty:1 }, { id:"p46", qty:1 }, { id:"p20", qty:2 }
  ]},
];

// ---------- MAMA MBOGA KIOSKS (demo) ----------
const KIOSKS = [
  { name:"Mama Njeri's Duka",    addr:"Kapsoya, behind matatu stage",     dist:"180 m"  },
  { name:"Wanjiku Stores",       addr:"Pipeline Estate, near salon",      dist:"320 m"  },
  { name:"Otieno Mini Mart",     addr:"Kimumu, opposite primary school",  dist:"450 m"  },
  { name:"Mama Chebet's Kiosk",  addr:"Kapsoit junction",                 dist:"600 m"  },
  { name:"Cherop General Shop",  addr:"Litein, opposite Kipchimatt",      dist:"820 m"  },
  { name:"Kipchoge Wholesale",   addr:"Mosoriot stage",                   dist:"1.2 km" },
];

// ---------- VOICE SEARCH PHRASES (demo) ----------
const VOICE_DEMOS = [
  { heard:"Tafuta unga ya Soko",         q:"Soko Maize" },
  { heard:"Find me sukari",              q:"Sugar"      },
  { heard:"Bei ya maziwa",                q:"Milk"       },
  { heard:"Nataka chai ya Mbogo",         q:"Mbogo Tea"  },
];

// ---------- STATE ----------
const KEY = "kipchimatt:v2";
const defaultState = {
  cart:{}, wishlist:[], user:null, orders:[], rewardsPoints:240, promo:null,
  pamoja:null,           // {code, members:[{id,name,initial}], items:{pid:{qty,by}}}
  bbasket:[],            // Bei Yangu basket
  spinSeen:false,        // welcome wheel
};
let state = load();
function load(){ try{ const r=localStorage.getItem(KEY); if(!r) return clone(defaultState); return {...clone(defaultState),...JSON.parse(r)}; }catch{ return clone(defaultState); } }
function save(){ localStorage.setItem(KEY, JSON.stringify(state)); }
function clone(o){ return JSON.parse(JSON.stringify(o)); }

// ---------- HELPERS ----------
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const fmt = n => "KSh " + Math.round(n).toLocaleString("en-KE");
const stars = r => "★★★★★".slice(0, Math.round(r)) + "☆☆☆☆☆".slice(0, 5-Math.round(r));
const initials = name => (name||"?").split(/\s+/).map(s=>s[0]).slice(0,2).join("").toUpperCase();

function toast(msg){
  const t = $("#toast"); t.textContent = msg; t.classList.add("is-show");
  clearTimeout(toast._t); toast._t = setTimeout(()=>t.classList.remove("is-show"), 2200);
}
function openModal(html){ $("#modalBody").innerHTML = html; $("#modal").hidden = false; }
function closeModal(){ $("#modal").hidden = true; }

// ---------- ROUTING ----------
function navigate(view, opts={}){
  $$(".view").forEach(v => v.hidden = true);
  const t = $(`.view[data-view="${view}"]`); if (t) t.hidden = false;
  window.scrollTo({ top:0 });
  if (view === "catalog")    renderCatalog(opts);
  if (view === "product")    renderProduct(opts.productId);
  if (view === "cart")       renderCart();
  if (view === "checkout")   renderCheckout();
  if (view === "offers")     renderOffers();
  if (view === "account")    renderAccount();
  if (view === "orders")     renderOrders();
  if (view === "wishlist")   renderWishlist();
  if (view === "pamoja")     renderPamoja();
  if (view === "mpishi")     renderMpishi();
  if (view === "beiYangu")   renderBeiYangu();
  if (view === "tuma")       renderTuma();
  if (view === "lipa")       renderLipa();
  if (view === "mamamboga")  renderMboga();
}

// ---------- CART ----------
function cartItems(){
  return Object.entries(state.cart).map(([id, info]) => {
    const qty = typeof info === "number" ? info : info.qty;
    const by  = typeof info === "number" ? null : info.by;
    return { p: findProduct(id), qty, by };
  }).filter(x => x.p);
}
function cartSubtotal(){ return cartItems().reduce((s,x)=> s + x.p.price*x.qty, 0); }
function cartItemCount(){ return cartItems().reduce((s,x)=> s + x.qty, 0); }
function addToCart(id, qty=1){
  const cur = state.cart[id];
  const curQty = typeof cur === "number" ? cur : (cur ? cur.qty : 0);
  const by = state.pamoja ? (state.user?.name?.split(" ")[0] || "You") : null;
  state.cart[id] = by ? { qty: curQty + qty, by } : (curQty + qty);
  save(); refreshHeader();
  const p = findProduct(id);
  toast(`✓ Added ${p.name.split(" - ")[0]} to cart`);
}
function setQty(id, qty){
  if (qty <= 0) delete state.cart[id];
  else {
    const cur = state.cart[id];
    if (typeof cur === "object" && cur) state.cart[id] = {...cur, qty};
    else state.cart[id] = qty;
  }
  save(); refreshHeader();
}

// ---------- HEADER ----------
function refreshHeader(){
  $("#cartBadge").textContent = cartItemCount();
  $("#cartTotalMini").textContent = Math.round(cartSubtotal()).toLocaleString("en-KE");
  $("#wishlistCount").textContent = state.wishlist.length;
  $("#accountName").textContent = state.user ? state.user.name.split(" ")[0] : "Sign in";
  const pb = $("#pamojaBadge"), pl = $("#pamojaLabel");
  if (state.pamoja) { pb.hidden = false; pl.textContent = `${state.pamoja.members.length} active`; }
  else              { pb.hidden = true;  pl.textContent = "Group cart"; }
}

// ---------- PRODUCT CARD ----------
function productCard(p){
  const onWish = state.wishlist.includes(p.id);
  const save = p.was ? Math.round((1 - p.price / p.was) * 100) : 0;
  return `
    <article class="product" data-id="${p.id}">
      <div class="product__media" data-action="view">
        <div class="product__badges">
          ${p.deal  ? `<span class="tag tag--deal">SAVE ${save}%</span>` : ""}
          ${p.house ? `<span class="tag tag--new">HOUSE BRAND</span>` : ""}
          ${isLipaEligible(p) ? `<span class="tag tag--lipa">LIPA POLE POLE</span>` : ""}
        </div>
        <button class="product__wish ${onWish?"is-on":""}" data-action="wish" aria-label="Save">${onWish?"♥":"♡"}</button>
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
function bindProductCards(root){
  root.querySelectorAll(".product").forEach(card => {
    const id = card.dataset.id;
    card.addEventListener("click", e => {
      const a = e.target.closest("[data-action]")?.dataset.action;
      if (a === "add")  { e.stopPropagation(); addToCart(id); }
      else if (a === "wish") { e.stopPropagation(); toggleWish(id); }
      else if (a === "view") { navigate("product", { productId:id }); }
    });
  });
}

// ---------- WISHLIST ----------
function toggleWish(id){
  const i = state.wishlist.indexOf(id);
  if (i >= 0) { state.wishlist.splice(i,1); toast("Removed from wishlist"); }
  else        { state.wishlist.push(id);    toast("♥ Saved"); }
  save(); refreshHeader();
  document.querySelectorAll(`.product[data-id="${id}"] .product__wish`).forEach(b => {
    const on = state.wishlist.includes(id);
    b.classList.toggle("is-on", on); b.textContent = on?"♥":"♡";
  });
}
function renderWishlist(){
  const items = state.wishlist.map(findProduct).filter(Boolean);
  $("#wishlistEmpty").hidden = items.length > 0;
  $("#wishlistGrid").innerHTML = items.map(productCard).join("");
  bindProductCards($("#wishlistGrid"));
}

// ---------- HOME ----------
function renderHome(){
  $("#catGrid").innerHTML = CATEGORIES.map(c => `
    <div class="cat-card" data-cat="${c.id}">
      <span class="cat-card__emoji">${c.emoji}</span>
      <div class="cat-card__name">${c.name}</div>
      <div class="cat-card__count">${PRODUCTS.filter(p=>p.cat===c.id).length} items</div>
    </div>`).join("");
  $("#dealsGrid").innerHTML       = PRODUCTS.filter(p=>p.deal).slice(0,8).map(productCard).join("");
  $("#freshGrid").innerHTML       = PRODUCTS.filter(p=>p.cat==="fresh").slice(0,8).map(productCard).join("");
  $("#electronicsGrid").innerHTML = PRODUCTS.filter(p=>p.cat==="electronics").slice(0,8).map(productCard).join("");
  bindProductCards($("#dealsGrid")); bindProductCards($("#freshGrid")); bindProductCards($("#electronicsGrid"));
  $("#searchCategory").innerHTML = `<option value="all">All categories</option>` +
    CATEGORIES.map(c=>`<option value="${c.id}">${c.emoji} ${c.name}</option>`).join("");
}

// ---------- CATALOG ----------
let cs = { cat:"all", q:"", min:null, max:null, deals:false, lipa:false, sort:"relevance" };
function applyFilters(){
  let l = PRODUCTS.slice();
  if (cs.cat !== "all") l = l.filter(p=>p.cat===cs.cat);
  if (cs.q) { const q=cs.q.toLowerCase(); l = l.filter(p=>p.name.toLowerCase().includes(q)); }
  if (cs.min!=null) l = l.filter(p=>p.price>=cs.min);
  if (cs.max!=null) l = l.filter(p=>p.price<=cs.max);
  if (cs.deals)     l = l.filter(p=>p.deal);
  if (cs.lipa)      l = l.filter(isLipaEligible);
  if (cs.sort==="price-asc")  l.sort((a,b)=>a.price-b.price);
  if (cs.sort==="price-desc") l.sort((a,b)=>b.price-a.price);
  if (cs.sort==="rating")     l.sort((a,b)=>b.rating-a.rating);
  return l;
}
function renderCatalog(opts={}){
  if (opts.cat) cs.cat = opts.cat;
  if (opts.q != null) cs.q = opts.q;
  const cat = CATEGORIES.find(c=>c.id===cs.cat);
  $("#catalogTitle").textContent = cs.q ? `Results for "${cs.q}"` : (cat ? `${cat.emoji} ${cat.name}` : "All products");
  $("#filterCategories").innerHTML = `
    <li><label><input type="radio" name="cat" value="all" ${cs.cat==="all"?"checked":""}> All <span class="count">${PRODUCTS.length}</span></label></li>
    ${CATEGORIES.map(c=>{
      const n = PRODUCTS.filter(p=>p.cat===c.id).length;
      return `<li><label><input type="radio" name="cat" value="${c.id}" ${cs.cat===c.id?"checked":""}> ${c.emoji} ${c.name} <span class="count">${n}</span></label></li>`;
    }).join("")}`;
  $("#filterCategories").querySelectorAll('input[name="cat"]').forEach(r =>
    r.addEventListener("change", e => { cs.cat = e.target.value; renderCatalog(); }));
  $("#sortBy").value = cs.sort;
  const list = applyFilters();
  $("#catalogCount").textContent = `${list.length} product${list.length===1?"":"s"}`;
  $("#catalogGrid").innerHTML = list.length ? list.map(productCard).join("")
    : `<p class="muted" style="grid-column:1/-1">No products match. Clear filters to see more.</p>`;
  bindProductCards($("#catalogGrid"));
}

// ---------- PRODUCT DETAIL with Bei Tracker ----------
function priceHistory(price){
  // Deterministic-ish 30-day price walk for the demo chart
  const out = []; let v = price * 1.08;
  for (let i = 0; i < 30; i++) {
    v += (Math.sin(i*0.6) * price * 0.04) + (Math.random()-0.5) * price * 0.03;
    v = Math.max(price * 0.85, Math.min(price * 1.2, v));
    out.push(Math.round(v));
  }
  out[29] = price;
  return out;
}
function chartSVG(history){
  const w=300, h=80, pad=4;
  const min = Math.min(...history), max = Math.max(...history);
  const step = (w - pad*2) / (history.length - 1);
  const pts = history.map((v,i) => {
    const x = pad + i*step;
    const y = max===min ? h/2 : pad + (1 - (v-min)/(max-min)) * (h - pad*2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
    <polyline points="${pts}" fill="none" stroke="#e62628" stroke-width="2"/>
    <circle cx="${pad + (history.length-1)*step}" cy="${pad + (1-(history[history.length-1]-min)/(max-min||1))*(h-pad*2)}" r="3.5" fill="#ffd500" stroke="#b0181c" stroke-width="1.5"/>
  </svg>`;
}
function renderProduct(id){
  const p = findProduct(id); if (!p) { navigate("home"); return; }
  const save = p.was ? Math.round((1 - p.price/p.was) * 100) : 0;
  const onWish = state.wishlist.includes(p.id);
  const hist = priceHistory(p.price);
  const earlier = hist[0], now = hist[hist.length-1];
  const trend = now < earlier;
  const verdict = trend ? `Bei imeshuka ${Math.round((1-now/earlier)*100)}% in 30 days — good time to buy.` :
                          `Bei imepanda ${Math.round((now/earlier-1)*100)}% in 30 days.`;
  $("#pdp").innerHTML = `
    <div class="pdp__media">${p.emoji}</div>
    <div>
      <span class="muted">${(CATEGORIES.find(c=>c.id===p.cat)||{}).name||""}${p.house?" · House Brand":""}</span>
      <h1 class="pdp__title">${p.name}</h1>
      <div class="product__rating">${stars(p.rating)} <span>${p.rating.toFixed(1)} · 100+ reviews</span></div>
      <div class="pdp__price-row">
        <span class="pdp__price-now">${fmt(p.price)}</span>
        ${p.was ? `<span class="pdp__price-old">${fmt(p.was)}</span><span class="pdp__price-save">SAVE ${save}%</span>` : ""}
      </div>
      <p class="muted">${p.unit}. Stocked at all 8 Kipchimatt branches and our distribution warehouse.</p>
      <div class="beichart">
        <h4>📈 Bei Tracker — last 30 days</h4>
        ${chartSVG(hist)}
        <div class="beichart__legend"><span>30 days ago: ${fmt(earlier)}</span><span>Today: ${fmt(now)}</span></div>
        <div class="beichart__verdict ${trend?"":"is-up"}">${verdict}</div>
      </div>
      ${isLipaEligible(p) ? `
        <div class="lipa-eligible">
          <strong>🐢 Lipa Pole Pole eligible</strong>
          Take it home today, pay ${fmt(p.price/3)} × 3 monthly via M-Pesa. Zero interest.
        </div>` : ""}
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
        <div><strong>Delivery</strong> Same-day · 8 branches</div>
        <div><strong>Returns</strong> 7-day easy returns</div>
        <div><strong>Payment</strong> M-Pesa · Card · COD · Lipa Pole Pole</div>
        <div><strong>Pickup</strong> Mama Mboga points available</div>
      </div>
    </div>`;
  $("#pdpQty").addEventListener("click", e => {
    const d = e.target.dataset.d; if (!d) return;
    const inp = $("#pdpQtyVal"); inp.value = Math.max(1, (+inp.value||1) + +d);
  });
  $("#pdpAdd").addEventListener("click", () => addToCart(id, Math.max(1, +$("#pdpQtyVal").value||1)));
  $("#pdpWish").addEventListener("click", () => { toggleWish(id); renderProduct(id); });
}

// ---------- CART RENDER (with Pamoja attribution) ----------
function renderCart(){
  const items = cartItems();
  const v = $("#cartView");
  if (!items.length) {
    v.innerHTML = `<div class="cart-empty"><div class="cart-empty__emoji">🛒</div><h2>Your cart is empty</h2>
      <p class="muted">Try Mpishi or Bei Yangu to fill it fast.</p>
      <button class="btn btn--primary btn--lg" data-route="home">Continue shopping</button></div>`;
    return;
  }
  const sub = cartSubtotal();
  const delivery = sub >= 3000 ? 0 : 200;
  const promoOff = state.promo ? promoDiscount(sub) : 0;
  const total = Math.max(0, sub - promoOff) + delivery;
  const pamojaBanner = state.pamoja ? `
    <div class="pamoja-banner">
      <div class="pamoja-banner__avatars">
        ${state.pamoja.members.map(m=>`<span title="${m.name}">${m.initial}</span>`).join("")}
      </div>
      <div>
        <strong>👨‍👩‍👧 Pamoja Cart active</strong> · Code <code>${state.pamoja.code}</code><br/>
        <small class="muted">Items show who added them. We'll split the bill at checkout.</small>
      </div>
      <button class="btn btn--ghost btn--sm" id="leavePamoja">Leave</button>
    </div>` : "";
  v.innerHTML = `
    ${pamojaBanner}
    <div class="cart__lines">
      ${items.map(({p,qty,by}) => `
        <div class="cart-line" data-id="${p.id}">
          <div class="cart-line__media">${p.emoji}${by?`<span class="cart-line__avatar">${initials(by)}</span>`:""}</div>
          <div>
            <div class="cart-line__name">${p.name}</div>
            <div class="cart-line__price">${fmt(p.price)} <small class="muted">/ ${p.unit}</small></div>
            ${by ? `<div class="cart-line__by">Added by ${by}</div>` : ""}
            <div class="cart-line__qty"><button data-d="-1">−</button><span>${qty}</span><button data-d="1">+</button></div>
            <a class="cart-line__remove" href="#" data-remove>Remove</a>
          </div>
          <div class="cart-line__total">${fmt(p.price * qty)}</div>
        </div>`).join("")}
    </div>
    <aside class="summary">
      <h3>Order summary</h3>
      <div class="summary__row"><span>Subtotal (${cartItemCount()} items)</span><span>${fmt(sub)}</span></div>
      <div class="summary__row"><span>Delivery</span><span>${delivery?fmt(delivery):"FREE"}</span></div>
      ${promoOff?`<div class="summary__row"><span>Promo (${state.promo})</span><span>-${fmt(promoOff)}</span></div>`:""}
      <div class="summary__row summary__row--total"><span>Total</span><strong>${fmt(total)}</strong></div>
      <form class="summary__promo" id="promoForm">
        <input type="text" placeholder="Promo (try KIPCHIM10)" value="${state.promo||""}" />
        <button class="btn btn--ghost">Apply</button>
      </form>
      <button class="btn btn--gold btn--block btn--lg" data-route="checkout">Proceed to Checkout</button>
      <p class="muted" style="margin-top:10px;font-size:.8rem;text-align:center">You'll earn <strong>${Math.floor(total/100)}</strong> KipChim points ⭐</p>
    </aside>`;
  v.querySelectorAll(".cart-line").forEach(line => {
    const id = line.dataset.id;
    line.querySelectorAll(".cart-line__qty button").forEach(b => b.addEventListener("click", () => {
      const d = +b.dataset.d;
      const cur = state.cart[id]; const curQty = typeof cur==="number"?cur:cur.qty;
      setQty(id, curQty + d); renderCart();
    }));
    line.querySelector("[data-remove]").addEventListener("click", e => { e.preventDefault(); setQty(id,0); renderCart(); });
  });
  $("#promoForm").addEventListener("submit", e => {
    e.preventDefault();
    const code = e.target.querySelector("input").value.trim().toUpperCase();
    if (!code) { state.promo = null; save(); renderCart(); return; }
    if (PROMOS[code]) { state.promo = code; save(); renderCart(); toast(`✓ Promo "${code}" applied`); }
    else toast("✗ Invalid promo code");
  });
  if (state.pamoja) $("#leavePamoja").addEventListener("click", () => {
    state.pamoja = null; save(); refreshHeader(); renderCart(); toast("Left Pamoja Cart");
  });
}
const PROMOS = { KIPCHIM10:{type:"pct",value:10}, FRESH50:{type:"flat",value:50}, MAMA200:{type:"flat",value:200} };
function promoDiscount(sub){ const c = PROMOS[state.promo]; if(!c) return 0; return c.type==="pct" ? Math.round(sub*c.value/100) : c.value; }

// ---------- CHECKOUT ----------
let cstep = 1;
let cdata = {
  deliveryType:"delivery",      // delivery | pickup | mboga | tuma
  branch: BRANCHES[7].name,     // Eldoret default
  kiosk: KIOSKS[0].name,
  address:{ name:"", phone:"", line1:"", town:"Eldoret", notes:"" },
  recipient:{ name:"", phone:"", town:"Kapsabet", line1:"", note:"" }, // Tuma Nyumbani
  payment:"mpesa",              // mpesa | card | cod | lipa
  mpesaPhone:"",
  redeemPoints:false,
};
function renderCheckout(){
  const items = cartItems(); if (!items.length) { navigate("cart"); return; }
  const sub = cartSubtotal();
  const delivery = (cdata.deliveryType==="pickup"||cdata.deliveryType==="mboga") ? 0 : (sub>=3000?0:200);
  const promoOff = state.promo ? promoDiscount(sub) : 0;
  const ptsOff = cdata.redeemPoints ? Math.min(state.rewardsPoints*0.5, sub - promoOff) : 0;
  const total = Math.max(0, sub - promoOff - ptsOff) + delivery;
  $("#checkoutView").innerHTML = `
    <div>
      <div class="checkout__steps">
        <div class="step ${cstep===1?"is-active":cstep>1?"is-done":""}">1. Delivery</div>
        <div class="step ${cstep===2?"is-active":cstep>2?"is-done":""}">2. Payment</div>
        <div class="step ${cstep===3?"is-active":""}">3. Confirm</div>
      </div>
      <div class="checkout__panel">${cstep===1?stepDelivery():cstep===2?stepPayment(total):stepConfirm(total)}</div>
    </div>
    <aside class="summary">
      <h3>Your order</h3>
      ${items.map(({p,qty}) => `<div class="summary__row"><span>${p.emoji} ${p.name.split(" - ")[0]} × ${qty}</span><span>${fmt(p.price*qty)}</span></div>`).join("")}
      <div class="summary__row" style="border-top:1px solid var(--line);margin-top:8px;padding-top:8px"><span>Subtotal</span><span>${fmt(sub)}</span></div>
      <div class="summary__row"><span>Delivery</span><span>${delivery?fmt(delivery):"FREE"}</span></div>
      ${promoOff?`<div class="summary__row"><span>Promo</span><span>-${fmt(promoOff)}</span></div>`:""}
      ${ptsOff?`<div class="summary__row"><span>Points</span><span>-${fmt(ptsOff)}</span></div>`:""}
      <div class="summary__row summary__row--total"><span>Total</span><strong>${fmt(total)}</strong></div>
    </aside>`;
  bindCheckout(total);
}
function stepDelivery(){
  const d = cdata;
  return `
    <h3>How would you like to receive your order?</h3>
    <label class="delivery-option ${d.deliveryType==='delivery'?'is-active':''}">
      <input type="radio" name="dt" value="delivery" ${d.deliveryType==='delivery'?'checked':''}>
      <div><strong>🚚 Boda delivery</strong><small>Live tracking. Same-day around our 8 branches. Free above KSh 3,000.</small></div>
    </label>
    <label class="delivery-option ${d.deliveryType==='pickup'?'is-active':''}">
      <input type="radio" name="dt" value="pickup" ${d.deliveryType==='pickup'?'checked':''}>
      <div><strong>🏪 Branch pickup</strong><small>Free. Ready in 1 hour at any of our 8 stores.</small></div>
    </label>
    <label class="delivery-option ${d.deliveryType==='mboga'?'is-active':''}">
      <input type="radio" name="dt" value="mboga" ${d.deliveryType==='mboga'?'checked':''}>
      <div><strong>🏪 Mama Mboga point</strong><small>Free. Collect from a partner kiosk on your street.</small></div>
    </label>
    <label class="delivery-option ${d.deliveryType==='tuma'?'is-active':''}">
      <input type="radio" name="dt" value="tuma" ${d.deliveryType==='tuma'?'checked':''}>
      <div><strong>✈️ Tuma Nyumbani</strong><small>Send this shop to a relative. Add a voice note.</small></div>
    </label>

    ${d.deliveryType==="pickup" ? `
      <div class="field"><label>Pick from branch</label>
        <select name="branch">${BRANCHES.map(b=>`<option ${d.branch===b.name?'selected':''}>${b.name}</option>`).join("")}</select>
      </div>` : ""}
    ${d.deliveryType==="mboga" ? `
      <div class="field"><label>Pick from kiosk</label>
        <select name="kiosk">${KIOSKS.map(k=>`<option ${d.kiosk===k.name?'selected':''}>${k.name} — ${k.dist}</option>`).join("")}</select>
        <small class="muted">Mama earns KSh 30 per pickup.</small>
      </div>` : ""}
    ${d.deliveryType==="delivery" ? `
      <div class="field-row">
        <div class="field"><label>Full name</label><input name="name" required value="${d.address.name}" placeholder="Jane Wanjiku"></div>
        <div class="field"><label>Phone</label><input name="phone" required value="${d.address.phone}" placeholder="0712 345 678"></div>
      </div>
      <div class="field"><label>Delivery address</label><input name="line1" required value="${d.address.line1}" placeholder="Estate / Street / House no."></div>
      <div class="field"><label>Town</label>
        <select name="town">${["Kericho","Eldoret","Kapsabet","Litein","Nandi Hills","Bomet","Kisumu","Nakuru"].map(t=>`<option ${d.address.town===t?'selected':''}>${t}</option>`).join("")}</select>
      </div>
      <div class="field"><label>Delivery notes (optional)</label><textarea name="notes" rows="2" placeholder="Gate code, landmark…">${d.address.notes}</textarea></div>` : ""}
    ${d.deliveryType==="tuma" ? `
      <div class="field-row">
        <div class="field"><label>Recipient's name</label><input name="rname" required value="${d.recipient.name}" placeholder="Mama Wanjiku"></div>
        <div class="field"><label>Recipient's phone</label><input name="rphone" required value="${d.recipient.phone}" placeholder="0712 345 678"></div>
      </div>
      <div class="field"><label>Recipient's address</label><input name="rline" required value="${d.recipient.line1}" placeholder="Estate / Village / Plot"></div>
      <div class="field"><label>Town</label>
        <select name="rtown">${BRANCHES.map(b=>`<option ${d.recipient.town===b.name?'selected':''}>${b.name}</option>`).join("")}</select>
      </div>
      <div class="voice-note">
        <button type="button" id="recBtn" aria-label="Record voice note">🎙️</button>
        <div><strong>Add a voice note</strong><br/><small class="muted">"Hi mum, sukuma na unga. Tutaongea Jumamosi."</small></div>
      </div>` : ""}
    <div style="display:flex;justify-content:space-between;margin-top:14px">
      <button class="btn btn--ghost" data-route="cart">← Back to cart</button>
      <button class="btn btn--primary btn--lg" id="goPay">Continue to payment →</button>
    </div>`;
}
function stepPayment(total){
  const d = cdata;
  const lipaShown = total >= 5000;
  return `
    <h3>Payment method</h3>
    <label class="pay-option ${d.payment==='mpesa'?'is-active':''}">
      <input type="radio" name="pm" value="mpesa" ${d.payment==='mpesa'?'checked':''}>
      <div><strong>📱 M-Pesa Express (STK Push)</strong><small>Prompt sent to your phone. Fast and secure.</small></div>
    </label>
    ${d.payment==='mpesa' ? `<div class="field" style="margin-left:32px"><label>M-Pesa phone</label><input name="mpesaPhone" placeholder="0712 345 678" value="${d.mpesaPhone||d.address.phone}"></div>` : ""}
    ${lipaShown ? `
    <label class="pay-option ${d.payment==='lipa'?'is-active':''}">
      <input type="radio" name="pm" value="lipa" ${d.payment==='lipa'?'checked':''}>
      <div><strong>🐢 Lipa Pole Pole — split into 3</strong><small>3 monthly M-Pesa payments. 0% interest. Approval in 60 seconds.</small>
        ${d.payment==='lipa' ? `
          <div class="lipa-schedule">
            <div>Today<strong>${fmt(total/3)}</strong></div>
            <div>+30 days<strong>${fmt(total/3)}</strong></div>
            <div>+60 days<strong>${fmt(total/3)}</strong></div>
          </div>` : ""}
      </div>
    </label>` : ""}
    <label class="pay-option ${d.payment==='card'?'is-active':''}">
      <input type="radio" name="pm" value="card" ${d.payment==='card'?'checked':''}>
      <div><strong>💳 Card (Visa / Mastercard)</strong><small>Encrypted via secure gateway.</small></div>
    </label>
    <label class="pay-option ${d.payment==='cod'?'is-active':''}">
      <input type="radio" name="pm" value="cod" ${d.payment==='cod'?'checked':''}>
      <div><strong>💵 Cash on Delivery</strong><small>Pay the rider when your order arrives. Up to KSh 10,000.</small></div>
    </label>
    <div class="field" style="margin-top:14px;padding:14px;background:var(--green-l);border-radius:10px">
      <label><input type="checkbox" name="redeem" ${d.redeemPoints?'checked':''}> Redeem ${state.rewardsPoints} KipChim points (worth ${fmt(state.rewardsPoints*0.5)})</label>
    </div>
    <div style="display:flex;justify-content:space-between;margin-top:14px">
      <button class="btn btn--ghost" id="backDel">← Back</button>
      <button class="btn btn--primary btn--lg" id="goConfirm">Review order →</button>
    </div>`;
}
function stepConfirm(total){
  const d = cdata;
  let where;
  if (d.deliveryType==="delivery") where = `${d.address.name}, ${d.address.phone} — ${d.address.line1}, ${d.address.town}`;
  else if (d.deliveryType==="pickup") where = `Branch pickup at ${d.branch}`;
  else if (d.deliveryType==="mboga")  where = `Mama Mboga pickup: ${d.kiosk}`;
  else                                where = `Tuma to ${d.recipient.name} (${d.recipient.phone}) — ${d.recipient.line1}, ${d.recipient.town}`;
  return `
    <h3>One last look</h3>
    <p><strong>Delivery:</strong> ${where}</p>
    <p><strong>Payment:</strong> ${d.payment==="mpesa"?`M-Pesa (${d.mpesaPhone||d.address.phone})`:d.payment==="lipa"?"Lipa Pole Pole — 3 instalments":d.payment==="card"?"Card":"Cash on Delivery"}</p>
    <p><strong>Total:</strong> ${fmt(total)}</p>
    <p class="muted">By placing this order you agree to Kipchimatt's terms of sale.</p>
    <div style="display:flex;justify-content:space-between;margin-top:14px">
      <button class="btn btn--ghost" id="backPay">← Back</button>
      <button class="btn btn--gold btn--lg" id="placeOrder">Place order ✓</button>
    </div>`;
}
function bindCheckout(total){
  if (cstep === 1) {
    $$('input[name="dt"]').forEach(r => r.addEventListener("change", e => { cdata.deliveryType = e.target.value; renderCheckout(); }));
    $(".checkout__panel").querySelectorAll("input[name],select[name],textarea[name]").forEach(el => {
      el.addEventListener("input", () => {
        const n = el.name;
        if (n==="branch") cdata.branch = el.value;
        else if (n==="kiosk") cdata.kiosk = el.value;
        else if (["name","phone","line1","town","notes"].includes(n)) cdata.address[n] = el.value;
        else if (n==="rname")  cdata.recipient.name  = el.value;
        else if (n==="rphone") cdata.recipient.phone = el.value;
        else if (n==="rline")  cdata.recipient.line1 = el.value;
        else if (n==="rtown")  cdata.recipient.town  = el.value;
      });
    });
    const rec = $("#recBtn"); if (rec) rec.addEventListener("click", () => toast("🎙️ Voice note recorded (demo)"));
    $("#goPay").addEventListener("click", () => {
      if (cdata.deliveryType==="delivery") { const a=cdata.address; if (!a.name||!a.phone||!a.line1) return toast("Please fill all fields"); }
      if (cdata.deliveryType==="tuma")     { const r=cdata.recipient; if (!r.name||!r.phone||!r.line1) return toast("Please fill all fields"); }
      cstep = 2; renderCheckout();
    });
  }
  if (cstep === 2) {
    $$('input[name="pm"]').forEach(r => r.addEventListener("change", e => { cdata.payment = e.target.value; renderCheckout(); }));
    const mp = $('input[name="mpesaPhone"]'); if (mp) mp.addEventListener("input", e => cdata.mpesaPhone = e.target.value);
    const rd = $('input[name="redeem"]'); if (rd) rd.addEventListener("change", e => { cdata.redeemPoints = e.target.checked; renderCheckout(); });
    $("#backDel").addEventListener("click", () => { cstep = 1; renderCheckout(); });
    $("#goConfirm").addEventListener("click", () => { cstep = 3; renderCheckout(); });
  }
  if (cstep === 3) {
    $("#backPay").addEventListener("click", () => { cstep = 2; renderCheckout(); });
    $("#placeOrder").addEventListener("click", () => placeOrder(total));
  }
}
function placeOrder(total){
  if (cdata.payment === "mpesa") {
    openModal(`<h2>📱 STK push sent</h2><p>Enter your M-Pesa PIN on <strong>${cdata.mpesaPhone||cdata.address.phone||"your phone"}</strong> to authorize ${fmt(total)}.</p>
      <p class="muted">⏳ Waiting for confirmation…</p>`);
    setTimeout(() => { closeModal(); finalizeOrder(total); }, 1600);
  } else finalizeOrder(total);
}
function finalizeOrder(total){
  const items = cartItems();
  const order = {
    id: "KCM-" + Date.now().toString().slice(-6),
    placedAt: new Date().toISOString(),
    items: items.map(({p,qty,by}) => ({ id:p.id, name:p.name, emoji:p.emoji, price:p.price, qty, by })),
    total, status: cdata.payment==="cod" ? "pending" : "paid",
    delivery_type: cdata.deliveryType,
    where: cdata.deliveryType==="delivery" ? cdata.address : cdata.deliveryType==="pickup" ? {branch:cdata.branch} :
           cdata.deliveryType==="mboga"    ? {kiosk:cdata.kiosk}    : {recipient:cdata.recipient},
    payment: cdata.payment,
    pointsEarned: Math.floor(total/100),
  };
  state.orders.unshift(order);
  state.rewardsPoints += order.pointsEarned;
  state.cart = {}; state.promo = null; cstep = 1; cdata.redeemPoints = false;
  save(); refreshHeader();
  $$(".view").forEach(v=>v.hidden=true); $('.view[data-view="home"]').hidden=false;
  openModal(`<div style="text-align:center"><div style="font-size:3.5rem">🎉</div>
    <h2>Asante! Order placed.</h2>
    <p>Order <strong>${order.id}</strong> received. ${cdata.payment==="lipa"?"First instalment confirmed.":""}</p>
    <p class="muted">${order.delivery_type==="delivery"?"Boda dispatching shortly. Live tracking available.":order.delivery_type==="tuma"?"Sending to your relative now. They'll get an SMS.":"Ready for pickup in 1 hour."}</p>
    <p>You earned <strong>${order.pointsEarned} KipChim points</strong> ⭐</p>
    <div style="display:flex;gap:10px;justify-content:center;margin-top:16px">
      <button class="btn btn--ghost" data-close>Continue shopping</button>
      <button class="btn btn--primary" id="viewOrder">Track order</button>
    </div></div>`);
  $("#viewOrder").addEventListener("click", () => { closeModal(); navigate("orders"); });
}

// ---------- ORDERS with live boda map ----------
function renderOrders(){
  const v = $("#ordersView");
  if (!state.orders.length) { v.innerHTML = `<p class="muted">No orders yet. <a href="#" data-route="home">Start shopping →</a></p>`; return; }
  v.innerHTML = state.orders.map(o => {
    const stepIdx = o.status==="delivered"?5:o.status==="shipped"?3:o.status==="paid"?2:1;
    const date = new Date(o.placedAt).toLocaleString("en-KE", {dateStyle:"medium",timeStyle:"short"});
    const showMap = o.delivery_type==="delivery" && stepIdx >= 2;
    return `<div class="order">
      <div class="order__head">
        <div><div class="order__id">${o.id}</div><div class="muted" style="font-size:.85rem">Placed ${date} · ${fmt(o.total)}</div></div>
        <span class="order__status status-${o.status}">${o.status}</span>
      </div>
      <div class="order__items">${o.items.map(i=>`${i.emoji} ${i.name.split(" - ")[0]} × ${i.qty}`).join(" · ")}</div>
      <div class="tracker">
        ${["Placed","Paid","Packed","Out for delivery","Delivered"].map((label,i)=>`
          <div class="tracker__step ${i<stepIdx?"is-done":""}">
            <div class="tracker__dot">${i<stepIdx?"✓":""}</div><span>${label}</span>
          </div>`).join("")}
      </div>
      ${showMap ? `
        <div class="bodamap">
          <h4>🛵 Live boda tracking</h4>
          <div class="bodamap__map">
            <div class="bodamap__route"></div>
            <div class="bodamap__store">🏪</div>
            <div class="bodamap__home">🏠</div>
            <div class="bodamap__rider">🛵</div>
          </div>
          <div class="bodamap__eta"><span>Rider: Kibet · KAA 234X</span><span>ETA 4 min</span></div>
        </div>` : ""}
    </div>`;
  }).join("");
}

// ---------- OFFERS ----------
function renderOffers(){
  const list = PRODUCTS.filter(p=>p.deal);
  $("#offersGrid").innerHTML = list.map(productCard).join("");
  bindProductCards($("#offersGrid"));
}

// ---------- ACCOUNT ----------
let aTab = "overview";
function renderAccount(){
  const v = $("#accountView");
  if (!state.user) {
    v.style.gridTemplateColumns = "1fr";
    v.innerHTML = `<div class="account__panel" style="max-width:420px;margin:0 auto">
      <h2>Sign in</h2>
      <p class="muted">Create your account in seconds.</p>
      <form id="signinForm">
        <div class="field"><label>Full name</label><input name="name" required placeholder="Jane Wanjiku"></div>
        <div class="field"><label>Phone</label><input name="phone" required placeholder="0712 345 678"></div>
        <div class="field"><label>Email (optional)</label><input name="email" type="email"></div>
        <button class="btn btn--primary btn--block btn--lg">Continue</button>
      </form></div>`;
    $("#signinForm").addEventListener("submit", e => {
      e.preventDefault();
      state.user = Object.fromEntries(new FormData(e.target));
      save(); refreshHeader(); renderAccount(); toast(`Karibu, ${state.user.name.split(" ")[0]}!`);
    });
    return;
  }
  v.style.gridTemplateColumns = "240px 1fr";
  v.innerHTML = `
    <nav class="account-nav">
      ${[["overview","📋 Overview"],["profile","👤 Profile"],["rewards","⭐ Rewards"],["orders","📦 Orders"],["receipt","🧾 Scan receipt"],["logout","🚪 Sign out"]]
        .map(([t,l])=>`<button data-tab="${t}" class="${aTab===t?'is-active':''}">${l}</button>`).join("")}
    </nav>
    <div class="account__panel">${accountPanel()}</div>`;
  v.querySelectorAll(".account-nav button").forEach(b => b.addEventListener("click", () => {
    const t = b.dataset.tab;
    if (t==="logout") { state.user=null; save(); refreshHeader(); renderAccount(); toast("Signed out"); return; }
    if (t==="orders") { navigate("orders"); return; }
    aTab = t; renderAccount();
  }));
  const rs = $("#receiptScan");
  if (rs) rs.addEventListener("click", () => {
    state.rewardsPoints += 18;
    save(); refreshHeader();
    toast("✓ Receipt scanned · +18 KipChim points earned");
    renderAccount();
  });
}
function accountPanel(){
  const u = state.user;
  if (aTab === "overview") return `
    <h2>Karibu, ${u.name.split(" ")[0]} 👋</h2>
    <div class="rewards">
      <div class="reward-card"><h4>KipChim Points</h4><div class="big">${state.rewardsPoints}</div><p>Worth ${fmt(state.rewardsPoints*0.5)}</p></div>
      <div class="reward-card reward-card--gold"><h4>Total orders</h4><div class="big">${state.orders.length}</div><p>Lifetime ${fmt(state.orders.reduce((s,o)=>s+o.total,0))}</p></div>
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px">
      <button class="btn btn--primary" data-route="home">Continue shopping</button>
      <button class="btn btn--ghost" data-route="orders">View orders</button>
      <button class="btn btn--ghost" data-route="pamoja">Open Pamoja Cart</button>
    </div>`;
  if (aTab === "profile") return `
    <h2>Profile</h2>
    <form id="profileForm">
      <div class="field-row">
        <div class="field"><label>Name</label><input name="name" value="${u.name||''}"></div>
        <div class="field"><label>Phone</label><input name="phone" value="${u.phone||''}"></div>
      </div>
      <div class="field"><label>Email</label><input name="email" type="email" value="${u.email||''}"></div>
      <button class="btn btn--primary">Save</button>
    </form>`;
  if (aTab === "rewards") return `
    <h2>⭐ KipChim Rewards</h2>
    <p>1 point per KSh 100. 100 points = KSh 50 off.</p>
    <div class="rewards">
      <div class="reward-card"><h4>Balance</h4><div class="big">${state.rewardsPoints} pts</div><p>${fmt(state.rewardsPoints*0.5)}</p></div>
      <div class="reward-card reward-card--gold"><h4>Tier</h4><div class="big">${state.rewardsPoints>=500?"Gold":state.rewardsPoints>=200?"Silver":"Bronze"}</div></div>
    </div>`;
  if (aTab === "receipt") return `
    <h2>🧾 Scan an in-store receipt</h2>
    <p>Bought something at Kipchimatt in person? Snap your paper receipt and we'll add the points to your wallet — bridging your offline shopping into the loyalty programme.</p>
    <div style="border:2px dashed var(--green);padding:30px;border-radius:12px;text-align:center;margin:14px 0">
      <div style="font-size:3.5rem">📸</div>
      <p>Tap below to demo a scan.</p>
      <button class="btn btn--primary" id="receiptScan">Scan receipt</button>
    </div>
    <p class="muted">In production we'd OCR the receipt, match SKUs, and award points minus any already earned online.</p>`;
  return "";
}

// ---------- PAMOJA CART ----------
function renderPamoja(){
  const v = $("#pamojaView");
  if (!state.pamoja) {
    v.innerHTML = `
      <div class="pamoja-page">
        <div class="pamoja-card">
          <h3>Start a new Pamoja Cart</h3>
          <p>Pool a family or chama shop. Everyone adds from their own phone.</p>
          <button class="btn btn--gold btn--lg" id="startPamoja">Start group cart →</button>
        </div>
        <div class="pamoja-card">
          <h3>Join one</h3>
          <p>Got a code from a family member?</p>
          <input id="joinCode" placeholder="Enter 6-letter code" style="padding:10px;border:1px solid var(--line);border-radius:8px;width:100%;margin:10px 0;text-transform:uppercase">
          <button class="btn btn--primary btn--lg" id="joinPamoja">Join</button>
        </div>
      </div>`;
    $("#startPamoja").addEventListener("click", () => {
      const code = Math.random().toString(36).slice(2,8).toUpperCase();
      const me = state.user?.name?.split(" ")[0] || "You";
      state.pamoja = { code, members:[{ name:me, initial:initials(me) }] };
      save(); refreshHeader(); renderPamoja();
    });
    $("#joinPamoja").addEventListener("click", () => {
      const code = $("#joinCode").value.trim().toUpperCase();
      if (code.length < 4) return toast("Enter a valid code");
      const me = state.user?.name?.split(" ")[0] || "You";
      state.pamoja = { code, members:[
        { name:"Mama Wanjiku", initial:"MW" },
        { name:"Baba",         initial:"B" },
        { name:me,             initial:initials(me) },
      ]};
      save(); refreshHeader(); renderPamoja(); toast(`Joined Pamoja "${code}"`);
    });
    return;
  }
  const pj = state.pamoja;
  v.innerHTML = `
    <div class="pamoja-page">
      <div class="pamoja-card">
        <h3>Active group cart</h3>
        <code>${pj.code}</code>
        <div class="qr"></div>
        <p class="muted">Share this code or scan the QR to add family/chama members.</p>
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
          <button class="btn btn--ghost" id="copyCode">Copy code</button>
          <button class="btn btn--ghost" id="shareWA">Share via WhatsApp</button>
          <button class="btn btn--danger" id="endPamoja">End group cart</button>
        </div>
      </div>
      <div class="pamoja-card">
        <h3>Members (${pj.members.length})</h3>
        <div class="pamoja-members__list">
          ${pj.members.map(m => `<div class="pamoja-member">
            <div class="pamoja-member__avatar">${m.initial}</div>
            <div><strong>${m.name}</strong></div>
            <div class="pamoja-member__items">${cartItems().filter(i=>i.by===m.name).reduce((s,i)=>s+i.qty,0)} items</div>
          </div>`).join("")}
          <button class="btn btn--ghost btn--sm" id="addMember">+ Add demo member</button>
        </div>
        <p class="muted" style="margin-top:14px;font-size:.85rem">💡 <strong>Bulk discount unlocked at 5+ members.</strong> Save ~5% on the whole order.</p>
      </div>
    </div>`;
  $("#copyCode").addEventListener("click", () => { try{ navigator.clipboard.writeText(pj.code); toast("✓ Code copied"); }catch{ toast(pj.code); } });
  $("#shareWA").addEventListener("click", () => toast("WhatsApp share link generated (demo)"));
  $("#endPamoja").addEventListener("click", () => { state.pamoja = null; save(); refreshHeader(); renderPamoja(); toast("Group cart ended"); });
  $("#addMember").addEventListener("click", () => {
    const names = [["Auntie Cherono","AC"],["Uncle Kibet","UK"],["Sister Faith","SF"],["Cousin Brian","CB"]];
    const pick = names[Math.floor(Math.random()*names.length)];
    pj.members.push({ name:pick[0], initial:pick[1] });
    save(); refreshHeader(); renderPamoja(); toast(`${pick[0]} joined Pamoja`);
  });
}

// ---------- MPISHI ----------
function renderMpishi(){
  $("#recipeGrid").innerHTML = RECIPES.map(r => {
    const cost = r.ing.reduce((s,i)=> s + (findProduct(i.id)?.price||0)*i.qty, 0);
    return `<div class="recipe" data-id="${r.id}">
      <div class="recipe__emoji">${r.emoji}</div>
      <div class="recipe__name">${r.name}</div>
      <div class="recipe__meta"><span>⏱ ${r.time}</span><span>👥 serves ${r.serves}</span></div>
      <div class="recipe__price">${fmt(cost)} <small style="font-weight:400;color:var(--muted)">(${r.ing.length} items)</small></div>
    </div>`;
  }).join("");
  $$(".recipe").forEach(el => el.addEventListener("click", () => openRecipe(el.dataset.id)));
}
function openRecipe(rid){
  const r = RECIPES.find(x=>x.id===rid); if (!r) return;
  let serves = r.serves;
  const render = () => {
    const factor = serves / r.serves;
    const lines = r.ing.map(i => {
      const p = findProduct(i.id); const qty = Math.max(1, Math.round(i.qty * factor));
      return { p, qty };
    });
    const total = lines.reduce((s,l)=> s + l.p.price*l.qty, 0);
    return `<div class="recipe-modal">
      <div style="font-size:3rem;text-align:center">${r.emoji}</div>
      <h2 style="text-align:center">${r.name}</h2>
      <p class="muted" style="text-align:center">${r.time} · serves ${serves}</p>
      <div class="servings">
        <span>👥</span>
        <input type="range" id="servSlider" min="1" max="12" value="${serves}">
        <strong>${serves}</strong>
      </div>
      <h4 style="margin:14px 0 6px">Ingredients (auto-sized)</h4>
      ${lines.map(l => `<div class="ing"><span>${l.p.emoji} ${l.p.name.split(" - ")[0]} × ${l.qty}</span><span>${fmt(l.p.price*l.qty)}</span></div>`).join("")}
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px;padding-top:14px;border-top:1px solid var(--line)">
        <strong>Total: ${fmt(total)}</strong>
        <button class="btn btn--gold btn--lg" id="addRecipe">Add ${lines.length} items to cart</button>
      </div>
    </div>`;
  };
  openModal(render());
  const wire = () => {
    $("#servSlider").addEventListener("input", e => { serves = +e.target.value; $("#modalBody").innerHTML = render(); wire(); });
    $("#addRecipe").addEventListener("click", () => {
      const factor = serves / r.serves;
      r.ing.forEach(i => addToCart(i.id, Math.max(1, Math.round(i.qty * factor))));
      closeModal(); navigate("cart");
    });
  };
  wire();
}

// ---------- BEI YANGU (budget builder) ----------
function renderBeiYangu(){
  let budget = 2000;
  const draw = () => {
    // simple greedy basket: prioritise pantry essentials, then fresh, then dairy/bakery
    const order = ["pantry","fresh","dairy","bakery","household","baby"];
    const candidates = PRODUCTS.filter(p => order.includes(p.cat)).sort((a,b)=> a.price - b.price);
    const basket = []; let spent = 0;
    for (const p of candidates) {
      if (spent + p.price <= budget) { basket.push(p); spent += p.price; }
      if (basket.length >= 14) break;
    }
    const pct = Math.min(100, Math.round(spent / budget * 100));
    return `
      <h2>How much do you have to spend this week?</h2>
      <div class="bbuilder__amount">${fmt(budget)}</div>
      <div class="bbuilder__slider"><input type="range" id="bSlider" min="500" max="10000" step="100" value="${budget}"></div>
      <div class="bbuilder__labels"><span>KSh 500</span><span>KSh 10,000</span></div>
      <div class="bbuilder__basket">
        <div style="display:flex;justify-content:space-between;font-size:.9rem">
          <span><strong>${basket.length} items</strong> · ${fmt(spent)} of ${fmt(budget)}</span>
          <span style="color:var(--green-d);font-weight:700">${fmt(budget - spent)} left</span>
        </div>
        <div class="bbuilder__bar"><div class="bbuilder__bar-fill" style="width:${pct}%">${pct}%</div></div>
        <div class="bbuilder__items">
          ${basket.map(p => `<div class="bbitem"><span class="bbitem__emoji">${p.emoji}</span>
            <div><div class="bbitem__name">${p.name.split(" - ")[0]}</div><div class="bbitem__price">${fmt(p.price)}</div></div></div>`).join("")}
        </div>
        <div style="margin-top:18px;display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn--gold btn--lg" id="addBasket">Add all ${basket.length} items to cart</button>
          <button class="btn btn--ghost" id="recBasket">↻ Build a different basket</button>
        </div>
        <p class="muted" style="margin-top:12px;font-size:.85rem">💡 Smart basket prioritises pantry staples, then fresh, then dairy. Maximum nutrition per shilling.</p>
      </div>`;
  };
  $("#bbuilderView").innerHTML = draw();
  const wire = () => {
    $("#bSlider").addEventListener("input", e => { budget = +e.target.value; $("#bbuilderView").innerHTML = draw(); wire(); });
    $("#addBasket").addEventListener("click", () => {
      const order = ["pantry","fresh","dairy","bakery","household","baby"];
      const candidates = PRODUCTS.filter(p => order.includes(p.cat)).sort((a,b)=> a.price - b.price);
      let spent = 0; let added = 0;
      for (const p of candidates) {
        if (spent + p.price <= budget) { addToCart(p.id, 1); spent += p.price; added++; }
        if (added >= 14) break;
      }
      navigate("cart");
    });
    $("#recBasket").addEventListener("click", () => { $("#bbuilderView").innerHTML = draw(); wire(); });
  };
  wire();
}

// ---------- TUMA NYUMBANI ----------
function renderTuma(){
  $("#tumaView").innerHTML = `
    <div class="tuma__panel">
      <h2>How it works</h2>
      <ol style="padding-left:20px;line-height:1.9">
        <li>Add items to your cart like normal</li>
        <li>At checkout, choose <strong>"Tuma Nyumbani"</strong> as your delivery method</li>
        <li>Enter your relative's name, phone and town</li>
        <li>Optionally record a 30-second voice note 🎙️</li>
        <li>We deliver from the nearest Kipchimatt branch — they get an SMS, the package, and your voice note</li>
      </ol>
      <div style="background:var(--green-l);padding:14px;border-radius:10px;margin-top:14px">
        <strong>📍 Available to all 8 branches:</strong><br/>
        <span class="muted" style="font-size:.9rem">${BRANCHES.map(b=>b.name.split(" — ")[0]).join(" · ")}</span>
      </div>
      <button class="btn btn--gold btn--lg" data-route="catalog" style="margin-top:14px">Start shopping for them →</button>
    </div>
    <div class="tuma__map">
      <div class="tuma__from">📍 You · Toronto</div>
      <div class="tuma__line"></div>
      <div class="tuma__plane">✈️</div>
      <div class="tuma__to">🏠 Mum · Kapsabet</div>
    </div>`;
}

// ---------- LIPA POLE POLE ----------
function renderLipa(){
  const eligible = PRODUCTS.filter(isLipaEligible);
  $("#lipaView").innerHTML = `
    <div class="lipa__how">
      <div class="lipa-step"><div class="lipa-step__num">1</div><h4>Choose</h4><p>Add eligible item (KSh 5,000+) to cart.</p></div>
      <div class="lipa-step"><div class="lipa-step__num">2</div><h4>Apply</h4><p>Pick "Lipa Pole Pole" at checkout. 60-sec approval via M-Pesa.</p></div>
      <div class="lipa-step"><div class="lipa-step__num">3</div><h4>Take it home</h4><p>Pay 1/3 today. Take the goods home immediately.</p></div>
      <div class="lipa-step"><div class="lipa-step__num">4</div><h4>Pole pole</h4><p>Auto-deduct two more M-Pesa instalments at +30 and +60 days.</p></div>
    </div>
    <h2 style="margin-top:30px">Eligible items (KSh 5,000+)</h2>
    <div class="lipa-eligible-grid">${eligible.map(productCard).join("")}</div>`;
  bindProductCards($("#lipaView"));
}

// ---------- MAMA MBOGA ----------
function renderMboga(){
  $("#mbogaView").innerHTML = `
    <div class="mboga__list">
      <h3>Kiosks near you</h3>
      ${KIOSKS.map(k => `<div class="mboga-kiosk">
        <div class="mboga-kiosk__emoji">🏪</div>
        <div>
          <div class="mboga-kiosk__name">${k.name}</div>
          <div class="mboga-kiosk__addr">${k.addr}</div>
        </div>
        <div class="mboga-kiosk__dist">${k.dist}</div>
      </div>`).join("")}
      <p class="muted" style="margin-top:10px;font-size:.85rem">💡 Mama earns <strong>KSh 30 per pickup</strong>. You skip the boda fee. Win-win-win.</p>
    </div>
    <div class="mboga__map">
      <div class="mboga__pin mboga__pin--you" style="top:50%;left:50%;transform:translate(-50%,-50%)">YOU</div>
      <div class="mboga__pin" style="top:25%;left:30%">🏪</div>
      <div class="mboga__pin" style="top:35%;right:20%">🏪</div>
      <div class="mboga__pin" style="bottom:30%;left:25%">🏪</div>
      <div class="mboga__pin" style="bottom:20%;right:30%">🏪</div>
      <div class="mboga__pin" style="top:65%;left:55%">🏪</div>
    </div>`;
}

// ---------- VOICE SEARCH (demo) ----------
function openVoice(){
  $("#voice").hidden = false;
  const demo = VOICE_DEMOS[Math.floor(Math.random()*VOICE_DEMOS.length)];
  $("#voiceHeard").textContent = "";
  let i = 0;
  const id = setInterval(() => {
    $("#voiceHeard").textContent = "\"" + demo.heard.slice(0, ++i) + "\"";
    if (i >= demo.heard.length) {
      clearInterval(id);
      setTimeout(() => { $("#voice").hidden = true; navigate("catalog", { q: demo.q }); }, 700);
    }
  }, 60);
}
function closeVoice(){ $("#voice").hidden = true; }

// ---------- SPIN TO SAVE (welcome) ----------
function showSpin(){
  if (state.spinSeen) return;
  const prizes = [
    { label:"5%",  code:"KIPCHIM10",  msg:"5% off your next order!" },
    { label:"50",  code:"FRESH50",    msg:"KSh 50 off!" },
    { label:"200", code:"MAMA200",    msg:"KSh 200 off!" },
    { label:"PT",  code:null,         msg:"+50 KipChim points!" },
    { label:"FRE", code:null,         msg:"Free Sukuma bunch on your next order!" },
    { label:"☕",  code:null,         msg:"Free Mbogo Tea sample!" },
  ];
  openModal(`<div style="text-align:center">
    <span class="badge-stamp">🎁 Welcome gift</span>
    <h2 style="margin-top:10px">Spin the wheel</h2>
    <p class="muted">First-time visitor bonus. Spin once.</p>
    <div class="spin">
      <div class="spin__pointer">▼</div>
      <div class="spin__wheel" id="spinWheel"></div>
      <div class="spin__center">SPIN</div>
    </div>
    <button class="btn btn--gold btn--lg" id="spinBtn">Spin →</button>
  </div>`);
  $("#spinBtn").addEventListener("click", () => {
    const idx = Math.floor(Math.random() * prizes.length);
    const deg = 360 * 5 + (360 - idx * 60) - 30;
    $("#spinWheel").style.transform = `rotate(${deg}deg)`;
    $("#spinBtn").disabled = true;
    setTimeout(() => {
      const prize = prizes[idx];
      if (prize.code) state.promo = prize.code;
      else state.rewardsPoints += 50;
      state.spinSeen = true; save(); refreshHeader();
      $("#modalBody").innerHTML = `<div style="text-align:center">
        <div style="font-size:4rem">🎉</div>
        <h2>You won!</h2>
        <p style="font-size:1.2rem"><strong>${prize.msg}</strong></p>
        ${prize.code?`<p>Code <code style="background:var(--green-l);padding:4px 8px;border-radius:6px">${prize.code}</code> auto-applied to your next cart.</p>`:""}
        <button class="btn btn--primary btn--lg" data-close>Asante!</button>
      </div>`;
    }, 4000);
  });
}

// ---------- TIMERS / LIVE COUNTERS ----------
function startCountdown(){
  // 2:14:33 ish countdown, just for show
  let totalSec = 2*3600 + 14*60 + 33;
  const tick = () => {
    if (totalSec <= 0) totalSec = 4*3600;
    const h = String(Math.floor(totalSec/3600)).padStart(2,"0");
    const m = String(Math.floor((totalSec%3600)/60)).padStart(2,"0");
    const s = String(totalSec%60).padStart(2,"0");
    const txt = `${h}:${m}:${s}`;
    const a=$("#tickerTimer"), b=$("#bombaTimer");
    if (a) a.textContent = txt;
    if (b) b.textContent = txt;
    totalSec--;
  };
  tick(); setInterval(tick, 1000);
}
function startLiveShoppers(){
  const drift = () => {
    const n = 800 + Math.floor(Math.random()*60);
    const a = $("#liveShoppers"), b = $("#heroLiveCount"); const c = $("#heroSaved");
    if (a) a.textContent = n.toLocaleString("en-KE");
    if (b) b.textContent = n.toLocaleString("en-KE");
    if (c) c.textContent = "KSh " + (12 + Math.random()).toFixed(1) + "M";
  };
  drift(); setInterval(drift, 4500);
}

// ---------- GLOBAL ----------
function bindGlobal(){
  document.addEventListener("click", e => {
    const route = e.target.closest("[data-route]")?.dataset.route;
    const cat = e.target.closest("[data-cat]")?.dataset.cat;
    const dealAdd = e.target.closest("[data-add-deal]");
    if (cat) { e.preventDefault(); navigate("catalog", { cat }); return; }
    if (route) { e.preventDefault(); navigate(route); return; }
    if (dealAdd) { e.preventDefault(); addToCart(dealAdd.dataset.addDeal, +(dealAdd.dataset.qty||1)); navigate("cart"); return; }
    if (e.target.matches("[data-close]") || e.target.closest("[data-close]")) closeModal();
    if (e.target.matches("[data-close-voice]")) closeVoice();
  });
  $("#searchForm").addEventListener("submit", e => {
    e.preventDefault();
    navigate("catalog", { q:$("#searchInput").value.trim(), cat:$("#searchCategory").value });
  });
  $("#allCategoriesBtn").addEventListener("click", () => navigate("catalog", { cat:"all" }));
  $("#micBtn").addEventListener("click", openVoice);
  $("#sortBy").addEventListener("change", e => { cs.sort = e.target.value; renderCatalog(); });
  $("#applyPrice").addEventListener("click", () => {
    cs.min = +$("#priceMin").value || null; cs.max = +$("#priceMax").value || null; renderCatalog();
  });
  $("#clearFilters").addEventListener("click", () => {
    cs = { cat:"all", q:"", min:null, max:null, deals:false, lipa:false, sort:"relevance" };
    $("#priceMin").value=""; $("#priceMax").value=""; $("#onlyDeals").checked=false; $("#onlyLipa").checked=false;
    renderCatalog();
  });
  $("#onlyDeals").addEventListener("change", e => { cs.deals = e.target.checked; renderCatalog(); });
  $("#onlyLipa").addEventListener("change",  e => { cs.lipa  = e.target.checked; renderCatalog(); });
  // close modal on Escape
  document.addEventListener("keydown", e => { if (e.key==="Escape") { closeModal(); closeVoice(); } });
}

// ---------- INIT ----------
function init(){
  $("#year").textContent = new Date().getFullYear();
  bindGlobal();
  renderHome();
  refreshHeader();
  navigate("home");
  startCountdown();
  startLiveShoppers();
  // First-time spin (defer slightly so it doesn't block paint)
  if (!state.spinSeen) setTimeout(showSpin, 1200);
}
document.addEventListener("DOMContentLoaded", init);

})();
