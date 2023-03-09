"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (req, res) => {
    res.sendFile('./view/index.html', { root: __dirname });
});
router.get('/generate-response', async (req, res) => {
    // Get the user's input question from the query parameter
    const userQuestion = req.query.question;
    // Make an API call to ChatGPT to generate a response
    const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
    const apiKey = process.env.OPENAI_API_KEY; // Replace with your ChatGPT API key
    const response = await axios_1.default.post(apiUrl, {
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
router.post('/ask', (req, res) => {
    const { question } = req.body;
    res.send(`
			<div>
				<div>You're question is: ${question} </div>
				<p> Check asnwer in the command prompt for now</p>
				<a href="/">Ask another question</a>
			</div>
		`);
});
