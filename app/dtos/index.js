module.exports = class Dtos {
	id;
	email;
	isActivated;

	constructor(model) {
		this.email = model.email
		this.isActivated = model.isActivated
		this.id = model._id
	}
}