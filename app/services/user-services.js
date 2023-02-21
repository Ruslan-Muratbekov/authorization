const UserSchema = require("../model/user-schema");
const bcrypt = require('bcrypt')
const uuid = require("uuid");
const Dtos = require("../dtos");
const TokenServices = require('../services/tokens-services')
const MailerServices = require('../services/mailer-services')
const ApiError = require('../exceptions/api-error')

class UserServices {
	async registration(email, password) {
		const candidate = await UserSchema.findOne({email})
		if (candidate) {
			throw ApiError.BadRequest('Такой аккаунт уже зарегистрирован!')
		}
		const hashPassword = await bcrypt.hash(password, 8)
		const activatedLink = uuid.v4()

		const user = await UserSchema.create({email, password: hashPassword, activatedLink})
		const userDtos = new Dtos(user)
		await MailerServices.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activatedLink}`)

		const tokens = TokenServices.generateTokens({...userDtos})
		await TokenServices.saveToken(userDtos.id, tokens.refreshToken)
		return {...tokens, user: userDtos}
	}

	async login() {
	}

	async logout() {

	}

	async activate(activatedLink) {
		const user = await UserSchema.findOne({activatedLink})
		if(!user){
			throw ApiError.BadRequest('Ошибка неверная ссылка')
		}
		user.isActivated = true
		await user.save()
	}

	async refresh() {

	}

	async getUsers() {

	}
}

module.exports = new UserServices();