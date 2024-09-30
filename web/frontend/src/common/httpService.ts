
import axios from 'axios';
import axiosInstance from './httpClient.ts';

export interface IHttpResult<T>{
    id:number;
    status:number;
    message:string;
    data:T
}
export interface IHttpService<T>{
GetOdata(queryParams:string | undefined):Promise<any>;
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
    setOdataUrl():string{
        const urlArray = this.endpointUrl.split('/');
        let url = '';
        for(let i =0; i<urlArray.length-2; i++)
            url+=`/${urlArray[i]}`;
        url+=`/odata/${urlArray[urlArray.length-1]}`;
        return url;
    }
    
    async GetOdata(queryParams: string | undefined): Promise<any>{
        return (await  axiosInstance.get<any>( queryParams?`${this.setOdataUrl()}?${queryParams}`: this.setOdataUrl(), {
               headers:this.getHeaders()
           })).data;
       };
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
