import { AxiosError } from 'axios';
import { API } from '../api';
import { ApiModelsEnum } from '@/enums/ApiModels.enum';
import { postData } from '../global.service';

type Message = {
	role: 'system' | 'user' | 'assistant';
	content: string;
};

interface GetNamePayload {
	model: ApiModelsEnum;
	messages: Message[];
}

interface GetNameResponse {
	// [key: string]: string | number;
	choices: Choice[];
	[key: string]: string | number | Choice[];
}

interface Choice {
	index: number;
	finish_reason: string;
	message: Message;
}

export async function getName(prompt = 'truskawki, borówki') {
	const messages: Message[] = [
		{
			role: 'user',
			content: `Wymyśl nazwę dla pieroga, który składa się z: ${prompt}`,
		},
	];

	const data = await postData<GetNamePayload, GetNameResponse>(
		'/openai/chat/completions',
		{
			model: ApiModelsEnum.GPT,
			messages,
		}
	);

	const choices: Choice[] = data.choices;
	console.log('getName choices - ', choices);
	const generatedName = choices[0].message.content;
	console.log('getName name - ', generatedName);

	return generatedName;
}
