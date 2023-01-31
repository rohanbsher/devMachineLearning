import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routes/basicRoutes';
import { OpenAIApi, Configuration } from 'openai';
import { OpenAiSync } from './model/OpenAiSync';
import * as dotenv from 'dotenv';
import path from 'path';
import axios from 'axios';

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

// dotenv.config({ path: `${__dirname}/../../.env`});
// dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(express.static('public'));



const configuration = new Configuration({
	// organization: "org-lDiIEYdILCOI44vMsWyYnOLQ",
	// apiKey: "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"
	apiKey: process.env.OPENAI_API_KEY

});
// console.log(configuration);
// console.log(configuration.organization);
const openai = new OpenAIApi(configuration);
// const openaiSync = new OpenAiSync(openai);

const runPrompt = async () => {
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: 'I am working with ',
		temperature: 0.9,
	});
	console.log(response.data);
}


// axios.get("https://api.openai.com/v1/completions", {
// 	headers: {

// 	},
// })


// console.log(openaiSync.listEngines());

app.listen(3000, () => {
	// console.log(configuration.apiKey);
	console.log(dotenv.config({ path: path.resolve(__dirname, "../../../.env") }));
	// runPrompt();
	// console.log(configuration.apiKey)
	runPrompt();
	console.log('Server started on port 3000');
});