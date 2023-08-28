import React from 'react';

interface ButtonProps {
    btnLabel: string;
}

const Button: React.FC<ButtonProps> = ({btnLabel}) => {
    return (
        <div className='d-flex justify-content-center'>
            <button className='btn btn-small'
                    style={{backgroundColor: 'var(--green)', color: 'var(--white)', fontSize: 'var(--text-size)'}}>
                {btnLabel}
            </button>
        </div>
    )
};

export default Button;