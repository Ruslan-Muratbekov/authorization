const UserSchema = require('../model/user-schema')
const UserServices = require('../services/user-services')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-error')

class UserControllers {
	async registration(req, res, next){
		try {
			const errors = validationResult(req)
			if(!errors.isEmpty()){
				return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
			}
			const {email, password} = req.body
			const userData = await UserServices.registration(email, password)
			res.cookie('refreshToken', userData.refreshToken , {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
			return res.json(userData)
		}catch (e){
			next(e)
		}
	}

	async login(req, res, next){
		try {
			const {email, password} = req.body
			const userData = await UserServices.login(email, password)
			res.cookie('refreshToken', userData.refreshToken , {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
			return res.json(userData)
		}catch (e){
			next(e)
		}
	}

	async logout(req, res, next){
		try {
			const {refreshToken} = req.cookies
			const token = await UserServices.logout(refreshToken)
			res.clearCookie('refreshToken')
			return res.json(token)
		}catch (e){
			next(e)
		}
	}

	async activate(req, res, next){
		try {
			const activatedLink = req.params.link
			await UserServices.activate(activatedLink)
			return res.redirect(process.env.CLIENT_URL)
		}catch (e){
			next(e)
		}
	}

	async refresh(req, res, next){
		try {
			const {refreshToken} = req.cookies
			const userData = await UserServices.refresh(refreshToken)
			res.cookie('refreshToken', userData.refreshToken , {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
			return res.json(userData)
		}catch (e){
			next(e)
		}
	}

	async getUsers(req, res, next){
		try {

		}catch (e){
			next(e)
		}
	}
}

module.exports = new UserControllers();