const Router = require('express').Router
const controller = require('../controller/user-controllers')

const userRouter = new Router()

userRouter.post('/registration', controller.registration)
userRouter.post('/login', controller.login)
userRouter.post('/logout', controller.logout)
userRouter.get('/activate/:link', controller.activate)
userRouter.get('/refresh', controller.refresh)
userRouter.get('/users', controller.getUsers)

module.exports = userRouter