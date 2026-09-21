# ⚡ AURA™ — Prototipo de Tienda Cloud de Próxima Generación

Prototipo de comercio electrónico de alto rendimiento y diseño de vanguardia (**Next-Gen Headless E-commerce**), inspirado en los estándares de ingeniería y UX de plataformas como **Tiendanube (Nuvemshop)**, **Shopify** y marcas de diseño como **Apple / Teenage Engineering**.

---

## 🔬 1. Investigación de Arquitectura: ¿Cómo funcionan Tiendanube y las tiendas modernas?

Tras investigar la documentación oficial de la **API de Tiendanube (Nuvemshop)** y las plataformas web modernas:

### A. Ecosistema Tradicional vs. Headless Commerce
1. **Tiendanube SaaS Tradicional:**
   - **Renderizado del lado del servidor (SSR):** Motor basado en plantillas *Liquid / Twig* que renderiza HTML en cada navegación.
   - **API REST v1:** Autenticación por **OAuth 2.0** con endpoints organizados por recursos (`/v1/{store_id}/products`, `/variants`, `/orders`, `/transactions`, `/shipping_carriers`).
   - **Webhooks:** Comunicación asíncrona hacia ERPs o sistemas de facturación fiscal (AFIP) ante eventos como `orders/create`, `products/update`.
2. **Arquitectura Headless (Implementada en este prototipo):**
   - **Separación total (Decoupled):** El frontend corre sobre **React + TypeScript + Framer Motion**, ofreciendo navegación reactiva instantánea (0 ms de recarga) y animaciones a 60–120 FPS con físicas de resortes (*spring physics*).

### B. Funciones Críticas del E-commerce en Latinoamérica
- **Cálculo de Cuotas Sin Interés:** Clave en la conversión regional (hasta 3, 6 y 12 cuotas).
- **Descuentos por Transferencia Bancaria (10-15% OFF):** Ahorro de comisiones para el comerciante y beneficio directo para el comprador.
- **Cotizador de Envíos en Tiempo Real por Código Postal:** Integración con transportistas (Correo Argentino, Andreani, Envíos Nube).
- **Carrito Deslizable (Slide-over Cart):** Con barra de progreso dinámica para desbloquear *Envío Gratis*.
- **Checkout Guiado en 3 Pasos:** Validación rápida, opciones de envío y pasarelas con confirmación y botón directo a **WhatsApp**.

---

## 🚀 2. Características y Funcionalidades del Prototipo

### 🌟 Experiencia de Usuario & Animaciones Ultra Modernas
- **Hero Interactivo 3D:** Tarjeta de producto estrella flotante, efectos de brillo ambiental reactivos (*glow lighting*) y tipografía moderna (*Space Grotesk* + *Plus Jakarta Sans*).
- **Barra de Anuncios Marquee:** Ticker superior con cupón de inauguración copiable con un clic (`MODERNA20`).
- **Filtros Reactivos Instantáneos:**
  - Pestañas de categorías con selector deslizante animado (`layoutId` de Framer Motion).
  - Búsqueda en vivo con atajo de teclado (`⌘K` o `Ctrl+K`).
  - Ordenamiento por: *Destacados*, *Menor Precio*, *Mayor Precio*, *Mayor Descuento*, *Mejor Valorados*.
  - Filtro exclusivo de stock disponible.
- **Tarjetas de Producto con Micro-interacciones:**
  - Selector de variantes de color con imagen reactiva.
  - Alerta de urgencia de stock (*"¡Solo quedan X unidades en bodega!"*).
  - Botón de guardado a favoritos con animación de latido.
  - Botón de **Vista Rápida (Quick View)** modal.
- **Modal de Vista Rápida Completo:**
  - Galería con miniaturas y zoom.
  - Cotizador simulado de envío ingresando código postal argentino (ej: `1425`, `5000`, `2000`, etc.).
  - Tabla de cuotas y desglose de ahorro.
  - Selector de cantidad y especificaciones técnicas.
- **Carrito Slide-over:**
  - Barra de progreso interactiva hacia el Envío Gratis.
  - Validador y aplicador de cupones con **lluvia de confetti** (`MODERNA20`, `TIENDACLOUD`, `ENVIOFREE`).
  - Productos de venta cruzada (*Upselling*).
- **Checkout Interactivo en 3 Pasos:**
  - Paso 1: Datos personales y dirección con autocompletado.
  - Paso 2: Selección de transporte (Correo Argentino, Andreani Flash o Retiro en Tienda).
  - Paso 3: Método de pago (Tarjeta de Crédito con cuotas, Mercado Pago o Transferencia con 15% OFF).
  - Paso 4: Pantalla de confirmación con número de orden, código de tracking, confetti y **botón directo para notificar la compra por WhatsApp**.
- **Consola Tienda Cloud Admin (Backoffice en vivo):**
  - Panel de comerciante estilo Tiendanube con KPIs (Facturación, Pedidos, Ticket promedio).
  - Editor de stock en tiempo real que sincroniza con el catálogo público inmediatamente.
  - Registro de pedidos entrantes.
  - Formulario para publicar nuevos productos al catálogo instantáneamente.
- **Notificaciones de Prueba Social (Live Sales Toasts):** Alertas sutiles en la esquina inferior con compras recientes para generar validación social y dinamismo.
- **Selector de Moneda:** Alterna en vivo entre Pesos Argentinos (ARS $) y Dólares (USD $).
- **Modal de Documentación:** Acceso en cualquier momento a la explicación de la arquitectura desde la barra de navegación.

---

## 🛠️ 3. Tecnologías Utilizadas

- **Frontend:** React 18 + TypeScript + Vite 6
- **Estilos:** Tailwind CSS 3 con paleta personalizada *Dark OLED / Glassmorphism*
- **Animaciones:** Framer Motion 11 (físicas de resortes, transiciones continuas, layout animations)
- **Efectos:** Canvas-Confetti
- **Iconografía:** Lucide React

---

## 💻 4. Cómo Ejecutar el Proyecto

```bash
# Entrar a la carpeta del proyecto
cd /home/julian/vacas-locas/tienda

# Instalar dependencias (ya instaladas)
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

El servidor de desarrollo está activo en: **`http://localhost:3002/`**
