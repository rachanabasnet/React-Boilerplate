
export interface IHttp {
	get<T>(args: any): Promise<T>;
	post<T>(args: any): Promise<T>;
	put<T>(args: any): Promise<T>;
	delete<T>(args: any): Promise<T>;
}

export interface IError {
	status: number;
	data: any;
	headers: any;
}

export interface IHttpParam {
	endpoint: string;
	payload?: any;
	config?:any
}