# 🎨 Paleta de Colores - Hotel U Colombia

## Guía de Uso de Variables CSS

Esta documentación explica cómo usar el sistema centralizado de variables CSS para mantener la coherencia visual en toda la aplicación.

---

## 📋 Colores Base

### Colores Principales
```css
var(--color-fondo-claro)   /* #F7F5F2 - Marfil suave - Fondos principales */
var(--color-primario)      /* #0E3A47 - Azul petróleo - Headers, títulos */
var(--color-secundario)    /* #C9A86A - Dorado apagado - Acentos de lujo */
var(--color-acento)        /* #E07A5F - Coral suave - Botones CTA */
var(--color-texto)         /* #2C2C2C - Gris carbón - Texto principal */
```

### Ejemplo de uso:
```css
.mi-seccion {
  background-color: var(--color-fondo-claro);
  color: var(--color-texto);
}

.mi-titulo {
  color: var(--color-primario);
  font-weight: var(--peso-bold);
}
```

---

## 🌈 Gradientes Pre-definidos

```css
var(--gradiente-primario)  /* Azul petróleo → Dorado */
var(--gradiente-acento)    /* Coral → Dorado */
var(--gradiente-suave)     /* Gradiente claro para fondos */
```

### Ejemplo de uso:
```css
.boton-principal {
  background: var(--gradiente-primario);
}

.boton-accion {
  background: var(--gradiente-acento);
}
```

---

## 💫 Sombras

```css
var(--sombra-suave)       /* Sombra ligera para tarjetas */
var(--sombra-media)       /* Sombra media para elementos elevados */
var(--sombra-fuerte)      /* Sombra pronunciada para modales */
var(--sombra-primario)    /* Sombra con tinte azul petróleo */
var(--sombra-acento)      /* Sombra con tinte coral */
var(--sombra-secundario)  /* Sombra con tinte dorado */
```

### Ejemplo de uso:
```css
.tarjeta {
  box-shadow: var(--sombra-media);
}

.tarjeta:hover {
  box-shadow: var(--sombra-fuerte);
}
```

---

## 🎭 Opacidades de Colores

Útil para overlays, bordes sutiles y efectos:

```css
/* Primario (Azul petróleo) */
var(--primario-10)   /* 10% opacidad */
var(--primario-20)   /* 20% opacidad */
var(--primario-30)   /* 30% opacidad */
var(--primario-40)   /* 40% opacidad */

/* Secundario (Dorado) */
var(--secundario-10) /* 10% opacidad */
var(--secundario-20) /* 20% opacidad */
var(--secundario-30) /* 30% opacidad */
var(--secundario-40) /* 40% opacidad */

/* Acento (Coral) */
var(--acento-10)     /* 10% opacidad */
var(--acento-20)     /* 20% opacidad */
var(--acento-30)     /* 30% opacidad */
var(--acento-40)     /* 40% opacidad */
```

### Ejemplo de uso:
```css
.overlay {
  background-color: var(--primario-20);
}

.borde-sutil {
  border: 1px solid var(--secundario-20);
}
```

---

## 📏 Espaciado

```css
var(--espacio-xs)   /* 8px */
var(--espacio-sm)   /* 12px */
var(--espacio-md)   /* 20px */
var(--espacio-lg)   /* 30px */
var(--espacio-xl)   /* 40px */
```

### Ejemplo de uso:
```css
.contenedor {
  padding: var(--espacio-lg);
  gap: var(--espacio-md);
}
```

---

## 🔘 Bordes Redondeados

```css
var(--radio-sm)     /* 6px - Botones pequeños */
var(--radio-md)     /* 8px - Elementos medianos */
var(--radio-lg)     /* 12px - Tarjetas grandes */
var(--radio-xl)     /* 15px - Contenedores principales */
var(--radio-pill)   /* 25px - Badges y pills */
```

### Ejemplo de uso:
```css
.tarjeta {
  border-radius: var(--radio-lg);
}

.badge {
  border-radius: var(--radio-pill);
}
```

---

## ⚡ Transiciones

```css
var(--transicion-rapida)  /* 0.2s ease */
var(--transicion-media)   /* 0.3s ease */
var(--transicion-lenta)   /* 0.5s ease */
```

### Ejemplo de uso:
```css
.boton {
  transition: transform var(--transicion-rapida),
              box-shadow var(--transicion-rapida);
}

.boton:hover {
  transform: translateY(-2px);
}
```

---

## 🔤 Tipografía

```css
var(--fuente-principal)  /* Roboto, "Helvetica Neue", sans-serif */
var(--peso-normal)       /* 400 */
var(--peso-medio)        /* 600 */
var(--peso-bold)         /* 700 */
```

### Ejemplo de uso:
```css
h1 {
  font-family: var(--fuente-principal);
  font-weight: var(--peso-bold);
  color: var(--color-primario);
}
```

---

## 🛠️ Clases Utilitarias Globales

Ya incluidas en `styles.css`:

```html
<!-- Fondos con gradiente -->
<div class="bg-gradiente-primario">Contenido</div>
<div class="bg-gradiente-acento">Contenido</div>

<!-- Textos con colores -->
<h2 class="texto-primario">Título</h2>
<p class="texto-secundario">Subtítulo</p>
<span class="texto-acento">Destacado</span>
```

---

## 🔄 Cómo Cambiar la Paleta de Colores

Para cambiar toda la paleta de colores de la aplicación:

1. Abre `src/styles.css`
2. Modifica los valores en la sección `:root`
3. Los cambios se aplicarán automáticamente en toda la aplicación

### Ejemplo de cambio:

```css
:root {
  /* Cambiar de azul petróleo a azul marino */
  --color-primario: #001F3F;
  
  /* Cambiar de dorado a plateado */
  --color-secundario: #C0C0C0;
  
  /* Cambiar de coral a verde esmeralda */
  --color-acento: #2ECC71;
}
```

---

## 📝 Buenas Prácticas

1. **Siempre usa variables CSS** en lugar de colores hardcoded
2. **No uses colores hexadecimales directamente** en los componentes
3. **Utiliza las variables de opacidad** para overlays y efectos
4. **Usa gradientes pre-definidos** para consistencia
5. **Aprovecha las variables de espaciado** para mantener proporciones

### ❌ Evitar:
```css
.elemento {
  background-color: #0E3A47;  /* ❌ Color hardcoded */
  padding: 25px;               /* ❌ Valor arbitrario */
  border-radius: 10px;         /* ❌ Valor arbitrario */
}
```

### ✅ Correcto:
```css
.elemento {
  background-color: var(--color-primario);  /* ✅ Variable */
  padding: var(--espacio-lg);                /* ✅ Variable de espaciado */
  border-radius: var(--radio-lg);            /* ✅ Variable de radio */
}
```

---

## 🎯 Casos de Uso Comunes

### Botón Principal
```css
.boton-principal {
  background: var(--gradiente-primario);
  color: var(--color-blanco);
  padding: var(--espacio-sm) var(--espacio-lg);
  border-radius: var(--radio-md);
  font-weight: var(--peso-medio);
  box-shadow: var(--sombra-primario);
  transition: transform var(--transicion-rapida);
}

.boton-principal:hover {
  transform: translateY(-2px);
  box-shadow: var(--sombra-fuerte);
}
```

### Tarjeta de Habitación
```css
.tarjeta-habitacion {
  background: var(--color-blanco);
  border-radius: var(--radio-lg);
  padding: var(--espacio-lg);
  box-shadow: var(--sombra-media);
  border: 1px solid var(--secundario-10);
  transition: all var(--transicion-media);
}

.tarjeta-habitacion:hover {
  transform: translateY(-5px);
  box-shadow: var(--sombra-fuerte);
  border-color: var(--color-secundario);
}
```

### Header de Sección
```css
.header-seccion {
  background: var(--gradiente-primario);
  color: var(--color-blanco);
  padding: var(--espacio-xl) var(--espacio-md);
  border-radius: var(--radio-lg);
  margin-bottom: var(--espacio-lg);
}

.header-seccion h2 {
  font-weight: var(--peso-bold);
  margin: 0;
}
```

---

## 🌟 Ventajas de este Sistema

1. **Cambios Centralizados**: Cambia un color en un solo lugar
2. **Consistencia Visual**: Todos los componentes usan los mismos valores
3. **Mantenimiento Fácil**: Código más limpio y organizado
4. **Escalabilidad**: Fácil agregar nuevas variables
5. **Documentación Clara**: Nombres descriptivos y comentarios

---

**Fecha de creación**: Noviembre 27, 2025  
**Versión**: 1.0  
**Proyecto**: Hotel U Colombia - Angular Application
