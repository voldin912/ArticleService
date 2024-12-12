import { ButtonBase, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import config from '@/store/config';
import { FaUser } from 'react-icons/fa';
import { MdWidthFull } from 'react-icons/md';

const LogoSection = () => {
    const theme = useTheme();

    return (
        <ButtonBase disableRipple component={'a'} href={config.defaultPath} >
            <Chip
                sx={{
                    height: '90px',
                    width: '90px',
                    alignItems: 'center',
                    borderRadius: '50%',
                    transition: 'all .2s ease-in-out',
                    backgroundColor: '#3B7B4A',
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        color: theme.palette.primary.light,
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                label={<FaUser size='40px' color={'#fff'} />}
                variant='outlined'
                aria-controls={'menu-list-grow'}
                aria-haspopup='true'
                color='primary'
            />
        </ButtonBase>
    );
};

export default LogoSection;
