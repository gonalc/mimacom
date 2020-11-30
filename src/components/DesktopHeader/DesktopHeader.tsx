import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { COLORS } from '../../data';
import './DesktopHeader.scss';

type DesktopHeaderProps = {
    favOn: boolean;
    toggleFav: () => void;
}

const DesktopHeader = ({ favOn,toggleFav }: DesktopHeaderProps) => {
    return (
        <div className='DesktopHeader'>
            <div
                className="icon-container"
                onClick={() => toggleFav()}
                title="Click to toggle the favorite products list"
            >
                <FontAwesomeIcon
                    icon={faHeart}
                    style={{ color: favOn ? COLORS.red : COLORS.darkGray }}
                />
            </div>
            <h1>Welcome to our shop!</h1>
        </div>
    );
};

export default DesktopHeader;