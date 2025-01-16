import * as React from 'react';
import { useEffect } from 'react';
import {FieldErrors, UseFormRegisterReturn} from 'react-hook-form';

export interface ISelect {
    data: any[];
    dataLabel: string;
    dataId :string;
    label?:string | undefined;
    inputName: string;
    register?: UseFormRegisterReturn<any> | undefined;
    errors?: FieldErrors<any> | undefined

}
const Select : React.FC<ISelect> = ({data, dataLabel, dataId, label, inputName, register, errors}) =>{

    useEffect(()=>{},[data])
    return <>
       <label htmlFor={inputName} className="form-label">
                {label ?? ""}
              </label>
              <select
                className="form-select"
                id={inputName}
                {...(register ? register : {})}
              >
                <option value="">Choose...</option>
                {data.map((d) => {
                  return (
                    <option value={d[dataId]} key={d[dataId]}>
                      {d[dataLabel]}
                    </option>
                  );
                })}
              </select>
              <div className="invalid-feedback">
                {errors ? (errors[inputName] ? errors[inputName].message : '')?.toString() : ''}
              </div>
    </>
}

export default Select;