# Sitio Web Dra. Lily - Estética y Bienestar

Sitio web profesional para clínica de estética y bienestar, diseñado con enfoque **mobile-first** y estilo editorial de alta calidad.

## 🎨 Concepto de Marca

**"Somos nuestra piel"** - Belleza auténtica y dignidad

El diseño refleja elegancia editorial (estilo Vogue/Cine) con fotografía de alta calidad, paleta de colores nude sofisticada, y tipografía de alto contraste.

## 📁 Estructura del Proyecto

```
dra-lily-website/
├── index.html              # Página principal (5 bloques)
├── css/
│   ├── reset.css          # CSS Reset moderno
│   ├── variables.css      # Sistema de diseño (colores, tipografía, espaciados)
│   ├── typography.css     # Estilos tipográficos
│   ├── components.css     # Componentes reutilizables
│   └── main.css          # Estilos específicos del home
├── js/
│   ├── carousel.js       # Carrusel de productos
│   ├── animations.js     # Animaciones y scroll effects
│   └── main.js          # Punto de entrada principal
├── assets/
│   ├── images/
│   │   ├── hero/        # Imágenes del hero
│   │   ├── services/    # Imágenes de servicios
│   │   ├── team/        # Foto de la Dra. Lily
│   │   └── products/    # Fotos de productos
│   └── fonts/           # Fuentes personalizadas
└── pages/               # Páginas internas
    ├── servicios-faciales.html
    ├── servicios-corporales.html
    ├── tecnologia-laser.html
    ├── capilar-bienestar.html
    ├── sobre-dra-lily.html
    ├── tienda.html
    └── contacto.html
```

## 🎨 Paleta de Colores

### Colores Principales

- **Taupe**: `#776F65` - Color principal, sofisticado
- **Beige**: `#C6A992` - Complementario cálido
- **Greige**: `#D7D2CB` - Complementario suave
- **Gris Cálido**: `#F3F1EF` - Fondo de sección tienda

### Colores de Acento

- **Negro**: `#2D2926` - Textos principales
- **Arena**: `#EED484` - Acentos cálidos
- **Naranja**: `#DC582A` - CTAs y elementos de acción
- **Vino**: `#9E2A2F` - Acentos premium

## 🔤 Tipografía

- **Títulos**: Legquinne (Serif editorial de alto contraste)
- **Cuerpo**: Inter Tight (Sans-serif limpia y moderna)

## 🏗️ Estructura del HOME (5 Bloques)

### 1. Hero Section

- Video/imagen macro de piel perfecta
- Título impactante (H1)
- Subtítulo descriptivo
- CTA principal

### 2. Showcase de Servicios

- 4 tarjetas de alto impacto:
  - Alta Estética Facial
  - Contorno Corporal
  - Tecnología Láser
  - Capilar y Bienestar

### 3. Experiencia - Dra. Lily

- Foto profesional
- Biografía corta
- CTA "Conoce a la Dra. Lily"

### 4. Boutique Skincare

- Carrusel de productos
- Fondo diferenciado (#F3F1EF)
- CTA "Ir a la Tienda"

### 5. Footer

- Información de contacto
- Redes sociales
- Dirección y horarios

## 🚀 Cómo Usar

### Abrir el sitio localmente

1. **Opción 1: Abrir directamente**

   - Abre `index.html` en tu navegador

2. **Opción 2: Servidor local (recomendado)**

   ```bash
   # Con Python 3
   python -m http.server 8000

   # Con Node.js (npx)
   npx serve

   # Con PHP
   php -S localhost:8000
   ```

   Luego abre: `http://localhost:8000`

### Agregar Imágenes

Las imágenes deben colocarse en las siguientes carpetas:

- **Hero**: `assets/images/hero/hero-background.jpg`
- **Servicios**:
  - `assets/images/services/facial.jpg`
  - `assets/images/services/corporal.jpg`
  - `assets/images/services/laser.jpg`
  - `assets/images/services/capilar.jpg`
- **Dra. Lily**: `assets/images/team/dra-lily.jpg`
- **Productos**:
  - `assets/images/products/product-1.jpg`
  - `assets/images/products/product-2.jpg`
  - `assets/images/products/product-3.jpg`
  - `assets/images/products/product-4.jpg`

**Especificaciones recomendadas**:

- Hero: 1920x1080px (landscape)
- Servicios: 1200x900px (4:3 ratio)
- Dra. Lily: 800x1000px (portrait)
- Productos: 800x800px (square)
- Formato: JPG o WebP
- Optimizadas para web (< 500KB cada una)

## ✍️ Contenido Pendiente del Copywriter

Los siguientes textos están marcados con `<!-- PENDIENTE -->` en el HTML:

### Hero Section

- [ ] Titular H1 (6-8 palabras)
- [ ] Subtítulo (12-15 palabras)

### Tarjetas de Servicios (4 tarjetas)

- [ ] 4 títulos creativos
- [ ] 4 descripciones vendedoras (30-40 palabras c/u)

### Dra. Lily

- [ ] Biografía resumida (45 palabras)

### Tienda

- [ ] Título de sección
- [ ] Frase de invitación

## 🎯 Características

- ✅ **Mobile-first** - Diseño optimizado para móviles
- ✅ **Responsive** - Se adapta a todos los tamaños de pantalla
- ✅ **SEO optimizado** - Meta tags, estructura semántica
- ✅ **Animaciones suaves** - Micro-interacciones premium
- ✅ **Lazy loading** - Carga optimizada de imágenes
- ✅ **Accesibilidad** - ARIA labels, navegación por teclado
- ✅ **Performance** - CSS y JS optimizados

## 📱 Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1199px
- **Desktop**: ≥ 1200px

## 🔧 Personalización

### Cambiar colores

Edita `css/variables.css` y modifica las variables CSS:

```css
:root {
  --color-taupe: #776f65;
  --color-naranja: #dc582a;
  /* ... otros colores */
}
```

### Cambiar tipografía

Edita `css/typography.css` y actualiza las importaciones de fuentes.

## 📝 Notas de Desarrollo

- **Vanilla CSS**: No usa frameworks CSS (máxima flexibilidad)
- **ES6 Modules**: JavaScript moderno con imports/exports
- **Semantic HTML**: Estructura semántica para SEO
- **BEM-like naming**: Convención de nombres clara y mantenible

## 🌐 Navegadores Soportados

- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)

## 📄 Licencia

© 2025 Dra. Lily. Todos los derechos reservados.

---

**Desarrollado con ❤️ siguiendo el manual de marca "Somos nuestra piel"**
