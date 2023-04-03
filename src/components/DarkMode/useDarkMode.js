import {useEffect, useState} from 'react';
import {THEME} from "../../constants/localStorage";

export const useDarkMode = () => {
    const [theme, setTheme] = useState('light');

    const setMode = mode => {
        window.localStorage.setItem(THEME, mode);
        setTheme(mode);
    };

    const toggleTheme = () => {
        if (theme === 'dark') {
            if (document.getElementById('root').classList.contains('dark-mode')) {
                document.getElementById('root').classList.add('light-mode');
                document.getElementById('root').classList.remove('dark-mode');
            }
        } else {
            if (document.getElementById('root').classList.contains('light-mode')) {
                document.getElementById('root').classList.add('dark-mode');
                document.getElementById('root').classList.remove('light-mode');
            }
        }
        if (theme === 'light') {
            setMode('dark');
        } else {
            setMode('light');
        }
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem(THEME);

        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme ?
            setMode('dark') :
            localTheme ?
                setTheme(localTheme) :
                setMode('light');
    }, []);

    return [theme, toggleTheme];
};
