import { AxiosError, AxiosInstance } from 'axios';
import { useGlobalStore } from '@/store/app';
import { API } from './api';
import { ApiTypeEnum } from '@/enums/ApiType.enum';

function handleApiError<T>(error: AxiosError): T {
	const globalStore = useGlobalStore();

	let message = 'Coś poszło nie tak, spróbuj ponownie';
	if (error.response?.status === 401 || error.response?.status === 403) {
		message = 'Błąd autoryzacji';
	}

	globalStore.addErrorMessage(message);

	throw Error('postData error - ' + message);
}

export async function postData<T, K = void>(
	path: string,
	body: T,
	ApiType: ApiTypeEnum = ApiTypeEnum.NERDBORD
): Promise<K> {
	const globalStore = useGlobalStore();
	try {
		const res = await API.post(path, body, {
			headers: {
				Authorization:
					ApiType === ApiTypeEnum.NERDBORD
						? `${import.meta.env.VITE_API_KEY_NERDBORD}`
						: `${import.meta.env.VITE_API_KEY_OPENAI}`,
			},
		});
		const data = res.data;

		return res.data as K;
	} catch (err) {
		const error = err as AxiosError;
		return handleApiError<K>(error);
	}
}

export async function deleteData(path: string): Promise<void> {
	const globalStore = useGlobalStore();
	try {
		await API.delete(path, {
			headers: {
				Authorization: `${import.meta.env.VITE_API_KEY_NERDBORD}`,
			},
		});
	} catch (err) {
		const error = err as AxiosError;
		return handleApiError(error);
	}
}

export async function getData<T>(path: string): Promise<T> {
	const globalStore = useGlobalStore();
	try {
		const res = await API.get(path, {
			headers: {
				Authorization: `${import.meta.env.VITE_API_KEY_NERDBORD}`,
			},
		});
		if (res.data.recipes) {
			return res.data.recipes as T;
		}
		if (res.data.recipe) {
			return res.data.recipe as T;
		}
		return res.data as T;
	} catch (err) {
		const error = err as AxiosError;
		return handleApiError(error);
	}
}
