const Router = require('express').Router
const {body} = require('express-validator')
const controller = require('../controller/user-controllers')

const userRouter = new Router()

userRouter.post('/registration',
	body('email').isEmail(),
	body('password').isLength({min: 3, max: 32}),
	controller.registration
)
userRouter.post('/login', controller.login)
userRouter.post('/logout', controller.logout)
userRouter.get('/activate/:link', controller.activate)
userRouter.get('/refresh', controller.refresh)
userRouter.get('/users', controller.getUsers)

module.exports = userRouter