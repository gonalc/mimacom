import { useState, useEffect } from 'react';

/**
 * Hook that makes easy to access the viewport size's changes.
 * @returns Booleans for all the 3 main devices (mobile, tablet, desktop) and the current screen size.
 */
const useScreenSize = () => {
    const mobileBreakpoint = 768;
    const tabletBreakpoint = 1024;
    const [screenSize, setScreenSize] = useState(window.outerWidth);
    const [isDesktop, setIsDesktop] = useState(window.outerWidth > tabletBreakpoint);
    const [isTablet, setIsTablet] = useState(window.outerWidth >= mobileBreakpoint && window.outerWidth < tabletBreakpoint);
    const [isMobile, setIsMobile] = useState(window.outerWidth < mobileBreakpoint);
    useEffect(() => {
        const getSize = () => {
            const width = window.innerWidth;
            setScreenSize(width);
            setIsDesktop(width >= tabletBreakpoint);
            setIsTablet(width >= mobileBreakpoint && width < tabletBreakpoint);
            setIsMobile(width < mobileBreakpoint);
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

export default useScreenSize;
