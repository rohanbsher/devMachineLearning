import { Router, Request, Response } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';

interface RequestWithBody extends Request {
	body: { [key: string]: string | undefined }
}
const router = Router();

router.get('/', (req, res) => {
	res.sendFile('./view/index.html', { root: __dirname });
});


router.get('/generate-response', async (req, res) => {
	// Get the user's input question from the query parameter
	const userQuestion = req.query.question as string;
  
	// Make an API call to ChatGPT to generate a response
	const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
	const apiKey = process.env.OPENAI_API_KEY; // Replace with your ChatGPT API key
	const response = await axios.post(apiUrl, {
	  prompt: userQuestion,
	  max_tokens: 100,
	  n: 1,
	  stop: '\n'
	}, {
	  headers: {
		'Authorization': `Bearer ${apiKey}`,
		'Content-Type': 'application/json'
	  }
	});
  
	// Extract the generated response from the API response
	const generatedResponse = response.data.choices[0].text.trim();
  
	// Return the generated response to the front-end
	res.send(generatedResponse);
	console.log(generatedResponse);
  });


router.post('/ask', (req: RequestWithBody, res: Response) => {
	const { question } = req.body;
	res.send(`
			<div>
				<div>You're question is: ${question} </div>
				<p> Check asnwer in the command prompt for now</p>
				<a href="/">Ask another question</a>
			</div>
		`);
});


export { router };