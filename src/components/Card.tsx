import React, {ReactNode} from 'react';

interface CardProps {
    children: ReactNode;
}

const Card: React.FC<CardProps> = ({children}) => {
  return (
    <div className='card w-50 mx-auto mt-5'>
        {children}
    </div>
  )
};

export default Card;