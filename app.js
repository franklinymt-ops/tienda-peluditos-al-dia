import { CONFIG } from "./config.js";
import { PRODUCTS } from "./products.js";
const $ = s => document.querySelector(s), app = $("#app");
const money = n => new Intl.NumberFormat("es-CO", { style: "currency", currency: CONFIG.CURRENCY, maximumFractionDigits: 0 }).format(n);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const waLink = t => `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(t)}`;
let products = PRODUCTS.filter(p => p.active), db = null, fs = null;
let cart = JSON.parse(localStorage.getItem("cart") || "[]");
const save = () => { localStorage.setItem("cart", JSON.stringify(cart)); $("#cc").textContent = cart.reduce((a, i) => a + i.qty, 0); };
const toast = m => { const t = $("#toast"); t.textContent = m; t.style.display = "block"; setTimeout(() => t.style.display = "none", 1800); };
// Analítica: conecta aquí GA4 / Meta Pixel / TikTok Pixel
const track = (ev, data) => { (window.dataLayer = window.dataLayer || []).push({ event: ev, ...data }); window.fbq?.("trackCustom", ev, data); };

// Firebase opcional: si hay config, carga catálogo desde Firestore
async function initFirebase() {
  if (!CONFIG.FIREBASE.projectId) return;
  try {
    const V = "https://www.gstatic.com/firebasejs/10.12.0/";
    const [{ initializeApp }, f] = await Promise.all([import(V + "firebase-app.js"), import(V + "firebase-firestore.js")]);
    fs = f; db = f.getFirestore(initializeApp(CONFIG.FIREBASE));
    const snap = await f.getDocs(f.query(f.collection(db, "products"), f.where("active", "==", true)));
    if (!snap.empty) products = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) { console.warn("Firebase no disponible, usando catálogo local", e); }
}
const card = p => `<a class="card" href="#/p/${esc(p.slug || p.id)}">${p.oldPrice > p.price && p.price ? `<span class="tag">-${Math.round(100 - p.price / p.oldPrice * 100)}%</span>` : ""}
<img loading="lazy" src="${esc(p.images?.[0])}" alt="${esc(p.name)}"><div class="in"><b>${esc(p.name)}</b><p>${esc(p.short)}</p>
<span class="price">${p.price ? money(p.price) : "Precio por definir"}</span>${p.oldPrice > p.price ? `<span class="old">${money(p.oldPrice)}</span>` : ""}
<br><br><span class="btn b2">Ver producto</span></div></a>`;
const trust = `<div class="trust">🚚 Envíos a toda Colombia<br>📦 Pago contra entrega disponible<br>🔒 Pago seguro con Wompi</div>`;

// Galería: fotos + videos (YouTube o archivo)
const yt = u => (u.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/) || [])[1];
const media = p => [...(p.images || []).map(u => ({ v: 0, u })), ...(p.videos || []).map(u => ({ v: 1, u }))];
window.sm = n => { const m = media(window._pd.p)[n]; if (!m) return; $("#mm").innerHTML = !m.v ? `<img class="main" src="${esc(m.u)}" alt="${esc(window._pd.p.name)}">` : yt(m.u) ? `<iframe class="main" src="https://www.youtube.com/embed/${yt(m.u)}" allowfullscreen loading="lazy" style="border:0"></iframe>` : `<video class="main" src="${esc(m.u)}" controls playsinline preload="metadata" style="object-fit:contain;background:#000"></video>`; };
const views = {
  home() {
    const f = products.find(p => p.featured) || products[0];
    return `<section class="hero" style="margin:0 -16px;padding:40px 16px"><div class="wrap" style="padding:0"><div>
<h1>Todo lo que tu peludito necesita, en un solo lugar.</h1><p>Accesorios y productos seleccionados para hacer la vida de tu perro más cómoda, segura y divertida.</p>
<a class="btn b1" href="#/p/${esc(f?.slug || f?.id)}">COMPRAR AHORA</a> <a class="btn b3" href="#/productos">VER PRODUCTOS</a></div>
<img src="${esc(f?.images?.[0])}" alt="${esc(f?.name)}"></div></section>
<div class="ben"><div>🐶<br>Productos para tu peludito</div><div>🚚<br>Envíos a toda Colombia</div><div>💳<br>Pago seguro con Wompi</div><div>📦<br>Pago contra entrega</div></div>
<h2>Nuestros productos</h2><div class="grid">${products.map(card).join("")}</div>`;
  },
  productos() {
    const cats = ["Todas", ...new Set(products.map(p => p.category))], c = new URLSearchParams(location.hash.split("?")[1]).get("c") || "Todas";
    return `<h2>Productos</h2>${cats.map(x => `<a class="chip ${x === c ? "on" : ""}" href="#/productos?c=${encodeURIComponent(x)}">${esc(x)}</a>`).join("")}
<br><br><div class="grid">${products.filter(p => c === "Todas" || p.category === c).map(card).join("")}</div>`;
  },
  p(slug) {
    const p = products.find(x => (x.slug || x.id) === slug); if (!p) return "<h2>Producto no encontrado</h2>";
    track("view_item", { item_id: p.id });
    const sel = {}; Object.entries(p.variants || {}).forEach(([k, v]) => sel[k] = v[0]);
    window._pd = { p, sel, qty: 1 };
    const rel = products.filter(x => x.category === p.category && x.id !== p.id);
    return `<div class="pd"><div><div id="mm"></div><div class="th">${media(p).map((m, n) => m.v ? `<button type="button" onclick="sm(${n})" aria-label="Ver video" style="width:64px;height:64px;flex:none;border:0;border-radius:10px;background:var(--g);color:#fff;font-size:22px;cursor:pointer">▶</button>` : `<img loading="lazy" src="${esc(m.u)}" alt="" onclick="sm(${n})">`).join("")}</div></div>
<div><h1>${esc(p.name)}</h1><p>${esc(p.description)}</p>
<p class="price" style="font-size:28px">${p.price ? money(p.price) : "Precio por definir"}${p.oldPrice > p.price ? `<span class="old">${money(p.oldPrice)}</span>` : ""}</p>
<ul style="margin:10px 0 10px 20px">${[...(p.benefits || []), ...(p.features || [])].map(b => `<li>${esc(b)}</li>`).join("")}</ul>
${Object.entries(p.variants || {}).map(([k, v]) => `<div><b>${esc(k)}:</b><br>${v.map((o, i) => `<span class="chip ${i ? "" : "on"}" data-k="${esc(k)}" data-v="${esc(o)}">${esc(o)}</span>`).join("")}</div>`).join("")}
<div class="qty"><button data-q="-1">−</button><b id="q">1</b><button data-q="1">+</button></div><br>
<button class="btn b1" data-act="buy" ${p.price && p.stock !== 0 ? "" : "disabled"}>COMPRAR AHORA</button> <button class="btn b3" data-act="add" ${p.price && p.stock !== 0 ? "" : "disabled"}>AGREGAR AL CARRITO</button>${p.stock === 0 ? '<p><b>😔 Agotado por ahora</b></p>' : ''}${trust}</div></div>
${p.reviews?.length ? `<h2>Lo que dicen nuestros clientes</h2><div class="grid">${p.reviews.map(r => `<div class="rev">⭐⭐⭐⭐⭐<p>${esc(r.text)}</p><b>${esc(r.name)}</b></div>`).join("")}</div>` : ""}
${rel.length ? `<h2>También puede interesarte</h2><div class="grid">${rel.map(card).join("")}</div>` : ""}`;
  },
  carrito() {
    if (!cart.length) return `<h2>Tu carrito está vacío</h2><a class="btn b1" href="#/productos">Ver productos</a>`;
    const sub = cart.reduce((a, i) => a + i.price * i.qty, 0);
    return `<h2>Tu carrito</h2>${cart.map((i, n) => `<div class="row"><img src="${esc(i.image)}" alt=""><div style="flex:1"><b>${esc(i.name)}</b><br><small>${esc(i.variant)}</small><br>${money(i.price)}</div>
<div class="qty"><button data-c="${n}" data-d="-1">−</button><b>${i.qty}</b><button data-c="${n}" data-d="1">+</button></div><button class="cartbtn" data-rm="${n}" aria-label="Eliminar">🗑</button></div>`).join("")}
<div class="box"><p>Subtotal: <b>${money(sub)}</b></p><p>Envío: <b>${CONFIG.SHIPPING_PRICE ? money(CONFIG.SHIPPING_PRICE) : "Por definir"}</b></p><p class="price">Total: ${money(sub + CONFIG.SHIPPING_PRICE)}</p><br>
<a class="btn b1" href="#/checkout">IR AL CHECKOUT</a> <a class="btn b3" href="#/productos">Seguir comprando</a></div>`;
  },
  checkout() {
    if (!cart.length) return views.carrito(); track("begin_checkout", {});
    const sub = cart.reduce((a, i) => a + i.price * i.qty, 0);
    return `<h2>Finalizar compra</h2><div class="two"><form id="ck"><h3>Datos de entrega</h3>
<input name="name" placeholder="Nombre completo" required minlength="5"><input name="phone" type="tel" placeholder="Teléfono" required pattern="[0-9 +]{7,15}">
<input name="whatsapp" type="tel" placeholder="WhatsApp" required pattern="[0-9 +]{7,15}"><input name="email" type="email" placeholder="Correo electrónico" required>
<input name="dept" placeholder="Departamento" required><input name="city" placeholder="Ciudad" required><input name="address" placeholder="Dirección" required><input name="hood" placeholder="Barrio" required>
<textarea name="notes" placeholder="Información adicional para la entrega"></textarea><h3>Método de pago</h3>
<label class="pay"><input type="radio" name="pay" value="COD" checked><b>📦 PAGO CONTRA ENTREGA</b><br><small>Pagas cuando recibes tu pedido.</small></label>
<label class="pay"><input type="radio" name="pay" value="WOMPI"><b>💳 PAGO SEGURO CON WOMPI</b><br><small>Paga online con tarjeta, PSE, Nequi y más.</small></label>
<button class="btn b1" id="sb">CONFIRMAR PEDIDO</button></form>
<div class="box"><h3>Resumen</h3>${cart.map(i => `<p>${i.qty}× ${esc(i.name)} (${esc(i.variant)})</p>`).join("")}<hr><p class="price">Total: ${money(sub + CONFIG.SHIPPING_PRICE)}</p></div></div>`;
  },
  gracias(id) {
    const o = JSON.parse(localStorage.getItem("lastOrder") || "null"); if (!o) return views.home();
    return `<div class="box" style="margin-top:24px"><h1>🎉 ¡PEDIDO RECIBIDO!</h1><p>Gracias por confiar en Peluditos al Día.</p><p><b>Pedido:</b> #${esc(o.orderId)}</p>
${o.items.map(i => `<p>${i.qty}× ${esc(i.name)} (${esc(i.variant)})</p>`).join("")}<p><b>Total:</b> ${money(o.total)}</p><p><b>Pago:</b> ${o.paymentMethod === "COD" ? "Contra entrega" : "Wompi"}</p>
<p><b>Entrega:</b> ${esc(o.customer.address)}, ${esc(o.customer.hood)}, ${esc(o.customer.city)}</p><p><b>Estado:</b> ${esc(o.orderStatus)}</p><br>
<a class="btn b1" target="_blank" rel="noopener" href="${waLink(`Hola, Peluditos al Día. Quiero información sobre mi pedido #${o.orderId}.`)}">CONTACTAR POR WHATSAPP</a></div>`;
  },
  contacto: () => `<h2>Contacto</h2><p>Escríbenos por WhatsApp y te ayudamos con tu pedido.</p><br><a class="btn b1" target="_blank" rel="noopener" href="${waLink("Hola, Peluditos al Día. Quiero información.")}">Escribir por WhatsApp</a>`,
  info: () => `<h2>Políticas</h2><p>PLACEHOLDER: redacta aquí privacidad, términos, envíos y cambios y devoluciones.</p>`
};

async function placeOrder(f) {
  const d = Object.fromEntries(new FormData(f)), sub = cart.reduce((a, i) => a + i.price * i.qty, 0);
  const clean = s => String(s || "").trim().slice(0, 300);
  const order = { orderId: Date.now().toString(36).toUpperCase(), createdAt: new Date().toISOString(),
    customer: Object.fromEntries(["name", "phone", "whatsapp", "email", "dept", "city", "address", "hood", "notes"].map(k => [k, clean(d[k])])),
    items: cart.map(({ id, name, variant, qty, price }) => ({ id, name, variant, qty, price })), subtotal: sub, shipping: CONFIG.SHIPPING_PRICE,
    total: sub + CONFIG.SHIPPING_PRICE, paymentMethod: d.pay, paymentStatus: "Pendiente", orderStatus: "Pendiente" };
  if (d.pay === "WOMPI" && !(CONFIG.WOMPI_PUBLIC_KEY && CONFIG.WOMPI_SIGN_ENDPOINT)) return toast("Wompi aún no está configurado. Elige contra entrega.");
  if (db) await fs.setDoc(fs.doc(db, "orders", order.orderId), order);
  localStorage.setItem("lastOrder", JSON.stringify(order));
  if (d.pay === "WOMPI") { // La firma de integridad se calcula en el backend con el secreto
    const r = await (await fetch(CONFIG.WOMPI_SIGN_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId: order.orderId, amountInCents: order.total * 100, currency: CONFIG.CURRENCY }) })).json();
    const u = new URLSearchParams({ "public-key": CONFIG.WOMPI_PUBLIC_KEY, currency: CONFIG.CURRENCY, "amount-in-cents": order.total * 100, reference: order.orderId, "signature:integrity": r.signature, "redirect-url": location.origin + location.pathname + "#/gracias" });
    track("purchase", { value: order.total }); cart = []; save(); return location.href = "https://checkout.wompi.co/p/?" + u;
  }
  track("purchase", { value: order.total, transaction_id: order.orderId }); cart = []; save(); location.hash = "#/gracias";
}

function route() {
  const [, r = "", arg] = location.hash.replace("#", "").split("?")[0].split("/");
  app.innerHTML = (views[r || "home"] || views.home)(arg); scrollTo(0, 0); nav.classList.remove("open"); if ($("#mm")) sm(0);
  const f = $("#ck"); if (f) f.onsubmit = async e => { e.preventDefault(); $("#sb").disabled = true; try { await placeOrder(f); } catch (x) { toast("Error al enviar el pedido. Intenta de nuevo."); } $("#sb") && ($("#sb").disabled = false); };
}
document.addEventListener("click", e => {
  const t = e.target, pd = window._pd;
  if (t.dataset.v) { pd.sel[t.dataset.k] = t.dataset.v; t.parentNode.querySelectorAll(".chip").forEach(c => c.classList.toggle("on", c === t)); }
  if (t.dataset.q) { pd.qty = Math.max(1, pd.qty + +t.dataset.q); $("#q").textContent = pd.qty; }
  if (t.dataset.act) {
    const { p, sel, qty } = pd, variant = Object.values(sel).join(" / ") || "Único", key = p.id + variant, ex = cart.find(i => i.key === key);
    ex ? ex.qty += qty : cart.push({ key, id: p.id, name: p.name, variant, price: p.price, qty, image: p.images[0] });
    save(); track("add_to_cart", { item_id: p.id, value: p.price * qty });
    t.dataset.act === "buy" ? location.hash = "#/checkout" : toast("Agregado al carrito 🐶");
  }
  if (t.dataset.d) { const i = cart[+t.dataset.c]; i.qty = Math.max(1, i.qty + +t.dataset.d); save(); route(); }
  if (t.dataset.rm) { cart.splice(+t.dataset.rm, 1); save(); route(); }
});
// Enlaces configurables
$("#wa").href = waLink("Hola, Peluditos al Día. Quiero información.");
$("#social").innerHTML = [["Instagram", CONFIG.INSTAGRAM_URL], ["TikTok", CONFIG.TIKTOK_URL], ["Facebook", CONFIG.FACEBOOK_URL], ["YouTube", CONFIG.YOUTUBE_URL]].filter(s => s[1]).map(([n, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${n}</a>`).join("");
addEventListener("hashchange", route); save();
initFirebase().finally(route);
