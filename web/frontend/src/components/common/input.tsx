import * as React from 'react';
import { useEffect } from 'react';
import {FieldErrors, UseFormRegisterReturn} from 'react-hook-form';

export interface IInput {
    type:string;
    label?:string | undefined;
    placeholder?:string | undefined;
    inputName: string;
    register?: UseFormRegisterReturn<any> | undefined;
    errors?: FieldErrors<any> | undefined

}
const Input : React.FC<IInput> = ({type, label, inputName, register, errors, placeholder}) =>{

useEffect(()=>{},[errors, label]);

    return <>
      { label && <label htmlFor={inputName} className="form-label">
                {label ?? ""}
              </label>}
              <input
                type={type}
                placeholder ={placeholder? placeholder : ''}
                {...(register ? register : {})}
                className="form-control"
                name={inputName}
                id={inputName}
              />
             { errors && <div className="invalid-feedback">
                {errors ? (errors[inputName] ? errors[inputName].message : '')?.toString() : ''}
              </div>}
    </>
}

export default Input;