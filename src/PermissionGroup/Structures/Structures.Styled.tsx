import { styled } from '@mui/material/styles';

export const SearchToolBar = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(4),
    margin: `${theme.spacing(2)} 0`,
}));