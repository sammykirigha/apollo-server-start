export const email = (receiverEmail:string, url:string) => {

	return {
		from: {
			name: "Doctris",
			address: `sammydorcis@outlook.com"`
		},
		to: `${receiverEmail}`,
		subject: "Confirmation Email",
		text: "Please confirm your email before you continue",
		html: `<a href='http://localhost:3000/${url}'>http://localhost:3000/user/confirm/${url}</a>`
	};
}