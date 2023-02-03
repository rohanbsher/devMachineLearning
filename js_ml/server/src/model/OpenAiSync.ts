import { OpenAIApi, Configuration } from 'openai';

export class OpenAiSync {
	constructor(private openai?: OpenAIApi) {
	}

	static buildOpenAiSync(configuration: Configuration): OpenAIApi {
		return new OpenAIApi(configuration);
	}

	public async listEngines() {
		if (this.openai !== undefined) {
			const response = await this.openai.listEngines();
			return response;
		}
	}

	public async createCompletion(prompt: string, temperature: number) {
		if (this.openai !== undefined) {
			const response = await this.openai.createCompletion({
				model: 'text-davinci-003',
				prompt: prompt,
				temperature: temperature,
			});
			return response;
		} else {
			console.log('OpenAI is undefined');
		}
	}


}