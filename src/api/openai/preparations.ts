import { ApiModelsEnum } from '@/enums/ApiModels.enum';
import { postData } from '@/api/global.service';
import { ApiTypeEnum } from '@/enums/ApiType.enum';
import { parseIngredients } from '@/helpers/parseIngredients';

//! TODO: mvoe to separate file (reusable type):
type Message = {
	role: 'system' | 'user' | 'assistant';
	content: string;
};

//! TODO: move to separate file (reusable interface):
interface ChatPostPayload {
	model: ApiModelsEnum;
	messages: Message[];
}

//! TODO: move to separate file (reusable interface):
interface Choice {
	index: number;
	finish_reason: string;
	message: Message;
}

//! TODO: move to separate file (reusable interface):
interface ChatResponse {
	choices: Choice[];
	[key: string]: string | number | Choice[];
}

export function parseSteps(rawText: string): string[] {
	const steps = rawText.split('\n').filter((step) => step.trim() !== '');
	const parsedSteps = steps.map((step) => step.replace(/^\d+\.\s*/, '').trim());
	return parsedSteps;
}

export async function getPreparationSteps(content: string): Promise<string[]> {
	const messages: Message[] = [
		{
			role: 'user',
			content,
		},
	];

	const data = await postData<ChatPostPayload, ChatResponse>(
		'/openai/chat/completions',
		{
			model: ApiModelsEnum.GPT,
			messages,
		},
		ApiTypeEnum.OPENAI
	);

	const gptRes = data.choices[0].message.content;
	const result: string[] = parseSteps(gptRes);
	return result;
}
