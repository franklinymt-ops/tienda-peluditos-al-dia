import { CONFIG } from "./config.js";
// Datos de tu negocio para las políticas. Déjalos en "" si aún no los tienes: el texto se adapta solo.
export const BIZ = { razonSocial: "", nit: "", email: "", entrega: "" /* ej: "3 a 8 días hábiles" */ };
const quien = BIZ.razonSocial ? `${BIZ.razonSocial}${BIZ.nit ? " (NIT " + BIZ.nit + ")" : ""}, que opera la tienda ${CONFIG.STORE_NAME}` : CONFIG.STORE_NAME;
const contacto = `Puedes escribirnos por WhatsApp${BIZ.email ? " o al correo " + BIZ.email : ""}.`;
const entrega = BIZ.entrega ? `El tiempo estimado de entrega es de ${BIZ.entrega}, contados desde la confirmación de tu pedido.` : "Te informaremos el tiempo estimado de entrega al confirmar tu pedido.";
const upd = "octubre de 2026";
export const PAGES = {
  privacidad: { title: "Política de privacidad", upd, sections: [
    ["Responsable del tratamiento", [`${quien} es responsable del tratamiento de los datos personales que recibe a través de este sitio, de acuerdo con la Ley 1581 de 2012 y sus normas reglamentarias.`]],
    ["Datos que recolectamos", ["Para procesar tu pedido te pedimos: nombre completo, teléfono, WhatsApp, correo electrónico, departamento, ciudad, dirección, barrio e indicaciones de entrega.", "No almacenamos datos de tarjetas ni de cuentas bancarias. Los pagos en línea los procesa Wompi en su propia plataforma segura."]],
    ["Para qué usamos tus datos", ["• Procesar, confirmar y entregar tu pedido.", "• Contactarte por WhatsApp, teléfono o correo sobre el estado de tu compra.", "• Atender tus consultas, cambios, devoluciones y garantías.", "• Cumplir obligaciones legales y contables."]],
    ["Con quién los compartimos", ["Solo con quienes son necesarios para cumplir tu pedido: transportadoras, la pasarela de pagos Wompi y los proveedores tecnológicos que alojan la tienda y su base de datos (Google Firebase). No vendemos tus datos a terceros.", "Algunos de estos proveedores pueden tener servidores fuera de Colombia."]],
    ["Tus derechos", ["Como titular puedes conocer, actualizar y rectificar tus datos, solicitar prueba de la autorización, ser informado del uso que les damos, revocar la autorización o pedir la supresión de tus datos cuando no exista un deber legal de conservarlos, y presentar quejas ante la Superintendencia de Industria y Comercio (SIC).", `Para ejercerlos: ${contacto}`]],
    ["Almacenamiento en tu navegador", ["Usamos el almacenamiento de tu navegador para guardar tu carrito y los datos de tu último pedido."]],
    ["Cambios a esta política", ["Podemos actualizar esta política. La versión vigente es la publicada en esta página."]] ] },
  terminos: { title: "Términos y condiciones", upd, sections: [
    ["Aceptación", ["Al usar este sitio y realizar una compra aceptas estos términos y condiciones. Si no estás de acuerdo, te pedimos no usar la tienda."]],
    ["Productos y precios", ["Los precios están en pesos colombianos (COP). El precio válido es el que ves al momento de confirmar tu pedido. Las fotos son de referencia y los colores pueden variar levemente según tu pantalla.", "Si hay un error evidente de precio o descripción, te contactaremos antes de despachar tu pedido."]],
    ["Disponibilidad", ["Los pedidos están sujetos a disponibilidad. Si un producto no está disponible, te avisaremos para que puedas esperar la reposición, elegir otro producto o cancelar sin costo."]],
    ["Cómo comprar y medios de pago", ["Agrega los productos al carrito, completa tus datos de entrega y elige cómo pagar:", "• Pago contra entrega: pagas cuando recibes el pedido.", "• Pago en línea con Wompi: con los medios que ofrece la plataforma (por ejemplo, tarjetas, PSE, Nequi o Bancolombia).", "Podemos comunicarnos contigo para confirmar los datos del pedido antes de despacharlo."]],
    ["Datos de entrega", ["Eres responsable de dar una dirección y un teléfono correctos. Si no es posible entregar por datos incompletos o porque nadie recibe, te contactaremos para reprogramar la entrega."]],
    ["Envíos, cambios y devoluciones", ["Nuestras políticas de envíos y de cambios y devoluciones hacen parte de estos términos."]],
    ["Propiedad intelectual", ["El nombre, el logo, los textos y las imágenes de la tienda pertenecen a Peluditos al Día o a sus titulares y no pueden usarse sin autorización."]],
    ["Uso de los productos", ["Los productos para mascotas deben usarse según sus instrucciones y bajo la supervisión de quien cuida al animal. Ante dudas sobre la salud de tu mascota, consulta a un médico veterinario."]],
    ["Ley aplicable", ["Estos términos se rigen por las leyes de la República de Colombia, incluido el Estatuto del Consumidor (Ley 1480 de 2011)."]],
    ["Contacto", [contacto]] ] },
  envios: { title: "Política de envíos", upd, sections: [
    ["Cobertura", ["Enviamos a toda Colombia."]],
    ["Costo de envío", ["El valor del envío se muestra en el resumen de tu pedido antes de pagar."]],
    ["Tiempos de entrega", [entrega, "Los tiempos pueden variar según la ciudad, la zona de entrega y la transportadora."]],
    ["Cómo enviamos", ["Despachamos con empresas transportadoras. Cuando tengamos la guía de seguimiento, te la compartiremos."]],
    ["Pago contra entrega", ["Si eliges pago contra entrega, pagas cuando recibes el pedido. Ten el valor del pedido disponible al momento de la entrega."]],
    ["Al recibir tu pedido", ["Revisa que el paquete llegue en buen estado. Si notas golpes, daños o faltantes, escríbenos de inmediato con fotos o video del paquete."]],
    ["Novedades en la entrega", ["Si hay una novedad (dirección incompleta, nadie en casa), te contactaremos o lo hará la transportadora para reprogramar la entrega. Si necesitas cambiar la dirección, avísanos lo antes posible."]] ] },
  cambios: { title: "Cambios y devoluciones", upd, sections: [
    ["Derecho de retracto", ["Si compraste a distancia (por internet), puedes retractarte de la compra dentro de los 5 días hábiles siguientes a la entrega del producto, sin necesidad de explicar el motivo, según el artículo 47 de la Ley 1480 de 2011.", "El producto debe devolverse en las mismas condiciones en que lo recibiste, sin uso y en su empaque. Los costos de transporte de la devolución están a cargo del comprador. Una vez recibido el producto, devolveremos tu dinero dentro de los 30 días calendario siguientes al ejercicio del derecho."]],
    ["Excepciones", ["El derecho de retracto no aplica en los casos que la ley exceptúa (artículo 47 de la Ley 1480 de 2011)."]],
    ["Productos defectuosos, dañados o equivocados", ["Si tu producto llega con defectos, dañado o diferente al que pediste, escríbenos lo antes posible con tu número de pedido y fotos o video del producto y del empaque.", "Revisaremos tu caso y, según corresponda, lo cambiaremos por uno igual o equivalente, lo repararemos o te devolveremos el dinero."]],
    ["Garantía legal", ["Tus productos cuentan con la garantía legal prevista en el Estatuto del Consumidor (Ley 1480 de 2011)."]],
    ["Cómo solicitarlo", [contacto, "Incluye tu número de pedido, tu nombre y una descripción del problema."]],
    ["Reembolsos", ["Cuando proceda un reembolso, lo haremos por el mismo medio con el que pagaste o por el que acordemos contigo."]] ] }
};
export const FAQ = [
  ["¿Cómo hago una compra?", "Elige tu producto, selecciona el color o tamaño si aplica, pulsa Comprar ahora o Agregar al carrito, completa tus datos de entrega y elige cómo pagar."],
  ["¿Qué métodos de pago hay?", "Pago contra entrega (pagas cuando recibes tu pedido) y pago en línea con Wompi."],
  ["¿Envían a toda Colombia?", "Sí, enviamos a toda Colombia."],
  ["¿Cuánto tarda mi pedido?", entrega],
  ["¿Cómo sé el estado de mi pedido?", "Escríbenos por WhatsApp con tu número de pedido, que aparece al terminar tu compra, y te ayudamos."],
  ["¿Qué hago si mi producto llega con problemas?", "Escríbenos lo antes posible con fotos o video. Revisa también la política de cambios y devoluciones."],
  ["Mi pago con Wompi fue rechazado, ¿qué hago?", "Puedes intentarlo de nuevo, usar otro medio de pago o elegir pago contra entrega."]
];
