const UserSchema = require('../model/user-schema')
const UserServices = require('../services/user-services')

class UserControllers {
	async registration(req, res, next){
		try {
			const {email, password} = req.body
			const userData = await UserServices.registration(email, password)
			res.cookie('refreshToken', userData.refreshToken , {maxAge: 30 * 24 * 60 * 60 * 1000})
			return res.json(userData)
		}catch (e){
			next(e)
		}
	}

	async login(req, res, next){
		try {

		}catch (e){
			next(e)
		}
	}

	async logout(req, res, next){
		try {

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