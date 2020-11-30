import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './MobileHeader.scss';
import { faAngleLeft, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from '../../data';

type MobileHeaderProps = {
    toggleCart: () => void;
    title?: string;
    cartOn?: boolean;
    favOn?: boolean;
    toggleFav: () => void;
}

const MobileHeader = ({
    toggleCart,
    title,
    cartOn,
    favOn,
    toggleFav,
}: MobileHeaderProps) => {

    /**
     * Close the cart when opened.
     * Toggle Fav list when closed.
     */
    const handleLeftIcon = () => {
        if (cartOn) toggleCart();
        else toggleFav();
    };

    return (
        <div className='MobileHeader'>
            <div className="arrow-back" onClick={() => handleLeftIcon()}>
                <FontAwesomeIcon
                    style={{ color: (favOn && !cartOn) ? COLORS.red : COLORS.darkGray }}
                    icon={cartOn ? faAngleLeft : faHeart}
                />
            </div>
            <h1>{title || 'Header'}</h1>
            <div
                className={`arrow-back ${cartOn ? 'hide' : ''}`}
                onClick={() => toggleCart()}
            >
                <FontAwesomeIcon
                    style={{ color: COLORS.darkGray }}
                    icon={faShoppingCart}
                />
            </div>
        </div>
    );
};

export default MobileHeader;