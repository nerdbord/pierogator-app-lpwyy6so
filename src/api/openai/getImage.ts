import { AxiosError } from 'axios';
import { API } from '../api';
import { ApiModelsEnum } from '@/enums/ApiModels.enum';
import { postData } from '../global.service';

type Image = {
	revised_prompt: string;
	url: string;
};

interface GetImageResponse {
	created: number;
	data: Image[];
}

interface GetImagePayload {
	model: ApiModelsEnum;
	prompt: string;
	n: number;
	size: string;
}

export async function getImage(prompt = 'zdjęcie jakiegoś polskiego jedzenia') {
	const data = await postData<GetImagePayload, GetImageResponse>(
		'/openai/images/generations',
		{
			model: ApiModelsEnum.DALL,
			prompt,
			n: 1,
			size: '1024x1024',
		}
	);

	const imageUrl = data.data[0].url;
	return imageUrl;
}
