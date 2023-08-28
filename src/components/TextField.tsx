import React from 'react';
import {useForm} from 'react-hook-form';

interface TextFieldProps {
    labelText?: string;
    id: string;
    type: string;
    name: string;
    value: string;
    ariaLabel: string;
    placeholder?: string;
    autoComplete?: string;
    registerProps?: any;
    handleOnchange: (e: React.ChangeEvent<HTMLInputElement>, index?: number) => void;
}

const TextField: React.FC<TextFieldProps> = ({labelText,
                                                      id,
                                                      type,
                                                      name,
                                                      value,
                                                      placeholder,
                                                      autoComplete,
                                                      ariaLabel,
                                                      registerProps,
                                                      handleOnchange}) => {
    const {register} = useForm();

    return (
        <div className='mb-3'>
            <label htmlFor={id} className='form-label' style={{fontSize: 'var(--label-size)'}}>
                {labelText}
            </label>
            <input id={id}
                       type={type}
                       {...registerProps}
                       className='form-control'
                       aria-label={ariaLabel}
                       autoComplete={autoComplete}
                       placeholder={placeholder}
                       value={value}
                       onChange={handleOnchange}
                       style={{fontSize: 'var(--text-size)'}} />
        </div>
    )
};

export default TextField;