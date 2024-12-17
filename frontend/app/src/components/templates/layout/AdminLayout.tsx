'use client';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setNavOpen } from '@/store/features/utils';

import { MdChevronRight } from 'react-icons/md';

import navigation from '../navigations';
import Breadcrumbs from './components/Breadcrumbs';
import MainWraaper from './components/MainWrapper';
import Header from './components/Header';
import Sidebar from './components/SideBar';
import AdminWrapper from './components/AdminWrapper';
import AdminHeader from './components/AdminHeader';
import zIndex from '@mui/material/styles/zIndex';

interface Props {
    children?: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
    const theme = useTheme();
    const dispatch = useAppDispatch();

    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const leftDrawerOpened = useAppSelector(state => state.utils.navOpen);

    const handleLeftDrawerToggle = () => {
        dispatch(setNavOpen(!leftDrawerOpened));
    };

    return (
        <Box sx={{ display: 'flex', background: '#F2F8FC' }}>
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
                    zIndex: 100,
                }}
            >
                <AdminHeader handleLeftDrawerToggle={handleLeftDrawerToggle} />
            </AppBar>
            <div className='flex max-w-[1440px] w-full mx-auto mt-[162px] bg-[#F2F8FC] p-[0px_94px_0px]'>
                <Sidebar
                    drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened}
                    drawerToggle={handleLeftDrawerToggle}
                />

                <AdminWrapper theme={theme} >
                    <Breadcrumbs separator={MdChevronRight} navigation={navigation} icon title rightAlign />
                    <div className='relative w-full'>{children}</div>
                </AdminWrapper>
            </div>
        </Box>
    );
};

export default AdminLayout;
