# Nodepop

Nodepop, es un proyecto que tiene como objetivo la creación de una API REST para dar soporte desde la parte de servidor a aplicaciones cliente. La temática de la aplicación, es la de tener un portal de compra/venta de artículos donde los usuarios, una vez registrados, podrán anunciar los artículos que les interesa vender o comprar.

A continuación, se describe en detalle cada una de las partes desarrolladas en el proyecto.

##API
###Versión 1
####Anuncios **_/api/v1/anuncios_**

#####GET /
######Descripción
Proporciona un listado completo de anuncios.

######Parámetros
             Nombre | Situado en | Descripción | Requerido | Tipo
            --------|------------|-------------|-----------|------
            token|query|Token de autenticación|Sí| Token string

######Respuestas

             Código | Descripción | Respuesta
            --------|-------------|-----------
            200|Array de Anuncios| {success:true, rows:{}}
            401|Token incorrecto|{success: false,error: { code: 403, message: "Error al autenticar el token"}}
            403|Falta Token|{success: false,error: { code: 403, message: "No se proporcionado el token"}}
            Por defecto|Error| {success:false, rows:error}
            
######URL ejemplo: _/api/v1/anuncios/_

#####GET /images/
######Descripción
Proporciona un fichero de imagen de alguno de los anuncios.

######Parámetros

          Nombre | Situado en | Descripción | Requerido | Tipo
         --------|------------|-------------|-----------|------
         image|query|nombre (con extensión) de la imagen que se quiere obtener|Sí|String
         token|query|Token de autenticación|Sí| Token string

######Respuestas

          Código | Descripción | Respuesta
         --------|-------------|-----------
         200|Fichero de imagen|Fichero sendFile()
         401|Token incorrecto|{success: false,error: { code: 403, message: "Error al autenticar el token"}}
         403|Falta Token|{success: false,error: { code: 403, message: "No se proporcionado el token"}}
         default|Error|status de error

######URL ejemplo: _/api/v1/anuncios/images/bici.jpg_

#####GET /filtrados
######Descripción
Proporciona un listado de anuncios atendiendo una serie de condiciones establecidas por el usuario.

######Parámetros

          Nombre | Situado en | Descripción | Requerido | Tipo
         --------|------------|-------------|-----------|------
        tag1|query|Etiqueta|No|String
        tag2|query|Etiqueta|No|String
        tag3|query|Etiqueta|No|String
        tag4|query|Etiqueta|No|String
        venta|query|Valor para saber si esta en compra o venta|No|Boolean
        precio|query|Rango de precios (-5: menor que 5, 5-:mayor que 5, 5-10:entre 5 y 10, 5:igual a 5 )|No|String
        nombre|query|Nombre del anuncio|No|String
        start|query|Número de anuncios a saltarse|NO|Number
        limit|query|Máximo de anuncios a mostrar|NO|Number
        sort|query|Ordenación del listado por parámetro|NO|String
        includeTotal|query|REcuento de resultados obtenidos|NO|Boolean
        token|query|Token de autenticación|Sí|Token string

######Respuestas

          Código | Descripción | Respuesta
         --------|-------------|-----------
         200|Array de Anuncios| {success:true, rows:{}}
         401|Token incorrecto|{success: false,error: { code: 403, message: "Error al autenticar el token"}}
         403|Falta Token|{success: false,error: { code: 403, message: "No se proporcionado el token"}}
         Por defecto|Error| {success:false, rows:error}

######URL ejemplo: _/api/v1/anuncios/filtrados?tag1=lifestyle&tag2=&tag3=&tag4=&venta=true&precio=&nombre=&start=&limit=&sort=precio&includeTotal=true&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3MmUyNWY3YWFhMjdjOWUyNGU2ZWQxZiIsImlhdCI6MTQ2MjcwMDY2NSwiZXhwIjoxNDYyODczNDY1fQ.wLBilGAGet3NU6ptSdgC0xNPCSgNdUEBRmD3yjINQuM_

#####GET /tags
######Descripción

######+Parámetros
          Nombre | Situado en | Descripción | Requerido | Tipo
         --------|------------|-------------|-----------|------
         token|query|Token de autenticación|Sí|Token string

######Respuestas

          Código | Descripción | Respuesta
         --------|-------------|-----------
         200|Array de Tags| {success:true, rows:{}}
         401|Token incorrecto|{success: false,error: { code: 403, message: "Error al autenticar el token"}}
         403|Falta Token|{success: false,error: { code: 403, message: "No se proporcionado el token"}}
         Por defecto|Error| {success:false, rows:error}

######URL ejemplo: _/api/v1/anuncios/tags/_

####Pushtokens _/api/v1/pushTokens_

#####GET /
######Descripción
Proporciona un listado completo de los push tokens.

######Parámetros
             Nombre | Situado en | Descripción | Requerido | Tipo
            --------|------------|-------------|-----------|------
            token|query|Token de autenticación|Sí| Token string

######Respuestas

             Código | Descripción | Respuesta
            --------|-------------|-----------
            200|Array de Tokens| {success:true, rows:{}}
            401|Token incorrecto|{success: false,error: { code: 403, message: "Error al autenticar el token"}}
            403|Falta Token|{success: false,error: { code: 403, message: "No se proporcionado el token"}}
            Por defecto|Error| {success:false, rows:error}

######URL ejemplo: _/api/v1/pushTokens/_

####Usuarios _/api/v1/usuarios_

#####POST /authenticate
######Descripción

######Parámetros
             Nombre | Situado en | Descripción | Requerido | Tipo
            --------|------------|-------------|-----------|------
            user|body|Nombre de usuario|Sí| String
            mail|body|Email|Sí| String
            pass|body|Contraseña|Sí| String

######Respuestas

             Código | Descripción | Respuesta
            --------|-------------|-----------
            200|Token| {success:true, token:{}}
            401|Error por fallo en la autenticación|{success:false, error:"Usuario no encontrado"} o {success:false, error:"Email no encontrado"} o {success:false, error:"Contraseña incorrecta"}
            Por defecto|Error| {success:false, error:error}

######URL ejemplo: _/api/v1/usuarios/authenticate_

#####POST /register
######Descripción

######Parámetros
             Nombre | Situado en | Descripción | Requerido | Tipo
            --------|------------|-------------|-----------|------
            user|body|Nombre de usuario|Sí| String
            email|body|Email|Sí| String
            pass|body|Contraseña|Sí| String

######Respuestas

             Código | Descripción | Respuesta
            --------|-------------|-----------
            200|Array de Tokens| {success:true, rows:{}}
            406|Usuario ya existente|{success: false, error: "Ya hay un usuario registrado con este nombre"} o {success: false, error: "Ya hay un usuario registrado con este email"}
            Por defecto|Error| {success:false, rows:error}

######URL ejemplo: _/api/v1/usuarios/register_


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
Con el proceso de registro, que se hace mediante el método post descrito en el apartado de la API de usuarios, se da de alta al usuario en la base de datos de la aplicación. Una vez dado de alta, el usuario se podrá autenticar y por tanto acceder a los contenidos que sólo pueden ver los usuarios autenticados.

##Autenticación
La autenticación se realiza mediante JSON Web Token, por el cuál se busca si el usuario está registrado en la base d datos de la aplicación y mediante un hash se hace la comprobación de que sus credenciales son correctas y puede acceder a los contenidos que no estén abiertos. Por ejemplo el modelo de datos de anuncios, sólo lo pueden ver los usuarios autenticados, por tanto para acceder a esa parte de la API hay que proveer al servidor el token que se obtiene una vez realizada la auteticación.


##Middlewares y módulos adicionales

###ErrorMessages (Internacionalización)
####Descripción
Módulo para automatizar la carga de mensajes, en este caso de error pero se pordría extender a otros tipos de mensajes, en base al idioma que se le indique.
Para ello, se le indica por un parámetro el idioma deseado y este módulo se encargará de cargar el fichero JSON correspodiente con los correspondientes mensages de error.

>**Comentario del desarrollador:** La carga del JSON se ha hecho de forma síncrona porque está controlada, por facilidad al ser un archivo de errores y se quería probar carga síncrona de un fichero

###pushtokenMid
####Descripción
Middleware que se ejecutar al iniciar contacto con el servidor y que a partir de los parámetros proporcionados por la aplicación cliente.

####Método GET
Se ha utilizado el método get inicial de la applicacions (app.js) y como no aún no está definido como se va a pasar el push token se obitne por parámetros.

>**Comentario del desarrollador:** La obtención de parámetros es mejor no realizarla de esta forma, pero como no lo tenía claro lo he dejado de esta manera pero supongo que será con un post.

######Parámetros
             Nombre | Situado en | Descripción | Requerido | Tipo
            --------|------------|-------------|-----------|------
            plataforma|query|Plataforma de la app cliente|No|String
            token|query|Token de autenticación|No| Token string
            usuario|query|id de usuario|No|String

######Respuestas

             Código | Descripción | Respuesta
            --------|-------------|-----------
            200|Array de Tokens| {success:true, rows:{}}
            Por defecto|Error| {success:false, rows:error}
_

##Recursos adicionales

###Instalación de la base de datos
Para la instalación inicial de la base de datos se ha generado un script (install_db.js), que en primer lugar elimina toda las tablas, sí las hubiera, para posteriormente a partir de un JSON rellenar con contenidos la tabla de anuncios (anuncios.json) y se crear también un usuario por defecto que es el usuario: invitado.

###JSON de errores
    + errores_en.json: errores en inglés, tambiéns serán los que esten por defecto.
    + errores_es.json: errores en español.

##Comentarios

>**Comentario del desarrollador:**Se ha intentado utilizar la mayoría de los conceptos estudiados (let, var,callbacks, promesas, módulos, etc.), por ello a veces se haya utilizado una solución y a veces otras. Me hubiera gustado haber completado un poco más el proyecto pero por cuestiones de tiempo (trabajo, temas personales y familiares...) me ha sido imposible.
