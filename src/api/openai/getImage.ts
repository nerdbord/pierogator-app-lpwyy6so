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
	n: 1;
	size: '1024x1024';
}

export async function getImage(ingredients: string[]) {
	const data = await postData<GetImagePayload, GetImageResponse>(
		'/openai/images/generations',
		{
			model: ApiModelsEnum.DALL,
			prompt: `Zdjęcie pieroga, którego składniki to: ${ingredients.join(
				', '
			)}`,
			n: 1,
			size: '1024x1024',
		}
	);

	const imageUrl = data.data[0].url;
	return imageUrl;
}
