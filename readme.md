# Tía Vicky - Tienda Virtual de Comida Rápida

## Descripción / Description

Este repositorio contiene los archivos para una tienda virtual de comida rápida llamada Tía Vicky. La estructura de carpetas se organiza de la siguiente manera:
/ This repository contains the files for a fast-food virtual store called Tía Vicky. The folder structure is organized as follows:

### Estructura de Carpetas / Folder Structure

-   `/.vscode`: Directorio que contiene archivos de configuración de Visual Studio Code. / Directory containing Visual Studio Code configuration files.
    -   `.extensions.json`: Configuración de extensiones. / Extensions configuration.
    -   `.settings.json`: Configuraciones específicas de VSCode. / Specific VSCode settings.
-   `/src`: Directorio principal del código fuente. / Main source code directory.
    -   `/assets`: Recursos estáticos utilizados en la aplicación. / Static resources used in the application.
        -   `/icon`: Iconos de la aplicación. / Application icons.
        -   `/images`: Imágenes utilizadas en la tienda. / Images used in the store.
        -   `/sounds`: Archivos de sonido, si los hubiera. / Sound files, if any.
    -   `/data`: Datos estáticos de la tienda en formato JSON. / Static store data in JSON format.
        -   `about.json`: Información sobre la tienda y su historia. / Information about the store and its history.
        -   `comments.json`: Comentarios de los usuarios. / User comments.
        -   `menu.json`: Menú de productos disponibles. / Available product menu.
        -   `offers.json`: Ofertas y promociones. / Offers and promotions.
    -   `/js`: Código JavaScript de la aplicación. / Application's JavaScript code.
        -   `/classes`: Clases utilizadas en la aplicación. / Classes used in the application.
        -   `/functions`: Funciones JavaScript organizadas. / Organized JavaScript functions.
            -   `/pages`: Funciones específicas de páginas. / Page-specific functions.
            -   `/utils`: Utilidades y funciones de ayuda. / Utilities and helper functions.
        -   `main.js`: Archivo principal que inicia la lógica de la aplicación. / Main file initializing the application logic.
    -   `/styles`: Archivos de estilos CSS para la interfaz. / CSS style files for the interface.
        -   `/pages`: Estilos específicos de cada página. / Page-specific styles.
            -   `cart.css`: Estilos para la página del carrito. / Styles for the cart page.
            -   `home.css`: Estilos para la página principal. / Styles for the home page.
            -   `user.css`: Estilos para la página del usuario. / Styles for the user page.
        -   `general.css`: Estilos generales para toda la aplicación. / General styles for the entire application.
        -   `normalize.css`: Estilos de normalización para la compatibilidad entre navegadores. / Normalization styles for cross-browser compatibility.

## Arquitectura del Proyecto / Project Architecture

La estructura de carpetas sigue un enfoque modular y organizado que permite una fácil gestión y mantenimiento del código. Algunas características clave incluyen:
/ The folder structure follows a modular and organized approach that allows easy code management and maintenance.
/ Some of the key features includes:

-   **Organización por funcionalidad**: Los archivos están agrupados por su función, como la lógica de JavaScript en `/js`, los estilos en `/styles`, y los datos en `/data`. / Files are grouped by their function, such as JavaScript logic in `/js`, styles in `/styles`, and data in `/data`.
-   **Separación de lógica y presentación**: Los estilos y la lógica están claramente separados en diferentes carpetas, lo que facilita la comprensión y el mantenimiento. / Styles and logic are clearly separated into different folders, making it easier to understand and maintain.
-   **Uso de archivos JSON para datos estáticos**: La información está separada en archivos JSON para facilitar su manipulación y actualización. / Information is separated into JSON files for easy manipulation and updating.

Esta estructura fomenta la modularidad, la reutilización y la claridad en el desarrollo del proyecto. / This structure fosters modularity, reusability, and clarity in project development.

## Tecnologías Utilizadas / Technologies Used

-   HTML5, CSS3 y JavaScript (Vanilla) para la creación del frontend. / HTML5, CSS3, and JavaScript (Vanilla) for frontend creation.
-   Archivos JSON para almacenar datos estáticos. / JSON files for storing static data.

## Contacto / Contact

-   Si tienes alguna pregunta o sugerencia, no dudes en contactarnos.
-   If you have any questions or suggestions, feel free to contact us.

## Beneficios de Escribir Código en Inglés / Benefits of Writing Code in English

Aunque el público objetivo hable español, existen beneficios significativos al escribir código en inglés:
/ Although the target audience speaks Spanish, there are significant benefits to writing code in English:

### Universalidad y Estándares / Universality and Standards

-   **Estándar en la Industria**: El inglés es el idioma predominante en la industria de la tecnología y la programación, por lo que seguir este estándar facilita la colaboración global y el entendimiento entre desarrolladores de diferentes países. / English is the predominant language in the technology and programming industry, so following this standard facilitates global collaboration and understanding among developers from different countries.
-   **Repositorios y Documentación**: La mayoría de los repositorios, documentación y recursos técnicos están en inglés. Escribir código en inglés hace que sea más fácil comprender y utilizar bibliotecas, frameworks y documentación existente. / Most repositories, documentation, and technical resources are in English. Writing code in English makes it easier to understand and use existing libraries, frameworks, and documentation.

### Mantenimiento y Colaboración / Maintenance and Collaboration

-   **Facilita la Mantenibilidad**: Si tu código es compartido o mantenido por diferentes equipos o desarrolladores, el uso de nombres y comentarios en inglés reduce la barrera lingüística y facilita la colaboración. / If your code is shared or maintained by different teams or developers, using English names and comments reduces the language barrier and facilitates collaboration.
-   **Atracción de Talentos**: Hacer el código accesible a una audiencia global puede atraer a desarrolladores talentosos que pueden contribuir y mejorar tu proyecto. / Making the code accessible to a global audience can attract talented developers who can contribute to and improve your project.

### Buenas Prácticas / Best Practices

-   **Consistencia y Claridad**: El uso consistente del inglés para nombres de variables, funciones y comentarios mejora la coherencia y claridad del código, permitiendo una lectura más fácil y rápida para cualquier persona, independientemente de su idioma nativo. / The consistent use of English for variable names, functions, and comments improves the coherence and clarity of the code, enabling easier and faster readability for anyone, regardless of their native language.

En resumen, escribir código en inglés no solo es una práctica estándar en la industria, sino que también promueve la accesibilidad, colaboración y mantenibilidad del proyecto, mejorando su calidad general.
/ In summary, writing code in English is not only an industry standard practice, but it also promotes accessibility, collaboration, and maintainability of the project, enhancing its overall quality.

### Lista de Tareas / To-Do List

-   [ ] Ordenar productos: Método de cartas. / Sort products: Cards method.
-   [ ] Algoritmo de tipos. / Algorithm for types
    -   [ ] Algoritmo de ordenamiento binario. / Binary sorting algorithm.
    -   [ ] Algoritmo para invertir lista. / Reverse list algorithm.
-   [ ] Ordenar promociones y comentarios. / Sort promos and comments.
    -   [ ] Destacadas. / Featured.
    -   [ ] Recientes. / Recent.
-   [ ] Agregar lógica de compra. / Add purchase logic.

### Lista de tareas de esta semana / To-Do List this week

-   Navbar resaltar último enlace activo
-   Carrito de Compras + Lógica de añadir productos y promos
-   Usuario: Datos pre-definidos y borrar registro solo iniciar una sesión de demo.
-   Ventana Error Sesión Usuario: Adicional si alcanza el tiempo.
