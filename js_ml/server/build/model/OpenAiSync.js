"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAiSync = void 0;
const openai_1 = require("openai");
class OpenAiSync {
    constructor(openai) {
        this.openai = openai;
    }
    static buildOpenAiSync(configuration) {
        return new openai_1.OpenAIApi(configuration);
    }
    async listEngines() {
        if (this.openai !== undefined) {
            const response = await this.openai.listEngines();
            return response;
        }
    }
    async createCompletion(prompt, temperature) {
        if (this.openai !== undefined) {
            const response = await this.openai.createCompletion({
                model: 'text-davinci-003',
                prompt: prompt,
                temperature: temperature,
            });
            return response;
        }
        else {
            console.log('OpenAI is undefined');
        }
    }
}
exports.OpenAiSync = OpenAiSync;
