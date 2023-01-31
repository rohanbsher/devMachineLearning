import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routes/basicRoutes';
import { OpenAIApi, Configuration } from 'openai';
import { OpenAiSync } from './model/OpenAiSync';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(express.static('public'));

const configuration = new Configuration({
	organization: "org-lDiIEYdILCOI44vMsWyYnOLQ",
	apiKey: process.env.OPENAI_API_KEY
});

const user = OpenAiSync.buildOpenAiSync(configuration);
const userSync = new OpenAiSync(user);

let questionVal = 'What is the meaning of science? Return the answer as a string.';

userSync.createCompletion(questionVal, 0.9).then((response) => {
	console.log("Your question is : " + questionVal);
	if(response){
		const parseJson = response.data.choices[0].text;
		console.log("Response is : " + parseJson);
	}
});


userSync.listEngines().then((response) => {
	if(response){
		// console.log(response.data);
	}
});

app.listen(3000, () => {
	console.log('Server started on port 3000');
});