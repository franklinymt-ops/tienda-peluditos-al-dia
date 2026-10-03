// CONFIGURACIÓN CENTRAL — edita aquí los datos de la tienda
export const CONFIG = {
  STORE_NAME: "Peluditos al Día",
  WHATSAPP_NUMBER: "", // Ej: 573001234567 (sin + ni espacios)
  INSTAGRAM_URL: "", FACEBOOK_URL: "", TIKTOK_URL: "",
  YOUTUBE_URL: "",
  WOMPI_PUBLIC_KEY: "", // solo llave PÚBLICA. La privada va en el backend
  WOMPI_SIGN_ENDPOINT: "", // función serverless que firma la transacción
  CURRENCY: "COP",
  SHIPPING_PRICE: 0, // Defínelo: precio de envío
  FIREBASE: { // Firebase Console > Configuración del proyecto > tu app web
    apiKey: "", authDomain: "", projectId: "", storageBucket: "", appId: ""
  }
};
