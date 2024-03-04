import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import { APP_LABELS } from '../../constants/labels';
import PermissionsApi from '../../__fakeapi__/PermissionsApi';
import { Structures as StructuresType, AllRoles } from '../../types';
import { usePersmissionContext } from '../../Context/PermissionsContext';
import { SearchToolBar } from './Structures.Styled';
import StructuresList from './StructuresList';

const getGeneratedStructuresData = (allStructures: StructuresType) => {
    let generatedStructureData: { [key: string]: { isSelected: boolean, selectedRole: AllRoles } } = {};
    allStructures.forEach((structureName) => {
        generatedStructureData[structureName] = {
            isSelected: false,
            selectedRole: AllRoles.NO_ACCESS
        }
    });
    return generatedStructureData;
}

const Structures = (): ReactElement => {
    const [structures, setStructures] = useState<StructuresType>([]);
    const [filteredStructures, setFilteredStructures] = useState<StructuresType>([]);
    const { setPermissionsState } = usePersmissionContext();

    useEffect(() => {
        const fetchStructures = async () => {
            try {
                const allStructures = await PermissionsApi.getStructures();
                setPermissionsState((prev) => ({ ...prev, structuresData: getGeneratedStructuresData(allStructures) }))
                setStructures(allStructures);
                setFilteredStructures(allStructures);
            } catch (e) {

            }
        }
        fetchStructures();
    }, []);

    const onSearch = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const searchStr = e.target.value;
        if (searchStr) {
            const searchMatches = structures.filter((structure) => structure.toLowerCase().includes(searchStr.toLowerCase()));
            setFilteredStructures(searchMatches);
        } else {
            setFilteredStructures(structures);
        }
    }

    return (
        <>
            <Typography variant="h6" gutterBottom>
                {APP_LABELS.structures_step.title}
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
                {APP_LABELS.structures_step.helper_text}
            </Typography>
            <SearchToolBar>
                <TextField
                    sx={{ flex: 1 }}
                    label="Search"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    onChange={onSearch}
                />
                <Typography variant="body2" gutterBottom>{filteredStructures.length}</Typography>
            </SearchToolBar>
            <StructuresList structuresToDsiplay={filteredStructures} />
        </>
    )
}

export default Structures;