import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

// Login básico (MOCK) para generar el token
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Verificación de seguridad: si no hay variables de entorno, no permitimos el login
   if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
    console.error("❌ ERROR CRÍTICO: Variables de entorno (ADMIN_EMAIL, ADMIN_PASSWORD o JWT_SECRET) no configuradas en .env");
    return res.status(500).json({ 
      message: "Error de configuración en el servidor. Contacte al administrador." 
    });
  } 



  // Comparamos lo que envía el usuario con las variables guardadas en el .env
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ message: "Credenciales inválidas" });
});

export default router;