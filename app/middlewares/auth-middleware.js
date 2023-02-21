const ApiError = require('../exceptions/api-error')
const TokenServices = require('../services/tokens-services')

module.exports = (req, res, next) => {
	try {
		const authorizationHeader = req.headers.authorization
		if(!authorizationHeader){
			return next(ApiError.UnauthorizedError())
		}

		const accessToken = authorizationHeader.split(' ')[1]
		if(!accessToken){
			return next(ApiError.UnauthorizedError())
		}
		const userData = TokenServices.validateAccessToken(accessToken)
		if(!userData){
			return next(ApiError.UnauthorizedError())
		}
		req.user = userData
		next()
	}catch (e) {
		return next(ApiError.UnauthorizedError())
	}
}