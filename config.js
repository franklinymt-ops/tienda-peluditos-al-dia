// CONFIGURACIÓN CENTRAL — edita aquí los datos de la tienda
export const CONFIG = {
  STORE_NAME: "Peluditos al Día",
  WHATSAPP_NUMBER: "", // Ej: 573197118858 (sin + ni espacios)
  INSTAGRAM_URL: "https://www.instagram.com/peluditos.aldia/", FACEBOOK_URL: "https://www.facebook.com/peluditosaldia", TIKTOK_URL: "https://www.tiktok.com/@peluditosaldia",
  YOUTUBE_URL: "https://www.youtube.com/@peluditosaldia",
  WOMPI_PUBLIC_KEY: "", // solo llave PÚBLICA. La privada va en el backend
  WOMPI_SIGN_ENDPOINT: "", // función serverless que firma la transacción
  CURRENCY: "COP",
  CLOUDINARY_CLOUD_NAME: "", CLOUDINARY_UPLOAD_PRESET: "", // para subir fotos y videos desde admin.html
  SHIPPING_PRICE: 0, // Defínelo: precio de envío
  FIREBASE: {  apiKey: "AIzaSyDqeK3QuudArpgiCnV3LqQJ5NwK-H95a9o",
    authDomain: "peluditos-al-dia.firebaseapp.com",
    projectId: "peluditos-al-dia",
    storageBucket: "peluditos-al-dia.firebasestorage.app",
    appId: "1:316811762174:web:6dac71e764c814025808af"
  }
};
