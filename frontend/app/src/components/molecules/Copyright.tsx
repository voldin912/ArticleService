import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

interface Props {
    sx: any;
}

const Copyright = ({ sx }: Props) => {
    return (
        <Typography variant='body2' color='text.primary' align='center' sx={sx}>
            {'Copyright © '}
            <Link color='inherit' href='#'>
                投稿ランド
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

export default Copyright;
