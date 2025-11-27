# 🌓 Sistema de Modo Claro/Oscuro

## Descripción

La aplicación ahora cuenta con un sistema completo de **modo claro y modo oscuro** que permite a los usuarios elegir su preferencia de visualización.

---

## 🎨 Nueva Paleta de Colores

### Modo Claro (Por defecto)
```css
--color-fondo-claro: #F5F6FA;    /* Gris muy claro */
--color-primario: #0A3D62;       /* Azul noche */
--color-secundario: #D4A056;     /* Dorado suave */
--color-acento: #3C6382;         /* Azul claro */
--color-texto: #2C3A47;          /* Gris oscuro */
```

### Modo Oscuro
```css
--color-fondo-claro: #1E272E;    /* Azul gris oscuro */
--color-primario: #4A90E2;       /* Azul claro */
--color-secundario: #F4C430;     /* Dorado brillante */
--color-acento: #5DADE2;         /* Azul cielo */
--color-texto: #E8E9EB;          /* Gris muy claro */
```

---

## 🔧 Cómo Funciona

### 1. Detección Automática
El sistema detecta automáticamente la preferencia del usuario basándose en:
- Configuración guardada en `localStorage`
- Preferencia del sistema operativo (si no hay configuración guardada)

### 2. Cambio Manual
Los usuarios pueden cambiar entre modos usando el botón flotante en la esquina inferior derecha:
- 🌙 = Modo claro (clic para cambiar a oscuro)
- ☀️ = Modo oscuro (clic para cambiar a claro)

### 3. Persistencia
La preferencia del usuario se guarda en `localStorage` y se mantiene entre sesiones.

---

## 📁 Archivos Modificados/Creados

### Nuevos Archivos:
- `src/app/theme-toggle/theme-toggle.ts` - Componente del botón de cambio de tema

### Archivos Modificados:
- `src/styles.css` - Sistema de variables CSS con modo oscuro
- `src/app/app.ts` - Importación del componente de tema
- `src/app/app.html` - Inclusión del botón de tema

---

## 💻 Uso del Componente

### Importación
```typescript
import { ThemeToggleComponent } from './theme-toggle/theme-toggle';

@Component({
  imports: [
    // ... otros imports
    ThemeToggleComponent
  ]
})
```

### HTML
```html
<app-theme-toggle></app-theme-toggle>
```

---

## 🎯 Cómo Funciona el Sistema de Temas

### CSS Variables
El sistema usa variables CSS que cambian automáticamente según el atributo `data-theme`:

```css
/* Modo Claro (por defecto) */
:root {
  --color-primario: #0A3D62;
}

/* Modo Oscuro */
[data-theme="dark"] {
  --color-primario: #4A90E2;
}
```

### JavaScript
El componente controla el atributo `data-theme` en el elemento `<html>`:

```typescript
// Activar modo oscuro
document.documentElement.setAttribute('data-theme', 'dark');

// Desactivar modo oscuro (volver a claro)
document.documentElement.removeAttribute('data-theme');
```

---

## 🔍 Detección de Preferencia del Sistema

El código detecta la preferencia del sistema operativo:

```typescript
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
```

---

## 💾 Almacenamiento de Preferencia

La preferencia se guarda en localStorage:

```typescript
// Guardar
localStorage.setItem('theme', 'dark'); // o 'light'

// Leer
const savedTheme = localStorage.getItem('theme');
```

---

## 🎨 Personalización del Botón

El botón de cambio de tema tiene los siguientes estilos (en `styles.css`):

```css
.theme-toggle {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background: var(--gradiente-primario);
  border-radius: 50%;
  box-shadow: var(--sombra-fuerte);
  /* ... más estilos */
}
```

### Personalizar Posición
```css
.theme-toggle {
  bottom: 20px;  /* Cambiar distancia desde abajo */
  right: 20px;   /* Cambiar distancia desde la derecha */
}
```

### Personalizar Tamaño
```css
.theme-toggle {
  width: 50px;   /* Cambiar ancho */
  height: 50px;  /* Cambiar alto */
  font-size: 1.5em;  /* Cambiar tamaño del emoji */
}
```

---

## 🌈 Agregar Más Temas

Si quieres agregar más temas (ej: tema "océano", "bosque"), puedes crear nuevos conjuntos de variables:

```css
[data-theme="ocean"] {
  --color-primario: #006994;
  --color-secundario: #00BFA5;
  --color-acento: #FF5722;
  /* ... más colores */
}

[data-theme="forest"] {
  --color-primario: #2C5F2D;
  --color-secundario: #A67C52;
  --color-acento: #FF6B35;
  /* ... más colores */
}
```

Luego actualiza el componente para soportar múltiples temas.

---

## 🔄 Transiciones Suaves

Todos los elementos tienen transiciones suaves al cambiar de tema:

```css
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

Esto hace que el cambio sea agradable visualmente en lugar de abrupto.

---

## ♿ Accesibilidad

El botón incluye atributos de accesibilidad:

```html
<button 
  [attr.aria-label]="isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
  [title]="isDarkMode ? 'Modo claro' : 'Modo oscuro'">
```

Esto ayuda a los lectores de pantalla a describir la función del botón.

---

## 📱 Compatibilidad

El sistema es compatible con:
- ✅ Todos los navegadores modernos
- ✅ Dispositivos móviles
- ✅ Tablets
- ✅ Lectores de pantalla
- ✅ Preferencias del sistema operativo

---

## 🧪 Pruebas

### Probar Modo Oscuro
1. Abre la aplicación
2. Haz clic en el botón flotante (🌙)
3. La aplicación cambia a modo oscuro
4. El emoji cambia a ☀️

### Probar Persistencia
1. Cambia a modo oscuro
2. Recarga la página
3. La aplicación debe mantenerse en modo oscuro

### Probar Detección del Sistema
1. Borra localStorage: `localStorage.removeItem('theme')`
2. Cambia la preferencia de tu sistema operativo a modo oscuro
3. Recarga la aplicación
4. Debe activarse el modo oscuro automáticamente

---

## 🛠️ Solución de Problemas

### El tema no se guarda
**Problema**: El tema vuelve al modo claro al recargar  
**Solución**: Verifica que localStorage esté habilitado en tu navegador

### El botón no aparece
**Problema**: No veo el botón de cambio de tema  
**Solución**: Asegúrate de que `<app-theme-toggle>` esté en `app.html`

### Los colores no cambian
**Problema**: Los colores siguen siendo los mismos en modo oscuro  
**Solución**: Verifica que los componentes usen variables CSS (`var(--color-primario)`) en lugar de colores hardcoded

---

## 📊 Diferencias Visuales

### Modo Claro
- Fondo: Gris muy claro (#F5F6FA)
- Perfecto para ambientes iluminados
- Mejor legibilidad en exteriores
- Aspecto profesional y limpio

### Modo Oscuro
- Fondo: Azul gris oscuro (#1E272E)
- Reduce fatiga visual en ambientes oscuros
- Ahorra batería en pantallas OLED
- Aspecto moderno y elegante

---

## 🎯 Mejores Prácticas

1. **Siempre usa variables CSS** en tus componentes
2. **No uses colores hardcoded** que no cambien con el tema
3. **Prueba ambos modos** al agregar nuevos componentes
4. **Asegura buen contraste** en ambos modos
5. **Usa transiciones suaves** para cambios agradables

---

## 🚀 Próximas Mejoras

Posibles mejoras futuras:
- [ ] Más opciones de temas (océano, bosque, etc.)
- [ ] Selector de temas con preview
- [ ] Modo automático según hora del día
- [ ] Temas personalizados por el usuario
- [ ] Sincronización de tema entre dispositivos

---

**Creado**: Noviembre 27, 2025  
**Versión**: 1.0  
**Proyecto**: Hotel U Colombia
