import * as React from 'react';
import { useEffect } from 'react';
import {FieldErrors, UseFormRegisterReturn} from 'react-hook-form';

export interface ITextArea {
   
    label?:string | undefined;
    placeholder?: string | undefined;
    rows?: number | undefined;
    inputName: string;
    register?: UseFormRegisterReturn<any> | undefined;
    errors?: FieldErrors<any> | undefined

}
const TextArea : React.FC<ITextArea> = ({label, inputName, register, errors, rows, placeholder}) =>{

  useEffect(()=>{},[errors, label]);
    return <>
      { label && <label htmlFor={inputName} className="form-label">
                {label ?? ""}
              </label>}
      <textarea 
      className="form-control" 
      {...(register ? register : {})}
      rows={rows ? rows : 6} 
      placeholder={placeholder} 
      name={inputName}
      id={inputName}
      >
    </textarea>
            {errors && <div className="invalid-feedback">
                {errors ? (errors[inputName] ? errors[inputName].message : '')?.toString() : ''}
              </div>}
    </>
}

export default TextArea;