import { useState, useEffect } from 'react';

export default () => {
    const [screenSize, setScreenSize] = useState(window.outerWidth);
    const [isDesktop, setIsDesktop] = useState(window.outerWidth > 1024);
    const [isTablet, setIsTablet] = useState(window.outerWidth >= 768 && window.outerWidth < 1024);
    const [isMobile, setIsMobile] = useState(window.outerWidth < 768);
    useEffect(() => {
        const getSize = () => {
            const width = window.innerWidth;
            setScreenSize(width);
            setIsDesktop(width >= 1024);
            setIsTablet(width >= 768 && width < 1024);
            setIsMobile(width < 768);
        }
        window.addEventListener('resize', getSize);
        return () => window.removeEventListener('resize', getSize);
    });
    return {
        screenSize,
        isDesktop,
        isTablet,
        isMobile,
    }
}