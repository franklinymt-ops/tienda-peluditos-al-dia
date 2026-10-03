// Catálogo local (respaldo). Si Firebase está configurado, se lee de Firestore: colección "products".
// Agregar producto = agregar un objeto aquí (o un documento en Firestore con los mismos campos).
export const PRODUCTS = [{
  id: "cepillo-bano-perros", slug: "cepillo-bano-perros", active: true, featured: true,
  name: "Cepillo de baño con depósito para champú",
  short: "Más espuma, masaje suave y baños sin estrés.",
  description: "Cepillo de goma suave con ranura para guardar el champú. Masajea, hace espuma y limpia el pelaje de perros y gatos mientras tu peludito se relaja.",
  price: 29900, oldPrice: 29900, // PLACEHOLDER: define el precio en COP
  category: "Higiene", tags: ["baño", "higiene"],
  images: ["public/images/p1.avif", "public/images/p2.avif", "public/images/p3.avif", "public/images/p4.avif"],
  variants: { Color: ["Azul", "Amarillo"] }, stock: null, // null = sin control de inventario
  benefits: ["Hace mucha espuma", "Goma suave que masajea", "Guarda el champú dentro"],
  features: ["Para perros y gatos", "Material de goma duradero", "Fácil de limpiar"],
  reviews: [
    { name: "Ximena Espinosa", text: "Hace demasiada espuma y restriega súper bien el pelo de mis perritas. Es súper suave y se relajan mucho." },
    { name: "Kelly Johana", text: "Excelente producto, se hace una buena mezcla adentro y no se sale. Me ha ayudado mucho con el baño de mi perro." },
    { name: "Mari CG", text: "Le encantó su cepillo de baño, aunque piensa que es para jugar." }
  ]
}];
