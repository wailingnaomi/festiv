const express = require('express')

const register = new express.Router()

const User = require('../models/users')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'fsabfasigbewoiugbpasvweth5qfiedsnc'

register.post('/api/register', async (req, res) => {
    const { first_name, last_name, email, password: plainTextPassword } = req.body
    //Password hashing
    const password = await bcrypt.hash(plainTextPassword, 10)
    // console.log(req.body);
    // console.log(password)
  
    try {
      const response = await User.create({
        first_name,
        last_name,
        email,
        password
      })
      console.log('user created succesfully', response)
    } catch (error) {
      console.log(error)
      return res.json({ status: 'error' })
    }
  
    res.json({ status: 'ok' });
  });

  register.post('/api/login', async (req, res) => {

    const { email, password } = req.body
  
  
  
    const user = await User.findOne({ email }).lean()
  
    if (!user) {
      return res.json({ status: 'error', error: 'invalid username/password' })
    }
  
    if (await bcrypt.compare(password, user.password)) {
      //Combination is succseful
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET)
      return res.json({ status: 'ok', data: ' ' })
    }
    res.json({ status: 'error', data: 'invalid username/password' })
  });
  
  module.exports = register