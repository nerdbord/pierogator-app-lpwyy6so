import { AxiosError } from 'axios';
import { API } from './api';
import { useGlobalStore } from '@/store/app';

function handleApiError<T>(error: AxiosError): T {
	const globalStore = useGlobalStore();
	globalStore.setLoading(false);

	let message = 'Coś poszło nie tak, spróbuj ponownie';
	if (error.response?.status === 401 || error.response?.status === 403) {
		message = 'Błąd autoryzacji';
	}

	globalStore.addErrorMessage(message);

	throw Error('postData error - ' + message);
}

export async function postData<T, K = void>(path: string, body: T): Promise<K> {
	const globalStore = useGlobalStore();
	globalStore.setLoading(true);
	try {
		const res = await API.post(path, body);
		const data = res.data;

		return res.data as K;
	} catch (err) {
		const error = err as AxiosError;
		return handleApiError<K>(error);
	}
}

export async function deleteData(path: string): Promise<void> {
	const globalStore = useGlobalStore();
	globalStore.setLoading(true);
	try {
		await API.delete(path);
	} catch (err) {
		const error = err as AxiosError;
		return handleApiError(error);
	}
}

export async function getData<T>(path: string): Promise<T> {
	const globalStore = useGlobalStore();
	globalStore.setLoading(true);
	try {
		const res = await API.get(path);
		return res.data;
	} catch (err) {
		const error = err as AxiosError;
		return handleApiError(error);
	}
}
