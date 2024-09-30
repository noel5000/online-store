
import axios from 'axios';
import axiosInstance from './httpClient';

export interface IHttpResult<T>{
    id:number;
    status:number;
    message:string;
    data:T
}
export interface IHttpService<T>{
GetAll(queryParams:string | undefined):Promise<IHttpResult<T[]>>;
Get(id: number):Promise<IHttpResult<T>>;
Delete(id: number):Promise<IHttpResult<object>>;
Post(data:T, queryParams: string | undefined) : Promise<IHttpResult<T>>;
Put(data:T, queryParams: string | undefined) : Promise<IHttpResult<T>>
Path(data:T, queryParams: string | undefined) : Promise<IHttpResult<T>>;
}

export class HttpService<T> implements IHttpService<T>{

    endpointUrl:string;
    constructor(baseUrl:string){
        this.endpointUrl = baseUrl;
    }

    getHeaders():any{
        return {
            "content-type":"application/json",
            "authorization": `Bearer TOKEN`
        }
    }

    async GetAll(queryParams: string | undefined): Promise<IHttpResult<T[]>>{
        return (await  axiosInstance.get<IHttpResult<T[]>>( queryParams?`${this.endpointUrl}/${queryParams}`: this.endpointUrl, {
               headers:this.getHeaders()
           })).data;
       };
    async Get(id: number): Promise<IHttpResult<T>>{
        return (await  axiosInstance.get<IHttpResult<T>>(`${this.endpointUrl}/${id}`, {
               headers:this.getHeaders()
           })).data;
       };
    async Delete(id: number): Promise<IHttpResult<object>>{
        return (await  axios.delete<IHttpResult<object>>(`${this.endpointUrl}/${id}`, {
               headers:this.getHeaders()
           })).data;
       };
   async Post(data: T, queryParams: string | undefined): Promise<IHttpResult<T>> {
        return (await  axiosInstance.post<IHttpResult<T>>(queryParams?`${this.endpointUrl}/${queryParams}`: this.endpointUrl,
            data,
             {
               headers:this.getHeaders()
           })).data;
       }
       async Put(data: T, queryParams: string | undefined):  Promise<IHttpResult<T>> {
        return (await  axiosInstance.put<IHttpResult<T>>(queryParams?`${this.endpointUrl}/${queryParams}`: this.endpointUrl,
            data,
             {
               headers:this.getHeaders()
           })).data;
       }
       async Path(data: T, queryParams: string | undefined):  Promise<IHttpResult<T>> {
        return (await  axiosInstance.patch<IHttpResult<T>>(queryParams?`${this.endpointUrl}/${queryParams}`: this.endpointUrl,
            data,
             {
               headers:this.getHeaders()
           })).data;
       }
}
