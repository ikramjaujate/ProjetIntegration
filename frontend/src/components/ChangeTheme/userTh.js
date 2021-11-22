import { useEffect, useState } from 'react';
export const useTh = () => {
    const [theme, setTheme] = useState('light');
    const [mountedComponent, setMountedComponent] = useState(false)
    const setMode = mode => {
        //console.log("setmode : ", mode)
        window.localStorage.setItem('theme', mode)
        setTheme(mode)
    };

    const themeToggler = (couleur) => {
        console.log("theme th : ", couleur)
        couleur === 'light' ? setMode('light') : couleur === 'dark' ? setMode('dark') : setMode('daltonism')
        //console.log("valeur après : ", window.localStorage.getItem('theme'))
        // theme === 'light' ? setMode('dark') : setMode('light')
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        console.log("theme initial : ", localTheme)
        localTheme ? setTheme(localTheme) : setMode('light')
        setMountedComponent(true)
    }, []);

    return [theme, themeToggler, mountedComponent]
};