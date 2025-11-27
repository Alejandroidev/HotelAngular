# 🎨 Configuración Rápida de Paleta de Colores

## Paleta Actual: "Elegancia Petróleo y Oro"

```css
--color-fondo-claro: #F7F5F2;    /* Marfil suave */
--color-primario: #0E3A47;       /* Azul petróleo elegante */
--color-secundario: #C9A86A;     /* Dorado apagado */
--color-acento: #E07A5F;         /* Coral suave */
--color-texto: #2C2C2C;          /* Gris carbón */
```

---

## 🎯 Paletas Alternativas Sugeridas

### Opción 2: "Azul Marino y Plata"
```css
--color-fondo-claro: #F5F7FA;    /* Gris azulado claro */
--color-primario: #001F3F;       /* Azul marino profundo */
--color-secundario: #B8C5D6;     /* Plata azulada */
--color-acento: #3498DB;         /* Azul cielo */
--color-texto: #2C3E50;          /* Gris azulado oscuro */
```

### Opción 3: "Tierra y Bosque"
```css
--color-fondo-claro: #F9F7F4;    /* Beige cálido */
--color-primario: #2C5F2D;       /* Verde bosque */
--color-secundario: #A67C52;     /* Marrón tierra */
--color-acento: #FF6B35;         /* Naranja terracota */
--color-texto: #3E2723;          /* Marrón oscuro */
```

### Opción 4: "Elegancia Monocromática"
```css
--color-fondo-claro: #FAFAFA;    /* Gris muy claro */
--color-primario: #212121;       /* Negro carbón */
--color-secundario: #757575;     /* Gris medio */
--color-acento: #E91E63;         /* Rosa vibrante */
--color-texto: #424242;          /* Gris oscuro */
```

### Opción 5: "Lujo Púrpura"
```css
--color-fondo-claro: #F8F5FC;    /* Lavanda muy claro */
--color-primario: #4A148C;       /* Púrpura profundo */
--color-secundario: #9C27B0;     /* Púrpura medio */
--color-acento: #FFD700;         /* Oro brillante */
--color-texto: #311B92;          /* Púrpura oscuro */
```

### Opción 6: "Océano Tropical"
```css
--color-fondo-claro: #F0F8FF;    /* Azul muy claro */
--color-primario: #006994;       /* Azul océano */
--color-secundario: #00BFA5;     /* Turquesa */
--color-acento: #FF5722;         /* Coral vibrante */
--color-texto: #263238;          /* Azul grisáceo oscuro */
```

---

## 🔧 Cómo Aplicar una Nueva Paleta

1. **Copia** los valores de la paleta que elijas
2. **Abre** el archivo `src/styles.css`
3. **Reemplaza** los valores en la sección `:root`
4. **Guarda** el archivo
5. **Recarga** la aplicación en el navegador

¡Listo! Todos los componentes se actualizarán automáticamente.

---

## 🎨 Herramientas para Crear tu Propia Paleta

### Generadores de Paletas:
- **Coolors.co**: https://coolors.co/
- **Adobe Color**: https://color.adobe.com/
- **Material Design Palette**: https://materialpalette.com/
- **Paletton**: https://paletton.com/

### Consejos para Elegir Colores:

1. **Color Primario**: Debe representar la marca/hotel (profesional y elegante)
2. **Color Secundario**: Complementa al primario (acentos de lujo)
3. **Color Acento**: Para llamadas a la acción (botones importantes)
4. **Fondo Claro**: Suave, no debe cansar la vista
5. **Color Texto**: Alto contraste con el fondo para legibilidad

### Verificar Contraste:
- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- Mínimo recomendado: 4.5:1 para texto normal
- Mínimo recomendado: 3:1 para texto grande

---

## 📊 Guía de Uso por Elemento

| Elemento | Variable Recomendada |
|----------|---------------------|
| Header/Navbar | `--color-primario` o `--gradiente-primario` |
| Footer | `--color-primario` |
| Botones principales | `--gradiente-acento` |
| Botones secundarios | `--gradiente-primario` |
| Títulos principales | `--color-primario` |
| Subtítulos | `--color-secundario` |
| Texto normal | `--color-texto` |
| Fondos de sección | `--color-fondo-claro` |
| Tarjetas/Cards | `--color-blanco` |
| Badges destacados | `--gradiente-acento` |
| Iconos | `--color-secundario` |
| Links | `--color-primario` |
| Precios | `--gradiente-primario` |
| Estados hover | `--color-secundario` |

---

## 🚀 Cambio Rápido en 3 Pasos

### Paso 1: Elegir Paleta
Decide qué paleta usar (actual u otra opción)

### Paso 2: Actualizar Variables
Edita `src/styles.css`, sección `:root`:
```css
:root {
  /* Pega aquí los nuevos valores */
  --color-fondo-claro: #NUEVO_COLOR;
  --color-primario: #NUEVO_COLOR;
  --color-secundario: #NUEVO_COLOR;
  --color-acento: #NUEVO_COLOR;
  --color-texto: #NUEVO_COLOR;
}
```

### Paso 3: Verificar
Revisa que todos los componentes se vean bien:
- ✅ Contraste adecuado en textos
- ✅ Botones visibles y atractivos
- ✅ Gradientes funcionan correctamente
- ✅ Sombras tienen los colores apropiados

---

## 💡 Tips Profesionales

1. **Mantén la coherencia**: No uses más de 5 colores base
2. **Usa gradientes**: Agregan profundidad y elegancia
3. **Opacidades son tus amigas**: Usa variables de opacidad para efectos sutiles
4. **Prueba en diferentes dispositivos**: Algunos colores se ven diferentes en distintas pantallas
5. **Accesibilidad primero**: Asegura buen contraste para todos los usuarios

---

**Última actualización**: Noviembre 27, 2025
