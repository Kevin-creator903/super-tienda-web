export const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '').replace(/[<>'"]/g, '').trim();
};

export const validatePhone = (phone) => {
  if (!phone) return false;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  const phoneRegex = /^(\+?58|0)?(412|414|424|416|426|2\d{2})?\d{7,10}$/;
  return phoneRegex.test(cleanPhone);
};

export const buildWhatsAppUrl = (phoneNumber, cartItems, customerData, deliveryData, totals) => {
  const cleanNumber = phoneNumber.replace(/[^\d]/g, '');
  
  let text = `*NUEVO PEDIDO - FHERIA MAYOR*\n\n`;
  text += `*Cliente:* ${sanitizeInput(customerData.name)}\n`;
  text += `*Teléfono:* ${sanitizeInput(customerData.phone)}\n`;
  
  // Detalle de Delivery / Retiro
  if (deliveryData.type === 'delivery') {
    text += `*Método:* Delivery a Domicilio 🛵\n`;
    text += `*Zona:* ${sanitizeInput(deliveryData.zoneName)} ($${deliveryData.feeUsd.toFixed(2)})\n`;
    text += `*Dirección:* ${sanitizeInput(customerData.address)}\n`;
  } else {
    text += `*Método:* Retiro en Tienda 🏪\n`;
  }

  text += `\n*RESUMEN DEL PEDIDO:*\n`;
  cartItems.forEach((item, index) => {
    const name = sanitizeInput(item.name);
    const qty = item.quantity;
    const price = (item.priceUsd * qty).toFixed(2);
    text += `${index + 1}. ${name} (x${qty}) - $${price}\n`;
  });

  text += `\n*SUBTOTAL PRODUCTOS:* $${totals.subtotalUsd.toFixed(2)} USD\n`;
  if (deliveryData.type === 'delivery') {
    text += `*COSTO DELIVERY:* $${deliveryData.feeUsd.toFixed(2)} USD\n`;
  }
  text += `*TOTAL A PAGAR:* $${totals.totalUsd.toFixed(2)} USD (~${totals.totalVes} VES)\n`;
  text += `\n_Acepto los Términos y Políticas de FHERIA MAYOR._`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
};