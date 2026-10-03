# Peluditos al Día — tienda e-commerce (GitHub Pages + Firebase)

Sitio estático sin build: HTML + módulos ES. Estructura: `index.html`, `app.js` (lógica), `config.js` (configuración central), `products.js` (catálogo), `styles.css`, `public/images`, `firebase/firestore.rules`.

## Ejecutar local
`python3 -m http.server 8000` y abre http://localhost:8000 (los módulos ES no funcionan con doble clic).

## Configurar
1. **Tienda:** edita `config.js` (WhatsApp con indicativo, redes, `SHIPPING_PRICE`).
2. **Precio:** en `products.js` pon `price` (COP). Mientras sea 0 la compra queda deshabilitada.
3. **Firebase:** crea proyecto, activa Firestore (y Storage si subirás imágenes), copia la config web a `config.js > FIREBASE`. Publica `firebase/firestore.rules`.
4. **Productos:** agrega un objeto en `products.js` o un documento en la colección `products` con los mismos campos (`active: true`).
5. **Admin:** asigna el custom claim `admin: true` a tu usuario para escribir productos/ver pedidos.
6. **Wompi:** pon la llave PÚBLICA en `config.js`. La firma de integridad exige un backend: crea una función serverless (Netlify/Vercel/Cloud Functions) que reciba `{orderId, amountInCents, currency}` y devuelva `{signature}` = SHA256(`referencia + monto + moneda + secreto de integridad`). Su URL va en `WOMPI_SIGN_ENDPOINT`. Secretos solo en variables de entorno del backend (ver `.env.example`). Para confirmar pagos, usa el webhook de eventos de Wompi en ese backend.
7. **Pixels:** el sitio emite `view_item`, `add_to_cart`, `begin_checkout`, `purchase` en `dataLayer` (función `track` en `app.js`).

## Deploy
Sube a GitHub → Settings → Pages → rama `main`, carpeta raíz.

## Pendientes
Textos de políticas, sitemap/robots.txt con tu dominio final, panel admin, y revisar qué foto corresponde a cada color.
