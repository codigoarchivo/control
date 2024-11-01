import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface IFormInput {
  name: string;
  name_process: string;
  type: string;
  msg_error: string;
  error_type: string;
  required: boolean;
  minLength?: number;
  // method
  register: UseFormRegister<any>;
}

export const FormInput = (props: IFormInput) => {
  const { minLength = 0 } = props;
  return (
    <div className={props.type === 'checkbox' ? 'flex items-center gap-6' : 'block'}>
      <label htmlFor={props.name_process} className='block text-sm font-medium w-full'>
        {props.name}
      </label>
      <input
        {...props.register(props.name_process, {
          required: props.required,
          minLength,
        })}
        type={props.type}
        name={props.name_process}
        id={props.name_process}
        className={`${ props.type === 'checkbox' ? 'w-6 h-6 text-left' : 'shadow-custom1 bg-white text-gray-500'} w-full rounded-md border border-textPrimary py-3 px-6 text-base font-medium  outline-none focus:border-primary transition duration-500 ease-in-out transform`}
        min={minLength}
      />
    </div>
  );
};
