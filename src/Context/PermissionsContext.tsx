import React, { useContext, useState, createContext, ReactElement, ReactNode } from 'react'
import { Roles } from '../types';

interface PermissionState {
    groupName: string;
    structuresData: { [key: string]: Roles }
    users: { [key: string]: boolean }
}

interface ContextProps {
    permissionState: PermissionState | null;
    setPermissionsState: any;
}

const PermissionContext = createContext<ContextProps>({ permissionState: null, setPermissionsState: null });

export const usePersmissionContext = (): ContextProps => useContext(PermissionContext);

const PermissionContextWrapper = ({ children }: { children: ReactNode }): ReactElement => {
    const [permissionState, setPermissionsState] = useState({ groupName: '', structuresData: {}, users: {} });

    return (
        <PermissionContext.Provider value={{ permissionState, setPermissionsState }}>
            {children}
        </PermissionContext.Provider>
    )
}

export default PermissionContextWrapper;