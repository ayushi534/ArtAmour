// src/utils/jwt.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d';

if (!JWT_SECRET) throw new Error('JWT_SECRET not set');

const signToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

const setTokenCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};

module.exports = { signToken, verifyToken, setTokenCookie };
