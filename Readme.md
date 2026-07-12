# 🚀 Proyecto Final: API TechLab - Gestión de Productos

---

**Alumno:** Elio Enrique Cavalieri  
**Comisión:** 26132 - Talento Tech 2026 NODE.JS

---

Este proyecto representa la culminación del curso **Node.js de Talento Tech (Comisión 26132)**. Se trata de una API REST profesional diseñada para la administración de un catálogo de productos, integrando persistencia en la nube con Firebase y seguridad avanzada mediante JSON Web Tokens (JWT).

## 🛠️ Tecnologías utilizadas

* **Node.js & Express**: Entorno de ejecución y framework web.  
* **Firebase Firestore**: Base de datos NoSQL en la nube.  
* **JSON Web Tokens (JWT)**: Seguridad y autenticación de rutas.  
* **Dotenv**: Manejo de variables de entorno.  
* **Morgan & CORS**: Middleware para logs y permisos de acceso.  
* **REST-Client**: ver peticiones directamente en VsCode.  

## 📂 Estructura del Proyecto

La arquitectura se basa en una separación de responsabilidades por capas, facilitando el mantenimiento y la escalabilidad del sistema.  

```Plaintext
📁 Proyecto-Final/  
├── 📁 node_modules/  
├── 📁 src/  
│   ├── 📁 config/           # Configuración de servicios externos (Firebase)  
│   ├── 📁 controllers/      # Orquestación de peticiones y respuestas   
│   ├── 📁 middlewares/      # Interceptores de seguridad y errores  
│   ├── 📁 models/           # Definición de estructuras y validaciones  
│   ├── 📁 routes/           # Definición de endpoints y métodos HTTP  
│   └── 📁 services/         # Lógica de negocio y acceso a datos  
├── .env                     # Variables de entorno (Privado)  
├── .env.example             # Plantilla para configuración local  
├── .gitignore               # Exclusión de archivos sensibles  
├── index.js                 # Punto de entrada y arranque del servidor  
├── package.json             # Gestión de dependencias y scripts  
├── seed.js                  # Script de carga inicial de datos  
└── package-lock.json  
```

## 💻 Paso 2: Responsabilidad de los Componentes

A continuación, se detalla la función principal de cada archivo clave dentro del ecosistema de la API:

### 📂 Raíz del Proyecto

* **`index.js`**: Punto de entrada principal. Configura Express, middlewares globales (CORS, Morgan, JSON), sirve archivos estáticos y levanta el servidor.  
* **`seed.js`**: Script de utilidad para poblar la base de datos de Firestore con un catálogo inicial de productos para pruebas.  
* **`test_api.http`**: Archivo de pruebas integral para la extensión *REST Client*, permitiendo testear todos los endpoints (públicos y privados) sin salir del editor.  

### 📂 Carpeta `src/`  

* **`src/config/firebase.config.js`**: Inicializa la conexión con el SDK de Firebase utilizando las variables de entorno y exporta la instancia de la base de datos Firestore.  
* **`src/controllers/products.controllers.js`**: Procesa las solicitudes de productos, valida los datos de entrada y construye las respuestas HTTP con los códigos de estado adecuados (200, 201, 404, etc.).  
* **`src/services/products.services.js`**: Contiene la lógica de comunicación directa con Firestore (Add, Get, Update, Delete) y el procesamiento de filtros complejos.  
* **`src/models/products.model.js`**: Define la estructura esperada de los productos y contiene las funciones de validación para asegurar la integridad de los datos antes de ser guardados.  
* **`src/routes/products.routes.js`**: Mapea las URLs de la API de productos y asigna el middleware de seguridad a las rutas de escritura.  
* **`src/routes/auth.routes.js`**: Gestiona el endpoint de `/login`, validando credenciales administrativas y generando el token JWT.  
* **`src/middlewares/auth.middleware.js`**: Verifica la presencia y validez del Bearer Token en las cabeceras de las peticiones protegidas.  

## ⚙️ Paso 3: Instalación y Puesta en Marcha

1-  **Instalar dependencias**: `npm install`

2-  **Configurar entorno**: Crear un archivo `.env` basado en `.env.example` con las credenciales de tu proyecto de Firebase.

3-  **Cargar datos**: Ejecutar `node seed.js` para tener productos disponibles. (Ya cargados en la base de datos.)

4-  **Iniciar**: Ejecutar `npm start`

5-  **Entorno de desarrollo**: Si desea ver cambios en tiempo real, puede ejecutar `npm run dev` (requiere nodemon).

## Paso 4 - Opcionales para instalar

### Pruebas de Endpoints con REST Client (visual Studio Code/antigravity)

Para testear nuestras rutas de forma rápida y sin salir de VS Code, incorporamos el archivo `test_api.http`. Este archivo reemplaza el uso de herramientas externas como Postman, permitiendo ejecutar peticiones HTTP directamente desde el editor de código.

### 🛠️ Pasos para instalar y usar REST Client (visual Studio Code/antigravity)

Esta herramienta funciona mediante una extensión propia de VS Code. Seguí estos pasos para configurarla:

1. Ir a la pestaña de **Extensiones** en VS Code (`Ctrl + Shift + X` o `Cmd + Shift + X` en Mac).
2. Buscar la extensión **"REST Client"** del autor **Huachao Mao** e instalarla.
3. Asegurarte de que el servidor esté corriendo en tu terminal (`npm run dev`).
4. Abrir el archivo `test_api.http` que se encuentra en la raíz de nuestro proyecto.
5. Verás que mágicamente aparece un botón que dice `Send Request` justo arriba de cada método (`GET`, `POST`, `PUT`, `DELETE`).
6. Hacé clic en `Send Request` sobre cualquier endpoint y se abrirá una pestaña al lado con la respuesta detallada en formato JSON que devuelve nuestra API y Firebase.

### 💡 Tip de uso para las Variables en `test_api.http`

En la parte superior del archivo `test_api.http` definimos variables como `@productoId`. Cuando crees un producto nuevo, copiá el ID hash autogenerado que te devuelve Firebase, pegalo ahí arriba y vas a poder probar las rutas de obtener por ID, actualizar y eliminar de forma automática sin tener que andar reescribiendo la URL en cada petición.

Para no depender de Postman y probar todo directo desde VS Code con la extensión REST Client, cree un archivo llamado test_api.http en la raíz del proyecto, para realizar las pruebas

## 📊 Monitoreo de Peticiones con Morgan

Para este proyecto incorporamos **Morgan**, que es un middleware de registro (*logger*) para Node.js. Su función principal es espiar las peticiones HTTP que llegan a nuestro servidor y mostrarlas detalladamente en la consola en tiempo real (mostrando el método, la ruta, el código de estado y el tiempo de respuesta).

### 🛠️ Pasos para instalar y usar Morgan en desarrollo

Si te bajaste el proyecto y querés que funcione en tu máquina, seguí estos pasos:

1. Instalar la dependencia en la carpeta raíz del proyecto ejecutando: `npm install morgan`
2. Asegurarte de que esté importada en el archivo `index.js` mediante: `import morgan from 'morgan';`
3. Inicializar el middleware debajo de los archivos estáticos usando: `app.use(morgan('dev'));`
4. Levantar el servidor de desarrollo ejecutando en la terminal: `npm run dev`

**Una vez activo, cada vez que envíes una petición desde el archivo `test_api.http` usando la extensión **REST Client**, verás impreso en la consola el registro detallado del tráfico sin necesidad de llenar nuestros controladores con `console.log()` manuales.**

## Reinicio Automático del Servidor con Nodemon

Para mejorar nuestra velocidad de desarrollo incorporamos **Nodemon**. Es una herramienta que monitorea los archivos de nuestro proyecto. Cada vez que detecta que guardamos un cambio en el código, reinicia el servidor de Express automáticamente en la terminal.

### 🛠️ Pasos para instalar y configurar Nodemon

Nodemon es una herramienta de desarrollo, lo que significa que solo la necesitamos mientras estamos programando (no cuando la app ya está subida a internet). Seguí estos pasos para configurarla:

1. Instalar la librería como dependencia de desarrollo ejecutando en la terminal: `npm install --save-dev nodemon`
2. Abrir el archivo `package.json` de la raíz y buscar la sección de `"scripts"`.
3. Agregar el comando de desarrollo para que quede estructurado de la siguiente manera:

  ```json
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
  ```

## 🧪 Paso 5: Pruebas de la API

La API puede ser testeada de dos formas profesionales: utilizando la extensión integrada en VS Code o mediante la herramienta **Postman**.

### Opción A: VS Code REST Client (Recomendado)

Dentro de la carpeta raíz se encuentra el archivo `test_api.http`.  
**Requisito**: Tener instalada la extensión **REST Client** de Huachao Mao.  
1-  Inicie el servidor.  
2-  Ejecute el **Login** (Paso 1) para recibir el token.  
3-  Copie el token en la variable `@token` al inicio del archivo.  
4-  Pruebe el resto de los endpoints con un solo clic.  

### Opción B: POSTMAN

Si prefiere utilizar Postman, a continuación se detallan las configuraciones para cada recurso:  

#### 1. Verificación de Salud (GET)

* **URL**: `http://localhost:3000/`
* **Respuesta**: 200 OK. Retorna la página de bienvenida con el logo.  

#### 2. Autenticación / Login (POST)

* **URL**: `http://localhost:3000/auth/login`  
* **Body (JSON)**: Enviar `email` y `password` definidos en el `.env`.  
* **Resultado**: Recibirá un JSON con la propiedad `token`. **Debe copiar este valor** para las rutas protegidas.  

#### 3. Catálogo de Productos (GET)

* **URL**: `http://localhost:3000/api/products`  
* **Filtrado**: Puede usar Query Params como `?category=hardware&price=100000`.  
* **Resultado**: Lista de productos ordenada alfabéticamente.  

#### 4. Obtener por ID (GET)

* **URL**: `http://localhost:3000/api/products/:id` (Reemplazar `:id` por un ID real de Firebase).  

#### 5. Crear Producto (POST)

* **URL**: `http://localhost:3000/api/products/create`  
* **Auth**: En la pestaña **Auth**, seleccionar **Bearer Token** y pegar el token obtenido en el login.  
* **Body (JSON)**: Enviar objeto con `name`, `description`, `price`, `category` y `stock`.  

#### 6. Eliminar Producto (DELETE)

* **URL**: `http://localhost:3000/api/products/:id`
* **Auth**: Requiere **Bearer Token**.

---

## 🚀 El Ecosistema de Postman: Notas de Uso

Para una evaluación exitosa, se recomienda tener en cuenta:  

1-  **Postman Desktop App**: Es la opción más robusta para realizar peticiones directamente a `localhost` sin restricciones de seguridad del navegador.  
2-  **Manejo de Errores**: La API responderá con estados HTTP estandarizados:  

* `400 Bad Request`: Si las validaciones del modelo fallan (ej: precio negativo).
* `401/403 Unauthorized`: Si falta el token o es inválido.  
* `404 Not Found`: Para rutas o productos inexistentes.  
* `500 Internal Server Error`: Para fallos críticos de conexión o base de datos.  

> "Este proyecto sigue las mejores prácticas de Clean Code y Arquitectura por Capas para garantizar un código mantenible y escalable."
