const User = require('../models/User');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    console.log('Register request body:', { name, email, role });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({
      name,
      email,
      password,
      role
    });

    console.log('User created with id:', user._id);

    const responseUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    const token = generateToken(user._id);

    console.log('Register response payload:', { user: responseUser, token });

    res.status(201).json({
      ...responseUser,
      token
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login request body:', { email });

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      console.log('Login failed: invalid credentials');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const responseUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    const token = generateToken(user._id);

    console.log('Login success payload:', { user: responseUser, token });

    res.json({
      ...responseUser,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};