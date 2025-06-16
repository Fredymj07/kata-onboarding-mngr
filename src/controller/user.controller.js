import userService from '../service/user.service.js';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ message: 'Email and password are required' });
    }

    const user = await userService.login(email, password);

    if (user) {
      const token = jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role
      },
        process.env.JWT_SECRET,
        { expiresIn: '30m' }
      );

      res.status(200).json(token);
    }
  } catch (error) {
    if (error.message) {
        return res.status(401).json({ error: 'Credenciales inválidas', detail: error.message });
      }

    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const createUser = async(req, res) => {
  try {
    const {name, email, password, role, dateEntry} = req.body;

    if (!name || !email || !password || !role || !dateEntry) {
      return res.status(422).json({ message: 'All fields are required' });
    }

    const existingUser = await userService.findOneByEmail(email);

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = await userService.createUser({name, email, password, role, dateEntry});
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred when creating the user' });
  }
};

const findUsersByRole = async (req, res) => {
  try {
    const role = req.headers['role'];

    if (!role) {
      return res.status(422).json({ message: 'Role is required' });
    }

    if (role !== 'analystHHRR' && role !== 'employee') {
      return res.status(422).json({ message: 'Invalid role' });
    }

    const users = await userService.findUsersByRole(role);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor', detail: error.message });
  }
}

export default {
  login,
  createUser,
  findUsersByRole
}
