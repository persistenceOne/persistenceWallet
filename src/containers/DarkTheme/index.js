import React from 'react';
import {useDarkMode} from '../../components/DarkMode/useDarkMode';
import {darkTheme, lightTheme} from '../../components/DarkMode/theme';
import {GlobalStyles} from '../../components/DarkMode/global';
import {ThemeProvider} from 'styled-components';
import Icon from "../../components/Icon";

const Darktheme = () => {
    const [theme, toggleTheme] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;
    return (
        <ThemeProvider theme={themeMode}>
            <GlobalStyles/>
            <button onClick={toggleTheme} className="dark-mode-button"
                title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
                <Icon
                    viewClass="icon"
                    icon={theme === 'light' ? 'dayMode' : 'darkMode'}
                />
            </button>
        </ThemeProvider>
    );
};

export default Darktheme;
