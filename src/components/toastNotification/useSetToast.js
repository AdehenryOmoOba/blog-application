import React from 'react'
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Authorization/AuthProvider";


function useSetToast() {
    const {setToastNotofication} = useAuthContext()
    const navigate = useNavigate()

    return  (active, state, message) => {

        setToastNotofication((previous) => {
            return {...previous, active, state, message}
        })
    const toastSetTimeoutID =  setTimeout(() => {
        setToastNotofication({})
      }, 5000);
      navigate('/', {state:{toastSetTimeoutID}})
    }
}

export default useSetToast
