import { createContext } from "react";
import { IRegisterUser, LoginInfo, User } from "../common/model/user";
import { UserService } from "../common/userService.ts";
import React from "react";


export interface IUserContext {
    getUser():User | null;
    isUserLoggedIn():boolean;
    addUser(user:User);
    logout();
    getToken():string;
    login(login:LoginInfo, from:string | null):Promise<void>;
    createUser(user:IRegisterUser, redirect?:string):Promise<void>;
}

export const UserContext = createContext<IUserContext>({
    getUser: ()=> null,
    isUserLoggedIn: ()=> false,
    addUser:()=>{},
    getToken:()=>"",
    logout:()=>{},
    createUser:()=> new Promise(()=>{}),
    login:()=> new Promise(()=>{})
});

export const UserProvider:React.FC<{children: React.ReactNode}> =({children})=>{

    const service = new UserService();
    return(<UserContext.Provider value={{
        getUser: ()=> service.getUser(),
        isUserLoggedIn: ()=> service.isUserLoggedIn(),
        addUser:(user:User)=> service.addUser(user),
        logout: ()=> service.logout(),
        createUser:(user:IRegisterUser, redirect?:string)=> service.createUser(user, redirect),
        login: (login:LoginInfo, from: string | null) => service.login(login, from),
        getToken:()=> service.getToken()
    }}>
        {children}
    </UserContext.Provider>)
}