import * as React from 'react';
import { UseFormRegisterReturn} from 'react-hook-form';

export interface ICheckboxInput {
    label?:string | undefined;
    inputName: string;
    register?: UseFormRegisterReturn<any> | undefined;
}
const Checkbox : React.FC<ICheckboxInput> = ({ label, inputName, register}) =>{


    return   <div className="form-check">
              <input
                type='checkbox'
                {...(register ? register : {})}
                className="form-check-input"
                name={inputName}
                id={inputName}
              />

            <label className="form-check-label" htmlFor={inputName}>
              {label}
            </label>
    </div>
}

export default Checkbox;