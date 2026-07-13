import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // El token suele venir como "Bearer <TOKEN>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    // Verificamos el token usando la clave secreta de nuestro .env
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // Guardamos los datos del usuario verificado en el request
    req.user = verified;
    next(); // Continuar a la ruta
  } catch (error) {
    res.status(403).json({ message: 'Token inválido o expirado.' });
  }
};