import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import productsRoutes from './src/routes/products.routes.js';
import authRoutes from './src/routes/auth.routes.js';

console.log("Programa iniciado con exito");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

app.use(morgan('dev'));

// Ruta de bienvenida y formulario de login unificado en la raíz
app.get('/', (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API TechLab</title>
      <link rel="icon" type="image/webp" href="/favicon.ico">
      <style>
        body { 
          font-family: sans-serif; 
          background-color: #f4f4f9; 
          margin: 0; 
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
        }
        .container {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 350px;
          text-align: center;
        }
        h1 { color: #333; font-size: 24px; margin-bottom: 0.5rem; }
        .info-p { color: #666; font-size: 14px; margin-bottom: 1.5rem; }
        code { background: #eee; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
        hr { border: 0; border-top: 1px solid #eee; margin: 1.5rem 0; }
        .input-group { text-align: left; margin-bottom: 1rem; }
        label { display: block; margin-bottom: 0.4rem; color: #555; font-size: 14px; font-weight: bold; }
        input { width: 100%; padding: 8px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; }
        button { width: 100%; padding: 10px; background-color: #0070f3; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; font-weight: bold; margin-top: 0.5rem; }
        button:hover { background-color: #0051cb; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>API de TechLab funcionando</h1>
        <p class="info-p">Usa <code>/api/products</code> para ver el catálogo.</p>
        
        <hr>
        
        <h3>Probar Login desde el Navegador</h3>
        <form action="/auth/login" method="POST">
          <div class="input-group">
            <label for="email">Correo Electrónico (admin@techlab.com)</label>
            <input type="email" id="email" name="email" required placeholder="admin@techlab.com" autocomplete="username">
          </div>
          <div class="input-group">
            <label for="password">Contraseña(123456)</label>
            <input type="password" id="password" name="password" required placeholder="******" autocomplete="current-password">
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

// Registramos las rutas
app.use('/auth', authRoutes);
app.use(productsRoutes);

// Manejador de rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).send("Ruta no encontrada");
});

// Manejador de errores global (500)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal en el servidor');
});

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(` Servidor de TechLab NodeJS corriendo con éxito`);
    console.log(` URL local: http://localhost:${PORT}`);
    console.log(` Alumno: Elio Enrique Cavalieri (Comisión 26132)`);
    console.log(`==================================================`);
});
