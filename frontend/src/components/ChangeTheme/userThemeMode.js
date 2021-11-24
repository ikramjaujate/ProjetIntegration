import { useEffect, useState } from 'react';
export const useThemeMode = () => {
    const [theme, setTheme] = useState('light');
    const [mountedComponent, setMountedComponent] = useState(false)
    const setMode = mode => {
        window.localStorage.setItem('theme', mode)
        setTheme(mode)
    };

    const themeToggler = (couleur) => {
        couleur === 'light' ? setMode('light') : couleur === 'dark' ? setMode('dark') : setMode('daltonism')
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        localTheme ? setTheme(localTheme) : setMode('light')
        setMountedComponent(true)
    }, []);

    return [theme, themeToggler, mountedComponent]
};