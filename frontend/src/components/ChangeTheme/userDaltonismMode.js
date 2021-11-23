import { useEffect, useState } from 'react';
export const useDaltonismkMode = () => {
    console.log("useDaltonsim");
    const [theme, setTheme] = useState('clair');
    const [mountedComponent, setMountedComponent] = useState(false)
    const setMode = mode => {
        window.localStorage.setItem('theme', mode)
        setTheme(mode)
    };

    const themeToggler = () => {
        console.log("theme dalto : ", theme)
        theme === 'clair' ? setMode('daltonism') : setMode('clair')
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        console.log("local : ", localTheme);
        localTheme === "light" || localTheme === "clair" ? setTheme(localTheme) : setMode('clair')
        // localTheme==="daltonism" ? setMode(localTheme) : setMode('clair')
        setMountedComponent(true)
    }, []);
    return [theme, themeToggler, mountedComponent]
};

