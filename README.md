# Nodepop

Nodepop, es un proyecto que tiene como objetivo la creación de una API REST para dar soporte desde la parte de servidor a aplicaciones cliente. La temática de la aplicación, es la de tener un portal de compra/venta de artículos donde los usuarios, una vez registrados, podrán anunciar los artículos que les interesa vender o comprar.

A continuación, se describe en detalle cada una de las partes desarrolladas en el proyecto.

##API
###Versión 1
####Anuncios **_/api/v1/anuncios_**

    <ul>
     <li>**GET _/_**</li>
     <ul>
        <li> Descripción: Proporciona un listado completo de anuncios.</li>

        <li> Parámetros</li>
            | Nombre | Situado en | Descripción | Requerido | Tipo |
            |--------|------------|-------------|-----------|------|
            |a|s|d|f|g|

        <li> Respuestas</li>

            | Código | Descripción | Respuesta |
            |--------|-------------|-----------|
            |a|s|d|

        <li> URL ejemplo:</li>

     <li>**GET _/images/_**</li>
        * Descripción
        * Parámetros
        * Respuestas

     <li>**GET _/filtrados_**</li>
        * Descripción
        * Parámetros
        * Respuestas

     <li>**GET _/tags_**</li>
        * Descripción
        * Parámetros
        * Respuestas
        </ul>

####Pushtokens [Upstage](/api/v1/pushTokens)

    + GET [Upstage](/)
        * Descripción
        * Parámetros
        * Respuestas

####Usuarios [Upstage](/api/v1/usuarios)

    + GET [Upstage](/authenticate)
        * Descripción
        * Parámetros
        * Respuestas


    + GET [Upstage](/register)
        * Descripción
        * Parámetros
        * Respuestas

##Modelo de datos

###Anuncio
####Descripción
Modelo que describe el artículo que se pone en venta o se quiere comprar.

####Esquema (Parámetros)
    + nombre: String
    + venta: Boolean
    + precio: Number
    + foto: String
    + tags: [String]
####Métodos
    + listPromise: función proporciona un listado completo de anuncios.
    + deleteAll: función que elimina todos los registros en la base de datos.
    + listarTags: función que proporciona todos los tags posibles, acutalmente se proporcionan de forma harcodeada pero se puede plantear crear un fichero o una tabla en la base de datos con todos los posibles tags.
    + filtrarAnuncios: función que proporciona un listado de anuncios aplicando distitnos filtros.
    + addBooleanCondition: función para añadir una condición de tipo booleana (comprobando que sea true o false) a una query.
    + addCondition: función para añadir una condición de tipo where a una query.
    + addPriceRanceCondition: función que añade la condición para el rango de precios a la query.
    + addNameCondition: función que añade la condición para el nombre a la query.

###Token (Push Token)
####Descripción
Modelo que almacenará el token para recibir notificaciones push de los sistemas de Google (GCM) o Apple (APNS) del cliente y que proporcionará a la API  al iniciar la app.

####Esquema (Parámetros)
    + plataforma: {type: String, enum: ['ios', 'android']}
    + token: String
    + usuario: String

####Métodos
    +listTokens: función proporciona un listado completo de los token push.
    +deleteAll: función que elimina todos los registros en la base de datos.

###Usuario
####Descripción
Modelo para almacenar todos los usuarios registrados en la API (se ha creado un usuario invitado iniciale para realizar pruebas)

####Esquema (Parámetros)
    + nombre: {type: String, required:true},
    + email: {type: String, required:true},
    + clave: {type: String, required:true}

####Métodos
    +deleteAll: función que elimina todos los registros en la base de datos.

##Registro

##Autenticación

##Middlewares y módulos adicionales

##Recursos adicionales

##Comentarios