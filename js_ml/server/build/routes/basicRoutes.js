"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (req, res) => {
    // res.send('Hello World');
    res.sendFile('./view/index.html', { root: __dirname });
});
router.post('/ask', (req, res) => {
    const { question } = req.body;
    res.send(`
			<div>
				<div>You're question is: ${question} </div>
				<a href="/">Ask another question</a>
			</div>
		`);
});
