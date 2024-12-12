import { styled } from '@mui/material';
import { drawerWidth } from '@/store/constant';

interface Props {
    open: boolean;
    theme: any;
}

const MainWraaper = styled('main', { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }: Props) => ({
    ...theme.typography.mainContent,
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `100%`,
            padding: '0px',
            marginTop: '162px',
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `100%`,
            padding: '0px',
            marginRight: '10px',
            marginTop: '162px',
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderRadius: '0px',
        backgroundColor: '#FFF',
        width: `100%`,
        marginTop: '162px',
        padding: '0px',
        minHeight: '450px'
    })
}));

export default MainWraaper;
