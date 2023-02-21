const nodemailer = require("nodemailer");

class MailerServices {
	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: `${process.env.SMTP_USERS}`,
				pass: `${process.env.SMTP_PASSWORD}`
			}
		})
	}

	async sendActivationMail(to, link){
		await this.transporter.sendMail({
			from: process.env.SMTP_USERS,
			to,
			subject: `Активация аккаунта на ${process.env.API_URL}`,
			text: '',
			html: `
			<div>
					<h1>Для активации перейдите по ссылке</h1>
					<a href="${link}">${link}</a>	
			</div>`
		})
	}
}

module.exports = new MailerServices()