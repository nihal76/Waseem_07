import React, { createContext, useState } from 'react'

  // context
     const Globalstate = createContext()

export const ContextProvider = ({children}) => {
    // initial state
    const [user, setuser] = useState({
      username: null,
      profile: null,
      isLoggedIn : false
    });
  return (
     <Globalstate.Provider value = {{user,setuser}}>
               {children}
     </Globalstate.Provider>
  )
}

export default Globalstate