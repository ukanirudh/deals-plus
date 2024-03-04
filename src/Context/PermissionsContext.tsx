import React, { useContext, useState, createContext, ReactElement, ReactNode, Dispatch, SetStateAction } from 'react'
import { AllRoles } from '../types';

export type StructuresContextData = { [key: string]: { isSelected: boolean, selectedRole: AllRoles } };

interface PermissionState {
    groupName: string;
    structuresData: StructuresContextData;
    users: { [key: string]: boolean }
}

interface ContextProps {
    permissionState: PermissionState | null;
    setPermissionsState: Dispatch<SetStateAction<PermissionState>>;
}

const PermissionContext = createContext<ContextProps>({ permissionState: null, setPermissionsState: () => { } });

export const usePersmissionContext = (): ContextProps => useContext(PermissionContext);

const PermissionContextWrapper = ({ children }: { children: ReactNode }): ReactElement => {
    const [permissionState, setPermissionsState] = useState<PermissionState>({ groupName: '', structuresData: {}, users: {} });

    return (
        <PermissionContext.Provider value={{ permissionState, setPermissionsState }}>
            {children}
        </PermissionContext.Provider>
    )
}

export default PermissionContextWrapper;