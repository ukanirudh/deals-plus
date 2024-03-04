import { StructuresContextData } from "../../Context/PermissionsContext";

interface MergeConfig {
    structureName: string;
    propertyName: string;
    propertyValue: string | boolean;
};

export const getUpdatedStructuresData = (
    curStructuresData: StructuresContextData,
    {
        structureName,
        propertyName,
        propertyValue
    }: MergeConfig
) => {
    const updatedStrutures = { ...curStructuresData, [structureName]: { ...curStructuresData[structureName], [propertyName]: propertyValue } };
    return updatedStrutures;
}