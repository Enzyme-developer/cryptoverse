import { createContext, useState, useEffect } from 'react'

//type named ThemeName
type ThemeName = 'light' | 'dark' | string

type ThemeContextType = {
  //type referencing type ThemeName
  theme: ThemeName 
  setTheme: React.Dispatch<React.SetStateAction<string>>
}


const getInitialTheme = () => {
  //check if window is not undefined and if there is local storage
  if (typeof window !== 'undefined' && window.localStorage) {
    //get the stored user preference color-theme
    const storedPrefs = window.localStorage.getItem('color-theme')
    //return if it is a string
    if (typeof storedPrefs === 'string') {
      return storedPrefs
    }

    //match users media with dark theme
    const userMedia = window.matchMedia('(prefers-color-scheme:dark)')
    //if theme matches, return dark, else return light
    if (userMedia.matches) {
      return 'dark'
    }
  }
  // returning default theme here
  return 'light'
}



//give ThemeContext type of ThemeContext
export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)


//create theme provider
export const ThemeProvider: ({ initialTheme, children }: {
  initialTheme?: any;
  children: any;
}) => JSX.Element = ({ initialTheme, children }) => {

  const [ theme, setTheme ] = useState(getInitialTheme)


  const rawSetTheme = (theme:string) => {
    //Updated rawSetTheme to theme above
    const root = window.document.documentElement
    const isDark = theme === 'dark'

    root.classList.remove(isDark ? 'light' : 'dark')
    root.classList.add(theme)
    //set local storage theme to the theme gotten
    localStorage.setItem('color-theme', theme)
  }

  if (initialTheme) {
    rawSetTheme(initialTheme)
  }

  useEffect(() => {
    rawSetTheme(theme)
  }, [theme])

  
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
