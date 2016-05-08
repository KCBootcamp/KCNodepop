# Nodepop

Nodepop, es un proyecto que tiene como objetivo la creación de una API REST para dar soporte desde la parte de servidor a aplicaciones cliente. La temática de la aplicación, es la de tener un portal de compra/venta de artículos donde los usuarios, una vez registrados, podrán anunciar los artículos que les interesa vender o comprar.

A continuación, se describe en detalle cada una de las partes desarrolladas en el proyecto.

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

####Esquema (Parámetros)
####Métodos

###Usuario
####Descripción

####Esquema (Parámetros)
####Métodos

##API
###Versión 1
####Anuncios
####Pushtokens
####Usuarios

##Registro

##Autenticación

##Middlewares y módulos adicionales

##Recursos adicionales

##Comentarios