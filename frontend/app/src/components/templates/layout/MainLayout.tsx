'use client';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, Breadcrumbs, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setNavOpen } from '@/store/features/utils';

import Header from './components/Header';
import Footer from './components/Footer';
import MainWraaper from './components/MainWrapper';

interface Props {
    children?: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
    const theme = useTheme();
    const dispatch = useAppDispatch();

    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const leftDrawerOpened = useAppSelector(state => state.utils.navOpen);

    const handleLeftDrawerToggle = () => {
        dispatch(setNavOpen(!leftDrawerOpened));
    };

    return (
        <Box>
            <CssBaseline />
            {/* header */}
            <AppBar
                enableColorOnDark
                position='fixed'
                color='inherit'
                
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none',
                    zIndex: 999999,
                }}
            >
                <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
            </AppBar>
            <MainWraaper theme={theme}>
                <div className='relative w-full'>{children}</div>
            </MainWraaper>
            <Footer />
        </Box>
    );
};

export default MainLayout;
