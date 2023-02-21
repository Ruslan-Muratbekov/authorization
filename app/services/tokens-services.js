const jwt = require('jsonwebtoken')
const TokenSchema = require('../model/token-schema')

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

	async removeToken(refreshToken){
		const tokenData = await TokenSchema.deleteOne({refreshToken})
		return tokenData
	}

	validateAccessToken(token){
		try {
			const userData = jwt.verify(token, process.env.SECRET_KEY_ACCESS)
			return userData
		}catch (e) {
			return null
		}
	}

	validateRefreshToken(token){
		try {
			const userData = jwt.verify(token, process.env.SECRET_KEY_REFRESH)
			return userData
		}catch (e) {
			return null
		}
	}

	async findToken(refreshToken){
		const tokenData = await TokenSchema.findOne({refreshToken})
		return tokenData
	}
}

module.exports = new TokensServices();