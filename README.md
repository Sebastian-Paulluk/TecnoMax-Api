# Estrategias de Persistencia - TP 2024 - Documental

## Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-Proyecto)
- [Diagrama Entidad-Relacion](#diagrama-entidad-relación)
- [Descripción del modelo DER](#descripción-del-modelo-DER)
- [Uso y ejecución de la aplicación](#uso-y-ejecución-de-la-aplicación)
- [Fundamentación de las relaciones](#fundamentación-de-las-relaciones)
- [Rutas de la API](#rutas-de-la-api)

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

    ```docker build -t tecnomax-image:1.0.0 .```

3. Ahora, para poder correr la apliación en un contendor de Docker, ejecutá el siguiente comando:

    ```docker-compose up -d```

¡Y listo! Ahora, sin ser obligatorio, pero a modo de recomendación para que la ejecución de la aplicación sea mas amena, te aconsejamos ir hacia el archivo ```.env``` que está ubicado en la raíz del proyecto y modificar la variable ```RUN_SEEDER``` a ```false``` , por defecto, se encuentra en ```true``` . 

Esto permitirá que, al ejecutar la aplicación por primera vez, se pueble la base de datos ( ```RUN_SEEDER=true``` ), pero una vez que nos pongamos a hacer pruebas, lo desactivemos ( ```RUN_SEEDER=false``` ) para que cuando la herramienta Nodemon reinicie el servidor de nuestra aplicación, no se vuelva a poblar la base de datos, cambiando así, los ID de los elementos del modelo.

## Fundamentación de las relaciones

Según el concepto de ciclo de vida de un comprobante, podemos separar y 
argumentar las relaciones de este proyecto de la siguiente forma:

### Relación embebida/incrustada | Productos con Componentes

Los componentes de un producto serán siempre los mismos, entonces, tiene 
sentido que estén incrustados/embebidos en los productos como un 
array de los mismos. No hay necesidad de que exista un componente sin un 
producto, por su relación intrínseca dada por el ciclo de vida que comparten.

### Relación referenciada | Fabricantes con Productos

Los Fabricantes y los Productos son ciclos de vida independientes entre si, por lo tanto, 
ambos pueden ser relacionados mediante referencia, ya que cada uno de ellos puede existir 
independientemente del otro. Si yo elimino un Fabricante, no habría interferencias con los 
Productos y viceversa. 

## Rutas de la API

Acá tenés una lista de las rutas del proyecto listas para probar en tu herramienta de API:

### Productos y Componentes

* Obtener todos los productos

    - Método: GET
    - URL: ```http://localhost:3001/productos```
    - Descripción: Obtiene una lista de todos los productos.

* Obtener un producto por ID

    - Método: GET
    - URL: ```http://localhost:3001/productos/:id```
    - Descripción: Obtiene un producto específico por su ID.
    - Validación: ID del producto.

* Agregar un nuevo producto

    - Método: POST
    - URL: ```http://localhost:3001/productos```
    - Descripción: Agrega un nuevo producto.
    - Validación: Esquema de creación del producto.

* Modificar un producto por ID

    - Método: PUT
    - URL: ```http://localhost:3001/productos/:id```
    - Descripción: Modifica un producto específico por su ID.
    - Validación: ID del producto.

* Eliminar un producto por ID

    - Método: DELETE
    - URL: ```http://localhost:3001/productos/:id```
    - Descripción: Elimina un producto específico por su ID.
    - Validación: ID del producto.

* Agregar un fabricante a un producto

    - Método: POST
    - URL: ```http://localhost:3001/productos/:id/fabricantes```
    - Descripción: Asocia un fabricante a un producto.
    - Validación: ID del producto.

* Obtener fabricantes de un producto

    - Método: GET
    - URL: ```http://localhost:3001/productos/:id/fabricantes```
    - Descripción: Obtiene una lista de fabricantes asociados a un producto.
    - Validación: ID del producto.

* Eliminar asociaciones de fabricantes de un producto

    - Método: DELETE
    - URL: ```http://localhost:3001/productos/:id/fabricantes```
    - Descripción: Elimina todas las asociaciones de fabricantes de un producto.
    - Validación: ID del producto.

* Desasociar un fabricante específico de un producto

    - Método: DELETE
    - URL: ```http://localhost:3001/productos/:idProducto/fabricantes/:idFabricante```
    - Descripción: Desasocia un fabricante específico de un producto.
    - Validación: ID del producto y ID del fabricante.

* Obtener todos los componentes de un producto

    - Método: GET
    - URL: ```http://localhost:3001/productos/:id/componentes```
    - Descripción: Obtiene una lista de todos los componentes de un producto.
    - Validación: ID del producto.

* Obtener un componente específico de un producto

    - Método: GET
    - URL: ```http://localhost:3001/productos/:idProducto/componentes/:idComponente```
    - Descripción: Obtiene un componente específico de un producto.
    - Validación: ID del producto y ID del componente.

* Agregar un componente a un producto

    - Método: POST
    - URL: ```http://localhost:3001/productos/:id/componentes```
    - Descripción: Agrega un componente a un producto.
    - Validación: ID del producto y esquema de creación del componente.

* Modificar un componente específico de un producto

    - Método: PUT
    - URL: ```http://localhost:3001/productos/:idProducto/componentes/:idComponente```
    - Descripción: Modifica un componente específico de un producto.
    - Validación: ID del producto, ID del componente y esquema de actualización del componente.

* Eliminar un componente específico de un producto

    - Método: DELETE
    - URL: ```http://localhost:3001/productos/:idProducto/componentes/:idComponente```
    - Descripción: Elimina un componente específico de un producto.
    - Validación: ID del producto y ID del componente.

* Obtener todos los productos de un componente

    - Método: GET
    - URL: ```http://localhost:3001/productos/componentes/:idComponente/productos```
    - Descripción: Obtiene una lista de todos los productos que contienen un componente específico.
    - Validación: ID del componente.

### Resumen

1. Obtener todos los productos: GET ```http://localhost:3001/productos```
2. Obtener un producto por ID: GET ```http://localhost:3001/productos/:id```
3. Agregar un nuevo producto: POST ```http://localhost:3001/productos```
4. Modificar un producto por ID: PUT ```http://localhost:3001/productos/:id```
5. Eliminar un producto por ID: DELETE ```http://localhost:3001/productos/:id```
6. Agregar un fabricante a un producto: POST ```http://localhost:3001/productos/:id/fabricantes```
7. Obtener fabricantes de un producto: GET ```http://localhost:3001/productos/:id/fabricantes```
8. Eliminar asociaciones de fabricantes de un producto: DELETE ```http://localhost:3001/productos/:id/fabricantes```
9. Desasociar un fabricante específico de un producto: DELETE ```http://localhost:3001/productos/:idProducto/fabricantes/:idFabricante```
10. Obtener todos los componentes de un producto: GET ```http://localhost:3001/productos/:id/componentes```
11. Obtener un componente específico de un producto: GET ```http://localhost:3001/productos/:idProducto/componentes/:idComponente```
12. Agregar un componente a un producto: POST ```http://localhost:3001/productos/:id/componentes```
13. Modificar un componente específico de un producto: PUT ```http://localhost:3001/productos/:idProducto/componentes/:idComponente```
14. Eliminar un componente específico de un producto: DELETE ```http://localhost:3001/productos/:idProducto/componentes/:idComponente```
15. Obtener todos los productos de un componente: GET ```http://localhost:3001/productos/componentes/:idComponente/productos```

### Fabricantes

- Obtener todos los fabricantes

    - Método: GET
    - URL: ```http://localhost:3001/fabricantes```
    - Descripción: Obtiene una lista de todos los fabricantes.

- Obtener un fabricante por ID

    - Método: GET
    - URL: ```http://localhost:3001/fabricantes/:id```
    - Descripción: Obtiene un fabricante específico por su ID.
    - Validación: ID del fabricante.

- Agregar un nuevo fabricante

    - Método: POST
    - URL: ```http://localhost:3001/fabricantes```
    - Descripción: Agrega un nuevo fabricante.
    - Validación: Esquema de creación del fabricante.

- Modificar un fabricante por ID

    - Método: PUT
    - URL: ```http://localhost:3001/fabricantes/:id```
    - Descripción: Modifica un fabricante específico por su ID.
    - Validación: ID del fabricante y esquema de actualización del fabricante.

- Eliminar un fabricante por ID

    - Método: DELETE
    - URL: ```http://localhost:3001/fabricantes/:id```
    - Descripción: Elimina un fabricante específico por su ID.
    - Validación: ID del fabricante.

- Obtener productos de un fabricante

    - Método: GET
    - URL: ```http://localhost:3001/fabricantes/:id/productos```
    - Descripción: Obtiene una lista de productos asociados a un fabricante.
    - Validación: ID del fabricante.

- Asociar productos a un fabricante

    - Método: POST
    - URL: ```http://localhost:3001/fabricantes/:id/productos```
    - Descripción: Asocia productos a un fabricante.
    - Validación: ID del fabricante.

- Eliminar todas las asociaciones de productos de un fabricante

    - Método: DELETE
    - URL: ```http://localhost:3001/fabricantes/:id/productos```
    - Descripción: Elimina todas las asociaciones de productos de un fabricante.
    - Validación: ID del fabricante.

- Desasociar un producto específico de un fabricante

    - Método: DELETE
    - URL: ```http://localhost:3001/fabricantes/:idFabricante/productos/:idProducto```
    - Descripción: Desasocia un producto específico de un fabricante.
    - Validación: ID del fabricante y ID del producto.

### Resumen

1. Obtener todos los fabricantes: GET ```http://localhost:3001/fabricantes```
2. Obtener un fabricante por ID: GET ```http://localhost:3001/fabricantes/:id```
3. Agregar un nuevo fabricante: POST ```http://localhost:3001/fabricantes```
4. Modificar un fabricante por ID: PUT ```http://localhost:3001/fabricantes/:id```
5. Eliminar un fabricante por ID: DELETE ```http://localhost:3001/fabricantes/:id```
6. Obtener productos de un fabricante: GET ```http://localhost:3001/fabricantes/:id/productos```
7. Asociar productos a un fabricante: POST ```http://localhost:3001/fabricantes/:id/productos```
8. Eliminar todas las asociaciones de productos de un fabricante: DELETE ```http://localhost:3001/fabricantes/:id/productos```
9. Desasociar un producto específico de un fabricante: DELETE ```http://localhost:3001/fabricantes/:idFabricante/productos/:idProducto```

- Modificaciones pendientes del tp:
    - Los metodos PUT deben usar ```replaceOne()``` en lugar de ```findByIdAndUpdate()```
    - Respetar correctamente el ciclo de vida del proyecto basandonos en el 10
    - Agregar ```mongo_data``` a ```.dockerignore```
    - Revisar el ```readme``` luego de los cambios y agregar la estructura del proyecto