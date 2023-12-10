import { AxiosError } from 'axios';
import { API } from './api';

export async function postData<T, K>(path: string, body: T): Promise<K> {
	try {
		const res = await API.post(path, body);
		const data = res.data;

		console.log('postData - ', data);

		return res.data as K;
	} catch (err) {
		const error = err as AxiosError;
		let message = 'Coś poszło nie tak, spróbuj ponownie';

		if (error.response?.status === 401 || error.response?.status === 403) {
			message = 'Błąd autoryzacji';
		}
		throw new Error('postData error - ' + message);
	}
}
