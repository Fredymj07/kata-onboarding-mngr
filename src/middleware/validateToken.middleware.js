import jwt from 'jsonwebtoken';

const validateToken = (req, res, next) => {
   const authHeader = req.headers['authorization'];

   if (!authHeader) {
      return res.status(401).json({ error: 'No existe la autorización correspondiente' });
   }

   const token = authHeader.split(' ')[1];

   if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
   }

   try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.email = payload;
      next();
   } catch (error) {
      return res.status(401).json({ error: 'Token inválido' });
   }
}

export default {
   validateToken
};