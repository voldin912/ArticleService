import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';
import { drawerWidth } from '@/store/constant';

import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import MenuList from './MenuList';
import LogoSection from './Logo';
import { useAuth } from '@/contexts/AuthContext';

interface Props {
    drawerOpen: boolean;
    drawerToggle: () => void;
    window?: any;
}

const Sidebar = ({ drawerOpen, drawerToggle, window }: Props) => {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const { user } = useAuth();
    const drawer = (
        <>
            <Box sx={{ display: { xs: 'block' } }}>
                <Box sx={{ display: 'flex', p: 2, mx: 'auto', width: 'fit-content' }}>
                    <div className='flex flex-col items-center'>
                        <LogoSection />
                        <h3 className='text-[20px] font-bold mt-[4px] p-2'>{user?.user_info.name}</h3>
                        <div className='flex gap-[16px] p-2'>
                            <div className='flex'>
                                <div>{1}</div>
                                <div>フォロー</div>
                            </div>
                            <div className='flex'>
                                <div>{1}</div>
                                <div>フォロワー</div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Box>
            <BrowserView>
                <MenuList />
            </BrowserView>
            <MobileView>
                <Box sx={{ px: 2 }}>
                    <MenuList />
                </Box>
            </MobileView>
        </>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Box
            component='nav'
            sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }}
            aria-label='mailbox folders'
        >
            <Drawer
                container={container}
                variant={matchUpMd ? 'persistent' : 'temporary'}
                open={drawerOpen}
                onClose={drawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        background: '#F2F8FC',
                        color: theme.palette.text.primary,
                        position:'relative',
                        borderRight: 'none',
                        zIndex:99,
                        [theme.breakpoints.up('md')]: {
                            top: '72px'
                        }
                    }
                }}
                ModalProps={{ keepMounted: true }}
                color='inherit'
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default Sidebar;
