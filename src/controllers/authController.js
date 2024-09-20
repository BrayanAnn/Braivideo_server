const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { findUserByUsername, findUserById } = require('../models/userModel');
const User = require('../models/userModel')
const { secretKey } = require('../config/config_env');

const login = async(req, res) => {

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send('Senha inválida');
    }

    const token = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: 86400, // expira em 24 horas
    });

    res.status(200).send({ auth: true, token });
  } catch (error) {
    res.status(500).send('Erro no servidor.');
  }
};

const getUserProfile = async(req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send('Erro no servidor.');
  }
};

const register = async (req, res) => {
  const { first_name, last_name, email, username, password, extras } = req.body;
  console.log(req.body)
  try {

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).send('Username já está em uso.');
    }

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).send('Email já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      username,
      password: hashedPassword,
      extras
    });

    const token = jwt.sign({ id: newUser.id }, secretKey, {
      expiresIn: 86400, // expira em 24 horas
    });

    res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      token: token
    });
  } catch (error) {
    console.error('Erro durante o registro de usuário:', error);
    res.status(500).send('Erro durante o registro de usuário. Por favor tente mais tarde.');
  }
};

function userIsAdmin(userId){
  try{
    return User.findByPk(userId).admin
  }catch(err){
    return false
  }
}


module.exports = {
  login,
  register,
  getUserProfile,
};