import { styled } from '@mui/system';


const drawerWidth = 240;
export const NavDrawerStyles = styled('nav')(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
        
    },
    "& .paper": {
       width: drawerWidth,
      
    }
}));