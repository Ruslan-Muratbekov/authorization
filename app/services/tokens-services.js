const jwt = require('jsonwebtoken')
const TokenSchema = require('../model/token-services')

class TokensServices {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.SECRET_KEY_ACCESS, {expiresIn: '30m'})
		const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH, {expiresIn: '30d'})
		return {
			accessToken,
			refreshToken
		}
	}

	async saveToken(userId, refreshToken){
		const user = await TokenSchema.findOne({user: userId})
		if(user){
			user.refreshToken = refreshToken
			return user.save()
		}
		const token = await TokenSchema.create({user: userId, refreshToken})
		return token
	}
}

module.exports = new TokensServices();