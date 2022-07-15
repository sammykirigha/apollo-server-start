
import ejs from "ejs";

const loadTemplate = async (template: string, data: any) => {

	try {

		const res = await ejs.renderFile(`${__dirname}/../templates/${template}.ejs`, data)
		return res as string;
	} catch (error: any) {
		const errorMessage = 'Template error: ' + (error.message.split("\n").pop());
		throw new Error(errorMessage)
	}
}

export default loadTemplate

