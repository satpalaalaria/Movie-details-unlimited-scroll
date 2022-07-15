import Link from "next/link"
import { useEffect, useState } from 'react';

function Header() {
    const [darkTheme, setDarkTheme] = useState(undefined);

    const handleToggle = (event) => {
        setDarkTheme(event.target.checked);
    };

    useEffect(() => {
        if (darkTheme !== undefined) {
            if (darkTheme) {
                document.documentElement.setAttribute('data-theme', 'dark');
                window.localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
                window.localStorage.setItem('theme', 'light');
            }
        }
    }, [darkTheme]);

    useEffect(() => {
        const root = window.document.documentElement;
        const initialColorValue = root.style.getPropertyValue(
            '--initial-color-mode'
        );
        setDarkTheme(initialColorValue === 'dark');
    }, []);
    return (
        <div className="header-class">
            <Link href='/'>
                <a className="header-a">Movies</a>
            </Link>
            <div>
                {darkTheme !== undefined && (
                    <form action="#">
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={darkTheme}
                                onChange={handleToggle}
                            />
                            <span className="slider round"></span>
                        </label>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Header;
