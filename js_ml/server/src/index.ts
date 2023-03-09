
import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routes/basicRoutes';
import { OpenAIApi, Configuration } from 'openai';
import { OpenAiSync } from './model/OpenAiSync';
import * as dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(router);
app.use(express.static('public'));
app.use(cors());

const configuration = new Configuration({
	organization: "org-lDiIEYdILCOI44vMsWyYnOLQ",
	apiKey: process.env.OPENAI_API_KEY
});

const user = OpenAiSync.buildOpenAiSync(configuration);
const userSync = new OpenAiSync(user);

let questionVal = 'What is the historical low iron price? Return the answer as a string.';
let resVal = ""

// userSync.createCompletion(questionVal, 0.9).then((response) => {
// 	console.log("Your question is : " + questionVal);
// 	if(response){
// 		const parseJson = response.data.choices[0].text?.trim();
// 		resVal = parseJson!;
// 		console.log("Response is : " + parseJson);
// 	}
// });

app.post('/ask', async (req, res) => {
	// Get the user's input question from the query parameter
	userSync.createCompletion(questionVal, 0.9).then((response) => {
		console.log("Your question is : " + questionVal);
		if(response){
			const parseJson = response.data.choices[0].text?.trim();
			resVal = parseJson!;
			console.log("Response is : " + parseJson);
		}
	});

	res.send(resVal);
});

app.get('/ask', (req, res) => {
	res.send(resVal);
})




// interface Engine {
// 	data: any;
// 	id: string;
// 	object: string;
// 	ready: boolean;
// 	owner: string;
// 	permissions: any;
// }
// let engineData: Engine;

// userSync.listEngines().then((response) => {
// 	if(response){
// 		engineData = response.data;
// 		console.log(engineData.data[0] as Engine);
// 	}
// });



// async function listEngines(): Promise<void> {
// 	try {
// 	  const response = await userSync.listEngines();
// 	  if (response) {
// 		console.log(response.data);
// 		const engines = response.data as { object: string, id: string, ready: boolean, owner: string, permissions: any, created: any }[];
// 		engines.forEach(engine => {
// 		  console.log(`Engine object: ${engine.object}, ID: ${engine.id}, ready: ${engine.ready}, owner: ${engine.owner}, permissions: ${engine.permissions}, created: ${engine.created}`);
// 		});
// 	  }
// 	} catch (error) {
// 	  console.error(error);
// 	}
//   }


app.listen(3001, () => {
	console.log('Server started on port 3001');
});