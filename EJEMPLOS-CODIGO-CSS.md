# 📚 Ejemplos de Código - Uso de Variables CSS

Este archivo contiene ejemplos prácticos de cómo usar el sistema de variables CSS en diferentes componentes.

---

## 🎯 Ejemplo 1: Botón con Gradiente

```css
.mi-boton-principal {
  /* Usar gradiente predefinido */
  background: var(--gradiente-acento);
  color: var(--color-blanco);
  
  /* Espaciado con variables */
  padding: var(--espacio-sm) var(--espacio-lg);
  
  /* Radio de borde */
  border-radius: var(--radio-md);
  
  /* Tipografía */
  font-family: var(--fuente-principal);
  font-weight: var(--peso-medio);
  
  /* Sombra */
  box-shadow: var(--sombra-acento);
  
  /* Transición */
  transition: transform var(--transicion-rapida),
              box-shadow var(--transicion-rapida);
  
  border: none;
  cursor: pointer;
}

.mi-boton-principal:hover {
  transform: translateY(-2px);
  box-shadow: var(--sombra-fuerte);
}

.mi-boton-principal:active {
  transform: translateY(0);
}

.mi-boton-principal:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

## 🏠 Ejemplo 2: Tarjeta de Habitación

```css
.tarjeta-habitacion {
  /* Fondo y estructura */
  background: var(--color-blanco);
  border-radius: var(--radio-lg);
  padding: var(--espacio-lg);
  
  /* Bordes y sombras */
  border: 1px solid var(--secundario-10);
  box-shadow: var(--sombra-media);
  
  /* Transición suave */
  transition: all var(--transicion-media);
  
  /* Layout */
  display: flex;
  flex-direction: column;
  gap: var(--espacio-md);
}

.tarjeta-habitacion:hover {
  transform: translateY(-5px);
  box-shadow: var(--sombra-fuerte);
  border-color: var(--color-secundario);
}

.tarjeta-habitacion__titulo {
  color: var(--color-primario);
  font-weight: var(--peso-bold);
  font-size: 1.5em;
  margin: 0;
}

.tarjeta-habitacion__descripcion {
  color: var(--color-texto);
  line-height: 1.6;
  margin: 0;
}

.tarjeta-habitacion__precio {
  background: var(--gradiente-primario);
  color: var(--color-blanco);
  padding: var(--espacio-md);
  border-radius: var(--radio-md);
  text-align: center;
  font-weight: var(--peso-bold);
  font-size: 1.8em;
}

.tarjeta-habitacion__badge {
  background: var(--gradiente-acento);
  color: var(--color-blanco);
  padding: var(--espacio-xs) var(--espacio-sm);
  border-radius: var(--radio-pill);
  font-size: 0.85em;
  font-weight: var(--peso-medio);
  display: inline-block;
}
```

---

## 📝 Ejemplo 3: Formulario Elegante

```css
.formulario-busqueda {
  background: var(--color-blanco);
  padding: var(--espacio-xl);
  border-radius: var(--radio-lg);
  box-shadow: var(--sombra-media);
  border: 1px solid var(--secundario-20);
  max-width: 900px;
  margin: 0 auto;
}

.formulario-busqueda__titulo {
  color: var(--color-primario);
  font-weight: var(--peso-bold);
  font-size: 2em;
  margin-bottom: var(--espacio-lg);
  text-align: center;
}

.formulario-busqueda__campo {
  background-color: var(--color-fondo-claro);
  border: 2px solid var(--color-borde);
  border-radius: var(--radio-md);
  padding: var(--espacio-sm) var(--espacio-md);
  font-family: var(--fuente-principal);
  font-size: 1em;
  color: var(--color-texto);
  transition: border-color var(--transicion-rapida);
  width: 100%;
}

.formulario-busqueda__campo:focus {
  outline: none;
  border-color: var(--color-primario);
  background-color: var(--color-blanco);
}

.formulario-busqueda__label {
  color: var(--color-texto);
  font-weight: var(--peso-medio);
  margin-bottom: var(--espacio-xs);
  display: block;
}

.formulario-busqueda__boton {
  background: var(--gradiente-acento);
  color: var(--color-blanco);
  padding: var(--espacio-md) var(--espacio-xl);
  border-radius: var(--radio-md);
  border: none;
  font-weight: var(--peso-medio);
  font-size: 1.1em;
  cursor: pointer;
  box-shadow: var(--sombra-acento);
  transition: all var(--transicion-rapida);
  width: 100%;
}

.formulario-busqueda__boton:hover {
  transform: translateY(-2px);
  box-shadow: var(--sombra-fuerte);
}
```

---

## 🎨 Ejemplo 4: Sección Hero

```css
.hero-section {
  background: var(--gradiente-primario);
  color: var(--color-blanco);
  padding: var(--espacio-xl) var(--espacio-md);
  border-radius: var(--radio-lg);
  text-align: center;
  margin-bottom: var(--espacio-lg);
}

.hero-section__titulo {
  font-size: 3em;
  font-weight: var(--peso-bold);
  margin: 0 0 var(--espacio-md) 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-section__subtitulo {
  font-size: 1.3em;
  opacity: 0.95;
  max-width: 600px;
  margin: 0 auto var(--espacio-lg) auto;
}

.hero-section__cta {
  background: var(--color-blanco);
  color: var(--color-primario);
  padding: var(--espacio-md) var(--espacio-xl);
  border-radius: var(--radio-md);
  border: none;
  font-weight: var(--peso-bold);
  font-size: 1.2em;
  cursor: pointer;
  box-shadow: var(--sombra-media);
  transition: all var(--transicion-rapida);
}

.hero-section__cta:hover {
  transform: scale(1.05);
  box-shadow: var(--sombra-fuerte);
}
```

---

## 📱 Ejemplo 5: Modal/Dialog

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--primario-40);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn var(--transicion-media);
}

.modal-contenido {
  background: var(--color-blanco);
  border-radius: var(--radio-xl);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--sombra-fuerte);
  animation: slideUp var(--transicion-media);
}

.modal-header {
  background: var(--gradiente-primario);
  color: var(--color-blanco);
  padding: var(--espacio-lg) var(--espacio-xl);
  border-radius: var(--radio-xl) var(--radio-xl) 0 0;
}

.modal-header__titulo {
  margin: 0;
  font-size: 1.8em;
  font-weight: var(--peso-bold);
}

.modal-body {
  padding: var(--espacio-xl);
  color: var(--color-texto);
}

.modal-footer {
  padding: var(--espacio-md) var(--espacio-xl);
  border-top: 1px solid var(--color-borde);
  display: flex;
  gap: var(--espacio-md);
  justify-content: flex-end;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 🏷️ Ejemplo 6: Badge/Etiqueta

```css
.badge {
  display: inline-block;
  padding: var(--espacio-xs) var(--espacio-md);
  border-radius: var(--radio-pill);
  font-weight: var(--peso-medio);
  font-size: 0.85em;
  text-align: center;
}

.badge--destacado {
  background: var(--gradiente-acento);
  color: var(--color-blanco);
  box-shadow: var(--sombra-acento);
}

.badge--premium {
  background: var(--gradiente-primario);
  color: var(--color-blanco);
  box-shadow: var(--sombra-primario);
}

.badge--disponible {
  background-color: var(--acento-20);
  color: var(--color-acento);
  border: 1px solid var(--color-acento);
}

.badge--ocupado {
  background-color: var(--primario-20);
  color: var(--color-primario);
  border: 1px solid var(--color-primario);
}
```

---

## 📋 Ejemplo 7: Lista con Iconos

```css
.lista-amenidades {
  list-style: none;
  padding: 0;
  margin: 0;
}

.lista-amenidades__item {
  position: relative;
  padding-left: var(--espacio-lg);
  margin-bottom: var(--espacio-sm);
  color: var(--color-texto);
  line-height: 1.6;
}

.lista-amenidades__item::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--color-acento);
  font-weight: var(--peso-bold);
  font-size: 1.2em;
}

.lista-amenidades__titulo {
  font-weight: var(--peso-medio);
  color: var(--color-primario);
}
```

---

## 🎯 Ejemplo 8: Grid de Tarjetas

```css
.grid-habitaciones {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--espacio-lg);
  padding: var(--espacio-xl) var(--espacio-md);
  background-color: var(--color-fondo-claro);
}

.grid-habitaciones__mensaje-vacio {
  grid-column: 1 / -1;
  text-align: center;
  padding: var(--espacio-xl);
  color: var(--color-texto-claro);
  font-size: 1.1em;
}

/* Responsividad */
@media (max-width: 768px) {
  .grid-habitaciones {
    grid-template-columns: 1fr;
    gap: var(--espacio-md);
    padding: var(--espacio-md);
  }
}
```

---

## 🎨 Ejemplo 9: Navegación/Header

```css
.header-principal {
  background-color: var(--color-primario);
  color: var(--color-blanco);
  padding: var(--espacio-md) var(--espacio-xl);
  box-shadow: var(--sombra-media);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-principal__nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.header-principal__logo {
  font-size: 1.8em;
  font-weight: var(--peso-bold);
  color: var(--color-blanco);
  text-decoration: none;
}

.header-principal__menu {
  display: flex;
  gap: var(--espacio-lg);
  list-style: none;
  margin: 0;
  padding: 0;
}

.header-principal__link {
  color: var(--color-blanco);
  text-decoration: none;
  font-weight: var(--peso-medio);
  transition: color var(--transicion-rapida);
  position: relative;
}

.header-principal__link:hover {
  color: var(--color-secundario);
}

.header-principal__link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-secundario);
  transition: width var(--transicion-rapida);
}

.header-principal__link:hover::after {
  width: 100%;
}
```

---

## 🔔 Ejemplo 10: Notificación/Alert

```css
.alerta {
  padding: var(--espacio-md) var(--espacio-lg);
  border-radius: var(--radio-md);
  margin-bottom: var(--espacio-md);
  display: flex;
  align-items: center;
  gap: var(--espacio-md);
  font-weight: var(--peso-medio);
}

.alerta--exito {
  background-color: var(--acento-10);
  color: var(--color-acento);
  border-left: 4px solid var(--color-acento);
}

.alerta--info {
  background-color: var(--primario-10);
  color: var(--color-primario);
  border-left: 4px solid var(--color-primario);
}

.alerta--advertencia {
  background-color: var(--secundario-10);
  color: var(--color-secundario);
  border-left: 4px solid var(--color-secundario);
}

.alerta__icono {
  font-size: 1.5em;
}

.alerta__mensaje {
  flex: 1;
}
```

---

## 💡 Tips de Implementación

1. **Copia el código** que necesites
2. **Adapta los nombres de clase** a tu convención
3. **Ajusta valores** según tus necesidades (pero usando variables)
4. **Prueba en diferentes tamaños** de pantalla
5. **Mantén la consistencia** usando siempre las variables

---

**Última actualización**: Noviembre 27, 2025  
**Proyecto**: Hotel U Colombia
