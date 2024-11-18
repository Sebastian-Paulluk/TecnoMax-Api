# Estrategias de Persistencia - TP 2024 - Documental

## Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-Proyecto)
- [Diagrama Entidad-Relacion](#diagrama-entidad-relación)
- [Descripción del modelo DER](#descripción-del-modelo-DER)
- [Uso y ejecución de la aplicación](#uso-y-ejecución-de-la-aplicación)
- [Fundamentación de las relaciones](#fundamentación-de-las-relaciones)
- [Rutas de la API](#rutas-de-la-api)
- [Estructura del Proyecto](#estructura-del-proyecto)

## Descripción del Proyecto

Han sido contratados/as por una empresa de manufactura para desarrollar un sistema interno de gestión de productos. La empresa fabrica una amplia gama de productos tecnológicos que requieren componentes específicos y son producidos por múltiples fabricantes asociados. Actualmente, el proceso de gestión de esta información es manual y está descentralizado, lo que genera demoras y problemas en la producción. La empresa busca automatizar y centralizar estos datos mediante un sistema web eficiente que permita gestionar los productos, fabricantes y componentes de manera integrada.

## Diagrama Entidad-Relación

![Diagrama Entidad-Relación del proyecto](./img/DER.png)

## Descripción del modelo DER

- Un **Producto** puede tener muchos fabricantes, y un **Fabricante** puede fabricar muchos productos.
- Un **Producto** puede tener muchos componentes, y un **Componente** puede formar parte de varios productos.

## Uso y ejecución de la aplicación

Seguí estos pasos para ejecutar el proyecto:

1. Teniendo [Docker desktop](https://www.docker.com/products/docker-desktop/) instalado, ejecutalo.

2. Para crear una imagen de la aplicación y versionarla con Docker, debés ubicarte en la raíz del proyecto y ejecutar el siguiente comando:

    ```docker build -t empresa-image:1.0.0 .```

3. Ahora, para poder correr la apliación en un contendor de Docker, ejecutá el siguiente comando:

    ```docker-compose up -d```

¡Y listo! Ahora, sin ser obligatorio, pero a modo de recomendación para que la ejecución de la aplicación sea mas amena, te aconsejamos ir hacia el archivo ```.env``` que está ubicado en la raíz del proyecto y modificar la variable ```RUN_SEEDER``` a ```false``` , por defecto, se encuentra en ```true``` . 

Esto permitirá que, al ejecutar la aplicación por primera vez, se pueble la base de datos ( ```RUN_SEEDER=true``` ), pero una vez que nos pongamos a hacer pruebas, lo desactivemos ( ```RUN_SEEDER=false``` ) para que cuando la herramienta Nodemon reinicie el servidor de nuestra aplicación, no se vuelva a poblar la base de datos, cambiando así, los ID de los elementos del modelo.

## Fundamentación de las relaciones



## Rutas de la API

Acá tenés una lista de las rutas del proyecto listas para probar en tu herramienta de API:

### Productos

### Resumen

### Fabricantes

### Resumen

### Componentes

### Resumen

## Estructura del Proyecto

Explicación breve de la estructura del proyecto y la función de cada directorio:

```

```