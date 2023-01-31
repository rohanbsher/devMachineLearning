import { OpenAIApi, Configuration } from 'openai';
import { AxiosResponse } from 'axios';

export class OpenAiSync {
	constructor(private openai?: OpenAIApi) {
	}

	// set initializeModel(configuration: Configuration) {
	// 	this.openai = new OpenAIApi(configuration);
	// }

	public async listEngines() {
		if (this.openai !== undefined) {
			const response = await this.openai.listEngines();
			return response;
		}
	}
}