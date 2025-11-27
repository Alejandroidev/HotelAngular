# Hotel U Colombia - Angular Application

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.2.

## 🎨 Sistema de Diseño

Este proyecto utiliza un **sistema centralizado de variables CSS** con soporte para **modo claro y oscuro**.

### 🌓 Modo Claro/Oscuro

La aplicación ahora incluye un sistema completo de temas con:
- ✨ Cambio entre modo claro y oscuro
- 💾 Persistencia de preferencia del usuario
- 🔄 Detección automática de preferencia del sistema
- 🎯 Botón flotante para cambio rápido

Ver **[MODO-CLARO-OSCURO.md](./MODO-CLARO-OSCURO.md)** para más información.

### Documentación de Colores

- **[PALETA-DE-COLORES.md](./PALETA-DE-COLORES.md)** - Guía completa de uso de variables CSS
- **[CAMBIO-RAPIDO-COLORES.md](./CAMBIO-RAPIDO-COLORES.md)** - Cómo cambiar la paleta de colores rápidamente
- **[EJEMPLOS-CODIGO-CSS.md](./EJEMPLOS-CODIGO-CSS.md)** - Ejemplos prácticos de código
- **[MODO-CLARO-OSCURO.md](./MODO-CLARO-OSCURO.md)** - Sistema de temas claro/oscuro

### Paleta Actual: "Azul Noche y Dorado"

#### Modo Claro
```css
--color-fondo-claro: #F5F6FA;    /* Gris muy claro */
--color-primario: #0A3D62;       /* Azul noche */
--color-secundario: #D4A056;     /* Dorado suave */
--color-acento: #3C6382;         /* Azul claro */
--color-texto: #2C3A47;          /* Gris oscuro */
```

#### Modo Oscuro
```css
--color-fondo-claro: #1E272E;    /* Azul gris oscuro */
--color-primario: #4A90E2;       /* Azul claro */
--color-secundario: #F4C430;     /* Dorado brillante */
--color-acento: #5DADE2;         /* Azul cielo */
--color-texto: #E8E9EB;          /* Gris muy claro */
```

### Cambiar Colores

Para cambiar toda la paleta de colores de la aplicación:

1. Abre `src/styles.css`
2. Modifica los valores en la sección `:root` (modo claro)
3. Modifica los valores en `[data-theme="dark"]` (modo oscuro)
4. Los cambios se aplicarán automáticamente en toda la aplicación

Ver **[CAMBIO-RAPIDO-COLORES.md](./CAMBIO-RAPIDO-COLORES.md)** para más detalles.

---

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
