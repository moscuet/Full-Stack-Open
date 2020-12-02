const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async(req, res) => {
  const users = await User.find({}).populate('blogs', { title:1, author:1, url:1, likes:1 }) // can choose which data want to select. here we didn't select user
  //res.json( users.map( user => user.toJSON()))
  res.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })
  const savedUser = await user.save()
  response.json(savedUser)
})

module.exports = usersRouter