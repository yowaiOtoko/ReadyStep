import { createContext, useState } from "react";

const SessionProvider = ({children}) => {

    const [taskState, setTaskState] = useState({});
    const [session, setSession] = useState({});

    const SessionContext = createContext();

    return (
        <SessionContext.Provider value={{
            taskState,
            setTaskState,
            session,
            setSession
        }}>
            {children}
        </SessionContext.Provider>
    )
}

export default SessionProvider;

