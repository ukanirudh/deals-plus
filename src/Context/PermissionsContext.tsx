import React, { useContext, useState, createContext , ReactElement, ReactNode } from 'react'

const PermissionContext = createContext({});

const usePersmissionContext = () => useContext(PermissionContext);

const PermissionContextWrapper = ({children}: { children: ReactNode }): ReactElement => {
    const [permissionState, setPermissionsState] = useState({});

    return (
        <PermissionContext.Provider value={{permissionState, setPermissionsState}}>
            {children}
        </PermissionContext.Provider>
    )
}

export default PermissionContextWrapper;