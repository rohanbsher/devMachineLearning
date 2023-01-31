import { Router, Request, Response } from 'express';

interface RequestWithBody extends Request {
	body: { [key: string]: string | undefined }
}
const router = Router();

router.get('/', (req, res) => {
	res.sendFile('./view/index.html', { root: __dirname });
});

router.post('/ask', (req: RequestWithBody, res: Response) => {
	const { question } = req.body;
	res.send(`
			<div>
				<div>You're question is: ${question} </div>
				<a href="/">Ask another question</a>
			</div>
		`);
});


export { router };