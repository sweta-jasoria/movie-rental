import React from 'react';
import {BsHeart, BsHeartFill} from 'react-icons/bs';

interface LikeIconProps {
    liked: boolean;
    handleLikeIcon: () => void;
}

const LikeIcon: React.FC<LikeIconProps> = ({liked, handleLikeIcon}) => {
    return (
        <>
            {
                liked === true ? <BsHeartFill color='var(--red)'
                                              size='12'
                                              style={{cursor: 'pointer'}}
                                              onClick={handleLikeIcon} />
                               : <BsHeart color='var(--red)'
                                          size='12'
                                          style={{cursor: 'pointer'}}
                                          onClick={handleLikeIcon} />
            }
        </>
    )
};

export default LikeIcon;