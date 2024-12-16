import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Stack,
    Typography
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { MdLogout, MdOutlineAccountCircle, MdSettings } from 'react-icons/md';
import Button, { ButtonProps } from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import {FaRegEnvelope, FaRegUser, FaUser} from 'react-icons/fa';
import MainCard from '../components/MainCard';
import Transitions from '../components/Transitions';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

// _app.tsx or any specific page/component
import { Inter, Noto_Sans_JP } from 'next/font/google';
import { reset, setArticleStep } from '@/store/features/shared_data';

const inter = Inter({
    subsets: ['latin'], // Specify character subsets (e.g., 'latin', 'latin-ext')
    weight: ['400', '500', '700'], // Optional: specify font weights you need
    variable: '--font-inter', // Optional: define a custom CSS variable for the font
});

const noto_sans_jp = Noto_Sans_JP({
    subsets: ['latin'], // Specify character subsets (e.g., 'latin', 'latin-ext')
    weight: ['400', '500', '700'], // Optional: specify font weights you need
    variable: '--font-noto', // Optional: define a custom CSS variable for the font
})

const ArticleButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    fontWeight: 700,
    padding: '12px 23px',
    lineHeight: '24px',
    backgroundColor: '#00A4E5',
    fontFamily: inter.variable,
    '&:hover': {
      backgroundColor: '#1e88e5',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#1e88e5',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
});

const ArticleButtonOutlined = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    fontWeight: 700,
    padding: '12px 23px',
    lineHeight: '24px',
    backgroundColor: '#fff',
    border: 'solid 1px #1976d2',
    color: '#00A4E5',
    fontFamily: inter.variable,
    '&:hover': {
      backgroundColor: '#1976D20A',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#1976D20A',
      borderColor: '#1976d2',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
});

// ==============================|| PROFILE MENU ||============================== //

const AdminProfileSection = () => {
    const router = useRouter();
    const theme = useTheme();
    const { user, logout } = useAuth();

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const customization = useAppSelector(state => state.utils);
    const articleData = useAppSelector(state => state.shared_data.article_data);
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        logout && logout();
        router.push('/accounts/sign_in');
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListItemClick = (event, index, route = '') => {
        setSelectedIndex(index);
        handleClose(event);
        dispatch(reset())
        if (route && route !== '') {
            router.push(route);
        }
    };
    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const onClickCreateArticle = () => {
        router.push('/members/articles/create_article');
    }

    const gotoNext = () => {
        switch(articleData.cur_step) {
            case 1:
                router.push('/members/articles/create_article2');
            case 2: 
                router.push('/members/articles/create_article3')
        }
    }

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className='flex gap-[32px]'>
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.primary.light,
                    backgroundColor: theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.primary.light,
                        '& svg': {
                            stroke: theme.palette.primary.light,
                            color: `${theme.palette.primary.light}!important`
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                label={<FaRegEnvelope size='1.5rem' color={theme.palette.primary.main} />}
                variant='outlined'
                ref={anchorRef}
                aria-haspopup='true'
                color='primary'
            />
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.primary.light,
                    backgroundColor: theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.primary.light,
                        '& svg': {
                            stroke: theme.palette.primary.light,
                            color: `${theme.palette.primary.light}!important`
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                label={<FaRegUser size='1.5rem' color={theme.palette.primary.main} />}
                variant='outlined'
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup='true'
                onClick={handleToggle}
                color='primary'
            />
            {articleData.cur_step == 0 && <ArticleButton variant="contained" startIcon={<EditIcon />}  onClick={onClickCreateArticle}>記事投稿</ArticleButton>}
            {articleData.cur_step == 1 && <div className='flex items-center gap-2'>
                <ArticleButtonOutlined variant="outlined">下書き保存</ArticleButtonOutlined>
                <ArticleButton variant="contained" onClick={()=>gotoNext()}>次のステップへ</ArticleButton>
            </div>}
            <Popper
                placement='bottom-start'
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard
                                    border={false}
                                    elevation={16}
                                    content={false}
                                    boxShadow
                                    shadow={theme.shadows[16]}
                                >
                                    <Box sx={{ p: 2 }}>
                                        <List
                                            component='nav'
                                            sx={{
                                                width: '100%',
                                                maxWidth: 284,
                                                minWidth: 250,
                                                backgroundColor: theme.palette.background.paper,
                                                borderRadius: '10px',
                                                [theme.breakpoints.down('md')]: {
                                                    minWidth: '100%'
                                                },
                                                '& .MuiListItemButton-root': {
                                                    mt: 0.5
                                                }
                                            }}
                                        >
                                            <ListItemButton
                                                sx={{
                                                    borderRadius: `${customization.borderRadius}px`,
                                                    paddingX: '29px',
                                                    paddingY: '8px',
                                                    fontFamily: noto_sans_jp.variable,
                                                    fontSize: '16px',
                                                }}
                                                selected={selectedIndex === 0}
                                                onClick={event =>
                                                    handleListItemClick(event, 0, '/accounts/my_page')
                                                }
                                            >
                                                <ListItemText
                                                    primary={
                                                        <Typography variant='body2'>マイページ</Typography>
                                                    }
                                                />
                                            </ListItemButton>
                                            <ListItemButton
                                                sx={{
                                                    borderRadius: `${customization.borderRadius}px`,
                                                    paddingX: '29px',
                                                    paddingY: '8px',
                                                    fontFamily: noto_sans_jp.variable
                                                }}
                                                selected={selectedIndex === 0}
                                                onClick={event =>
                                                    handleListItemClick(event, 0, '/accounts/sales')
                                                }
                                            >
                                                <ListItemText
                                                    primary={
                                                        <Typography variant='body2'>売上管理</Typography>
                                                    }
                                                />
                                            </ListItemButton>
                                            <ListItemButton
                                                sx={{
                                                    borderRadius: `${customization.borderRadius}px`,
                                                    paddingX: '29px',
                                                    paddingY: '8px',
                                                    fontFamily: noto_sans_jp.variable
                                                }}
                                                selected={selectedIndex === 0}
                                                onClick={event =>
                                                    handleListItemClick(event, 0, '/accounts/settings')
                                                }
                                            >
                                                <ListItemText
                                                    primary={
                                                        <Typography variant='body2'>アカウント設定</Typography>
                                                    }
                                                />
                                            </ListItemButton>
                                            <ListItemButton
                                                sx={{
                                                    borderRadius: `${customization.borderRadius}px`,
                                                    paddingX: '29px',
                                                    paddingY: '8px',
                                                    fontFamily: noto_sans_jp.variable
                                                }}
                                                selected={selectedIndex === 4}
                                                onClick={handleLogout}
                                            >
                                                <ListItemText
                                                    primary={<Typography variant='body2'>ログアウト</Typography>}
                                                />
                                            </ListItemButton>
                                        </List>
                                    </Box>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </div>
    );
};

export default AdminProfileSection;
