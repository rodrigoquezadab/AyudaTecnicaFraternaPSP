/**
 * Parroquia San Patricio - Plataforma de Proyectos Técnicos y Donaciones
 * Logic & State Management
 */

const STORAGE_KEY = 'parroquia_san_patricio_proyectos_v15';

// Initial sample catalog with real quotations, multiple store links by SKU (Sodimac, Easy, Direct) & sensor comparisons
const INITIAL_CATALOG = [
  {
    id: 'cat_lexo_360',
    name: 'Sensor Infrarrojo Cielo 360° LEXO',
    category: 'Sensores y Domótica',
    supplier: 'Electricidad Fernández',
    price: 9500,
    badge: '🥇 Recomendado',
    url: 'https://electricidadfernandez.cl/product/sensor-infrarrojo-cielo-360-lexo/?utm_source=chatgpt.com',
    specs: '220–240 V, PIR 360°, detección 6–8 m, temporizador 10 s–7 min, LUX 10–2000 lux. Indicado para baños.',
    notes: 'Elección recomendada para baños con luminarias LED de 18W. Configurar temporizador en 2–3 min y LUX para encendido nocturno.',
    links: [
      { store: 'Electricidad Fernández (Directo)', sku: 'LEXO-360-INFRA', price: 9500, url: 'https://electricidadfernandez.cl/product/sensor-infrarrojo-cielo-360-lexo/?utm_source=chatgpt.com', isSelected: true },
      { store: 'Homecenter Sodimac', sku: '264389X', price: 10990, url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=sensor+de+movimiento+360', isSelected: false },
      { store: 'Easy.cl', sku: '1293840', price: 11490, url: 'https://www.easy.cl/search?q=sensor+de+movimiento+360', isSelected: false },
      { store: 'Mercado Libre', sku: 'MLC26801295', price: 9990, url: 'https://www.mercadolibre.cl/sensor-de-movimiento-360-para-techo-240v-100w/p/MLC26801295', isSelected: false }
    ]
  },
  {
    id: 'cat_demasled_360',
    name: 'Sensor de Movimiento 360° 220V 100W Demasled',
    category: 'Sensores y Domótica',
    supplier: 'Mercado Libre',
    price: 7090,
    badge: '💰 Mínimo Costo',
    url: 'https://www.mercadolibre.cl/sensor-de-movimiento-360-para-techo-240v-100w/p/MLC26801295?utm_source=chatgpt.com',
    specs: '220 V, PIR 360°, detección hasta 8 m, temporizador 10–420 s, carga 100 W, IP20, sobrepuesto.',
    notes: 'Opción más económica y suficiente para luminaria LED de 18W. Instalar en zona seca del baño.',
    links: [
      { store: 'Mercado Libre (Demasled)', sku: 'MLC26801295', price: 7090, url: 'https://www.mercadolibre.cl/sensor-de-movimiento-360-para-techo-240v-100w/p/MLC26801295', isSelected: true },
      { store: 'Homecenter Sodimac', sku: '3891029', price: 8990, url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=sensor+movimiento+sobrepuesto', isSelected: false },
      { store: 'Easy.cl', sku: '1039481', price: 9490, url: 'https://www.easy.cl/search?q=sensor+movimiento+techo', isSelected: false }
    ]
  },
  {
    id: 'cat_ilumat_ip65',
    name: 'Sensor de Movimiento Sobrepuesto PIR IP65 Ilumat',
    category: 'Sensores y Domótica',
    supplier: 'Ilumat (Directo)',
    price: 19900,
    badge: '⭐ Robusto',
    url: 'https://ilumat.cl/producto/sensor-de-movimiento-sobrepuesto-pir-ip65/?utm_source=chatgpt.com',
    specs: 'IP65 hermético a humedad y polvo, 220–240 V, 360°, detección hasta 12 m, temp 10 s–5 min, carga 300 W LED.',
    notes: 'Máxima durabilidad contra vapor y humedad intensa. Excelente opción robusta.',
    links: [
      { store: 'Ilumat (Proveedor Directo)', sku: 'ILU-IP65-360', price: 19900, url: 'https://ilumat.cl/producto/sensor-de-movimiento-sobrepuesto-pir-ip65/?utm_source=chatgpt.com', isSelected: true },
      { store: 'Homecenter Sodimac', sku: '4729102', price: 21990, url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=sensor+movimiento+ip65', isSelected: false },
      { store: 'Easy.cl', sku: '1182903', price: 22490, url: 'https://www.easy.cl/search?q=sensor+movimiento+ip65', isSelected: false }
    ]
  },
  {
    id: 'cat_ilumat_360',
    name: 'Sensor de Movimiento Ilumat Cielo 360°',
    category: 'Sensores y Domótica',
    supplier: 'Ilumat',
    price: 7900,
    badge: 'Alternativa',
    url: 'https://ilumat.cl',
    specs: '360° / hasta 12 m, temporizador 10 s–5 min, 300 W LED, instalación sobrepuesta.',
    notes: 'Buena alternativa económica de marca nacional.',
    links: [
      { store: 'Ilumat (Proveedor Directo)', sku: 'ILU-CIELO-360', price: 7900, url: 'https://ilumat.cl/?s=sensor+360&post_type=product', isSelected: true },
      { store: 'Homecenter Sodimac', sku: '2948102', price: 9490, url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=sensor+movimiento+ilumat', isSelected: false },
      { store: 'Easy.cl', sku: '1092834', price: 9990, url: 'https://www.easy.cl/search?q=sensor+movimiento+ilumat', isSelected: false }
    ]
  },
  {
    id: 'cat_stanford_360',
    name: 'Sensor de Movimiento 360° Stanford',
    category: 'Sensores y Domótica',
    supplier: 'Stanford / Ferretería',
    price: 8990,
    badge: 'Alternativa',
    url: '',
    specs: '360° / 6 m, temporizador 5 s–6 min, 1000 W resistiva, sobrepuesto.',
    notes: 'Fácil instalación en techo.',
    links: [
      { store: 'Ferretería Directa / Stanford', sku: 'STN-360-1000W', price: 8990, url: 'https://listado.mercadolibre.cl/sensor-movimiento-stanford-360', isSelected: true },
      { store: 'Homecenter Sodimac', sku: '3182940', price: 10490, url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=sensor+movimiento+360', isSelected: false },
      { store: 'Easy.cl', sku: '1284910', price: 10990, url: 'https://www.easy.cl/search?q=sensor+movimiento+360', isSelected: false }
    ]
  },
  {
    id: 'cat_interlight_360',
    name: 'Sensor Embutido a Techo Infrarrojo 360° Interlight',
    category: 'Sensores y Domótica',
    supplier: 'Interlight',
    price: 9990,
    badge: 'Empotrado',
    url: '',
    specs: '360° / 6–8 m, temporizador 10 s–7 min, 400 W LED, montaje embutido en cielo falso.',
    notes: 'Ideal si se desea una estética limpia empotrada en cielo falso o yeso-cartón.',
    links: [
      { store: 'Interlight (Distribuidor)', sku: 'INT-EMB-360', price: 9990, url: 'https://listado.mercadolibre.cl/sensor-embutido-360-interlight', isSelected: true },
      { store: 'Homecenter Sodimac', sku: '3948201', price: 11990, url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=sensor+embutido+techo+360', isSelected: false },
      { store: 'Easy.cl', sku: '1192840', price: 12490, url: 'https://www.easy.cl/search?q=sensor+embutido+techo+360', isSelected: false }
    ]
  },
  {
    id: 'cat_sodimac_360',
    name: 'Sensor de Movimiento Infrarrojo 360° Sodimac',
    category: 'Sensores y Domótica',
    supplier: 'Homecenter Sodimac',
    price: 10990,
    badge: 'Alternativa',
    url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=sensor+de+movimiento+360',
    specs: '360°, 220–240 V, temporizador regulable, instalación sobrepuesta.',
    notes: 'Disponible para retiro inmediato en tiendas Sodimac.',
    links: [
      { store: 'Homecenter Sodimac', sku: '264389X', price: 10990, url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=sensor+de+movimiento+360', isSelected: true },
      { store: 'Easy.cl', sku: '1293840', price: 11490, url: 'https://www.easy.cl/search?q=sensor+de+movimiento+360', isSelected: false }
    ]
  },
  {
    id: 'cat_molychile_360',
    name: 'Sensor de Movimiento 360° Molychile',
    category: 'Sensores y Domótica',
    supplier: 'Molychile',
    price: 11990,
    badge: 'Alternativa',
    url: '',
    specs: '360° / 3–12 m, temporizador 2–7 min, carga 1200 W, sobrepuesto.',
    notes: 'Alta capacidad de potencia.',
    links: [
      { store: 'Molychile (Distribuidor)', sku: 'MOLY-360-1200', price: 11990, url: 'https://listado.mercadolibre.cl/sensor-movimiento-360-molychile', isSelected: true },
      { store: 'Homecenter Sodimac', sku: '4819203', price: 13990, url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=sensor+movimiento+360', isSelected: false }
    ]
  },
  {
    id: 'cat_cortina_bano',
    name: 'Cortina de baño impermeable antimoho (180x200cm)',
    category: 'Fontanería y Baño',
    supplier: 'Homecenter Sodimac',
    price: 12990,
    badge: 'Básico',
    url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=cortina+de+bano+antimoho',
    specs: '180x200cm, tratamiento impermeable antimoho, poliéster de alta densidad.',
    notes: 'Comprobada resistencia a la humedad.',
    links: [
      { store: 'Homecenter Sodimac', sku: '2738914', price: 12990, url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=cortina+de+bano+antimoho', isSelected: true },
      { store: 'Easy.cl', sku: '1194820', price: 13490, url: 'https://www.easy.cl/search?q=cortina+bano+impermeable', isSelected: false }
    ]
  },
  {
    id: 'cat_barra_ducha',
    name: 'Barra de ducha extensible acero inoxidable (110-200cm)',
    category: 'Fontanería y Baño',
    supplier: 'Easy.cl',
    price: 16490,
    badge: 'Inox',
    url: 'https://www.easy.cl/barra-cortina-bano-extensible',
    specs: 'Acero inoxidable extensible 110 a 200 cm, fijación por presión con topes de goma.',
    notes: 'Fácil instalación sin perforar muros.',
    links: [
      { store: 'Easy.cl', sku: '1048291', price: 16490, url: 'https://www.easy.cl/search?q=barra+cortina+bano+extensible', isSelected: true },
      { store: 'Homecenter Sodimac', sku: '3849102', price: 17990, url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=barra+cortina+bano+extensible', isSelected: false }
    ]
  },
  {
    id: 'cat_panel_led_12w',
    name: 'Luminaria Panel LED 12W Sobrepuesto Luz Fría',
    category: 'Iluminación LED',
    supplier: 'Homecenter Sodimac',
    price: 4990,
    badge: '🥇 Recomendado',
    url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=panel+led+12w+sobrepuesto',
    specs: '12W LED, 220V, luz fría 6500K, 960 lm, driver integrado, montaje sobrepuesto en techo.',
    notes: 'Excelente luminosidad y bajo consumo para baños y pasillos. Compatible con sensor relé 360°.',
    links: [
      { store: 'Homecenter Sodimac', sku: '3849201', price: 4990, url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=panel+led+12w+sobrepuesto', isSelected: true },
      { store: 'Easy.cl', sku: '1194821', price: 5290, url: 'https://www.easy.cl/search?q=panel+led+12w+sobrepuesto', isSelected: false },
      { store: 'Electricidad Fernández', sku: 'PANEL-12W-SOB', price: 4500, url: 'https://electricidadfernandez.cl', isSelected: false }
    ]
  },
  {
    id: 'cat_demasled_200_ip65',
    name: 'Sensor de Movimiento Para Exterior 200° IP65 Demasled (Muro)',
    category: 'Sensores y Domótica',
    supplier: 'Mercado Libre (Demasled)',
    price: 11896,
    badge: '🥇 Ideal Pasillos',
    url: 'https://www.mercadolibre.cl/sensor-de-movimiento-sobrepuesto-muro-pared-exterior-200-ip65-demasled/p/MLC68359912?utm_source=chatgpt.com',
    specs: '200° de detección lateral, hasta 12 m alcance, IP65 intemperie, 220–240 V AC, LUX 10–2000 lux, temporizador 10s–15 min, hasta 1000 W LED, montaje muro 1.8–2.5 m.',
    notes: 'Primera opción recomendada para pasillos: ángulo 200° focalizado a lo largo del camino y temporizador de hasta 15 min.',
    links: [
      { store: 'Mercado Libre (Demasled)', sku: 'MLC68359912', price: 11896, url: 'https://www.mercadolibre.cl/sensor-de-movimiento-sobrepuesto-muro-pared-exterior-200-ip65-demasled/p/MLC68359912?utm_source=chatgpt.com', isSelected: true },
      { store: 'Homecenter Sodimac', sku: '5839201', price: 13990, url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=sensor+movimiento+exterior+muro', isSelected: false },
      { store: 'Easy.cl', sku: '1294820', price: 14490, url: 'https://www.easy.cl/search?q=sensor+movimiento+exterior+muro', isSelected: false }
    ]
  },
  {
    id: 'cat_ilumat_ip65_360',
    name: 'Sensor de Movimiento Sobrepuesto PIR IP65 Ilumat 360°',
    category: 'Sensores y Domótica',
    supplier: 'Ilumat (Directo)',
    price: 19900,
    badge: '🥇 Recomendado Exterior',
    url: 'https://ilumat.cl/producto/sensor-de-movimiento-sobrepuesto-pir-ip65/?utm_source=chatgpt.com',
    specs: '360° detección, 12 m alcance, IP65 intemperie, 220–240 V AC, temp 10s–5 min, LUX regulable <3–2000 lux, hasta 300 W LED, humedad hasta 93% RH, cielo o muro.',
    notes: 'Excelente combinación de máxima protección contra lluvia/polvo y amplio rango de regulación LUX.',
    links: [
      { store: 'Ilumat (Proveedor Directo)', sku: 'ILU-PIR-IP65', price: 19900, url: 'https://ilumat.cl/producto/sensor-de-movimiento-sobrepuesto-pir-ip65/?utm_source=chatgpt.com', isSelected: true },
      { store: 'Homecenter Sodimac', sku: '4729102', price: 21990, url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=sensor+movimiento+ip65', isSelected: false },
      { store: 'Easy.cl', sku: '1182903', price: 22490, url: 'https://www.easy.cl/search?q=sensor+movimiento+ip65', isSelected: false }
    ]
  },
  {
    id: 'cat_wanting_360_ip65',
    name: 'Sensor de Movimiento Sobrepuesto Infrarrojo 360° IP65 Wanting (ST18H)',
    category: 'Sensores y Domótica',
    supplier: 'Wanting Chile',
    price: 17900,
    badge: '⭐ Cabezal Orientable',
    url: 'https://www.wantingchile.cl/products/sensor-de-movimiento-sobrepuesto-infrarrojo-360-ip65?utm_source=chatgpt.com',
    specs: '360°, hasta 12 m, IP65, 220–240 V, LUX 3–2000 lux, temp 10s–7 min, hasta 300 W LED, temp -20 a +40 °C, cabezal orientable techo o pared.',
    notes: 'Cabezal direccionable muy útil para enfocar la zona de detección en esquinas o bajo aleros.',
    links: [
      { store: 'Wanting Chile (Directo)', sku: 'ST18H-IP65', price: 17900, url: 'https://www.wantingchile.cl/products/sensor-de-movimiento-sobrepuesto-infrarrojo-360-ip65?utm_source=chatgpt.com', isSelected: true },
      { store: 'Mercado Libre', sku: 'MLC-WANT-360', price: 18490, url: 'https://listado.mercadolibre.cl/sensor-movimiento-wanting-360', isSelected: false }
    ]
  },
  {
    id: 'cat_wt_180_ip65',
    name: 'Sensor de Movimiento WT Cielo 180° IP65 IluminaLED',
    category: 'Sensores y Domótica',
    supplier: 'IluminaLED',
    price: 9990,
    badge: '💰 Mínimo Costo',
    url: 'https://www.iluminaled.cl/product/sensor-de-mov-wt-cielo-180-ip65/?utm_source=chatgpt.com',
    specs: '180°, IP65, 220 V, PIR montaje en cielo, temporizador regulable, diseñado para exteriores, pasillos y estacionamientos.',
    notes: 'Alternativa económica para exteriores y pasillos.',
    links: [
      { store: 'IluminaLED (Directo)', sku: 'WT-180-IP65', price: 9990, url: 'https://www.iluminaled.cl/product/sensor-de-mov-wt-cielo-180-ip65/?utm_source=chatgpt.com', isSelected: true },
      { store: 'Homecenter Sodimac', sku: '3910294', price: 11490, url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=sensor+movimiento+180+ip65', isSelected: false }
    ]
  },
  {
    id: 'cat_ledstudio_180_ip65',
    name: 'Sensor de Movimiento LED Studio Sobrepuesto 180° 220V IP65 Blanco',
    category: 'Sensores y Domótica',
    supplier: 'LED Studio',
    price: 13490,
    badge: 'Alternativa',
    url: 'https://www.ledstudio.cl/sensor-de-movimiento-led-studio-sobrepuesto-con-tiempo-programable-220v-ip65/p?utm_source=chatgpt.com',
    specs: '180°, hasta 12 m, IP65, 220–240 V, hasta 600 W LED, temporizador programable, pensado para pasillos y exteriores.',
    notes: 'Opción robusta con capacidad de hasta 600W LED para exteriores.',
    links: [
      { store: 'LED Studio (Directo)', sku: 'LS-180-IP65', price: 13490, url: 'https://www.ledstudio.cl/sensor-de-movimiento-led-studio-sobrepuesto-con-tiempo-programable-220v-ip65/p?utm_source=chatgpt.com', isSelected: true },
      { store: 'Easy.cl', sku: '1394820', price: 14990, url: 'https://www.easy.cl/search?q=sensor+movimiento+led+studio', isSelected: false }
    ]
  },
  {
    id: 'cat_panel_led_20w_redondo',
    name: 'Panel Redondo LED AD Sobrepuesto 20W Frío',
    category: 'Iluminación LED',
    supplier: 'Homecenter Sodimac',
    price: 3990,
    badge: '💡 Alta Eficiencia',
    url: 'https://www.sodimac.cl/sodimac-cl/articulo/114110551/panel-redondo-led-ad-sobrepuesto-20w-frio/114110563',
    specs: '20W LED, 6500K luz fría, diseño redondo sobrepuesto para cielo/techo, encendido instantáneo, 220V.',
    notes: 'Ideal para renovación y mejora de iluminación en el comedor parroquial, salones comunitarios y salas de encuentro.',
    links: [
      { store: 'Homecenter Sodimac', sku: '114110551', price: 3990, url: 'https://www.sodimac.cl/sodimac-cl/articulo/114110551/panel-redondo-led-ad-sobrepuesto-20w-frio/114110563', isSelected: true }
    ]
  },
  {
    id: 'cat_foco_led_18w_ip65',
    name: 'Luminaria LED Hermética Exterior 18W IP65 Luz Fría',
    category: 'Iluminación LED',
    supplier: 'Homecenter Sodimac',
    price: 8990,
    badge: '🥇 Exterior IP65',
    url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=luminaria+hermetica+18w+ip65',
    specs: '18W LED, 220V, IP65 impermeable, 1500 lm, difusor opal antideslumbrante, resistente a sol y lluvia.',
    notes: 'Ideal para pasillos exteriores, jardines y zonas de tránsito.',
    links: [
      { store: 'Homecenter Sodimac', sku: '4819201', price: 8990, url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=luminaria+hermetica+18w+ip65', isSelected: true },
      { store: 'Easy.cl', sku: '1293841', price: 9490, url: 'https://www.easy.cl/search?q=luminaria+hermetica+18w+ip65', isSelected: false }
    ]
  },
  {
    id: 'cat_softlight_30w_pir',
    name: 'Proyector LED SOFTLIGHT 30W con Sensor PIR IP65 (Aluminio/UV)',
    category: 'Iluminación Todo-en-Uno',
    supplier: 'IluminaLED',
    price: 13900,
    badge: '🥇 Recomendado Entrada',
    url: 'https://www.iluminaled.cl/product/proyector-led-polux-20w-con-sensor/?utm_source=chatgpt.com',
    specs: '30W LED, IP65, PIR 120° (5m alcance), 5700K luz fría, carcasa de aluminio con protección UV resistente al sol y lluvia, 30.000 hrs, 220V.',
    notes: 'Todo-en-uno recomendado para accesos exteriores y entradas. Carcasa de aluminio con protección UV de alta durabilidad.',
    links: [
      { store: 'IluminaLED (Directo)', sku: 'SOFT-30W-PIR', price: 13900, url: 'https://www.iluminaled.cl/product/proyector-led-polux-20w-con-sensor/?utm_source=chatgpt.com', isSelected: true },
      { store: 'Homecenter Sodimac', sku: '3920194', price: 15990, url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=foco+led+30w+con+sensor+ip65', isSelected: false },
      { store: 'Easy.cl', sku: '1294821', price: 16490, url: 'https://www.easy.cl/search?q=foco+led+30w+con+sensor+ip65', isSelected: false }
    ]
  },
  {
    id: 'cat_reflector_30w_pir_lux',
    name: 'Reflector LED 30W Exterior con Sensor PIR y Ajuste LUX IP65',
    category: 'Iluminación Todo-en-Uno',
    supplier: 'Mercado Libre',
    price: 7435,
    badge: '💰 Mínimo Costo',
    url: 'https://www.mercadolibre.cl/foco-led-20w220v-exterior-sensor-de-movimiento-ip65-6500k/up/MLCU41148246?utm_source=chatgpt.com',
    specs: '30W LED 6500K, IP65, PIR 2–12m ajustable, tiempo 5s–8min, perilla ajuste de sensibilidad y luz ambiente (LUX), 220V.',
    notes: 'Alternativa económica con ajuste explícito de luz ambiente (LUX) para evitar encendidos durante el día.',
    links: [
      { store: 'Mercado Libre (Directo)', sku: 'MLCU41148246', price: 7435, url: 'https://www.mercadolibre.cl/foco-led-20w220v-exterior-sensor-de-movimiento-ip65-6500k/up/MLCU41148246?utm_source=chatgpt.com', isSelected: true },
      { store: 'Homecenter Sodimac', sku: '4819202', price: 8990, url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=reflector+led+30w+sensor+movimiento', isSelected: false }
    ]
  },
  {
    id: 'cat_megabright_20w_pir',
    name: 'Proyector LED Megabright 20W con Sensor PIR Exterior',
    category: 'Iluminación Todo-en-Uno',
    supplier: 'Ferretería / Megabright',
    price: 7990,
    badge: 'Alternativa',
    url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=proyector+led+megabright+20w+sensor',
    specs: '20W LED, sensor PIR integrado, 220V, adecuado para pasos peatonales y accesos.',
    notes: 'Buena potencia cercana a 18W con bajo costo unitario.',
    links: [
      { store: 'Homecenter Sodimac', sku: '3948102', price: 7990, url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=proyector+led+megabright+20w+sensor', isSelected: true },
      { store: 'Easy.cl', sku: '1194822', price: 8490, url: 'https://www.easy.cl/search?q=proyector+led+megabright+20w+sensor', isSelected: false }
    ]
  },
  {
    id: 'cat_itd_15w_sensor',
    name: 'Foco LED Exterior ITD 15W con Sensor PIR IP65',
    category: 'Iluminación Todo-en-Uno',
    supplier: 'ITD Iluminación',
    price: 13990,
    badge: 'Bajo Consumo',
    url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=foco+led+itd+15w+sensor',
    specs: '15W LED, IP65, PIR integrado, luz fría, diseño compacto.',
    notes: 'Luminaria compacta de bajo consumo.',
    links: [
      { store: 'Homecenter Sodimac', sku: '4819204', price: 13990, url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=foco+led+itd+15w+sensor', isSelected: true },
      { store: 'Easy.cl', sku: '1294823', price: 14490, url: 'https://www.easy.cl/search?q=foco+led+exterior+15w+sensor', isSelected: false }
    ]
  },
  {
    id: 'cat_roblan_18w_pir_ip65',
    name: 'Plafón LED ROBLAN 18W IP65 con Sensor PIR Integrado',
    category: 'Iluminación Todo-en-Uno',
    supplier: 'ROBLAN / Distribuidor',
    price: 23590,
    badge: '⭐ Estética Arquitectónica',
    url: 'https://listado.mercadolibre.cl/plafon-led-roblan-18w-sensor-ip65',
    specs: '18W LED, IP65, sensor PIR integrado en difusor, diseño tipo plafón arquitectónico circular blanco/negro, 220V.',
    notes: 'Ideal si se busca una estética arquitectónica limpia y moderna en lugar de reflectores tipo proyector.',
    links: [
      { store: 'Distribuidor Directo', sku: 'ROB-18W-PIR', price: 23590, url: 'https://listado.mercadolibre.cl/plafon-led-roblan-18w-sensor-ip65', isSelected: true },
      { store: 'Homecenter Sodimac', sku: '5829104', price: 24990, url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=plafon+led+18w+sensor+ip65', isSelected: false }
    ]
  },
  {
    id: 'cat_mic_uhf_dual',
    name: 'Sistema Inalámbrico UHF Doble Multicanal Profesional',
    category: 'Audio y Megafonía',
    supplier: 'Mercado Libre / Especialista Audio',
    price: 95000,
    badge: '🥇 Recomendado Templo',
    url: 'https://listado.mercadolibre.cl/microfono-inalambrico-uhf-doble',
    specs: 'Receptor UHF doble banda, sincronización infrarroja, filtros antirruido, alcance 60m.',
    notes: 'Recomendado para celebraciones dominicales y predicación.',
    links: [
      { store: 'Mercado Libre', sku: 'MLC-UHF-DUAL', price: 95000, url: 'https://listado.mercadolibre.cl/microfono-inalambrico-uhf-doble', isSelected: true },
      { store: 'Proveedor Directo', sku: 'AUD-UHF-200', price: 99990, url: '', isSelected: false }
    ]
  },
  {
    id: 'cat_cable_xlr_10m',
    name: 'Cable Balanceado de Micrófono XLR Cannon 10m Libre de Oxígeno',
    category: 'Audio y Megafonía',
    supplier: 'Distribuidor Audio',
    price: 8500,
    badge: '⭐ Bajo Ruido',
    url: 'https://listado.mercadolibre.cl/cable-xlr-10m-balanceado',
    specs: 'Conectores metálicos tipo Neutrik niquelados, blindaje espiral 98% cobre OFC.',
    notes: 'Elimina ruidos de masa y zumbidos en el altar y ambón.',
    links: [
      { store: 'Mercado Libre', sku: 'MLC-XLR-10M', price: 8500, url: 'https://listado.mercadolibre.cl/cable-xlr-10m-balanceado', isSelected: true }
    ]
  },
  {
    id: 'cat_camara_streaming_hdmi',
    name: 'Cámara Full HD 60fps con Salida Limpia HDMI para Streaming',
    category: 'Video y Streaming',
    supplier: 'Distribuidor Video / PC Factory',
    price: 125000,
    badge: '🥇 Transmisión Misa',
    url: 'https://listado.mercadolibre.cl/camara-full-hd-hdmi-limpia',
    specs: 'Sensor CMOS alta sensibilidad para templos con luz tenue, salida limpia HDMI 1080p60.',
    notes: 'Permite streaming continuo hacia YouTube y Facebook de las Eucaristías sin cortes.',
    links: [
      { store: 'Mercado Libre', sku: 'MLC-CAM-STREAM', price: 125000, url: 'https://listado.mercadolibre.cl/camara-full-hd-hdmi-limpia', isSelected: true }
    ]
  },
  {
    id: 'cat_wifi_mesh_deco',
    name: 'Sistema Wi-Fi Mesh Gigabit Doble Banda (Pack 2 unidades)',
    category: 'Informática y Redes',
    supplier: 'PC Factory',
    price: 79990,
    badge: '🥇 Cobertura Total',
    url: 'https://www.pcfactory.cl',
    specs: 'AC1200 / Gigabit Ethernet, roaming fluido, cobertura hasta 280 m².',
    notes: 'Cubre oficinas de secretaría, salas de reuniones y sacristía.',
    links: [
      { store: 'PC Factory', sku: 'MESH-2PK-GIGA', price: 79990, url: 'https://www.pcfactory.cl', isSelected: true }
    ]
  },
  {
    id: 'cat_ups_1200va',
    name: 'UPS Respaldo Eléctrico Interactivo 1200VA / 650W con AVR',
    category: 'Informática y Redes',
    supplier: 'PC Factory',
    price: 45010,
    badge: '⭐ Respaldo Secretaría',
    url: 'https://www.pcfactory.cl',
    specs: '6 tomas protegidas, regulación automática de voltaje AVR, autonomía 20-30 min para PC e impresora.',
    notes: 'Protege la base de datos parroquial y equipos de oficina contra cortes de luz.',
    links: [
      { store: 'PC Factory', sku: 'UPS-1200-AVR', price: 45010, url: 'https://www.pcfactory.cl', isSelected: true }
    ]
  }
];

// Initial sample data for Parroquia San Patricio
const SAMPLE_DATA = [
  // ── PROYECTO ACTIVO ─────────────────────────────────────────────────────────
  {
    id: 'rep_pilas_microfonos',
    place: 'Templo Mayor y Capilla de Adoración',
    area: 'Sonido Litúrgico y Adoración Continua',
    specialty: 'Audio y Velas Litúrgicas',
    status: 'compras',
    title: 'Compra de 32 Pilas Recargables AA Energizer (16 Packs) para Micrófonos y Velas de Adoración',
    description: '[30/10/2026 02:50] 🔋 Regla del Proyecto Pilas Recargables:\nEn el proyecto son 4 micrófonos para el Templo, 2 para la Capilla y 2 velas para la Adoración al Santísimo Sacramento. Cada aparato (micrófonos y velas del Santísimo) utiliza 2 pilas cada uno, y debemos tener el doble de pilas para tener siempre unas en uso y otras en carga.\n\n🎯 Desglose por Fases e Hitos:\n• FASE 1 (PRIORIDAD ACTUAL Y META A CUMPLIR): 16 pilas recargables AA (8 packs) para los 4 micrófonos del Templo Mayor. 4 micrófonos × 2 pilas = 8 pilas en uso + 8 en carga continua = 16 pilas AA en total. Meta: $50.320. Recaudado actual: $29.000 (58% de avance).\n• FASE 2 (PRÓXIMO HITO): 8 pilas recargables AA (4 packs) para los 2 micrófonos de la Capilla (4 en uso + 4 en carga). Meta: $25.160.\n• FASE 3 (HITO FINAL): 8 pilas recargables AA (4 packs) para las 2 velas de Adoración al Santísimo Sacramento (4 en uso + 4 en carga). Meta: $25.160.\n• META TOTAL CONSOLIDADA: 32 pilas AA (16 packs de 2 pilas) = $100.640.',
    priority: 'alta',
    raisedAmount: 29000,
    hasLabor: false,
    laborCost: 0,
    createdAt: Date.now() + 9000,
    items: [
      {
        id: 'itm_pilas_1',
        name: 'Pack de 2 Pilas Recargables AA Energizer 2000 mAh 1.2V [SKU: 110228362] — Sodimac (16 packs = 32 pilas AA)',
        price: 6290,
        qty: 16,
        url: 'https://www.sodimac.cl/sodimac-cl/articulo/110228362/pack-de-2-pilas-recargables-aa-2000-mah-1-2v/110228368',
        bought: false
      }
    ]
  },

  // ── PROYECTOS FUTUROS (EN PLANIFICACIÓN) ────────────────────────────────────
  {
    id: 'rep_comedor_iluminacion',
    place: 'Casa Sacerdotal y Salones',
    area: 'Comedor Parroquial',
    specialty: 'Electricidad e Iluminación',
    status: 'planificacion',
    title: 'Renovación de Iluminación en Comedor Parroquial (10 Paneles LED 20W Sobrepuestos)',
    description: '[30/10/2026 02:30] ⏱️ Diagnóstico y Planificación: Renovación integral de la iluminación del Comedor Parroquial, espacio de uso comunitario para encuentros pastorales y convivencias fraternas.\n\n[30/10/2026 02:30] 💡 Elección Técnica: 10 Paneles Redondos LED AD Sobrepuestos de 20W Luz Fría (Sodimac SKU: 114110551 / 114110563) a $3.990 c/u. Distribución lumínica homogénea, encendido inmediato, bajo consumo y montaje sobrepuesto limpio en cielo.\n\n[30/10/2026 02:30] 📦 Presupuesto: 10 paneles × $3.990 = $39.900 total materiales.',
    priority: 'alta',
    raisedAmount: 0,
    hasLabor: false,
    laborCost: 0,
    createdAt: Date.now() + 8500,
    items: [
      {
        id: 'itm_comedor_1',
        name: 'Panel Redondo LED AD Sobrepuesto 20W Frío [SKU: 114110551 / 114110563] — Sodimac',
        price: 3990,
        qty: 10,
        url: 'https://www.sodimac.cl/sodimac-cl/articulo/114110551/panel-redondo-led-ad-sobrepuesto-20w-frio/114110563',
        bought: false
      }
    ]
  },
  {
    id: 'rep_parroquia_entrada_banos',
    place: 'Exteriores y Pasillos',
    area: 'Entrada y Baños Principales',
    specialty: 'Electricidad e Iluminación',
    status: 'planificacion',
    title: 'Iluminación Todo-en-Uno con Sensor PIR y Crepuscular en Acceso y Baños',
    description: '[01/09/2026 11:00] ⏱️ Inicio de Proyecto: Instalación de luminaria exterior todo-en-uno que incorpora LED + Sensor PIR + Sensor Crepuscular LUX + IP65 en un solo equipo hermético para el acceso exterior hacia los baños comunitarios.\n\n[01/09/2026 11:15] 💡 Elección Técnica: Proyector LED SOFTLIGHT 30W IP65 ($13.900) con carcasa de aluminio fundido y protección UV contra radiación solar y lluvia, caja estanca de paso y cable libre de halógeno.\n\n[01/09/2026 11:30] 🌙 Regulación Crepuscular: Bloqueo en horario diurno. El foco solo activa su detección con poca luz ambiental nocturna.',
    priority: 'alta',
    raisedAmount: 0,
    hasLabor: true,
    laborCost: 18000,
    createdAt: Date.now() + 7000,
    items: [
      {
        id: 'itm_entrada_1',
        name: 'Proyector LED SOFTLIGHT 30W con Sensor PIR y Protección UV IP65 (IluminaLED) [SKU: SOFT-30W-PIR]',
        price: 13900,
        qty: 1,
        url: 'https://www.iluminaled.cl/product/proyector-led-polux-20w-con-sensor/?utm_source=chatgpt.com',
        bought: false
      },
      {
        id: 'itm_entrada_2',
        name: 'Caja estanca de conexión IP65 y fijaciones para muro exterior',
        price: 3990,
        qty: 1,
        url: 'https://www.easy.cl/search?q=caja+estanca+ip65',
        bought: false
      },
      {
        id: 'itm_entrada_3',
        name: 'Cable eléctrico 1.5mm libre de halógeno para exterior (5m)',
        price: 3500,
        qty: 1,
        url: 'https://www.easy.cl/search?q=cable+1.5mm',
        bought: false
      }
    ]
  },
  {
    id: 'rep_parroquia_pasillo',
    place: 'Exteriores y Pasillos',
    area: 'Pasillo Jardín Baños',
    specialty: 'Electricidad e Iluminación',
    status: 'planificacion',
    title: 'Iluminación a Demanda en Pasillo Jardín y Baños Exteriores (IP65)',
    description: '[01/09/2026 10:15] ⏱️ Diagnóstico: Pasillos exteriores permanentemente expuestos a lluvia y sol. Se requiere automatizar dos luminarias herméticas de 18W para tránsito seguro en eventos y misas vespertinas.\n\n[01/09/2026 10:30] 💡 Elección Técnica: Sensor DEMASLED 200° IP65 sobrepuesto en muro ($11.896) con haz focalizado longitudinal. Dos luminarias herméticas LED 18W luz fría ($8.990 c/u).\n\n[01/09/2026 10:45] 📏 Montaje: Ubicar sensor bajo alero a 2.2m de altura. Calibrar temporizador en 4 minutos.',
    priority: 'alta',
    raisedAmount: 0,
    hasLabor: true,
    laborCost: 25000,
    createdAt: Date.now() + 6000,
    items: [
      {
        id: 'itm_pasillo_1',
        name: 'Sensor de Movimiento Exterior 200° IP65 DEMASLED Muro [SKU: MLC68359912]',
        price: 11896,
        qty: 1,
        url: 'https://www.mercadolibre.cl/sensor-de-movimiento-sobrepuesto-muro-pared-exterior-200-ip65-demasled/p/MLC68359912?utm_source=chatgpt.com',
        bought: false
      },
      {
        id: 'itm_pasillo_2',
        name: 'Luminaria LED Hermética Exterior 18W IP65 Luz Fría [SKU: 4819201]',
        price: 8990,
        qty: 2,
        url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=luminaria+hermetica+18w+ip65',
        bought: false
      },
      {
        id: 'itm_pasillo_3',
        name: 'Caja estanca de derivación IP65 con prensaestopas y fijaciones',
        price: 4990,
        qty: 1,
        url: 'https://www.easy.cl/search?q=caja+estanca+ip65',
        bought: false
      },
      {
        id: 'itm_pasillo_4',
        name: 'Cable eléctrico 1.5mm libre de halógeno para exterior (15m)',
        price: 10000,
        qty: 1,
        url: 'https://www.easy.cl/search?q=cable+1.5mm',
        bought: false
      }
    ]
  },
  {
    id: 'rep_parroquia_bano',
    place: 'Templo Mayor',
    area: 'Baños Principales',
    specialty: 'Electricidad e Iluminación',
    status: 'planificacion',
    title: 'Automatización e Iluminación LED 12W con Sensor 360° en Baño de Hombres y Mujeres',
    description: '[15/08/2026 09:00] ⏱️ Planificación: Instalación de sensor relé 360° en cielo falso y dos plafones LED de 12W. Temporizador fijado en 3 minutos. Reducción estimada de 70% en consumo eléctrico en baños.',
    priority: 'media',
    raisedAmount: 0,
    hasLabor: true,
    laborCost: 20000,
    createdAt: Date.now() + 5000,
    items: [
      {
        id: 'itm_parroquia_1',
        name: 'Luminaria Panel LED 12W Sobrepuesto Luz Fría [SKU: 3849201]',
        price: 4990,
        qty: 2,
        url: 'https://sodimac.falabella.com/sodimac-cl/search?Ntt=panel+led+12w+sobrepuesto',
        bought: false
      },
      {
        id: 'itm_parroquia_2',
        name: 'Sensor Infrarrojo Cielo 360° LEXO con Relé [SKU: LEXO-360-INFRA]',
        price: 9500,
        qty: 1,
        url: 'https://electricidadfernandez.cl/product/sensor-infrarrojo-cielo-360-lexo/?utm_source=chatgpt.com',
        bought: false
      },
      {
        id: 'itm_parroquia_3',
        name: 'Cable eléctrico 1.5mm libre de halógeno, terminales y fijaciones',
        price: 4500,
        qty: 1,
        url: 'https://www.easy.cl/search?q=cable+1.5mm',
        bought: false
      }
    ]
  },
  {
    id: 'rep_parroquia_audio',
    place: 'Templo Mayor',
    area: 'Altar y Presbiterio',
    specialty: 'Audio y Megafonía',
    status: 'planificacion',
    title: 'Renovación de Sistema de Micrófonos Inalámbricos UHF y Cableado Balanceado XLR',
    description: '[20/09/2026 18:00] ⏱️ Diagnóstico: Interferencia y ruidos de masa en micrófonos actuales durante la misa dominical. Los cables del ambón presentan desgaste en conectores.\n\n[22/09/2026 12:00] 💡 Propuesta Técnica: Sistema de doble micrófono inalámbrico UHF multicanal (antinterferencia) para sacerdotes y lectores, 4 líneas balanceadas con cable libre de oxígeno y conectores Neutrik XLR dorados, más 2 cajas directas pasivas para instrumentos del coro.\n\n[25/09/2026 16:00] 📏 Medición: Distancia entre consola en sacristía y ambón: 18 metros.',
    priority: 'urgente',
    raisedAmount: 0,
    hasLabor: true,
    laborCost: 35000,
    createdAt: Date.now() + 4000,
    items: [
      {
        id: 'itm_audio_1',
        name: 'Sistema Inalámbrico UHF Doble Receptor Multicanal Profesional [SKU: MLC-UHF-DUAL]',
        price: 95000,
        qty: 1,
        url: 'https://listado.mercadolibre.cl/microfono-inalambrico-uhf-doble',
        bought: false
      },
      {
        id: 'itm_audio_2',
        name: 'Cable Balanceado de Micrófono XLR Cannon 10m Blindaje 98% [SKU: MLC-XLR-10M]',
        price: 8500,
        qty: 4,
        url: 'https://listado.mercadolibre.cl/cable-xlr-10m-balanceado',
        bought: false
      },
      {
        id: 'itm_audio_3',
        name: 'Caja Directa DI Pasiva para Instrumentos y Coro Parroquial',
        price: 9500,
        qty: 2,
        url: 'https://listado.mercadolibre.cl/caja-directa-pasiva-di',
        bought: false
      }
    ]
  },
  {
    id: 'rep_parroquia_streaming',
    place: 'Templo Mayor',
    area: 'Coro y Cabina de Transmisión',
    specialty: 'Video y Streaming',
    status: 'planificacion',
    title: 'Sistema de Transmisión y Streaming HDMI para Eucaristías Online y Redes Sociales',
    description: '[10/09/2026 17:30] ⏱️ Diagnóstico: Se transmiten misas por YouTube/Facebook para enfermos, adultos mayores y familias de la comunidad, pero con teléfono móvil inestable y baja resolución.\n\n[12/09/2026 11:00] 💡 Propuesta: Instalar cámara fija con salida limpia HDMI Full HD, capturadora USB 3.0 / OBS, extensor HDMI blindado de 15m y soporte seguro en columna.\n\n[14/09/2026 15:00] 📏 Pruebas: Conexión de red por cable directo al router de secretaría para garantizar streaming continuo en 1080p sin cortes.',
    priority: 'alta',
    raisedAmount: 0,
    hasLabor: true,
    laborCost: 25000,
    createdAt: Date.now() + 3000,
    items: [
      {
        id: 'itm_stream_1',
        name: 'Cámara Full HD 60fps con Salida Limpia HDMI y Fuente Continua [SKU: MLC-CAM-STREAM]',
        price: 125000,
        qty: 1,
        url: 'https://listado.mercadolibre.cl/camara-full-hd-hdmi-limpia',
        bought: false
      },
      {
        id: 'itm_stream_2',
        name: 'Tarjeta Capturadora de Video USB 3.0 CamLink 1080p60',
        price: 32000,
        qty: 1,
        url: 'https://listado.mercadolibre.cl/capturadora-camlink-usb-3.0',
        bought: false
      },
      {
        id: 'itm_stream_3',
        name: 'Cable HDMI Blindado Alta Velocidad 15m con Filtro Ferrita',
        price: 18000,
        qty: 1,
        url: 'https://www.sodimac.cl',
        bought: false
      },
      {
        id: 'itm_stream_4',
        name: 'Soporte Articulado Metálico de Alta Resistencia para Columna',
        price: 10000,
        qty: 1,
        url: 'https://www.easy.cl',
        bought: false
      }
    ]
  },
  {
    id: 'rep_parroquia_wifi',
    place: 'Oficinas y Secretaría',
    area: 'Despacho Pastoral',
    specialty: 'Informática y Redes',
    status: 'planificacion',
    title: 'Extensión de Red Wi-Fi Mesh y Respaldo Eléctrico UPS en Secretaría Parroquial',
    description: '[05/09/2026 10:00] ⏱️ Planificación: Instalación de 2 nodos Wi-Fi Mesh Gigabit para dotar de excelente cobertura a secretaría, salas de catequesis y despacho. Se instalará UPS interactiva 1200VA para proteger computadores e impresoras ante cortes y bajas de voltaje.',
    priority: 'alta',
    raisedAmount: 0,
    hasLabor: true,
    laborCost: 20000,
    createdAt: Date.now() + 2000,
    items: [
      {
        id: 'itm_wifi_1',
        name: 'Sistema Wi-Fi Mesh Gigabit Doble Banda (Pack 2 unidades) [SKU: MESH-2PK-GIGA]',
        price: 79990,
        qty: 1,
        url: 'https://www.pcfactory.cl',
        bought: false
      },
      {
        id: 'itm_wifi_2',
        name: 'UPS Respaldo Eléctrico Interactivo 1200VA / 650W con AVR [SKU: UPS-1200-AVR]',
        price: 45010,
        qty: 1,
        url: 'https://www.pcfactory.cl',
        bought: false
      }
    ]
  },
  {
    id: 'rep_parroquia_climatizacion',
    place: 'Templo Menor',
    area: 'Salas y Templo Menor',
    specialty: 'Climatización y Confort',
    status: 'planificacion',
    title: 'Mantención Preventiva y Cambio de Filtros en 6 Equipos de Climatización Split',
    description: '[18/09/2026 14:00] ⏱️ Mantenimiento preventivo de los equipos split que brindan calefacción en invierno y refrigeración en misas diarias y salas de catequesis.\n\n[19/09/2026 10:00] 💡 Tareas: Limpieza química desincrustante de evaporadores y condensadores, desinfección bactericida de turbinas, lavado de filtros y verificación de gas refrigerante.',
    priority: 'media',
    raisedAmount: 0,
    hasLabor: true,
    laborCost: 85000,
    createdAt: Date.now() + 1000,
    items: [
      {
        id: 'itm_ac_1',
        name: 'Líquido Desincrustante y Bactericida Serpentines Climatización (3x Envases 1L)',
        price: 24000,
        qty: 1,
        url: 'https://listado.mercadolibre.cl/limpiador-serpentin-aire-acondicionado',
        bought: false
      },
      {
        id: 'itm_ac_2',
        name: 'Set de Filtros Lavables de Repuesto para Splits',
        price: 12000,
        qty: 1,
        url: 'https://www.easy.cl',
        bought: false
      },
      {
        id: 'itm_ac_3',
        name: 'Control Remoto Universal para Aire Acondicionado de Repuesto',
        price: 6000,
        qty: 1,
        url: 'https://www.sodimac.cl',
        bought: false
      }
    ]
  },
  {
    id: 'rep_parroquia_telon',
    place: 'Casa de la Sagrada Familia',
    area: 'Salón de Retiros',
    specialty: 'Video y Streaming',
    status: 'planificacion',
    title: 'Renovación de Telón y Soporte para Proyector en Salón de Retiros',
    description: '[02/09/2026 16:00] ⏱️ Planificación: El salón de la Casa de la Sagrada Familia acoge retiros de hasta 100 personas de distintas comunidades. Se requiere telón retráctil de 100 pulgadas y soporte universal a techo para proyector.',
    priority: 'baja',
    raisedAmount: 0,
    hasLabor: true,
    laborCost: 25000,
    createdAt: Date.now(),
    items: [
      {
        id: 'itm_telon_1',
        name: 'Telón Mural Retráctil 100 Pulgadas 16:9 Blanco Mate',
        price: 68000,
        qty: 1,
        url: 'https://www.pcfactory.cl',
        bought: false
      },
      {
        id: 'itm_telon_2',
        name: 'Soporte Universal Extensible para Proyector a Techo',
        price: 14000,
        qty: 1,
        url: 'https://www.easy.cl',
        bought: false
      },
      {
        id: 'itm_telon_3',
        name: 'Cable HDMI Blindado 10m y Canaleta Blanca para Muro',
        price: 10000,
        qty: 1,
        url: 'https://www.sodimac.cl',
        bought: false
      }
    ]
  }
];

// App State
let appData = {
  repairs: [],
  catalog: []
};

let currentFilterPlace = 'all';
let currentFilterArea = 'all';
let searchQuery = '';
let sortBy = 'recent';
let currentViewMode = localStorage.getItem('parroquia_view_mode') || 'grid';
let currentProjectSection = 'active'; // 'active' (Proyecto Activo) or 'backlog' (Proyectos por Realizar)

// Catalog State
let catalogSearchQuery = '';
let catalogCategoryFilterValue = 'all';

// DOM Elements
const repairsContainer = document.getElementById('repairs-container');
const categoryPillsContainer = document.getElementById('category-pills-container');
const areaChipsContainer = document.getElementById('area-chips-container');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const btnViewGrid = document.getElementById('view-mode-grid');
const btnViewList = document.getElementById('view-mode-list');

// Metrics elements
const statGrandTotal = document.getElementById('stat-grand-total');
const statProjectsCount = document.getElementById('stat-projects-count');
const statFundsTotal = document.getElementById('stat-funds-total');
const statFundsPercent = document.getElementById('stat-funds-percent');
const statRemainingTotal = document.getElementById('stat-remaining-total');
const statProgressRatio = document.getElementById('stat-progress-ratio');
const statProgressPercent = document.getElementById('stat-progress-percent');
const statProgressBar = document.getElementById('stat-progress-bar');
const btnOpenDonation = document.getElementById('btn-open-donation');

// Modal Elements
const repairModal = document.getElementById('repair-modal');
const repairForm = document.getElementById('repair-form');
const repairModalTitle = document.getElementById('repair-modal-title');
const modalItemsContainer = document.getElementById('modal-items-container');
const formHasLabor = document.getElementById('form-has-labor');
const laborInputContainer = document.getElementById('labor-input-container');
const formLaborCost = document.getElementById('form-labor-cost');
const btnAddItemRow = document.getElementById('btn-add-item-row');
const btnPickFromCatalog = document.getElementById('btn-pick-from-catalog');

// Notes Stamp Buttons
const btnStampTime = document.getElementById('btn-stamp-time');
const btnStampIdea = document.getElementById('btn-stamp-idea');
const btnStampMeasure = document.getElementById('btn-stamp-measure');

// Catalog Modal Elements
const catalogModal = document.getElementById('catalog-modal');
const catalogItemsContainer = document.getElementById('catalog-items-container');
const catalogSearchInput = document.getElementById('catalog-search-input');
const catalogCategoryFilter = document.getElementById('catalog-category-filter');
const btnOpenCatalog = document.getElementById('btn-open-catalog');
const btnCreateCatalogItem = document.getElementById('btn-create-catalog-item');

// Catalog Item Create/Edit Modal
const catalogItemModal = document.getElementById('catalog-item-modal');
const catalogItemForm = document.getElementById('catalog-item-form');
const catalogItemModalTitle = document.getElementById('catalog-item-modal-title');

// Catalog Picker Modal (inside project editor)
const catalogPickerModal = document.getElementById('catalog-picker-modal');
const pickerItemsContainer = document.getElementById('picker-items-container');
const pickerSearchInput = document.getElementById('picker-search-input');

// Report Modal Elements
const reportModal = document.getElementById('report-modal');
const reportRenderTarget = document.getElementById('report-render-target');
const reportFilterPlace = document.getElementById('report-filter-place');
const reportFilterStatus = document.getElementById('report-filter-status');
const btnPrintReport = document.getElementById('btn-print-report');
const btnExportCsv = document.getElementById('btn-export-csv');

// Backup Modal Elements
const backupModal = document.getElementById('backup-modal');
const btnBackupExport = document.getElementById('btn-backup-export');
const inputBackupImport = document.getElementById('input-backup-import');
const btnLoadSample = document.getElementById('btn-load-sample');
const btnResetData = document.getElementById('btn-reset-data');

// Trigger Buttons
const btnAddRepair = document.getElementById('btn-add-repair');
const fabAddRepair = document.getElementById('fab-add-repair');
const btnOpenReport = document.getElementById('btn-open-report');
const btnOpenBackup = document.getElementById('btn-open-backup');

/* ==========================================================================
   Helper Functions
   ========================================================================== */
function formatCurrency(amount) {
  const num = Number(amount) || 0;
  return '$' + num.toLocaleString('es-CL');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function generateId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
}

function showToast(message, duration = 2500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.innerHTML = `
    <span style="color: #34d399; font-size: 1.1rem;">✓</span>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-fadeout');
    setTimeout(() => toast.remove(), 250);
  }, duration);
}

window.copyToClipboard = function(text, btnElement = null) {
  if (!text) return;
  const cleanText = String(text).trim();

  const handleSuccess = () => {
    showToast(`¡Copiado: "${cleanText}"! Pégalo en el buscador de la tienda.`);
    if (btnElement) {
      const origHtml = btnElement.innerHTML;
      btnElement.classList.add('btn-copied');
      btnElement.innerHTML = `✓ Copiado`;
      setTimeout(() => {
        btnElement.classList.remove('btn-copied');
        btnElement.innerHTML = origHtml;
      }, 1800);
    }
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(cleanText).then(handleSuccess).catch(() => fallbackCopy(cleanText, handleSuccess));
  } else {
    fallbackCopy(cleanText, handleSuccess);
  }
};

function fallbackCopy(text, cb) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand('copy');
    if (cb) cb();
  } catch (err) {
    console.error('Fallback copy failed', err);
  }
  document.body.removeChild(textarea);
}

/* ==========================================================================
   Storage Management
   ========================================================================== */
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.repairs) && parsed.repairs.length > 0) {
        appData = parsed;

        // Ensure catalog is loaded
        if (!Array.isArray(appData.catalog) || appData.catalog.length === 0) {
          appData.catalog = JSON.parse(JSON.stringify(INITIAL_CATALOG));
        }

        // Guarantee that the new comedor project exists in repairs
        if (!appData.repairs.some(r => r.id === 'rep_comedor_iluminacion')) {
          const comedorProj = SAMPLE_DATA.find(r => r.id === 'rep_comedor_iluminacion');
          if (comedorProj) {
            appData.repairs.splice(1, 0, JSON.parse(JSON.stringify(comedorProj)));
          }
        }

        // Guarantee by default that only the active battery project is shown as active, others in backlog
        appData.repairs.forEach(r => {
          if (r.id !== 'rep_pilas_microfonos') {
            r.status = 'planificacion';
            r.raisedAmount = 0;
          } else {
            r.status = 'compras';
            r.raisedAmount = 29000;
            r.title = 'Compra de 32 Pilas Recargables AA Energizer (16 Packs) para Micrófonos y Velas de Adoración';
            r.place = 'Templo Mayor y Capilla de Adoración';
            r.area = 'Sonido Litúrgico y Adoración Continua';
            r.specialty = 'Audio y Velas Litúrgicas';
            r.description = '[30/10/2026 02:50] 🔋 Regla del Proyecto Pilas Recargables:\nEn el proyecto son 4 micrófonos para el Templo, 2 para la Capilla y 2 velas para la Adoración al Santísimo Sacramento. Cada aparato (micrófonos y velas del Santísimo) utiliza 2 pilas cada uno, y debemos tener el doble de pilas para tener siempre unas en uso y otras en carga.\n\n🎯 Desglose por Fases e Hitos:\n• FASE 1 (PRIORIDAD ACTUAL Y META A CUMPLIR): 16 pilas recargables AA (8 packs) para los 4 micrófonos del Templo Mayor. 4 micrófonos × 2 pilas = 8 pilas en uso + 8 en carga continua = 16 pilas AA en total. Meta: $50.320. Recaudado actual: $29.000 (58% de avance).\n• FASE 2 (PRÓXIMO HITO): 8 pilas recargables AA (4 packs) para los 2 micrófonos de la Capilla (4 en uso + 4 en carga). Meta: $25.160.\n• FASE 3 (HITO FINAL): 8 pilas recargables AA (4 packs) para las 2 velas de Adoración al Santísimo Sacramento (4 en uso + 4 en carga). Meta: $25.160.\n• META TOTAL CONSOLIDADA: 32 pilas AA (16 packs de 2 pilas) = $100.640.';
            if (r.items && r.items[0]) {
              r.items[0].name = 'Pack de 2 Pilas Recargables AA Energizer 2000 mAh 1.2V [SKU: 110228362] — Sodimac (16 packs = 32 pilas AA)';
              r.items[0].qty = 16;
            }
          }
        });

        saveData();
        return;
      }
    }
  } catch (e) {
    console.error('Error loading data from localStorage', e);
  }
  // Load sample data on initial visit
  appData = {
    repairs: JSON.parse(JSON.stringify(SAMPLE_DATA)),
    catalog: JSON.parse(JSON.stringify(INITIAL_CATALOG))
  };
  saveData();
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
  } catch (e) {
    console.error('Error saving data to localStorage', e);
  }
  updateUI();
}

/* ==========================================================================
   Calculations & Metrics
   ========================================================================== */
function calculateMetrics() {
  let materialsTotal = 0;
  let laborTotal = 0;
  let totalRaised = 0;
  let totalItemsCount = 0;
  let boughtItemsCount = 0;
  let repairsWithLaborCount = 0;

  // Only count active projects (exclude future/planned ones)
  const activeRepairs = appData.repairs.filter(r => (r.status || '') !== 'planificacion');

  activeRepairs.forEach(rep => {
    if (rep.hasLabor && rep.laborCost > 0) {
      laborTotal += Number(rep.laborCost) || 0;
      repairsWithLaborCount++;
    }

    totalRaised += Number(rep.raisedAmount) || 0;

    if (Array.isArray(rep.items)) {
      rep.items.forEach(itm => {
        const itemPrice = Number(itm.price) || 0;
        const itemQty = Number(itm.qty) || 1;
        materialsTotal += itemPrice * itemQty;
        totalItemsCount += itemQty;
        if (itm.bought) {
          boughtItemsCount += itemQty;
        }
      });
    }
  });

  const grandTotal = materialsTotal + laborTotal;
  const fundsPercent = grandTotal > 0 ? Math.min(100, Math.round((totalRaised / grandTotal) * 100)) : 0;
  const remainingTotal = Math.max(0, grandTotal - totalRaised);
  const progressPercent = totalItemsCount > 0 
    ? Math.round((boughtItemsCount / totalItemsCount) * 100) 
    : 0;

  if (statGrandTotal) statGrandTotal.textContent = formatCurrency(grandTotal);
  if (statProjectsCount) statProjectsCount.textContent = `${activeRepairs.length} proyecto${activeRepairs.length === 1 ? ' activo' : 's activos'}`;
  if (statFundsTotal) statFundsTotal.textContent = formatCurrency(totalRaised);
  if (statFundsPercent) statFundsPercent.textContent = `${fundsPercent}% recaudado (${formatCurrency(totalRaised)} de ${formatCurrency(grandTotal)})`;
  if (statRemainingTotal) statRemainingTotal.textContent = formatCurrency(remainingTotal);

  if (statProgressRatio) statProgressRatio.textContent = `${boughtItemsCount} / ${totalItemsCount}`;
  if (statProgressPercent) statProgressPercent.textContent = `${progressPercent}%`;
  if (statProgressBar) statProgressBar.style.width = `${progressPercent}%`;

  // Update tab badge counters
  const activeCount = appData.repairs.filter(r => (r.status || '') !== 'planificacion').length;
  const backlogCount = appData.repairs.filter(r => (r.status || '') === 'planificacion').length;
  const badgeActive = document.getElementById('badge-active-count');
  const badgeBacklog = document.getElementById('badge-backlog-count');
  if (badgeActive) badgeActive.textContent = activeCount;
  if (badgeBacklog) badgeBacklog.textContent = backlogCount;
}

/* ==========================================================================
   Rendering Filter Pills & Area Chips
   ========================================================================== */
function renderFilterPills() {
  // Extract unique places based on current active section (active vs backlog)
  const visibleRepairs = currentProjectSection === 'active'
    ? appData.repairs.filter(r => (r.status || '') !== 'planificacion')
    : appData.repairs.filter(r => (r.status || '') === 'planificacion');

  const placeCounts = {};
  visibleRepairs.forEach(rep => {
    const place = rep.place?.trim() || 'Sin Lugar';
    placeCounts[place] = (placeCounts[place] || 0) + 1;
  });

  const uniquePlaces = Object.keys(placeCounts).sort();

  let html = `
    <button class="pill-btn ${currentFilterPlace === 'all' ? 'active' : ''}" data-place="all">
      Todos <span class="pill-count">${visibleRepairs.length}</span>
    </button>
  `;

  uniquePlaces.forEach(place => {
    const activeClass = currentFilterPlace.toLowerCase() === place.toLowerCase() ? 'active' : '';
    html += `
      <button class="pill-btn ${activeClass}" data-place="${escapeHtml(place)}">
        ${escapeHtml(place)} <span class="pill-count">${placeCounts[place]}</span>
      </button>
    `;
  });

  categoryPillsContainer.innerHTML = html;

  // Render Area Chips based on selected place
  renderAreaChips();
}

function renderAreaChips() {
  // Filter visible repairs by current selected place
  const visibleRepairs = currentProjectSection === 'active'
    ? appData.repairs.filter(r => (r.status || '') !== 'planificacion')
    : appData.repairs.filter(r => (r.status || '') === 'planificacion');

  const relevantRepairs = currentFilterPlace === 'all'
    ? visibleRepairs
    : visibleRepairs.filter(r => (r.place || '').toLowerCase() === currentFilterPlace.toLowerCase());

  const areaCounts = {};
  relevantRepairs.forEach(rep => {
    const area = rep.area?.trim() || 'General';
    areaCounts[area] = (areaCounts[area] || 0) + 1;
  });

  const uniqueAreas = Object.keys(areaCounts).sort();

  if (uniqueAreas.length === 0) {
    areaChipsContainer.innerHTML = `<span style="font-size:0.75rem; color:var(--text-subtle);">Sin espacios registrados</span>`;
    return;
  }

  let html = `
    <button class="chip-btn ${currentFilterArea === 'all' ? 'active' : ''}" data-area="all">
      Todos los espacios
    </button>
  `;

  uniqueAreas.forEach(area => {
    const activeClass = currentFilterArea.toLowerCase() === area.toLowerCase() ? 'active' : '';
    html += `
      <button class="chip-btn ${activeClass}" data-area="${escapeHtml(area)}">
        ${escapeHtml(area)} (${areaCounts[area]})
      </button>
    `;
  });

  areaChipsContainer.innerHTML = html;
}

/* ==========================================================================
   View Mode & Quick Project Creator
   ========================================================================== */
function setViewMode(mode) {
  currentViewMode = mode;
  localStorage.setItem('reparaplan_view_mode', mode);

  if (btnViewGrid && btnViewList) {
    btnViewGrid.classList.toggle('active', mode === 'grid');
    btnViewGrid.setAttribute('aria-pressed', mode === 'grid');
    btnViewList.classList.toggle('active', mode === 'list');
    btnViewList.setAttribute('aria-pressed', mode === 'list');
  }

  renderRepairsGrid();
}

window.handleQuickAdd = function(e) {
  e.preventDefault();
  const titleInput = document.getElementById('quick-input-title');
  const areaInput = document.getElementById('quick-input-area');
  const priorityInput = document.getElementById('quick-input-priority');
  const placeInput = document.getElementById('quick-input-place');

  const title = titleInput ? titleInput.value.trim() : '';
  const area = areaInput ? areaInput.value.trim() : 'General';
  const priority = priorityInput ? priorityInput.value : 'media';
  const place = currentFilterPlace !== 'all' ? currentFilterPlace : (placeInput ? placeInput.value.trim() : 'Casa');

  if (!title) return;

  const newRepair = {
    id: generateId('rep'),
    place: place || 'Casa',
    area: area || 'General',
    title,
    priority,
    description: '',
    hasLabor: false,
    laborCost: 0,
    items: [],
    createdAt: Date.now()
  };

  appData.repairs.unshift(newRepair);
  saveData();

  if (titleInput) {
    titleInput.value = '';
    titleInput.focus();
  }
};

/* ==========================================================================
   Notes & Ideas Log Stamping
   ========================================================================== */
function setupNotesStamping() {
  const formDescription = document.getElementById('form-description');

  function appendToNotes(template) {
    if (!formDescription) return;
    const now = new Date();
    const dateStr = now.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
    const timestamp = `[${dateStr} ${timeStr}]`;
    const prefix = formDescription.value.trim() ? '\n\n' : '';
    formDescription.value = `${formDescription.value}${prefix}${timestamp} ${template}`;
    formDescription.focus();
    formDescription.scrollTop = formDescription.scrollHeight;
  }

  btnStampTime?.addEventListener('click', () => appendToNotes(''));
  btnStampIdea?.addEventListener('click', () => appendToNotes('💡 Idea: '));
  btnStampMeasure?.addEventListener('click', () => appendToNotes('📏 Medidas: '));
}

/* ==========================================================================
   Rendering Repairs (Grid View vs List View)
   ========================================================================== */
function getFilteredRepairs() {
  let list = [...appData.repairs];

  // Filter by active vs backlog section
  if (currentProjectSection === 'active') {
    list = list.filter(r => (r.status || '') !== 'planificacion');
  } else {
    list = list.filter(r => (r.status || '') === 'planificacion');
  }

  // Filter by Place (Sector Parroquial)
  if (currentFilterPlace !== 'all') {
    list = list.filter(r => (r.place || '').toLowerCase() === currentFilterPlace.toLowerCase());
  }

  // Filter by Area / Sector
  if (currentFilterArea !== 'all') {
    list = list.filter(r => (r.area || '').toLowerCase() === currentFilterArea.toLowerCase());
  }

  // Search query (matches title, description, place, area, specialty, status, materials, SKUs)
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(r => {
      const matchTitle = (r.title || '').toLowerCase().includes(q);
      const matchDesc = (r.description || '').toLowerCase().includes(q);
      const matchPlace = (r.place || '').toLowerCase().includes(q);
      const matchArea = (r.area || '').toLowerCase().includes(q);
      const matchSpecialty = (r.specialty || '').toLowerCase().includes(q);
      const matchStatus = (r.status || '').toLowerCase().includes(q);
      const matchItems = (r.items || []).some(itm => 
        (itm.name || '').toLowerCase().includes(q) || (itm.url || '').toLowerCase().includes(q)
      );
      return matchTitle || matchDesc || matchPlace || matchArea || matchSpecialty || matchStatus || matchItems;
    });
  }

  // Sort
  const priorityWeight = { urgente: 4, alta: 3, media: 2, baja: 1 };
  list.sort((a, b) => {
    if (sortBy === 'recent') {
      return (b.createdAt || 0) - (a.createdAt || 0);
    }
    if (sortBy === 'cost-desc' || sortBy === 'cost-asc') {
      const costA = (a.items || []).reduce((sum, i) => sum + ((Number(i.price) || 0) * (Number(i.qty) || 1)), 0) + (a.hasLabor ? (Number(a.laborCost) || 0) : 0);
      const costB = (b.items || []).reduce((sum, i) => sum + ((Number(i.price) || 0) * (Number(i.qty) || 1)), 0) + (b.hasLabor ? (Number(b.laborCost) || 0) : 0);
      return sortBy === 'cost-desc' ? costB - costA : costA - costB;
    }
    if (sortBy === 'funds-desc') {
      return (Number(b.raisedAmount) || 0) - (Number(a.raisedAmount) || 0);
    }
    if (sortBy === 'priority') {
      return (priorityWeight[b.priority] || 1) - (priorityWeight[a.priority] || 1);
    }
    if (sortBy === 'name') {
      return (a.title || '').localeCompare(b.title || '');
    }
    return 0;
  });

  return list;
}

window.switchProjectSection = function(section) {
  currentProjectSection = section;
  currentFilterPlace = 'all';
  currentFilterArea = 'all';

  if (section === 'backlog') {
    document.body.classList.add('show-backlog-view');
  } else {
    document.body.classList.remove('show-backlog-view');
  }

  const tabActive = document.getElementById('tab-active-projects');
  const tabBacklog = document.getElementById('tab-backlog-projects');

  if (tabActive && tabBacklog) {
    tabActive.classList.toggle('active', section === 'active');
    tabActive.setAttribute('aria-selected', section === 'active');
    tabBacklog.classList.toggle('active', section === 'backlog');
    tabBacklog.setAttribute('aria-selected', section === 'backlog');
  }

  updateUI();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.openCatalogModal = function() {
  renderCatalog();
  catalogModal?.classList.add('is-open');
};

window.openReportModal = function() {
  populateReportPlaceFilter();
  renderReportContent();
  reportModal?.classList.add('is-open');
};

window.openBackupModal = function() {
  backupModal?.classList.add('is-open');
};

window.openRepairModal = openRepairModal;

window.promoteToActive = function(repairId) {
  const repair = appData.repairs.find(r => r.id === repairId);
  if (!repair) return;

  if (confirm(`¿Deseas activar el proyecto "${repair.title}" e iniciar su campaña de compras/recaudación?`)) {
    repair.status = 'compras';
    saveData();
    showToast(`¡Proyecto "${repair.title}" activado exitosamente!`);
    window.switchProjectSection('active');
  }
};

window.activeFunnelStep = 'causa';

window.setFunnelStep = function(step) {
  window.activeFunnelStep = step;
  const tabs = document.querySelectorAll('.funnel-step-tab');
  const panels = document.querySelectorAll('.funnel-step-panel');
  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-step') === step);
  });
  panels.forEach(panel => {
    panel.classList.toggle('active', panel.getAttribute('data-step') === step);
  });
  const funnelEl = document.getElementById('project-funnel-section');
  if (funnelEl) {
    funnelEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

function renderRepairsGrid() {
  const filtered = getFilteredRepairs();
  const activePlaceName = currentFilterPlace === 'all' ? 'Cualquier Sector' : currentFilterPlace;

  const statusLabels = {
    planificacion: 'En Planificación',
    recaudacion: 'En Recaudación',
    compras: 'En Compras',
    ejecucion: 'En Ejecución',
    completado: 'Completado'
  };

  const backlogBannerHtml = `
    <div class="backlog-banner">
      <div class="backlog-banner-icon">📋</div>
      <div class="backlog-banner-body">
        <div class="backlog-banner-title">Banco de Proyectos Técnicos Parroquiales (Backlog / Por Realizar)</div>
        <div class="backlog-banner-desc">
          Estas iniciativas técnicas e infraestructurales ya cuentan con su diagnóstico, cotizaciones y materiales especificados. Se encuentran en espera para focalizar los esfuerzos comunitarios en la compra activa de pilas recargables para micrófonos y adoración continua.
        </div>
      </div>
    </div>
  `;

  // Quick Add HTML for List View or Location View
  const quickAddHtml = `
    <div class="quick-add-bar">
      <div class="quick-add-header">
        <span class="quick-add-title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          Creación Rápida en <strong>${escapeHtml(activePlaceName)}</strong>
        </span>
        <span class="quick-add-hint">Registra proyectos técnicos parroquiales para presupuestar y recaudar</span>
      </div>
      <form class="quick-add-inputs" onsubmit="handleQuickAdd(event)">
        ${currentFilterPlace === 'all' ? `
          <input type="text" id="quick-input-place" class="form-input" placeholder="Sector (ej: Templo Mayor)..." list="places-list" value="Templo Mayor" required style="font-size:0.85rem;">
        ` : ''}
        <input type="text" id="quick-input-title" class="form-input" placeholder="Proyecto técnico (ej: Nuevos micrófonos inalámbricos)..." required style="font-size:0.85rem;">
        <input type="text" id="quick-input-area" class="form-input" placeholder="Espacio (ej: Altar, Nave Central)..." list="areas-list" value="${currentFilterArea !== 'all' ? escapeHtml(currentFilterArea) : ''}" required style="font-size:0.85rem;">
        <select id="quick-input-priority" class="form-select" style="font-size:0.85rem; min-width: 130px;">
          <option value="alta" selected>Prioridad Alta</option>
          <option value="urgente">🚨 Urgente (Falla activa)</option>
          <option value="media">Prioridad Media</option>
          <option value="baja">Prioridad Baja</option>
        </select>
        <button type="submit" class="btn btn-primary btn-sm" style="background: linear-gradient(135deg, #15803d, #16a34a);">
          + Crear Rápido
        </button>
      </form>
    </div>
  `;

  if (filtered.length === 0) {
    repairsContainer.className = 'repairs-container';
    repairsContainer.innerHTML = `
      ${currentProjectSection === 'backlog' ? backlogBannerHtml : ''}
      ${currentViewMode === 'list' ? quickAddHtml : ''}
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-icon">${currentProjectSection === 'backlog' ? '📋' : '🍀'}</div>
        <h3 style="font-size: 1.15rem; font-family: var(--font-heading);">${currentProjectSection === 'backlog' ? 'No hay proyectos en el backlog' : 'No hay proyectos activos'}</h3>
        <p style="color: var(--text-muted); font-size: 0.85rem; max-width: 440px;">
          ${searchQuery ? `No hay resultados para "${escapeHtml(searchQuery)}". Intenta con otra palabra clave o limpia los filtros.` : (currentProjectSection === 'backlog' ? 'Todas las iniciativas técnicas están actualmente activas o completadas.' : 'Actualmente no hay campañas en curso en este sector.')}
        </p>
        <button class="btn btn-primary btn-sm" onclick="openRepairModal()" style="background: linear-gradient(135deg, #15803d, #16a34a);">+ Nuevo Proyecto</button>
      </div>
    `;
    return;
  }

  // LIST VIEW MODE (Compact Transparency Table)
  if (currentViewMode === 'list') {
    repairsContainer.className = 'repairs-container';
    let rowsHtml = filtered.map(repair => {
      const items = repair.items || [];
      let matCost = 0;
      let boughtCount = 0;
      let totalQty = 0;
      items.forEach(itm => {
        const p = Number(itm.price) || 0;
        const q = Number(itm.qty) || 1;
        matCost += p * q;
        totalQty += q;
        if (itm.bought) boughtCount += q;
      });
      const labor = repair.hasLabor ? (Number(repair.laborCost) || 0) : 0;
      const total = matCost + labor;
      const progressPct = totalQty > 0 ? Math.round((boughtCount / totalQty) * 100) : 0;
      const raised = Number(repair.raisedAmount) || 0;
      const fundingPct = total > 0 ? Math.min(100, Math.round((raised / total) * 100)) : 0;
      const hasNotes = Boolean(repair.description && repair.description.trim() !== '');

      return `
        <tr class="repairs-list-row" onclick="editRepair('${repair.id}')" title="Haz clic para ver y editar este proyecto">
          <td>
            <span class="tag tag-priority-${repair.priority || 'media'}">
              ${repair.priority ? repair.priority.toUpperCase() : 'MEDIA'}
            </span>
          </td>
          <td>
            <div style="display: flex; gap: 0.3rem; flex-wrap: wrap;">
              <span class="tag tag-place">${escapeHtml(repair.place || 'Sector')}</span>
              <span class="tag tag-area">${escapeHtml(repair.area || 'Espacio')}</span>
            </div>
          </td>
          <td>
            <div class="list-title-cell">
              <span class="list-title-text">
                ${escapeHtml(repair.title)}
                ${hasNotes ? `<span class="list-notes-badge" title="Tiene bitácora técnica">📝 Bitácora</span>` : ''}
              </span>
              <div style="display: flex; gap: 0.3rem; align-items: center; margin-top: 0.2rem;">
                <span class="tag tag-specialty" style="font-size: 0.68rem; padding: 0.1rem 0.4rem;">${escapeHtml(repair.specialty || 'General')}</span>
                <span class="tag tag-status-${escapeHtml(repair.status || 'recaudacion')}" style="font-size: 0.68rem; padding: 0.1rem 0.4rem;">${escapeHtml(statusLabels[repair.status] || 'En Recaudación')}</span>
              </div>
            </div>
          </td>
          <td>
            <div class="list-progress-wrapper" title="Recaudado: ${formatCurrency(raised)} de ${formatCurrency(total)}">
              <div class="list-progress-text">
                <span style="color: #4ade80; font-weight: 600;">${formatCurrency(raised)}</span>
                <span style="color: var(--text-subtle);">${fundingPct}%</span>
              </div>
              <div class="card-mini-progress">
                <div class="card-mini-progress-fill" style="width: ${fundingPct}%; background: ${fundingPct >= 100 ? '#22c55e' : 'linear-gradient(90deg, #16a34a, #eab308)'};"></div>
              </div>
            </div>
          </td>
          <td>
            <div class="list-progress-wrapper">
              <div class="list-progress-text">
                <span>${items.length} mats</span>
                <span style="font-weight:600;">${boughtCount}/${totalQty}</span>
              </div>
              <div class="card-mini-progress">
                <div class="card-mini-progress-fill" style="width: ${progressPct}%;"></div>
              </div>
            </div>
          </td>
          <td class="num-col">
            <span class="list-amount-text">${formatCurrency(total)}</span>
          </td>
          <td>
            <div class="list-actions-cell" onclick="event.stopPropagation();">
              ${repair.status === 'planificacion' ? `
                <button class="btn-activate-project" style="padding: 0.25rem 0.5rem; font-size: 0.7rem;" onclick="promoteToActive('${repair.id}')" title="Activar proyecto e iniciar compras">
                  🚀 Activar
                </button>
                <button class="card-manage-btn" onclick="editRepair('${repair.id}')" title="Entrar al proyecto">
                  Ver
                </button>
              ` : `
                <button class="btn-donate-card" style="padding: 0.28rem 0.55rem; font-size: 0.72rem;" onclick="openDonationModal('${repair.id}')" title="Aportar a este proyecto">
                  Donar
                </button>
                <button class="card-manage-btn" onclick="editRepair('${repair.id}')" title="Entrar al proyecto">
                  Ver
                </button>
              `}
              <button class="icon-btn-ghost delete" title="Eliminar proyecto" onclick="deleteRepair('${repair.id}')" aria-label="Eliminar">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    repairsContainer.innerHTML = `
      ${currentProjectSection === 'backlog' ? backlogBannerHtml : ''}
      ${quickAddHtml}
      <div class="repairs-list-wrapper">
        <table class="repairs-list-table">
          <thead>
            <tr>
              <th style="width: 85px;">Prioridad</th>
              <th style="width: 170px;">Ubicación</th>
              <th>Proyecto / Especialidad</th>
              <th style="width: 150px;">Recaudación</th>
              <th style="width: 130px;">Materiales</th>
              <th class="num-col" style="width: 110px;">Presupuesto</th>
              <th style="width: 140px; text-align: right;">Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
    return;
  }

  // GRID VIEW MODE (Rich Parish Project Cards)
  repairsContainer.className = 'repairs-grid';

  if (currentProjectSection === 'active') {
    const activeStep = window.activeFunnelStep || 'causa';

    let html = `
      <div class="active-campaign-banner">
        <div class="active-campaign-badge">
          <span class="pulse-beacon"></span>
          <span>CAMPAÑA PARROQUIAL ACTIVA</span>
        </div>
        <h2 class="active-campaign-title">Pilas Recargables AA (3 Fases) • Prioridad: Templo Mayor</h2>
        <p class="active-campaign-subtitle">
          <strong>Meta Prioritaria Actual (Fase 1):</strong> 16 pilas AA (8 packs) para los 4 micrófonos del Templo Mayor. Se requiere el doble para contar con un juego en uso y otro cargando en sacristía.
        </p>
      </div>
    `;

    filtered.forEach(repair => {
      const items = repair.items || [];
      let repairMaterialsCost = 0;
      let repairBoughtCount = 0;
      let totalQty = 0;

      items.forEach(itm => {
        const price = Number(itm.price) || 0;
        const qty = Number(itm.qty) || 1;
        repairMaterialsCost += price * qty;
        totalQty += qty;
        if (itm.bought) repairBoughtCount += qty;
      });

      const laborCost = repair.hasLabor ? (Number(repair.laborCost) || 0) : 0;
      const totalRepairCost = repairMaterialsCost + laborCost;
      const raised = Number(repair.raisedAmount) || 0;
      const fundingPct = totalRepairCost > 0 ? Math.min(100, Math.round((raised / totalRepairCost) * 100)) : 0;
      const remainingNeeded = Math.max(0, totalRepairCost - raised);

      html += `
        <!-- Nivel 1 del Embudo: Entrada Simple, Directa y sin Saturación -->
        <article class="featured-active-card" data-id="${repair.id}">
          <div class="card-top">
            <div class="hierarchy-tags">
              <span class="tag tag-place">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                Templo Mayor & Capilla
              </span>
              <span class="tag tag-specialty">
                🎙️ Audio Litúrgico
              </span>
              <span class="tag tag-status-compras">
                🟢 En Recaudación
              </span>
            </div>
          </div>

          <div class="card-main-body">
            <h3 class="repair-title">${escapeHtml(repair.title)}</h3>
            <p class="repair-lead-text">
              En el proyecto son <strong>4 micrófonos para el Templo, 2 para la Capilla y 2 velas para la Adoración al Santísimo Sacramento</strong>. Cada aparato utiliza <strong>2 pilas cada uno</strong> y debemos tener <strong>el doble de pilas para tener siempre unas en uso y otras en carga</strong> (32 pilas en total). La <strong>prioridad actual y meta a cumplir</strong> son las <strong>16 pilas para los 4 micrófonos del Templo</strong>.
            </p>

            <!-- Galería de Equipamiento Real: Micrófonos de la Parroquia -->
            <div class="infra-gallery-grid">
              <div class="infra-photo-card">
                <div class="infra-photo-img-wrapper">
                  <span class="infra-photo-badge active-badge">
                    <span class="pulse-beacon" style="width:7px; height:7px;"></span>
                    <span>Templo Mayor • 4 Micrófonos</span>
                  </span>
                  <img src="assets/microfonos_templo_rack.jpg" alt="Rack con 4 micrófonos del Templo Mayor" class="infra-photo-img">
                </div>
                <div class="infra-photo-info">
                  <h4 class="infra-photo-title">Soporte Sacristía: 4 Micrófonos Templo</h4>
                  <p class="infra-photo-caption">
                    Equipamiento litúrgico en rack del Templo Mayor. Requieren <strong>16 pilas AA (8 packs)</strong>: 8 pilas operando en presbiterio y 8 en relevo de recarga continua en sacristía. <strong>(Fase 1 - Prioridad Actual)</strong>.
                  </p>
                </div>
              </div>

              <div class="infra-photo-card">
                <div class="infra-photo-img-wrapper">
                  <span class="infra-photo-badge">
                    <span>🎙️ Modelo Técnico: SKP UHF 600 PRO</span>
                  </span>
                  <img src="assets/microfono_skp_uhf600.jpg" alt="Detalle micrófono SKP UHF 600 PRO" class="infra-photo-img">
                </div>
                <div class="infra-photo-info">
                  <h4 class="infra-photo-title">Detalle: Micrófono Inalámbrico SKP</h4>
                  <p class="infra-photo-caption">
                    Modelo <strong>SKP PRO AUDIO UHF 600 PRO</strong> con display LCD. Cada micrófono funciona con <strong>2 pilas AA</strong> de 2000 mAh para transmisión continua sin caídas de señal en cada servicio.
                  </p>
                </div>
              </div>
            </div>

            <!-- Requerimientos Claros de Infraestructura Parroquial -->
            <div class="infra-requirements-box">
              <div class="infra-req-header">
                <h4 class="infra-req-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="9"></line><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="13" y2="17"></line></svg>
                  <span>Requerimientos de Infraestructura: 8 Aparatos Parroquiales</span>
                </h4>
                <span style="font-size:0.75rem; font-weight:700; color:#15803d; background:#f0fdf4; padding:0.18rem 0.5rem; border-radius:var(--radius-full); border:1px solid #86efac;">
                  2 Pilas por Aparato + Doble en Recarga
                </span>
              </div>

              <!-- Requerimiento 1: Templo -->
              <div class="infra-req-item">
                <div class="infra-req-icon">🎙️</div>
                <div class="infra-req-body">
                  <div class="infra-req-heading">
                    <span class="infra-req-name">1. Templo Mayor: 4 Micrófonos Inalámbricos</span>
                    <span class="infra-req-status active">🟢 PRIORIDAD ACTUAL (FASE 1)</span>
                  </div>
                  <p class="infra-req-details">
                    Para altar, presbiterio, ambón y celebraciones comunitarias. 4 micrófonos × 2 pilas = <strong>8 pilas en uso</strong> + 8 pilas en carga continua = <span class="infra-req-math">16 pilas AA en total (8 packs) • Meta: $50.320</span>.
                  </p>
                </div>
              </div>

              <!-- Requerimiento 2: Capilla -->
              <div class="infra-req-item">
                <div class="infra-req-icon">🎙️</div>
                <div class="infra-req-body">
                  <div class="infra-req-heading">
                    <span class="infra-req-name">2. Salón Capilla: 2 Micrófonos Inalámbricos</span>
                    <span class="infra-req-status pending">⏳ PRÓXIMO HITO (FASE 2)</span>
                  </div>
                  <p class="infra-req-details">
                    Para liturgias diarias y actividades en el Salón Capilla. 2 micrófonos × 2 pilas = <strong>4 pilas en uso</strong> + 4 pilas en carga continua = <span class="infra-req-math">8 pilas AA en total (4 packs) • Meta: $25.160</span>.
                  </p>
                </div>
              </div>

              <!-- Requerimiento 3: Adoración al Santísimo -->
              <div class="infra-req-item">
                <div class="infra-req-icon">🕯️</div>
                <div class="infra-req-body">
                  <div class="infra-req-heading">
                    <span class="infra-req-name">3. Adoración al Santísimo: 2 Velas Eléctricas</span>
                    <span class="infra-req-status pending">⏳ HITO FINAL (FASE 3)</span>
                  </div>
                  <p class="infra-req-details">
                    Para la Capilla de Adoración Continua del Santísimo Sacramento (12 horas diarias). 2 velas × 2 pilas = <strong>4 pilas en uso</strong> + 4 pilas en carga continua = <span class="infra-req-math">8 pilas AA en total (4 packs) • Meta: $25.160</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Desglose de Fases e Hitos del Proyecto Pilas -->
          ${(() => {
            const p1Packs = 8;
            const p1Cost = p1Packs * 6290; // $50.320
            const p1Raised = Math.min(raised, p1Cost); // $29.000
            const p1Pct = p1Cost > 0 ? Math.min(100, Math.round((p1Raised / p1Cost) * 100)) : 0;
            const p1Remaining = Math.max(0, p1Cost - p1Raised); // $21.320

            const p2Packs = 4;
            const p2Cost = p2Packs * 6290; // $25.160
            const p2Raised = Math.max(0, Math.min(raised - p1Cost, p2Cost));
            const p2Pct = p2Cost > 0 ? Math.min(100, Math.round((p2Raised / p2Cost) * 100)) : 0;

            const p3Packs = 4;
            const p3Cost = p3Packs * 6290; // $25.160
            const p3Raised = Math.max(0, Math.min(raised - p1Cost - p2Cost, p3Cost));
            const p3Pct = p3Cost > 0 ? Math.min(100, Math.round((p3Raised / p3Cost) * 100)) : 0;

            return `
              <!-- Visualización en Paralelo: Foco en la Meta Prioritaria Actual (Fase 1) -->
              <div class="parallel-funding-card">
                <div class="parallel-priority-kicker">
                  <span class="priority-pulse-dot"></span>
                  <span>PRIORIDAD ACTUAL: 16 PILAS TEMPLO MAYOR (4 MICRÓFONOS EN ROTACIÓN)</span>
                </div>

                <div class="parallel-stats-grid">
                  <!-- Columna 1: Lo que tenemos recaudado -->
                  <div class="parallel-stat-box recaudado">
                    <div class="parallel-stat-header">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                      <span>Recaudado Actual</span>
                    </div>
                    <div class="parallel-stat-amount">${formatCurrency(raised)}</div>
                    <div class="parallel-stat-sub">
                      <span>✓ <strong>${p1Pct}% cumplido</strong> de la Fase 1 (${fundingPct}% global)</span>
                    </div>
                  </div>

                  <!-- Columna 2: La meta de Fase 1 -->
                  <div class="parallel-stat-box meta">
                    <div class="parallel-stat-header">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                      <span>Meta Prioridad (Fase 1)</span>
                    </div>
                    <div class="parallel-stat-amount">${formatCurrency(p1Cost)}</div>
                    <div class="parallel-stat-sub">
                      <span>🎯 8 packs = 16 pilas AA (Templo)</span>
                    </div>
                  </div>
                </div>

                <!-- Barra de Avance y Faltante conectando ambos -->
                <div class="parallel-progress-section">
                  <div class="parallel-track" title="${p1Pct}% recaudado de la Fase 1">
                    <div class="parallel-bar-fill" style="width: ${p1Pct}%;"></div>
                  </div>
                  <div class="parallel-progress-footer">
                    <span class="parallel-pct-text">Cumplimiento Fase 1: <strong>${p1Pct}%</strong></span>
                    <span class="parallel-remaining-badge">
                      ⏳ Faltan para cumplir Fase 1: <strong>${formatCurrency(p1Remaining)}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Tablero de las 3 Fases del Proyecto con Cumplimiento de Hitos -->
              <div class="phase-milestones-card">
                <div class="phase-milestones-header">
                  <h4 class="phase-milestones-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                    <span>Cumplimiento y Metas por Hitos (3 Fases)</span>
                  </h4>
                  <span class="phase-milestones-badge">Regla: El Doble para Uso y Carga</span>
                </div>

                <!-- Banner Resumen de la Regla del Proyecto -->
                <div class="phase-formula-banner">
                  <div class="formula-col">
                    <span class="formula-label">8 Aparatos Parroquiales</span>
                    <span class="formula-text">4 mic. Templo + 2 mic. Capilla + 2 velas Santísimo</span>
                  </div>
                  <div class="formula-op">× 2 pilas =</div>
                  <div class="formula-col">
                    <span class="formula-label">En Uso Simultáneo</span>
                    <span class="formula-text">16 pilas AA activas</span>
                  </div>
                  <div class="formula-op">× 2 (Doble) =</div>
                  <div class="formula-col highlight">
                    <span class="formula-label">Meta Total</span>
                    <span class="formula-text">32 pilas (16 en uso + 16 en carga)</span>
                  </div>
                </div>

                <div class="phase-milestones-grid">
                  <!-- Hito 1: Templo Mayor (Prioridad Actual) -->
                  <div class="phase-box is-active-priority">
                    <div class="phase-box-top">
                      <span class="phase-tag priority">🟢 PRIORIDAD ACTUAL</span>
                      <span style="font-size:0.75rem; font-weight:700; color:#15803d;">Hito 1</span>
                    </div>
                    <h5 class="phase-title">🎙️ Templo Mayor (4 Micrófonos)</h5>
                    <p class="phase-desc">
                      4 micrófonos × 2 pilas = 8 en uso + 8 en relevo = <strong>16 pilas AA (8 packs)</strong>.
                    </p>
                    <div class="phase-track">
                      <div class="phase-fill" style="width: ${p1Pct}%;"></div>
                    </div>
                    <div class="phase-meta-stats">
                      <span>Recaudado: <strong>${formatCurrency(p1Raised)}</strong></span>
                      <span class="phase-meta-val">Meta: ${formatCurrency(p1Cost)}</span>
                    </div>
                    <div class="phase-remaining-hint">
                      ✓ ${p1Pct}% cumplido • Faltan ${formatCurrency(p1Remaining)}
                    </div>
                  </div>

                  <!-- Hito 2: Salón Capilla -->
                  <div class="phase-box">
                    <div class="phase-box-top">
                      <span class="phase-tag pending">⏳ PRÓXIMO HITO</span>
                      <span style="font-size:0.75rem; font-weight:700; color:var(--text-subtle);">Hito 2</span>
                    </div>
                    <h5 class="phase-title">🎙️ Salón Capilla (2 Micrófonos)</h5>
                    <p class="phase-desc">
                      2 micrófonos × 2 pilas = 4 en uso + 4 en relevo = <strong>8 pilas AA (4 packs)</strong>.
                    </p>
                    <div class="phase-track">
                      <div class="phase-fill" style="width: ${p2Pct}%;"></div>
                    </div>
                    <div class="phase-meta-stats">
                      <span>Recaudado: <strong>${formatCurrency(p2Raised)}</strong></span>
                      <span class="phase-meta-val">Meta: ${formatCurrency(p2Cost)}</span>
                    </div>
                    <div style="font-size:0.74rem; color:var(--text-subtle); margin-top:0.2rem;">
                      Se activa tras completar la Fase 1
                    </div>
                  </div>

                  <!-- Hito 3: Velas Adoración Continua -->
                  <div class="phase-box">
                    <div class="phase-box-top">
                      <span class="phase-tag pending">⏳ HITO FINAL</span>
                      <span style="font-size:0.75rem; font-weight:700; color:var(--text-subtle);">Hito 3</span>
                    </div>
                    <h5 class="phase-title">🕯️ Adoración al Santísimo (2 Velas)</h5>
                    <p class="phase-desc">
                      2 velas × 2 pilas = 4 en uso + 4 en relevo = <strong>8 pilas AA (4 packs)</strong>.
                    </p>
                    <div class="phase-track">
                      <div class="phase-fill" style="width: ${p3Pct}%;"></div>
                    </div>
                    <div class="phase-meta-stats">
                      <span>Recaudado: <strong>${formatCurrency(p3Raised)}</strong></span>
                      <span class="phase-meta-val">Meta: ${formatCurrency(p3Cost)}</span>
                    </div>
                    <div style="font-size:0.74rem; color:var(--text-subtle); margin-top:0.2rem;">
                      Iluminación continua sin cortes
                    </div>
                  </div>
                </div>

                <!-- Resumen Global de las 3 Fases -->
                <div class="phase-global-summary-bar">
                  <span><strong>Meta Total Proyecto (3 Fases):</strong> 16 packs (32 pilas AA) = <strong>${formatCurrency(totalRepairCost)}</strong></span>
                  <span>Total Aportado: <strong>${formatCurrency(raised)}</strong> (${fundingPct}% global)</span>
                </div>
              </div>
            `;
          })()}

          <!-- Acciones de Entrada al Embudo -->
          <div class="funnel-entry-actions">
            <button type="button" class="btn-funnel-donate" onclick="setFunnelStep('donar')" title="Ir directamente a los datos para donar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <span>Quiero Aportar / Ver Datos de Transferencia ↓</span>
            </button>
            <button type="button" class="btn-funnel-guide" onclick="setFunnelStep('causa')" title="Conocer la justificación y cálculo paso a paso">
              <span>📖 Conoce el Proyecto Paso a Paso ↓</span>
            </button>
          </div>
        </article>

        <!-- Nivel 2 y 3 del Embudo: Contenido Guiado Progresivo -->
        <section class="project-funnel-section" id="project-funnel-section">
          <div class="funnel-section-header">
            <span class="funnel-section-kicker">Guía del Proyecto Parroquial</span>
            <h3 class="funnel-section-title">De la necesidad a la solución en 3 pasos</h3>
            <p class="funnel-section-desc">Explora el porqué de esta iniciativa, cómo se calculó cada peso y cómo sumarte.</p>
          </div>

          <!-- Stepper Navegable del Embudo -->
          <div class="funnel-stepper-tabs" role="tablist">
            <button type="button" class="funnel-step-tab ${activeStep === 'causa' ? 'active' : ''}" data-step="causa" onclick="setFunnelStep('causa')">
              <span class="step-num">1</span>
              <span class="step-label">La Causa</span>
            </button>
            <button type="button" class="funnel-step-tab ${activeStep === 'presupuesto' ? 'active' : ''}" data-step="presupuesto" onclick="setFunnelStep('presupuesto')">
              <span class="step-num">2</span>
              <span class="step-label">Cálculo & Costo</span>
            </button>
            <button type="button" class="funnel-step-tab ${activeStep === 'donar' ? 'active' : ''}" data-step="donar" onclick="setFunnelStep('donar')">
              <span class="step-num">3</span>
              <span class="step-label">Cómo Donar</span>
            </button>
          </div>

          <!-- Panel 1: La Causa (¿Por qué lo hacemos?) -->
          <div class="funnel-step-panel ${activeStep === 'causa' ? 'active' : ''}" data-step="causa">
            <div class="funnel-panel-header">
              <h4>1. ¿Por qué necesitamos pilas recargables?</h4>
              <p>Para garantizar una voz clara en las celebraciones litúrgicas y mantener iluminadas con devoción y seguridad las velas de la Capilla de Adoración Continua.</p>
            </div>

            <div class="funnel-reasons-grid">
              <div class="funnel-reason-card">
                <div class="reason-icon">🎙️</div>
                <h5>Audio Continuo en Micrófonos SKP UHF</h5>
                <p>Las pilas desechables pierden voltaje sin previo aviso. Las recargables garantizan carga completa para los 4 micrófonos SKP UHF 600 PRO del Templo y los 2 de la Capilla.</p>
              </div>

              <div class="funnel-reason-card">
                <div class="reason-icon">🕯️</div>
                <h5>Adoración Eucarística Continua</h5>
                <p>Mantiene permanentemente iluminadas las 2 velas eléctricas ante el Santísimo Sacramento con rotación segura y sin interrupciones.</p>
              </div>

              <div class="funnel-reason-card">
                <div class="reason-icon">💰</div>
                <h5>Ahorro Parroquial Permanente</h5>
                <p>Comprar pilas alcalinas semanalmente es un gasto recurrente elevado. Con un solo aporte dotamos a la parroquia de energía para más de 1.000 recargas.</p>
              </div>

              <div class="funnel-reason-card">
                <div class="reason-icon">🌱</div>
                <h5>Cuidado de la Creación</h5>
                <p>Evitamos desechar cientos de pilas contaminantes al año en el sector, alineándonos con el compromiso de ecología integral.</p>
              </div>
            </div>

            <div class="funnel-panel-actions">
              <button type="button" class="btn-funnel-next" onclick="setFunnelStep('presupuesto')">
                Siguiente: Ver cómo se calculó la meta (${formatCurrency(totalRepairCost)}) →
              </button>
            </div>
          </div>

          <!-- Panel 2: Presupuesto y Cotización Técnica -->
          <div class="funnel-step-panel ${activeStep === 'presupuesto' ? 'active' : ''}" data-step="presupuesto">
            <div class="funnel-panel-header">
              <h4>2. Cálculo Técnico Transparente de la Meta (${formatCurrency(totalRepairCost)})</h4>
              <p>Así definimos el presupuesto exacto sin costos ocultos:</p>
            </div>

            <div class="tech-calc-box">
              <ul class="tech-calc-list">
                <li style="border-left: 3px solid #16a34a; padding-left: 0.75rem; background: rgba(22, 163, 74, 0.04);">
                  <span>🎯</span>
                  <span><strong>FASE 1 (PRIORIDAD ACTUAL • 4 Micrófonos Templo Mayor):</strong> 4 micrófonos × 2 pilas = 8 pilas en uso simultáneo en el presbiterio. Con el sistema de relevo continuo (el doble para tener siempre pilas cargando en sacristía), se requieren <strong>16 pilas AA (8 packs)</strong>. Meta Fase 1: <strong>$50.320</strong>. Recaudado actual: <strong>$29.000 (58%)</strong>. Faltan sólo <strong>$21.320</strong>.</span>
                </li>
                <li>
                  <span>🎙️</span>
                  <span><strong>FASE 2 (Próximo Hito • 2 Micrófonos Salón Capilla):</strong> 2 micrófonos × 2 pilas = 4 pilas en uso + 4 en relevo = <strong>8 pilas AA (4 packs)</strong>. Meta Fase 2: <strong>$25.160</strong>.</span>
                </li>
                <li>
                  <span>🕯️</span>
                  <span><strong>FASE 3 (Hito Final • 2 Velas Eléctricas Adoración al Santísimo):</strong> 2 velas × 2 pilas = 4 pilas en uso continuo + 4 en relevo = <strong>8 pilas AA (4 packs)</strong>. Meta Fase 3: <strong>$25.160</strong>.</span>
                </li>
                <li>
                  <span>🔄</span>
                  <span><strong>¿Por qué el doble de pilas?</strong> Para garantizar la continuidad litúrgica: mientras un juego de pilas está instalado y operando en los micrófonos o velas, el segundo juego de reemplazo permanece en el cargador de sacristía listo para intercambio inmediato.</span>
                </li>
                <li>
                  <span>📦</span>
                  <span><strong>Total Proyecto Consolidado:</strong> 16 + 8 + 8 = <strong>32 pilas AA en total (16 packs de 2 pilas Energizer 2000 mAh)</strong> = <strong>${formatCurrency(totalRepairCost)}</strong>.</span>
                </li>
              </ul>
            </div>

            <!-- Sodimac Product Reference Bar -->
            <div class="product-sodimac-bar" style="margin-top: 1rem;">
              <div class="product-sodimac-info">
                <div class="product-sodimac-icon">🔋</div>
                <div class="product-sodimac-text">
                  <span class="product-sodimac-title">Pack de 2 Pilas Recargables AA Energizer 2000 mAh 1.2V (Meta: 32 pilas)</span>
                  <span class="product-sodimac-sku">SKU Sodimac: 110228362 • $6.290 c/pack (2 pilas) • ${totalQty} packs requeridos = 32 pilas AA en total (${formatCurrency(totalRepairCost)})</span>
                </div>
              </div>
              <a href="https://www.sodimac.cl/sodimac-cl/articulo/110228362/pack-de-2-pilas-recargables-aa-2000-mah-1-2v/110228368" target="_blank" rel="noopener noreferrer" class="btn-open-sodimac">
                Verificar en Sodimac.cl ↗
              </a>
            </div>

            <div class="funnel-panel-actions">
              <button type="button" class="btn-funnel-prev" onclick="setFunnelStep('causa')">
                ← Volver a La Causa
              </button>
              <button type="button" class="btn-funnel-next" onclick="setFunnelStep('donar')">
                Siguiente: ¿Cómo realizar tu aporte? →
              </button>
            </div>
          </div>

          <!-- Panel 3: Datos de Transferencia y Canales de Aporte -->
          <div class="funnel-step-panel ${activeStep === 'donar' ? 'active' : ''}" data-step="donar">
            <div class="funnel-panel-header">
              <h4>3. Canales Oficiales para Donar</h4>
              <p>Tu donación, cualquiera sea el monto, va 100% destinada a esta adquisición técnica.</p>
            </div>

            <!-- Embedded Instant Bank Transfer Card with Mercado Pago & QR -->
            <div class="instant-bank-card">
              <div class="instant-bank-header">
                <span>🏦 Datos para Transferencia Bancaria Directa</span>
                <span class="mercadopago-pill">MERCADO PAGO</span>
              </div>

              <div class="instant-bank-layout">
                <div class="instant-bank-grid">
                  <div class="instant-bank-row">
                    <div>
                      <span class="instant-bank-lbl">Banco Destino</span>
                      <span class="instant-bank-val">MERCADO PAGO</span>
                    </div>
                    <button type="button" class="btn-instant-copy" onclick="copyDonationField('MERCADO PAGO', this)">
                      📋 Copiar
                    </button>
                  </div>

                  <div class="instant-bank-row">
                    <div>
                      <span class="instant-bank-lbl">Cuenta Vista</span>
                      <span class="instant-bank-val">1011953574</span>
                    </div>
                    <button type="button" class="btn-instant-copy" onclick="copyDonationField('1011953574', this)">
                      📋 Copiar
                    </button>
                  </div>

                  <div class="instant-bank-row">
                    <div>
                      <span class="instant-bank-lbl">RUT</span>
                      <span class="instant-bank-val">14.148.009-k</span>
                    </div>
                    <button type="button" class="btn-instant-copy" onclick="copyDonationField('14148009k', this)">
                      📋 Copiar
                    </button>
                  </div>

                  <div class="instant-bank-row">
                    <div>
                      <span class="instant-bank-lbl">Correo Electrónico</span>
                      <span class="instant-bank-val" style="font-size:0.75rem;">rodrigo.quezadab@gmail.com</span>
                    </div>
                    <button type="button" class="btn-instant-copy" onclick="copyDonationField('rodrigo.quezadab@gmail.com', this)">
                      📋 Copiar
                    </button>
                  </div>

                  <div class="instant-bank-row" style="grid-column: 1 / -1; border-left: 3px solid #009ee3;">
                    <div>
                      <span class="instant-bank-lbl">Asunto / Glosa de Transferencia</span>
                      <span class="instant-bank-val" style="color: #0284c7; font-weight: 700;">Parroquia</span>
                    </div>
                    <button type="button" class="btn-instant-copy" onclick="copyDonationField('Parroquia', this)">
                      📋 Copiar Glosa
                    </button>
                  </div>
                </div>

                <!-- QR Code Box -->
                <div class="instant-bank-qr-box">
                  <div class="instant-qr-wrapper">
                    <img src="assets/qr-mercadopago.svg" alt="QR Mercado Pago Donaciones" width="120" height="120" class="instant-qr-img">
                  </div>
                  <div class="instant-qr-caption">
                    <span>📱 Escanea para transferir con <strong>Mercado Pago</strong> o tu App de Banco</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Botones de Acción de Donación -->
            <div class="active-actions-row" style="margin-top: 1rem;">
              <a href="https://wa.me/56933484878?text=${encodeURIComponent('Hola Parroquia San Patricio, deseo avisar una donación para las pilas recargables de los micrófonos.')}" target="_blank" class="btn-cta-whatsapp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                <span>Avisar Donación por WhatsApp</span>
              </a>
              <button type="button" class="btn btn-secondary" onclick="promptQuickDonation('${repair.id}')">
                + Registrar Aporte Recibido
              </button>
            </div>

            <div class="funnel-panel-actions">
              <button type="button" class="btn-funnel-prev" onclick="setFunnelStep('presupuesto')">
                ← Volver al Cálculo de la Meta
              </button>
            </div>
          </div>
        </section>
      `;
    });

    html += `
      <!-- Backlog Invitation Bar -->
      <div class="backlog-peek-box">
        <div class="backlog-peek-info">
          <span class="backlog-peek-title">📋 ¿Deseas conocer otras iniciativas de la parroquia?</span>
          <span class="backlog-peek-desc">Existen otros 8 proyectos futuros en estudio técnico (iluminación exterior, sensores, climatización, etc.)</span>
        </div>
        <button type="button" class="btn-peek-backlog" onclick="switchProjectSection('backlog')">
          Ver Backlog Parroquial (8 proyectos) →
        </button>
      </div>
    `;

    repairsContainer.innerHTML = html;
    return;
  }

  // BACKLOG VIEW MODE
  let html = `
    <div class="backlog-return-bar">
      <button type="button" class="btn-return-active" onclick="switchProjectSection('active')">
        ← Volver al Proyecto Activo (Pilas Micrófonos y Adoración)
      </button>
    </div>
    ${backlogBannerHtml}
  `;

  filtered.forEach(repair => {
    const items = repair.items || [];
    let repairMaterialsCost = 0;
    let repairBoughtCount = 0;
    let totalQty = 0;

    items.forEach(itm => {
      const price = Number(itm.price) || 0;
      const qty = Number(itm.qty) || 1;
      repairMaterialsCost += price * qty;
      totalQty += qty;
      if (itm.bought) repairBoughtCount += qty;
    });

    const laborCost = repair.hasLabor ? (Number(repair.laborCost) || 0) : 0;
    const totalRepairCost = repairMaterialsCost + laborCost;
    const progressPct = totalQty > 0 ? Math.round((repairBoughtCount / totalQty) * 100) : 0;
    const isCompleted = totalQty > 0 && repairBoughtCount === totalQty;
    const hasNotes = Boolean(repair.description && repair.description.trim() !== '');

    const raised = Number(repair.raisedAmount) || 0;
    const fundingPct = totalRepairCost > 0 ? Math.min(100, Math.round((raised / totalRepairCost) * 100)) : 0;
    const remainingNeeded = Math.max(0, totalRepairCost - raised);

    html += `
      <article class="repair-card ${isCompleted ? 'is-complete-card' : ''}" data-id="${repair.id}" onclick="editRepair('${repair.id}')" title="Haz clic para entrar al proyecto y ver/gestionar sus especificaciones técnicas">
        <div class="card-top">
          <div class="hierarchy-tags">
            <span class="tag tag-place">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
              ${escapeHtml(repair.place || 'Sector')}
            </span>
            <span class="tag tag-area">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
              ${escapeHtml(repair.area || 'Espacio')}
            </span>
            <span class="tag tag-specialty">
              ${escapeHtml(repair.specialty || 'General')}
            </span>
            <span class="tag tag-status-${escapeHtml(repair.status || 'recaudacion')}">
              ${escapeHtml(statusLabels[repair.status] || 'En Recaudación')}
            </span>
            <span class="tag tag-priority-${repair.priority || 'media'}">
              ${repair.priority ? repair.priority.toUpperCase() : 'MEDIA'}
            </span>
          </div>

          <div class="card-actions-menu" onclick="event.stopPropagation();">
            <button class="icon-btn-ghost delete" title="Eliminar proyecto" onclick="deleteRepair('${repair.id}')" aria-label="Eliminar">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>

        <div class="card-main-body">
          <h3 class="repair-title">
            ${escapeHtml(repair.title)}
            ${hasNotes ? `<span class="list-notes-badge" style="vertical-align: middle; font-size: 0.68rem; margin-left: 0.35rem;" title="Tiene bitácora técnica">📝 Bitácora</span>` : ''}
          </h3>
          ${repair.description ? `<p class="repair-description">${escapeHtml(repair.description)}</p>` : ''}
        </div>

        <!-- Prominent Goal Amount Box -->
        <div class="card-meta-highlight-box">
          <div class="meta-highlight-top">
            <span class="meta-highlight-title-label">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
              Monto Estimado Proyecto
            </span>
            <span class="meta-highlight-status-badge">En Backlog</span>
          </div>
          <div class="meta-highlight-amount">
            ${formatCurrency(totalRepairCost)}
            <span class="meta-highlight-amount-suffix">Presupuesto</span>
          </div>
          <div class="meta-highlight-breakdown">
            <div class="meta-breakdown-cell raised">
              <span class="meta-breakdown-lbl">Recaudado</span>
              <span class="meta-breakdown-val">${formatCurrency(raised)}</span>
            </div>
            <div class="meta-breakdown-cell remaining">
              <span class="meta-breakdown-lbl">Por Financiar</span>
              <span class="meta-breakdown-val">${formatCurrency(remainingNeeded)}</span>
            </div>
            <div class="meta-breakdown-cell pct">
              <span class="meta-breakdown-lbl">Avance</span>
              <span class="meta-breakdown-val">${fundingPct}%</span>
            </div>
          </div>
        </div>

        <!-- Project Quick Stats Summary -->
        <div class="card-stats-summary">
          <div class="card-stat-pill ${isCompleted ? 'pill-completed' : ''}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <span>${items.length} ${items.length === 1 ? 'material cotizado' : 'materiales cotizados'}</span>
          </div>

          ${repair.hasLabor && laborCost > 0 ? `
            <div class="card-stat-pill pill-labor" title="Incluye mano de obra técnica calificada">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
              <span>Instalación: ${formatCurrency(laborCost)}</span>
            </div>
          ` : ''}
        </div>

        <!-- Action Row -->
        <div class="card-donation-row" onclick="event.stopPropagation();">
          <button type="button" class="btn-activate-project" onclick="promoteToActive('${repair.id}')" title="Activar esta iniciativa para comenzar su recaudación y compras">
            🚀 Activar como Proyecto Activo
          </button>
          <button type="button" class="card-manage-btn" onclick="editRepair('${repair.id}')" style="font-size:0.75rem; padding: 0.35rem 0.65rem;" title="Ver y editar ficha técnica">
            Ver Ficha
          </button>
        </div>
      </article>
    `;
  });

  repairsContainer.innerHTML = html;
}

function updateUI() {
  calculateMetrics();
  renderFilterPills();
  renderRepairsGrid();
}

/* ==========================================================================
   Item Toggle & Operations
   ========================================================================== */
window.updateModalRowBought = function(checkbox) {
  const label = checkbox.closest('.bought-toggle-label');
  const row = checkbox.closest('.dynamic-item-row');
  const icon = label.querySelector('.bought-toggle-icon');
  const text = label.querySelector('.bought-toggle-text');
  
  if (checkbox.checked) {
    label.classList.add('is-active');
    row.classList.add('is-bought-row');
    icon.textContent = '✓';
    text.textContent = 'Comprado / Adquirido';
  } else {
    label.classList.remove('is-active');
    row.classList.remove('is-bought-row');
    icon.textContent = '○';
    text.textContent = 'Marcar como Adquirido';
  }
};

window.deleteRepair = function(repairId) {
  const repair = appData.repairs.find(r => r.id === repairId);
  if (!repair) return;

  if (confirm(`¿Estás seguro de eliminar el arreglo "${repair.title}"?`)) {
    appData.repairs = appData.repairs.filter(r => r.id !== repairId);
    saveData();
  }
};

/* ==========================================================================
   Repair Modal Management (Create / Edit)
   ========================================================================== */
function openRepairModal(repair = null) {
  repairForm.reset();
  modalItemsContainer.innerHTML = '';

  const specialtyInput = document.getElementById('form-specialty');
  const statusInput = document.getElementById('form-status');
  const raisedInput = document.getElementById('form-raised-amount');

  if (repair) {
    repairModalTitle.textContent = `Editar Proyecto: ${repair.title}`;
    document.getElementById('form-repair-id').value = repair.id;
    document.getElementById('form-place').value = repair.place || '';
    document.getElementById('form-area').value = repair.area || '';
    document.getElementById('form-title').value = repair.title || '';
    if (specialtyInput) specialtyInput.value = repair.specialty || 'Electricidad e Iluminación';
    if (statusInput) statusInput.value = repair.status || 'recaudacion';
    document.getElementById('form-priority').value = repair.priority || 'media';
    if (raisedInput) raisedInput.value = repair.raisedAmount || 0;
    document.getElementById('form-description').value = repair.description || '';

    formHasLabor.checked = Boolean(repair.hasLabor);
    laborInputContainer.style.display = repair.hasLabor ? 'block' : 'none';
    formLaborCost.value = repair.laborCost || '';

    // Populate materials
    if (Array.isArray(repair.items) && repair.items.length > 0) {
      repair.items.forEach(itm => addModalItemRow(itm));
    } else {
      addModalItemRow();
    }
  } else {
    repairModalTitle.textContent = 'Nuevo Proyecto Parroquial';
    document.getElementById('form-repair-id').value = '';
    // Pre-fill place/area from active filter if specific
    if (currentFilterPlace !== 'all') {
      document.getElementById('form-place').value = currentFilterPlace;
    } else {
      document.getElementById('form-place').value = 'Templo Mayor';
    }
    if (currentFilterArea !== 'all') {
      document.getElementById('form-area').value = currentFilterArea;
    }
    if (specialtyInput) specialtyInput.value = 'Electricidad e Iluminación';
    if (statusInput) statusInput.value = 'recaudacion';
    document.getElementById('form-priority').value = 'alta';
    if (raisedInput) raisedInput.value = 0;
    document.getElementById('form-description').value = '';

    formHasLabor.checked = false;
    laborInputContainer.style.display = 'none';
    formLaborCost.value = '';
    // Add 1 blank material row
    addModalItemRow();
  }

  repairModal.classList.add('is-open');
}

window.openRepairModal = openRepairModal;

window.editRepair = function(repairId) {
  const repair = appData.repairs.find(r => r.id === repairId);
  if (repair) {
    openRepairModal(repair);
  }
};

function addModalItemRow(itemData = null) {
  const rowId = generateId('row');
  const nameVal = itemData ? escapeHtml(itemData.name || '') : '';
  const priceVal = itemData ? (itemData.price || 0) : '';
  const qtyVal = itemData ? (itemData.qty || 1) : 1;
  const urlVal = itemData ? escapeHtml(itemData.url || '') : '';
  const boughtVal = itemData ? Boolean(itemData.bought) : false;

  const rowEl = document.createElement('div');
  rowEl.className = `dynamic-item-row ${boughtVal ? 'is-bought-row' : ''}`;
  rowEl.id = rowId;

  rowEl.innerHTML = `
    <div class="dynamic-item-row-top">
      <label class="bought-toggle-label ${boughtVal ? 'is-active' : ''}" title="Marcar si este material ya ha sido adquirido o comprado">
        <input type="checkbox" class="item-bought-checkbox" ${boughtVal ? 'checked' : ''} onchange="updateModalRowBought(this)">
        <span class="bought-toggle-icon">${boughtVal ? '✓' : '○'}</span>
        <span class="bought-toggle-text">${boughtVal ? 'Comprado / Adquirido' : 'Marcar como Adquirido'}</span>
      </label>

      <button type="button" class="icon-btn-ghost delete" onclick="document.getElementById('${rowId}').remove()" title="Quitar material" aria-label="Quitar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
      </button>
    </div>

    <div class="dynamic-item-inputs-grid">
      <div style="display: flex; gap: 0.35rem; align-items: center;">
        <input type="text" class="form-input item-name-input" placeholder="Nombre material (ej: Micrófono Shure BLX24)" value="${nameVal}" required style="flex: 1;">
        <button type="button" class="icon-btn-copy" onclick="copyToClipboard(this.closest('.dynamic-item-row').querySelector('.item-name-input').value, this)" title="Copiar nombre del producto para cotizar">
          📋
        </button>
      </div>
      <div>
        <input type="number" class="form-input item-price-input" placeholder="Precio ($)" value="${priceVal}" min="0" step="50" required>
      </div>
      <div>
        <input type="number" class="form-input item-qty-input" placeholder="Cant" value="${qtyVal}" min="1" step="1" required>
      </div>
    </div>

    <div class="url-input-subrow" style="display: flex; gap: 0.35rem; align-items: center;">
      <input type="url" class="form-input item-url-input" placeholder="Link de compra / tienda (Sodimac, Easy, Audiomúsica, PC Factory...)" value="${urlVal}" style="font-size:0.8rem; flex: 1;">
      ${urlVal ? `
        <a href="${urlVal}" target="_blank" rel="noopener noreferrer" class="link-btn" title="Abrir enlace de cotización" style="padding: 0.4rem 0.6rem; font-size: 0.75rem; flex-shrink: 0;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          Ver Tienda
        </a>
      ` : ''}
    </div>
  `;

  modalItemsContainer.appendChild(rowEl);
}

// Form Submit Handler
repairForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const repairId = document.getElementById('form-repair-id').value;
  const place = document.getElementById('form-place').value.trim() || 'Templo Mayor';
  const area = document.getElementById('form-area').value.trim() || 'General';
  const title = document.getElementById('form-title').value.trim();
  const specialty = document.getElementById('form-specialty')?.value || 'Electricidad e Iluminación';
  const status = document.getElementById('form-status')?.value || 'recaudacion';
  const priority = document.getElementById('form-priority').value;
  const raisedAmount = Number(document.getElementById('form-raised-amount')?.value) || 0;
  const description = document.getElementById('form-description').value.trim();
  const hasLabor = formHasLabor.checked;
  const laborCost = hasLabor ? (Number(formLaborCost.value) || 0) : 0;

  // Extract items with their acquired/bought state
  const items = [];
  const rows = modalItemsContainer.querySelectorAll('.dynamic-item-row');
  rows.forEach(row => {
    const name = row.querySelector('.item-name-input').value.trim();
    const price = Number(row.querySelector('.item-price-input').value) || 0;
    const qty = Number(row.querySelector('.item-qty-input').value) || 1;
    const url = row.querySelector('.item-url-input').value.trim();
    const boughtCheckbox = row.querySelector('.item-bought-checkbox');
    const bought = boughtCheckbox ? boughtCheckbox.checked : false;

    if (name) {
      items.push({
        id: generateId('itm'),
        name,
        price,
        qty,
        url,
        bought
      });
    }
  });

  if (repairId) {
    // Update existing
    const existingIndex = appData.repairs.findIndex(r => r.id === repairId);
    if (existingIndex !== -1) {
      appData.repairs[existingIndex] = {
        ...appData.repairs[existingIndex],
        place,
        area,
        title,
        specialty,
        status,
        priority,
        raisedAmount,
        description,
        hasLabor,
        laborCost,
        items
      };
    }
  } else {
    // Create new
    const newRepair = {
      id: generateId('rep'),
      place,
      area,
      title,
      specialty,
      status,
      priority,
      raisedAmount,
      description,
      hasLabor,
      laborCost,
      items,
      createdAt: Date.now()
    };
    appData.repairs.unshift(newRepair);
  }

  saveData();
  closeAllModals();
});

/* ==========================================================================
   Report Generation (View / Print / CSV)
   ========================================================================== */
function populateReportPlaceFilter() {
  const places = [...new Set(appData.repairs.map(r => r.place || 'General'))].sort();
  let html = '<option value="all">Todos los lugares</option>';
  places.forEach(p => {
    html += `<option value="${escapeHtml(p)}">${escapeHtml(p)}</option>`;
  });
  reportFilterPlace.innerHTML = html;
}

function renderReportContent() {
  const selectedPlace = reportFilterPlace.value;
  const selectedStatus = reportFilterStatus.value;

  let repairsToReport = [...appData.repairs];
  if (selectedPlace !== 'all') {
    repairsToReport = repairsToReport.filter(r => (r.place || '').toLowerCase() === selectedPlace.toLowerCase());
  }

  let totalMaterials = 0;
  let totalLabor = 0;
  let totalRaised = 0;
  let totalItemsCount = 0;

  let tablesHtml = '';

  if (repairsToReport.length === 0) {
    reportRenderTarget.innerHTML = `
      <div style="text-align:center; padding: 2rem; color: var(--text-muted);">
        No hay proyectos registrados para generar el reporte con los filtros seleccionados.
      </div>
    `;
    return;
  }

  repairsToReport.forEach(repair => {
    let filteredItems = repair.items || [];
    if (selectedStatus === 'pending') {
      filteredItems = filteredItems.filter(i => !i.bought);
    } else if (selectedStatus === 'bought') {
      filteredItems = filteredItems.filter(i => i.bought);
    }

    let repairMaterialsSum = 0;
    filteredItems.forEach(i => {
      const p = (Number(i.price) || 0) * (Number(i.qty) || 1);
      repairMaterialsSum += p;
      totalItemsCount += (Number(i.qty) || 1);
    });

    totalMaterials += repairMaterialsSum;
    const labor = repair.hasLabor ? (Number(repair.laborCost) || 0) : 0;
    totalLabor += labor;
    const subtotal = repairMaterialsSum + labor;
    const raised = Number(repair.raisedAmount) || 0;
    totalRaised += raised;
    const fundingPct = subtotal > 0 ? Math.min(100, Math.round((raised / subtotal) * 100)) : 0;

    tablesHtml += `
      <div style="margin-bottom: 1.8rem; background: rgba(15, 23, 42, 0.45); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: var(--radius-md); padding: 1rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <h4 style="font-family:var(--font-heading); font-size:1.05rem; color:#ffffff; margin: 0;">
              📍 ${escapeHtml(repair.place)} / ${escapeHtml(repair.area)} — <strong>${escapeHtml(repair.title)}</strong>
            </h4>
            <div style="display: flex; gap: 0.4rem; align-items: center; margin-top: 0.25rem;">
              <span class="tag tag-specialty" style="font-size: 0.7rem;">${escapeHtml(repair.specialty || 'General')}</span>
              <span class="tag tag-priority-${repair.priority || 'media'}" style="font-size: 0.7rem;">Prioridad: ${escapeHtml(repair.priority ? repair.priority.toUpperCase() : 'MEDIA')}</span>
            </div>
          </div>
          <div style="text-align: right; font-size: 0.8rem;">
            <div>Meta: <strong>${formatCurrency(subtotal)}</strong> | Recaudado: <strong style="color: #4ade80;">${formatCurrency(raised)}</strong> (${fundingPct}%)</div>
            <div style="color: ${subtotal > raised ? '#facc15' : '#4ade80'}; font-weight: 600;">
              ${subtotal > raised ? `Saldo por financiar: ${formatCurrency(subtotal - raised)}` : '¡Proyecto 100% Financiado!'}
            </div>
          </div>
        </div>

        <div class="report-table-wrapper">
          <table class="report-table">
            <thead>
              <tr>
                <th>Elemento / Material a Comprar</th>
                <th style="width: 75px; text-align: center;">Cant</th>
                <th class="num-col" style="width: 110px;">P. Unitario</th>
                <th class="num-col" style="width: 110px;">Subtotal</th>
                <th style="width: 100px; text-align: center;">Estado</th>
              </tr>
            </thead>
            <tbody>
              ${filteredItems.length === 0 ? `
                <tr>
                  <td colspan="5" style="text-align:center; color:var(--text-muted); padding: 0.75rem;">
                    Sin elementos bajo este criterio de compra.
                  </td>
                </tr>
              ` : filteredItems.map(itm => `
                <tr>
                  <td>
                    <strong>${escapeHtml(itm.name)}</strong>
                    ${itm.url ? `<br><a href="${escapeHtml(itm.url)}" target="_blank" style="font-size:0.75rem; color:var(--primary);">${escapeHtml(itm.url.length > 55 ? itm.url.substring(0, 55) + '...' : itm.url)}</a>` : ''}
                  </td>
                  <td style="text-align: center;">${itm.qty}</td>
                  <td class="num-col">${formatCurrency(itm.price)}</td>
                  <td class="num-col">${formatCurrency((Number(itm.price) || 0) * (Number(itm.qty) || 1))}</td>
                  <td style="text-align: center;">
                    <span style="font-size:0.75rem; font-weight:600; color:${itm.bought ? 'var(--accent-emerald)' : 'var(--accent-amber)'}">
                      ${itm.bought ? '✓ Adquirido' : '○ Pendiente'}
                    </span>
                  </td>
                </tr>
              `).join('')}

              ${repair.hasLabor ? `
                <tr style="background: rgba(245, 158, 11, 0.05);">
                  <td colspan="3" style="font-weight: 600; color: var(--accent-amber);">
                    🛠️ Mano de Obra / Instalación Técnica Estimada
                  </td>
                  <td class="num-col" style="font-weight: 700; color: var(--accent-amber);">
                    ${formatCurrency(repair.laborCost)}
                  </td>
                  <td style="text-align: center; font-size:0.75rem; color:var(--text-subtle);">Servicio</td>
                </tr>
              ` : ''}
            </tbody>
          </table>
        </div>
      </div>
    `;
  });

  const grandTotal = totalMaterials + totalLabor;
  const remainingTotal = Math.max(0, grandTotal - totalRaised);
  const currentDate = new Date().toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' });

  reportRenderTarget.innerHTML = `
    <div class="report-header-banner" style="background: linear-gradient(135deg, rgba(22, 163, 74, 0.25), rgba(30, 41, 59, 0.8)); border: 1px solid rgba(34, 197, 94, 0.35); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <img src="assets/logo-san-patricio.jpg" alt="Logo Parroquia San Patricio" style="height: 52px; width: auto; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2);">
        <div>
          <h3 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: #ffffff; margin: 0;">Parroquia San Patricio — Balance y Transparencia Técnica</h3>
          <p style="font-size: 0.8rem; color: #cbd5e1; margin-top: 0.2rem;">
            Isabel La Católica 6319, Las Condes | Mercado Pago Cta. Vista 1011953574 | RUT 14.148.009-k | rodrigo.quezadab@gmail.com
          </p>
        </div>
      </div>
      <div style="text-align: right;">
        <span style="font-size: 0.85rem; font-weight: 600; background: rgba(0,0,0,0.3); padding: 0.4rem 0.85rem; border-radius: var(--radius-full); border: 1px solid rgba(255,255,255,0.1);">
          ${repairsToReport.length} Proyectos | ${totalItemsCount} Materiales
        </span>
        <div style="font-size: 0.72rem; color: var(--text-subtle); margin-top: 0.35rem;">Generado: ${currentDate}</div>
      </div>
    </div>

    <div>
      ${tablesHtml}
    </div>

    <div class="report-summary-box">
      <div class="summary-row">
        <span>Presupuesto Materiales:</span>
        <strong>${formatCurrency(totalMaterials)}</strong>
      </div>
      <div class="summary-row">
        <span>Mano de Obra Estimada:</span>
        <strong style="color: var(--accent-amber);">${formatCurrency(totalLabor)}</strong>
      </div>
      <div class="summary-row">
        <span>Meta Presupuestaria Total:</span>
        <strong style="color: #ffffff; font-size: 1.05rem;">${formatCurrency(grandTotal)}</strong>
      </div>
      <div class="summary-row" style="color: #4ade80;">
        <span>Total Recaudado en Donaciones:</span>
        <strong>${formatCurrency(totalRaised)}</strong>
      </div>
      <div class="summary-row grand-total" style="background: rgba(234, 179, 8, 0.15); border: 1px solid rgba(234, 179, 8, 0.35); padding: 0.75rem 1rem; border-radius: var(--radius-sm);">
        <span style="color: #facc15;">Saldo Restante por Financiar:</span>
        <span style="color: #facc15; font-size: 1.25rem;">${formatCurrency(remainingTotal)}</span>
      </div>
    </div>
  `;
}

function exportCsv() {
  const selectedPlace = reportFilterPlace.value;
  const selectedStatus = reportFilterStatus.value;

  let repairsToReport = [...appData.repairs];
  if (selectedPlace !== 'all') {
    repairsToReport = repairsToReport.filter(r => (r.place || '').toLowerCase() === selectedPlace.toLowerCase());
  }

  const rows = [
    ['Sector Parroquial', 'Espacio', 'Proyecto Técnico', 'Especialidad', 'Estado', 'Prioridad', 'Tipo', 'Elemento/Material', 'Cantidad', 'Precio Unitario', 'Subtotal', 'Estado Compra', 'Recaudado Proyecto', 'Link de Cotización']
  ];

  repairsToReport.forEach(repair => {
    let filteredItems = repair.items || [];
    if (selectedStatus === 'pending') {
      filteredItems = filteredItems.filter(i => !i.bought);
    } else if (selectedStatus === 'bought') {
      filteredItems = filteredItems.filter(i => i.bought);
    }

    filteredItems.forEach(itm => {
      const subtotal = (Number(itm.price) || 0) * (Number(itm.qty) || 1);
      rows.push([
        repair.place || 'Templo Mayor',
        repair.area || 'General',
        repair.title || '',
        repair.specialty || 'General',
        repair.status || 'recaudacion',
        repair.priority || 'media',
        'Material',
        itm.name || '',
        itm.qty || 1,
        itm.price || 0,
        subtotal,
        itm.bought ? 'Adquirido' : 'Pendiente',
        repair.raisedAmount || 0,
        itm.url || ''
      ]);
    });

    if (repair.hasLabor && repair.laborCost > 0) {
      rows.push([
        repair.place || 'Templo Mayor',
        repair.area || 'General',
        repair.title || '',
        repair.specialty || 'General',
        repair.status || 'recaudacion',
        repair.priority || 'media',
        'Mano de Obra',
        'Instalación / Mano de Obra Técnica Calificada',
        1,
        repair.laborCost,
        repair.laborCost,
        'N/A',
        repair.raisedAmount || 0,
        ''
      ]);
    }
  });

  const csvContent = '\uFEFF' + rows.map(e => e.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Parroquia_San_Patricio_Presupuesto_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/* ==========================================================================
   Donation Modal & Bank Operations (Parroquia San Patricio)
   ========================================================================== */
let activeDonationProjectId = null;

window.openDonationModal = function(projectId = null) {
  activeDonationProjectId = projectId;
  const modal = document.getElementById('donation-modal');
  const targetName = document.getElementById('donation-target-name');
  const targetGoal = document.getElementById('donation-target-goal');
  const targetRaised = document.getElementById('donation-target-raised');
  const targetNeeded = document.getElementById('donation-target-needed');
  const copySubject = document.getElementById('copy-subject');
  const waBtn = document.getElementById('btn-whatsapp-confirm');
  const quickInput = document.getElementById('quick-donation-amount');

  if (quickInput) quickInput.value = '';

  if (projectId) {
    const repair = appData.repairs.find(r => r.id === projectId);
    if (repair) {
      const matCost = (repair.items || []).reduce((sum, i) => sum + ((Number(i.price) || 0) * (Number(i.qty) || 1)), 0);
      const labor = repair.hasLabor ? (Number(repair.laborCost) || 0) : 0;
      const total = matCost + labor;
      const raised = Number(repair.raisedAmount) || 0;
      const needed = Math.max(0, total - raised);

      if (targetName) targetName.textContent = `${repair.title} (${repair.place} - ${repair.area})`;
      if (targetGoal) targetGoal.textContent = formatCurrency(total);
      if (targetRaised) targetRaised.textContent = formatCurrency(raised);
      if (targetNeeded) targetNeeded.textContent = formatCurrency(needed);
      if (copySubject) copySubject.textContent = 'Parroquia';

      if (waBtn) {
        const text = encodeURIComponent(`Hola Parroquia San Patricio, deseo realizar una donación para el proyecto técnico: "${repair.title}". Les enviaré el comprobante de transferencia a Mercado Pago. ¡Muchas gracias!`);
        waBtn.href = `https://wa.me/56933484878?text=${text}`;
      }
    }
  } else {
    // Si no se especifica proyecto, dirigir directamente al proyecto activo actual
    const activeProject = appData.repairs.find(r => (r.status || '') !== 'planificacion') || appData.repairs[0];
    if (activeProject) {
      window.openDonationModal(activeProject.id);
      return;
    }
  }

  if (modal) modal.classList.add('is-open');
};

window.copyDonationField = function(val, btnElement) {
  copyToClipboard(val, btnElement);
};

window.copyDonationSubject = function(btnElement) {
  const subjectEl = document.getElementById('copy-subject');
  const text = subjectEl ? subjectEl.textContent.trim() : 'Donación Parroquia San Patricio';
  copyToClipboard(text, btnElement);
};

window.submitQuickDonation = function() {
  const quickInput = document.getElementById('quick-donation-amount');
  const amount = Number(quickInput?.value);
  if (!amount || amount <= 0) {
    alert('Por favor ingresa un monto válido a registrar (ej: 25000).');
    return;
  }

  if (activeDonationProjectId) {
    const repair = appData.repairs.find(r => r.id === activeDonationProjectId);
    if (repair) {
      repair.raisedAmount = (Number(repair.raisedAmount) || 0) + amount;
      saveData();
      showToast(`¡Aporte de ${formatCurrency(amount)} registrado con éxito para "${repair.title}"!`);
      window.openDonationModal(activeDonationProjectId);
      return;
    }
  }

  if (appData.repairs.length > 0) {
    const target = appData.repairs.find(r => {
      const cost = (r.items || []).reduce((s, i) => s + ((Number(i.price) || 0) * (Number(i.qty) || 1)), 0) + (r.hasLabor ? (Number(r.laborCost) || 0) : 0);
      return (Number(r.raisedAmount) || 0) < cost;
    }) || appData.repairs[0];

    target.raisedAmount = (Number(target.raisedAmount) || 0) + amount;
    saveData();
    showToast(`¡Aporte de ${formatCurrency(amount)} asignado al proyecto "${target.title}"!`);
    window.openDonationModal(target.id);
  }
};

window.promptQuickDonation = function(projectId) {
  const repair = appData.repairs.find(r => r.id === projectId);
  if (!repair) return;

  const input = prompt(`Registrar aporte de donación para:\n"${repair.title}"\n\nIngresa el monto aportado en pesos ($):`, '20000');
  if (input !== null) {
    const amount = Number(input.replace(/[^0-9]/g, ''));
    if (amount > 0) {
      repair.raisedAmount = (Number(repair.raisedAmount) || 0) + amount;
      saveData();
      showToast(`¡Aporte de ${formatCurrency(amount)} sumado a "${repair.title}"!`);
    }
  }
};

/* ==========================================================================
   Backup & Restore (JSON)
   ========================================================================== */
btnBackupExport.addEventListener('click', () => {
  const jsonStr = JSON.stringify(appData, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `reparaplan_backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
});

inputBackupImport.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (evt) => {
    try {
      const parsed = JSON.parse(evt.target.result);
      if (Array.isArray(parsed.repairs)) {
        appData = parsed;
        saveData();
        closeAllModals();
        alert('¡Copia de seguridad importada con éxito!');
      } else {
        alert('El archivo no contiene un formato de datos válido de ReparaPlan.');
      }
    } catch (err) {
      alert('Error al leer el archivo JSON.');
    }
  };
  reader.readAsText(file);
});

btnLoadSample.addEventListener('click', () => {
  if (confirm('¿Deseas restaurar los datos de ejemplo iniciales?')) {
    appData = { repairs: JSON.parse(JSON.stringify(SAMPLE_DATA)) };
    saveData();
    closeAllModals();
  }
});

btnResetData.addEventListener('click', () => {
  if (confirm('¡Atención! Se eliminarán todos los arreglos y compras registradas. ¿Continuar?')) {
    appData = { repairs: [] };
    saveData();
    closeAllModals();
  }
});

/* ==========================================================================
   Modal Helpers & Global Event Listeners
   ========================================================================== */
function closeAllModals() {
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.classList.remove('is-open');
  });
}

document.querySelectorAll('.modal-close-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const modalId = btn.getAttribute('data-close');
    if (modalId) {
      document.getElementById(modalId)?.classList.remove('is-open');
    } else {
      closeAllModals();
    }
  });
});

// Close modal when clicking on backdrop
document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      backdrop.classList.remove('is-open');
    }
  });
});

// Keydown ESC to close modals
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllModals();
  }
});

/* ==========================================================================
   Catalog Management (Catálogo de Productos, Cotizaciones & Proveedores por SKU)
   ========================================================================== */
function getBadgeClass(badge) {
  if (!badge) return 'badge-neutral';
  if (badge.includes('Recomendado')) return 'badge-gold';
  if (badge.includes('Costo') || badge.includes('Económico')) return 'badge-green';
  if (badge.includes('Robusto')) return 'badge-blue';
  return 'badge-neutral';
}

function resolveProductUrl(store, sku, customUrl) {
  let cleanUrl = (customUrl || '').trim();
  const cleanSku = (sku || '').trim();
  const s = (store || '').toLowerCase();

  // If cleanUrl has old www.sodimac.cl/sodimac-cl/search, fix it to sodimac.falabella.com
  if (cleanUrl.includes('sodimac.cl/sodimac-cl/search')) {
    cleanUrl = cleanUrl.replace('www.sodimac.cl/sodimac-cl/search', 'sodimac.falabella.com/sodimac-cl/search');
  }

  // If cleanUrl is just generic homepage like www.sodimac.cl or www.easy.cl, upgrade it with sku if available
  const isGenericHomepage = cleanUrl === 'https://www.sodimac.cl' || 
                            cleanUrl === 'https://sodimac.falabella.com' ||
                            cleanUrl === 'https://sodimac.falabella.com/sodimac-cl' ||
                            cleanUrl === 'https://www.easy.cl' ||
                            cleanUrl === 'https://ilumat.cl';

  if (cleanUrl && !isGenericHomepage) {
    return cleanUrl;
  }

  if (s.includes('sodimac') || s.includes('homecenter')) {
    if (cleanSku) {
      return `https://sodimac.falabella.com/sodimac-cl/search?Ntt=${encodeURIComponent(cleanSku)}`;
    }
  }
  if (s.includes('easy')) {
    if (cleanSku) {
      return `https://www.easy.cl/search?q=${encodeURIComponent(cleanSku)}`;
    }
  }
  if (s.includes('mercado libre') || s.includes('mercadolibre')) {
    if (cleanSku.toUpperCase().startsWith('MLC')) {
      return `https://www.mercadolibre.cl/p/${cleanSku}`;
    }
    if (cleanSku) {
      return `https://listado.mercadolibre.cl/${encodeURIComponent(cleanSku)}`;
    }
  }
  if (s.includes('ilumat')) {
    if (cleanSku) {
      return `https://ilumat.cl/?s=${encodeURIComponent(cleanSku)}&post_type=product`;
    }
  }
  if (cleanUrl) return cleanUrl;
  return '';
}

function getStoreMeta(storeName) {
  const s = (storeName || '').toLowerCase();
  if (s.includes('sodimac') || s.includes('homecenter')) {
    return { icon: '🛒', className: 'store-tag-sodimac', label: storeName || 'Homecenter Sodimac' };
  }
  if (s.includes('easy')) {
    return { icon: '🏬', className: 'store-tag-easy', label: storeName || 'Easy.cl' };
  }
  if (s.includes('mercado libre') || s.includes('mercadolibre')) {
    return { icon: '📦', className: 'store-tag-ml', label: storeName || 'Mercado Libre' };
  }
  return { icon: '⚡', className: 'store-tag-direct', label: storeName || 'Proveedor Directo' };
}

function renderCatalog() {
  const q = (catalogSearchInput?.value || '').toLowerCase().trim();
  const categoryFilter = catalogCategoryFilter?.value || 'all';

  // Extract unique categories
  const categories = [...new Set((appData.catalog || []).map(c => c.category).filter(Boolean))].sort();
  if (catalogCategoryFilter) {
    let catOptionsHtml = '<option value="all">Todas las categorías</option>';
    categories.forEach(cat => {
      catOptionsHtml += `<option value="${escapeHtml(cat)}" ${categoryFilter === cat ? 'selected' : ''}>${escapeHtml(cat)}</option>`;
    });
    catalogCategoryFilter.innerHTML = catOptionsHtml;
  }

  let filtered = [...(appData.catalog || [])];

  if (categoryFilter !== 'all') {
    filtered = filtered.filter(item => (item.category || '').toLowerCase() === categoryFilter.toLowerCase());
  }

  if (q) {
    filtered = filtered.filter(item => {
      const matchName = (item.name || '').toLowerCase().includes(q);
      const matchSupplier = (item.supplier || '').toLowerCase().includes(q);
      const matchSpecs = (item.specs || '').toLowerCase().includes(q);
      const matchNotes = (item.notes || '').toLowerCase().includes(q);
      const matchCategory = (item.category || '').toLowerCase().includes(q);
      const matchLinks = (item.links || []).some(l => 
        (l.store || '').toLowerCase().includes(q) || 
        (l.sku || '').toLowerCase().includes(q) || 
        (l.url || '').toLowerCase().includes(q)
      );
      return matchName || matchSupplier || matchSpecs || matchNotes || matchCategory || matchLinks;
    });
  }

  if (!catalogItemsContainer) return;

  if (filtered.length === 0) {
    catalogItemsContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔍</div>
        <p style="font-weight: 600;">No se encontraron productos en el catálogo</p>
        <p style="font-size: 0.8rem; color: var(--text-subtle);">Prueba con otros términos de búsqueda, código SKU o añade una nueva cotización.</p>
        <button class="btn btn-primary btn-sm" onclick="openCatalogItemModal()" style="margin-top: 0.75rem;">+ Crear Producto</button>
      </div>
    `;
    return;
  }

  let html = filtered.map(item => {
    const badgeClass = getBadgeClass(item.badge);
    const links = Array.isArray(item.links) && item.links.length > 0
      ? item.links
      : (item.url ? [{ store: item.supplier || 'Tienda', sku: '', price: item.price, url: item.url, isSelected: true }] : []);

    let storeQuotesHtml = '';
    if (links.length > 0) {
      storeQuotesHtml = `
        <div class="store-quotes-box">
          <div class="store-quotes-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path></svg>
            Enlaces Directos por Proveedor / SKU (${links.length}):
          </div>
          <div class="store-quotes-list">
            ${links.map(l => {
              const meta = getStoreMeta(l.store);
              const isSelected = Boolean(l.isSelected);
              const targetUrl = resolveProductUrl(l.store, l.sku, l.url);

              return `
                <a href="${targetUrl ? escapeHtml(targetUrl) : '#'}" ${targetUrl ? 'target="_blank" rel="noopener noreferrer"' : ''} class="store-quote-pill ${isSelected ? 'is-primary-store' : ''}" title="${targetUrl ? `Abrir producto en ${escapeHtml(l.store)} ${l.sku ? `(SKU: ${escapeHtml(l.sku)})` : ''}` : 'Sin enlace o SKU registrado'}">
                  <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
                    <span class="store-name-tag ${meta.className}">
                      <span>${meta.icon}</span>
                      <span>${escapeHtml(l.store)}</span>
                    </span>
                    ${l.sku ? `<span class="store-sku-tag" title="Código de producto SKU">SKU: ${escapeHtml(l.sku)}</span>` : ''}
                  </div>
                  <span class="store-quote-price">
                    ${l.price ? formatCurrency(l.price) : 'Ver'}
                    ${targetUrl ? ' ↗' : ''}
                  </span>
                </a>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    return `
      <div class="catalog-card" data-id="${item.id}">
        <div class="catalog-card-header">
          <div style="display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap;">
            <span class="tag tag-area">${escapeHtml(item.category || 'General')}</span>
            ${item.badge ? `<span class="catalog-badge ${badgeClass}">${escapeHtml(item.badge)}</span>` : ''}
          </div>
          <button type="button" class="btn-copy-name" onclick="copyToClipboard('${escapeHtml(item.name).replace(/'/g, "\\'")}', this)" title="Copiar nombre del producto para pegarlo en Sodimac o Easy">
            📋 Copiar Nombre
          </button>
        </div>

        <h3 class="catalog-product-title">${escapeHtml(item.name)}</h3>

        <div class="catalog-meta-row">
          <span class="catalog-supplier-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path></svg>
            ${escapeHtml(item.supplier || 'Tienda')}
          </span>
          <span class="catalog-price">${formatCurrency(item.price)}</span>
        </div>

        ${storeQuotesHtml}

        ${item.specs ? `
          <div class="catalog-specs-box">
            <strong>Especificaciones:</strong> ${escapeHtml(item.specs)}
          </div>
        ` : ''}

        ${item.notes ? `
          <p class="catalog-notes-text">💡 ${escapeHtml(item.notes)}</p>
        ` : ''}

        <div class="catalog-actions-bar">
          <div style="display: flex; align-items: center; gap: 0.35rem;">
            ${appData.repairs.length > 0 ? `
              <button class="btn btn-secondary btn-sm" style="font-size: 0.75rem; padding: 0.3rem 0.6rem; color: var(--primary);" onclick="promptAddProductToProject('${item.id}')" title="Añadir este producto a uno de tus proyectos existentes">
                + A Proyecto
              </button>
            ` : ''}
            <button type="button" class="btn-copy-name" style="font-size: 0.7rem; padding: 0.25rem 0.5rem;" onclick="copyToClipboard('${escapeHtml(item.name).replace(/'/g, "\\'")}', this)" title="Copiar nombre para pegarlo en la tienda">
              📋 Copiar
            </button>
          </div>

          <div style="display: flex; align-items: center; gap: 0.25rem;">
            <button class="icon-btn-ghost" onclick="editCatalogItem('${item.id}')" title="Editar producto, enlaces y SKUs" aria-label="Editar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="icon-btn-ghost delete" onclick="deleteCatalogItem('${item.id}')" title="Eliminar producto" aria-label="Eliminar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  catalogItemsContainer.innerHTML = html;
}

window.openCatalogModal = function() {
  renderCatalog();
  catalogModal.classList.add('is-open');
};

function addCatFormLinkRow(linkData = null) {
  const container = document.getElementById('cat-form-links-container');
  if (!container) return;
  const row = document.createElement('div');
  row.className = 'cat-link-row';
  const storeVal = linkData?.store || '';
  const skuVal = linkData?.sku || '';
  const priceVal = linkData?.price ? linkData.price : '';
  const urlVal = linkData?.url || '';

  row.innerHTML = `
    <input type="text" class="form-input cat-link-store" placeholder="Tienda (Sodimac, Easy)..." list="cat-suppliers-list" value="${escapeHtml(storeVal)}" required style="font-size:0.8rem; padding:0.4rem 0.5rem;">
    <input type="text" class="form-input cat-link-sku" placeholder="SKU / Código..." value="${escapeHtml(skuVal)}" style="font-size:0.8rem; padding:0.4rem 0.5rem; font-family:monospace;">
    <input type="number" class="form-input cat-link-price" placeholder="Precio ($)..." value="${priceVal}" min="0" step="50" style="font-size:0.8rem; padding:0.4rem 0.5rem;">
    <input type="url" class="form-input cat-link-url" placeholder="URL directa del producto (https://...)" value="${escapeHtml(urlVal)}" style="font-size:0.8rem; padding:0.4rem 0.5rem;">
    <button type="button" class="icon-btn-ghost delete" style="padding:0.25rem;" onclick="this.closest('.cat-link-row').remove()" title="Eliminar cotización">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
    </button>
  `;
  container.appendChild(row);
}

window.openCatalogItemModal = function(item = null) {
  catalogItemForm.reset();
  const linksContainer = document.getElementById('cat-form-links-container');
  if (linksContainer) linksContainer.innerHTML = '';

  if (item) {
    catalogItemModalTitle.textContent = 'Editar Producto y Cotizaciones por SKU';
    document.getElementById('form-cat-id').value = item.id;
    document.getElementById('form-cat-name').value = item.name || '';
    document.getElementById('form-cat-category').value = item.category || 'General';
    document.getElementById('form-cat-supplier').value = item.supplier || '';
    document.getElementById('form-cat-price').value = item.price || '';
    document.getElementById('form-cat-badge').value = item.badge || '';
    document.getElementById('form-cat-specs').value = item.specs || '';
    document.getElementById('form-cat-notes').value = item.notes || '';

    if (Array.isArray(item.links) && item.links.length > 0) {
      item.links.forEach(l => addCatFormLinkRow(l));
    } else if (item.url) {
      addCatFormLinkRow({ store: item.supplier || 'Tienda', sku: '', price: item.price, url: item.url });
    } else {
      addCatFormLinkRow({ store: 'Homecenter Sodimac', sku: '', price: '', url: '' });
      addCatFormLinkRow({ store: 'Easy.cl', sku: '', price: '', url: '' });
    }
  } else {
    catalogItemModalTitle.textContent = 'Nuevo Producto / Cotización por SKU';
    document.getElementById('form-cat-id').value = '';
    document.getElementById('form-cat-category').value = 'Sensores y Domótica';
    document.getElementById('form-cat-badge').value = '';
    // Pre-populate standard quotation links ready for SKU entry
    addCatFormLinkRow({ store: 'Homecenter Sodimac', sku: '', price: '', url: '' });
    addCatFormLinkRow({ store: 'Easy.cl', sku: '', price: '', url: '' });
    addCatFormLinkRow({ store: 'Proveedor Directo', sku: '', price: '', url: '' });
  }
  catalogItemModal.classList.add('is-open');
};

window.editCatalogItem = function(id) {
  const item = (appData.catalog || []).find(c => c.id === id);
  if (item) openCatalogItemModal(item);
};

window.deleteCatalogItem = function(id) {
  const item = (appData.catalog || []).find(c => c.id === id);
  if (!item) return;
  if (confirm(`¿Eliminar "${item.name}" del catálogo?`)) {
    appData.catalog = (appData.catalog || []).filter(c => c.id !== id);
    saveData();
    renderCatalog();
  }
};

window.promptAddProductToProject = function(catalogItemId) {
  const catItem = (appData.catalog || []).find(c => c.id === catalogItemId);
  if (!catItem) return;

  if (appData.repairs.length === 0) {
    alert('Aún no tienes proyectos creados. Crea primero un arreglo.');
    return;
  }

  const projectListStr = appData.repairs.map((r, idx) => `${idx + 1}. ${r.title} (${r.place} / ${r.area})`).join('\n');
  const selectedIndexStr = prompt(`Selecciona el número del proyecto al que deseas añadir "${catItem.name}":\n\n${projectListStr}\n\nIngresa el número (ej: 1):`);

  if (!selectedIndexStr) return;
  const idx = parseInt(selectedIndexStr, 10) - 1;

  if (idx >= 0 && idx < appData.repairs.length) {
    const targetProject = appData.repairs[idx];
    if (!Array.isArray(targetProject.items)) targetProject.items = [];

    const primaryLink = catItem.links?.[0];
    const targetUrl = resolveProductUrl(primaryLink?.store || catItem.supplier, primaryLink?.sku || '', catItem.url || primaryLink?.url || '');
    const skuTag = primaryLink?.sku ? ` [SKU: ${primaryLink.sku}]` : '';

    targetProject.items.push({
      id: generateId('itm'),
      name: `${catItem.name} (${primaryLink?.store || catItem.supplier || 'Tienda'})${skuTag}`,
      price: Number(primaryLink?.price || catItem.price) || 0,
      qty: 1,
      url: targetUrl,
      bought: false
    });

    saveData();
    alert(`¡"${catItem.name}" añadido exitosamente al proyecto "${targetProject.title}"!`);
  } else {
    alert('Número de proyecto no válido.');
  }
};

/* Catalog Picker inside Project Modal */
window.openCatalogPickerModal = function() {
  renderCatalogPicker();
  catalogPickerModal.classList.add('is-open');
};

function renderCatalogPicker() {
  const q = (pickerSearchInput?.value || '').toLowerCase().trim();
  let list = appData.catalog || [];

  if (q) {
    list = list.filter(item => 
      (item.name || '').toLowerCase().includes(q) ||
      (item.supplier || '').toLowerCase().includes(q) ||
      (item.category || '').toLowerCase().includes(q) ||
      (item.specs || '').toLowerCase().includes(q) ||
      (item.links || []).some(l => (l.store || '').toLowerCase().includes(q) || (l.sku || '').toLowerCase().includes(q))
    );
  }

  if (!pickerItemsContainer) return;

  if (list.length === 0) {
    pickerItemsContainer.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
        No se encontraron productos en el catálogo.
      </div>
    `;
    return;
  }

  pickerItemsContainer.innerHTML = list.map(item => {
    const links = Array.isArray(item.links) && item.links.length > 0 ? item.links : [];
    return `
      <div class="picker-item-row">
        <div class="picker-item-info">
          <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
            <span class="picker-item-title">${escapeHtml(item.name)}</span>
            ${item.badge ? `<span class="catalog-badge ${getBadgeClass(item.badge)}" style="font-size:0.65rem; padding:0.1rem 0.4rem;">${escapeHtml(item.badge)}</span>` : ''}
          </div>
          <div class="picker-item-sub">
            <span>🏪 ${escapeHtml(item.supplier || 'Tienda')}</span>
            <span>📁 ${escapeHtml(item.category || 'General')}</span>
            <span style="color: var(--accent-emerald); font-weight: 700;">${formatCurrency(item.price)}</span>
            ${links.length > 0 ? `<span style="color: #38bdf8;">(${links.length} opciones SKU: ${links.map(l => `${escapeHtml(l.store)}${l.sku ? ` [${l.sku}]` : ''}`).join(', ')})</span>` : ''}
          </div>
          ${item.specs ? `<div style="font-size:0.72rem; color:var(--text-subtle);">${escapeHtml(item.specs)}</div>` : ''}
        </div>

        <div style="display: flex; align-items: center; gap: 0.35rem; flex-shrink: 0;">
          <button type="button" class="btn-copy-name" onclick="copyToClipboard('${escapeHtml(item.name).replace(/'/g, "\\'")}', this)" title="Copiar nombre">
            📋 Copiar
          </button>
          <button type="button" class="btn btn-primary btn-sm" onclick="selectCatalogItemForProject('${item.id}')">
            + Añadir
          </button>
        </div>
      </div>
    `;
  }).join('');
}

window.selectCatalogItemForProject = function(catalogItemId) {
  const catItem = (appData.catalog || []).find(c => c.id === catalogItemId);
  if (!catItem) return;

  const primaryLink = catItem.links?.[0];
  const targetUrl = resolveProductUrl(primaryLink?.store || catItem.supplier, primaryLink?.sku || '', catItem.url || primaryLink?.url || '');
  const skuTag = primaryLink?.sku ? ` [SKU: ${primaryLink.sku}]` : '';

  addModalItemRow({
    name: `${catItem.name} (${primaryLink?.store || catItem.supplier || 'Tienda'})${skuTag}`,
    price: Number(primaryLink?.price || catItem.price) || 0,
    qty: 1,
    url: targetUrl,
    bought: false
  });

  catalogPickerModal.classList.remove('is-open');
};

// Catalog Item Form Submit
catalogItemForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('form-cat-id').value;
  const name = document.getElementById('form-cat-name').value.trim();
  const category = document.getElementById('form-cat-category').value.trim() || 'General';
  const supplier = document.getElementById('form-cat-supplier').value.trim() || 'Tienda';
  const price = Number(document.getElementById('form-cat-price').value) || 0;
  const badge = document.getElementById('form-cat-badge').value;
  const specs = document.getElementById('form-cat-specs').value.trim();
  const notes = document.getElementById('form-cat-notes').value.trim();

  // Extract multi-store quotation links with SKU
  const links = [];
  document.querySelectorAll('#cat-form-links-container .cat-link-row').forEach(row => {
    const store = row.querySelector('.cat-link-store')?.value.trim();
    const sku = row.querySelector('.cat-link-sku')?.value.trim();
    const linkPrice = Number(row.querySelector('.cat-link-price')?.value) || 0;
    const url = row.querySelector('.cat-link-url')?.value.trim();
    if (store || sku || url) {
      links.push({
        store: store || 'Tienda',
        sku: sku || '',
        price: linkPrice || price,
        url: url || '',
        isSelected: false
      });
    }
  });

  // Mark first link as selected if none is
  if (links.length > 0 && !links.some(l => l.isSelected)) {
    links[0].isSelected = true;
  }

  const primaryUrl = resolveProductUrl(links[0]?.store || supplier, links[0]?.sku || '', links[0]?.url || '');

  if (!name) return;

  if (id) {
    const existingIndex = (appData.catalog || []).findIndex(c => c.id === id);
    if (existingIndex !== -1) {
      appData.catalog[existingIndex] = {
        ...appData.catalog[existingIndex],
        name,
        category,
        supplier,
        price,
        badge,
        url: primaryUrl,
        links,
        specs,
        notes
      };
    }
  } else {
    if (!Array.isArray(appData.catalog)) appData.catalog = [];
    appData.catalog.unshift({
      id: generateId('cat'),
      name,
      category,
      supplier,
      price,
      badge,
      url: primaryUrl,
      links,
      specs,
      notes
    });
  }

  saveData();
  catalogItemModal.classList.remove('is-open');
  renderCatalog();
});

// Store Quick Shortcut Buttons
document.getElementById('btn-add-sodimac-link')?.addEventListener('click', () => {
  addCatFormLinkRow({ store: 'Homecenter Sodimac', sku: '', price: '', url: '' });
});

document.getElementById('btn-add-easy-link')?.addEventListener('click', () => {
  addCatFormLinkRow({ store: 'Easy.cl', sku: '', price: '', url: '' });
});

document.getElementById('btn-add-custom-link')?.addEventListener('click', () => {
  addCatFormLinkRow({ store: '', sku: '', price: '', url: '' });
});

// Trigger Buttons
btnAddRepair.addEventListener('click', () => openRepairModal());
fabAddRepair.addEventListener('click', () => openRepairModal());
btnOpenDonation?.addEventListener('click', () => openDonationModal());
btnAddItemRow.addEventListener('click', () => addModalItemRow());
btnPickFromCatalog?.addEventListener('click', openCatalogPickerModal);
btnOpenCatalog?.addEventListener('click', openCatalogModal);
btnCreateCatalogItem?.addEventListener('click', () => openCatalogItemModal());

catalogSearchInput?.addEventListener('input', renderCatalog);
catalogCategoryFilter?.addEventListener('change', renderCatalog);
pickerSearchInput?.addEventListener('input', renderCatalogPicker);

formHasLabor.addEventListener('change', () => {
  laborInputContainer.style.display = formHasLabor.checked ? 'block' : 'none';
  if (formHasLabor.checked) {
    formLaborCost.focus();
  }
});

btnOpenReport.addEventListener('click', () => {
  populateReportPlaceFilter();
  renderReportContent();
  reportModal.classList.add('is-open');
});

reportFilterPlace.addEventListener('change', renderReportContent);
reportFilterStatus.addEventListener('change', renderReportContent);

btnPrintReport.addEventListener('click', () => {
  window.print();
});

btnExportCsv.addEventListener('click', exportCsv);

btnOpenBackup.addEventListener('click', () => {
  backupModal.classList.add('is-open');
});

// View mode switcher buttons
btnViewGrid?.addEventListener('click', () => setViewMode('grid'));
btnViewList?.addEventListener('click', () => setViewMode('list'));

// Filter & Search events
categoryPillsContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('.pill-btn');
  if (!btn) return;
  currentFilterPlace = btn.dataset.place;
  currentFilterArea = 'all'; // reset sub-area when switching main place
  renderFilterPills();
  renderRepairsGrid();
});

areaChipsContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('.chip-btn');
  if (!btn) return;
  currentFilterArea = btn.dataset.area;
  renderAreaChips();
  renderRepairsGrid();
});

searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderRepairsGrid();
});

sortSelect.addEventListener('change', (e) => {
  sortBy = e.target.value;
  renderRepairsGrid();
});

/* ==========================================================================
   Theme Management (Light Mode Default)
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('parroquia_theme') || 'light';
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('parroquia_theme', theme);
  const icon = document.getElementById('theme-icon');
  const label = document.getElementById('theme-label');
  if (icon && label) {
    if (theme === 'dark') {
      icon.textContent = '☀️';
      label.textContent = 'Claro';
    } else {
      icon.textContent = '🌙';
      label.textContent = 'Oscuro';
    }
  }
}

window.toggleTheme = function() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
};

/* ==========================================================================
   Initialization
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadData();
  setupNotesStamping();
  // Ensure initial view button reflects current state
  if (btnViewGrid && btnViewList) {
    btnViewGrid.classList.toggle('active', currentViewMode === 'grid');
    btnViewGrid.setAttribute('aria-pressed', currentViewMode === 'grid');
    btnViewList.classList.toggle('active', currentViewMode === 'list');
    btnViewList.setAttribute('aria-pressed', currentViewMode === 'list');
  }
  updateUI();
});

