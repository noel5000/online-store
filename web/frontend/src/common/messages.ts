import { toast } from "react-toastify";

export interface IMessages{
    sendErrorMessage(message:string):void;
    sendAlertMessage(message:string):void;
}

export class MessagesService implements IMessages{
    sendErrorMessage(message: string): void {
       toast.error(message);
    }
    sendAlertMessage(message: string): void {
        toast.info(message);
    }
    
}