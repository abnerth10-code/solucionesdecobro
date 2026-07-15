window.COMPARISON_PROVIDERS = [
  {
    name: 'Mercado Pago Point', domain: 'mercadopago.com.mx', url: 'https://www.mercadopago.com.mx/herramientas-para-vender/lectores-point', category: 'rapida', type: 'Opción rápida de cobro',
    cost: '3.5% + IVA en ventas al contado. Puede haber promociones para cuentas nuevas.', hardware: 'Point Smart 2, Point Air y Point Mini; compra única según modelo.', requirements: 'Cuenta Mercado Pago, identificación y validaciones del perfil. El flujo puede permitir iniciar sin RFC.', settlement: 'Disponibilidad rápida o inmediata, según cuenta y condiciones.', review: 'Promoción vigente, MSI, contracargos, retenciones, límites y precio final del equipo.'
  },
  {
    name: 'Clip', domain: 'clip.mx', url: 'https://www.clip.mx/', category: 'rapida', type: 'Opción rápida de cobro',
    cost: '3.6% + IVA como referencia; confirmar tasa y promoción vigentes.', hardware: 'Clip Plus, Pro 2, Total y otros modelos; compra única.', requirements: 'Identificación, CLABE y validaciones digitales.', settlement: '24 horas como referencia; confirmar por producto.', review: 'Tasa final, MSI, depósitos, límites, soporte y promociones.'
  },
  {
    name: 'Zettle', domain: 'zettle.com', url: 'https://www.zettle.com/mx', category: 'rapida', type: 'Opción rápida de cobro',
    cost: '3.5% + IVA como referencia; confirmar condiciones vigentes.', hardware: 'Lector Zettle; compra única.', requirements: 'Cuenta PayPal Business, CLABE e identificación.', settlement: '1 a 2 días hábiles como referencia.', review: 'Disputas, contracargos, retiro de fondos y compatibilidad del lector.'
  },
  {
    name: 'Billpocket', domain: 'billpocket.com', url: 'https://billpocket.com/', category: 'rapida', type: 'Opción rápida de cobro',
    cost: '3.5% + IVA como referencia; confirmar tasa vigente.', hardware: 'Terminal Nano y opciones disponibles; compra única.', requirements: 'RFC, CLABE e identificación.', settlement: '24 horas como referencia.', review: 'Costo del equipo, MSI, soporte, compatibilidad y condiciones de depósito.'
  },
  {
    name: 'Sr. Pago', domain: 'srpago.com', url: 'https://srpago.com/', category: 'rapida', type: 'Opción rápida de cobro',
    cost: '3.6% + IVA como referencia; confirmar plan vigente.', hardware: 'Smart TPV y otros modelos; compra única.', requirements: 'Identificación y validación de cuenta. Puede operar con tarjeta propia según producto.', settlement: '24 horas como referencia.', review: 'Disposición de efectivo, comisiones adicionales, soporte y condiciones de la cuenta.'
  },
  {
    name: 'KiWi', domain: 'kiwi.com.mx', url: 'https://www.kiwi.com.mx/', category: 'rapida', type: 'Opción rápida de cobro',
    cost: '3.0% + IVA como referencia; confirmar disponibilidad y tasa.', hardware: 'Lector móvil; compra única.', requirements: 'Identificación y CLABE bancaria.', settlement: '24 horas como referencia.', review: 'Cobertura de soporte, tarjetas aceptadas, costo vigente y continuidad del servicio.'
  },
  {
    name: 'Ualá Bis', domain: 'uala.com.mx', url: 'https://www.uala.com.mx/bis', category: 'rapida', type: 'Opción rápida de cobro',
    cost: '2.99% + IVA como referencia; confirmar tasa vigente.', hardware: 'Terminal mPOS; compra única.', requirements: 'Identificación y cuenta Ualá activa.', settlement: 'Inmediata a cuenta Ualá, según condiciones.', review: 'Cambios de tasa, límites y dependencia del ecosistema Ualá.'
  },
  {
    name: 'Feenicia', domain: 'feenicia.com', url: 'https://feenicia.com/', category: 'rapida', type: 'Opción rápida de cobro',
    cost: '3.4% + IVA como referencia; confirmar propuesta.', hardware: 'Terminal móvil Bluetooth; compra única.', requirements: 'RFC, CLABE e identificación.', settlement: '24 horas como referencia.', review: 'Estabilidad de la aplicación, soporte y comisiones por servicios adicionales.'
  },
  {
    name: 'Ya Ganaste', domain: 'yaganaste.com', url: 'https://www.yaganaste.com/', category: 'rapida', type: 'Opción rápida de cobro',
    cost: 'Variable según contrato o promoción.', hardware: 'Terminal móvil; confirmar modelos disponibles.', requirements: 'Identificación y datos del negocio.', settlement: '24 horas como referencia.', review: 'Tarjetas y vales aceptados, inactividad, soporte y vigencia del producto.'
  },
  {
    name: 'NetPay', domain: 'netpay.com.mx', url: 'https://www.netpay.com.mx/', category: 'hibrida', type: 'Modelo híbrido',
    cost: '3.5% + IVA como referencia; confirmar plan vigente.', hardware: 'Smart POS y terminales según solución.', requirements: 'RFC, identificación, CLABE y validaciones fiscales según producto.', settlement: '24 horas o 365 días, según plan.', review: 'Licencias, software adicional, tarjetas internacionales, equipo y condiciones de red.'
  },
  {
    name: 'Getnet', domain: 'getnet.com.mx', url: 'https://www.getnet.com.mx/', category: 'hibrida', type: 'Modelo híbrido',
    cost: 'Variable o negociable por volumen.', hardware: 'Smart POS y TPV en renta o comodato, según contrato.', requirements: 'RFC, e.firma y evaluación comercial o bancaria.', settlement: 'Según esquema contratado.', review: 'Metas de facturación, renta, tasa, permanencia y cancelación anticipada.'
  },
  {
    name: 'BBVA TPV', domain: 'bbva.mx', url: 'https://www.bbva.mx/empresas/productos/cobros-y-pagos.html', category: 'banca', type: 'Banca tradicional',
    cost: '1.5% a 2.5% como referencia por giro; confirmar propuesta.', hardware: 'TPV fija o móvil bajo renta mensual.', requirements: 'Cuenta PyME, e.firma, constancia fiscal y documentación del negocio.', settlement: '24 horas hábiles como referencia.', review: 'Facturación mínima, renta, equipos adicionales, cuenta eje y contrato.'
  },
  {
    name: 'Banorte TPV', domain: 'banorte.com', url: 'https://www.banorte.com/', category: 'banca', type: 'Banca tradicional',
    cost: '2.5% a 6.33% como referencia según giro; confirmar.', hardware: 'Renta mensual según terminal.', requirements: 'RFC, cuenta Banorte e identificación del titular o representante.', settlement: '24 a 48 horas como referencia.', review: 'Facturación mínima, renta, cargos mínimos, permanencia y penalizaciones.'
  },
  {
    name: 'Citibanamex', domain: 'banamex.com', url: 'https://www.banamex.com/es/pymes/productos-y-servicios/cobros/', category: 'banca', type: 'Banca tradicional',
    cost: '2.5% como referencia promedio; confirmar por giro.', hardware: 'iAcepta o TPV en venta o renta, según disponibilidad.', requirements: 'Cuenta de negocios, RFC y alta fiscal.', settlement: '24 horas hábiles como referencia.', review: 'Afiliación, mantenimiento, equipo inactivo, comisiones y contrato.'
  },
  {
    name: 'Santander TPV', domain: 'santander.com.mx', url: 'https://www.santander.com.mx/', category: 'banca', type: 'Banca tradicional',
    cost: 'Variable por evaluación.', hardware: 'TPV bajo renta mensual.', requirements: 'Constancia fiscal, RFC, comprobante de domicilio y evaluación.', settlement: '24 a 48 horas como referencia.', review: 'Inactividad, bajo uso, renta, cuenta vinculada y permanencia.'
  },
  {
    name: 'HSBC Global Payments', domain: 'hsbc.com.mx', url: 'https://www.hsbc.com.mx/empresas/', category: 'banca', type: 'Banca tradicional',
    cost: 'Interchange++: costo de red más margen negociado.', hardware: 'Terminal corporativa bajo renta mensual.', requirements: 'Evaluación corporativa y perfil PyME o empresarial.', settlement: '24 horas como referencia.', review: 'Margen adicional, renta, volumen mínimo, permanencia y cancelación.'
  },
  {
    name: 'Scotiabank TPV', domain: 'scotiabank.com.mx', url: 'https://www.scotiabank.com.mx/empresas-y-gobierno.aspx', category: 'banca', type: 'Banca tradicional',
    cost: 'Variable según evaluación comercial.', hardware: 'TPV bajo renta mensual.', requirements: 'RFC, cuenta Scotiabank, e.firma y documentación del negocio.', settlement: '24 horas como referencia.', review: 'Permanencia, flexibilidad de negociación, renta y volumen mínimo.'
  },
  {
    name: 'Banregio TPV', domain: 'banregio.com', url: 'https://www.banregio.com/', category: 'banca', type: 'Banca tradicional',
    cost: '1.70% a 3.20% como referencia; confirmar por giro.', hardware: 'Renta o comodato condicionado.', requirements: 'RFC formal y evaluación del negocio.', settlement: '24 horas como referencia.', review: 'Volumen mínimo, renta del equipo, cuenta vinculada y contrato.'
  },
  {
    name: 'BanBajío TPV', domain: 'bb.com.mx', url: 'https://www.bb.com.mx/', category: 'banca', type: 'Banca tradicional',
    cost: 'Según evaluación del ejecutivo.', hardware: 'TPV bajo renta mensual.', requirements: 'Cuenta activa, RFC y posible revisión del establecimiento.', settlement: '24 horas como referencia.', review: 'Manejo de cuenta, bajo uso, renta, volumen y contrato.'
  },
  {
    name: 'Afirme TPV', domain: 'afirme.com', url: 'https://www.afirme.com/', category: 'banca', type: 'Banca tradicional',
    cost: 'Débito 1.9% y crédito 2.4% como referencia; confirmar.', hardware: 'TPV bajo renta mensual.', requirements: 'RFC, cuenta Afirme y documentación del negocio.', settlement: '24 a 48 horas como referencia.', review: 'Facturación mínima, renta, saldo, inscripción y penalizaciones.'
  },
  {
    name: 'Inbursa TPV', domain: 'inbursa.com', url: 'https://www.inbursa.com/', category: 'banca', type: 'Banca tradicional',
    cost: 'Variable por evaluación.', hardware: 'TPV bajo renta mensual.', requirements: 'Cuenta bancaria Inbursa, RFC y evaluación.', settlement: '24 horas como referencia.', review: 'Mantenimiento, saldo promedio, renta y condiciones de la cuenta eje.'
  },
  {
    name: 'Banco Azteca', domain: 'bancoazteca.com.mx', url: 'https://www.bancoazteca.com.mx/', category: 'banca', type: 'Banca tradicional',
    cost: 'Variable por producto.', hardware: 'Venta o renta según modelo disponible.', requirements: 'Cuenta empresarial o producto bancario compatible y evaluación.', settlement: '24 a 48 horas como referencia.', review: 'Contrato de adhesión, capacidades del equipo, renta y penalizaciones.'
  },
  {
    name: 'Openpay', domain: 'openpay.mx', url: 'https://www.openpay.mx/', category: 'pasarela', type: 'Pasarela digital',
    cost: '2.9% + $2.50 MXN + IVA como referencia; confirmar.', hardware: 'Sin TPV obligatoria; integración API para comercio electrónico.', requirements: 'Sitio web, RFC y validación del comercio.', settlement: '24 horas hábiles como referencia.', review: 'Motor de riesgo, reservas, retenciones, contracargos e integración.'
  },
  {
    name: 'Conekta', domain: 'conekta.com', url: 'https://www.conekta.com/', category: 'pasarela', type: 'Pasarela digital',
    cost: '3.4% + $3.00 MXN + IVA como referencia; confirmar.', hardware: 'Sin TPV obligatoria; integración API.', requirements: 'Sitio web, RFC y validación del comercio.', settlement: '24 horas como referencia.', review: 'Contracargos, devoluciones, motor antifraude, soporte e integración.'
  },
  {
    name: 'Stripe', domain: 'stripe.com', url: 'https://stripe.com/mx', category: 'pasarela', type: 'Pasarela digital',
    cost: '3.6% + $3.00 MXN + IVA como referencia; confirmar.', hardware: 'Integración API; hardware solo en productos compatibles.', requirements: 'RFC, cuenta bancaria e integración técnica.', settlement: '24 a 48 horas como referencia.', review: 'Disputas, reservas, conversión de divisas, riesgo e integración.'
  },
  {
    name: 'Adyen', domain: 'adyen.com', url: 'https://www.adyen.com/es_MX', category: 'pasarela', type: 'Pasarela global',
    cost: 'Interchange++: costo de red más comisión contratada.', hardware: 'API y terminales empresariales según solución.', requirements: 'Evaluación corporativa y volumen empresarial.', settlement: '24 a 48 horas como referencia.', review: 'Volumen mínimo, integración, contrato, soporte y alcance internacional.'
  },
  {
    name: 'PayPal México', domain: 'paypal.com', url: 'https://www.paypal.com/mx/business', category: 'pasarela', type: 'Pasarela digital',
    cost: '3.95% + $4.00 MXN + IVA como referencia; confirmar tabla oficial.', hardware: 'Sin TPV física obligatoria; botón e integración web.', requirements: 'Cuenta Business validada y cuenta bancaria.', settlement: 'Retiro según configuración y validaciones.', review: 'Divisas, retenciones, disputas, contracargos y retiros.'
  },
  {
    name: 'Kushki', domain: 'kushki.com', url: 'https://www.kushki.com/', category: 'pasarela', type: 'Pasarela digital',
    cost: 'Personalizado por contrato.', hardware: 'Integración API; opciones presenciales según solución.', requirements: 'RFC y cumplimiento regulatorio para operación regional.', settlement: '24 horas como referencia.', review: 'Permanencia, procesamiento contratado, integración, reservas y soporte.'
  },
  {
    name: 'PayU', domain: 'payu.com', url: 'https://mexico.payu.com/', category: 'pasarela', type: 'Pasarela digital',
    cost: '3.5% + $4.00 MXN + IVA como referencia; confirmar.', hardware: 'Sin TPV obligatoria; integración de comercio electrónico.', requirements: 'RFC, cuenta bancaria y validación del comercio.', settlement: '24 horas como referencia.', review: 'Retiros, transferencias rechazadas, contracargos e integración.'
  },
  {
    name: 'Fiserv', domain: 'fiserv.com.mx', url: 'https://www.fiserv.com.mx/terminal-punto-venta/', category: 'adquirente', type: 'Adquirente directo / banca tradicional',
    cost: 'Interchange++: costo de red más margen contratado.', hardware: 'Terminales propias bajo renta; oferta actual incluye soluciones de punto de venta.', requirements: 'RFC, evaluación corporativa y volumen acorde con la propuesta.', settlement: '24 horas hábiles como referencia.', review: 'Volumen mínimo, margen, cuotas, permanencia y cancelación.'
  },
  {
    name: 'EVO Payments', domain: 'evopayments.mx', url: 'https://evopayments.mx/', category: 'adquirente', type: 'Adquirente directo / banca tradicional',
    cost: 'Interchange++ o tasa variable según propuesta.', hardware: 'Smart POS y TPV tradicional bajo renta; también ofrece soluciones móviles.', requirements: 'RFC, acta constitutiva y perfil comercial o corporativo.', settlement: '24 horas como referencia.', review: 'Cuotas de instalación y mantenimiento, tasa, permanencia y cancelación. EVO ahora forma parte de Global Payments.'
  },
  {
    name: 'Nu (NuTap)', domain: 'nu.com.mx', url: 'https://nu.com.mx/', category: 'softpos', type: 'SoftPOS / cobro con celular', status: 'Disponibilidad en México por confirmar',
    cost: 'Tasa y disponibilidad comercial en México por confirmar.', hardware: 'Sin lector adicional: Tap to Pay en smartphone con NFC, donde el producto esté disponible.', requirements: 'Cuenta empresarial compatible y smartphone con NFC; confirmar compatibilidad local.', settlement: 'Por confirmar para México.', review: 'NuTap está documentado oficialmente en Brasil, pero no encontramos una oferta oficial equivalente en Nu México. No contratar ni recomendar hasta confirmarlo.'
  },
  {
    name: 'Kueski Pay', domain: 'kueskipay.com', url: 'https://www.kueskipay.com/para-comercios', category: 'bnpl', type: 'Método alternativo (BNPL)',
    cost: 'Porcentaje + IVA por venta exitosa. Una guía para tienda física publica 5.90%; solicitar propuesta vigente.', hardware: 'Integración e-commerce, SDK o código de pago en tiendas físicas afiliadas.', requirements: 'Tienda en línea activa o afiliación; documentación fiscal y bancaria según el canal.', settlement: 'Pago completo al comercio según acuerdo.', review: 'Comisión sobre margen, requisitos de integración, elegibilidad y condiciones por canal. Kueski indica que asume fraude crediticio y contracargos.'
  },
  {
    name: 'Aplazo', domain: 'aplazo.mx', url: 'https://aplazo.mx/', category: 'bnpl', type: 'Método alternativo (BNPL)',
    cost: 'Variable; más de 5% aportado como referencia. Solicitar cotización vigente.', hardware: 'Integración digital o flujo habilitado para comercios afiliados.', requirements: 'RFC, validación del negocio y acuerdo comercial.', settlement: 'Según acuerdo comercial.', review: 'Comisión de descuento, impacto en margen, liquidación, devoluciones y elegibilidad del cliente.'
  },
  {
    name: 'Banca Mifel', domain: 'mifel.com.mx', url: 'https://www.mifel.com.mx/empresas/comercio-mifel/terminal-punto-de-venta', category: 'banca', type: 'Banca tradicional',
    cost: 'Variable por evaluación y giro.', hardware: 'TPV y opciones móviles bajo renta o condiciones del contrato.', requirements: 'Cuenta Mifel, RFC y evaluación empresarial.', settlement: '24 a 48 horas como referencia.', review: 'Saldo promedio de la cuenta eje, renta, volumen, afiliación y contrato.'
  },
  {
    name: 'Banco Multiva', domain: 'multiva.com.mx', url: 'https://www.multiva.com.mx/empresas/soluciones-de-pago/tpv', category: 'banca', type: 'Banca tradicional',
    cost: 'Variable por giro y evaluación.', hardware: 'TPV fija, móvil o virtual bajo renta según producto.', requirements: 'Cuenta Multiva, RFC, comercio establecido y evaluación.', settlement: '24 a 48 horas como referencia.', review: 'Renta, afiliación, saldo de la cuenta, soporte y conveniencia para microempresas.'
  },
  {
    name: 'Todito Pay', domain: 'todito.com', url: 'https://www.todito.com/', category: 'rapida', type: 'Opción rápida de cobro', status: 'Producto mPOS por confirmar',
    cost: '3.5% + IVA aportado como referencia; confirmar oferta vigente.', hardware: 'mPOS básico descrito como compra única; disponibilidad actual no confirmada.', requirements: 'Identificación y registro en plataforma, sujeto a confirmación.', settlement: '24 horas aportadas como referencia; confirmar.', review: 'El sitio oficial consultado presenta servicios de Todito, pero no localizamos la oferta pública del mPOS descrito. Confirmar producto, soporte, comisión y contratación antes de recomendar.'
  }
];
