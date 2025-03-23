import { createContext, useEffect, useState } from "react";

export const AppContent = createContext()

export const AppContextProvider =(props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL



    const [isLoggedin, setIsLoggedin]= useState(localStorage.getItem('isLogin') === 'true')
    const [userData, setUserData]= useState(() => {
        const user = localStorage.getItem('userData')
        return user ? JSON.parse(user) : null
    })

    console.log(userData);
    
    
    useEffect(() => {

        localStorage.setItem('isLogin' , isLoggedin)

        if(userData){
            localStorage.setItem('userData' , JSON.stringify(userData))
        }else{
            localStorage.removeItem('userData')
        }

    } , [isLoggedin , userData])
    
    const value ={
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData
    }

    return(
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}
