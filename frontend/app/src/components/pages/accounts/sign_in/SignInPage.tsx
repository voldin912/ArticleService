import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentItemValue } from '@/store/features/login';
import { appendMessage } from '@/store/features/utils';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Copyright from '@/components/molecules/Copyright';
import MainLayout from '@/components/templates/layout/MainLayout';

const SignInPage = () => {
    const router = useRouter();
    const { login } = useAuth();
    const dispatch = useAppDispatch();

    const currentItem = useAppSelector(state => state.login.item.form);
    const errors = useAppSelector(state => state.login.item.errors);

    const searchParams = new URLSearchParams(window.location.search);
    const redirectTo = searchParams.get('redirect_to') || '/accounts/my_page';

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        login &&
            (await login(currentItem, user => {
                if (user) {
                    router.push(redirectTo);
                    dispatch(appendMessage({ type: 'success', message: 'ログインしました。' }));
                } else {
                    dispatch(appendMessage({ type: 'error', message: 'IDまたはパスワードが間違っています。' }));
                }
            }));
    };

    return (
        <MainLayout>
            <div className='w-full flex items-center justify-center'>
                <Container component='main' maxWidth='xs'>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#2196f3', color: 'white' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component='h1' variant='h1'>
                            投稿ランド
                        </Typography>
                        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                label='メールアドレス'
                                name='email'
                                autoComplete='email'
                                autoFocus
                                value={currentItem.email}
                                onChange={e => dispatch(setCurrentItemValue({ email: e.target.value }))}
                                error={errors.email ? true : false}
                                helperText={errors.email ? errors.email : ''}
                            />
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                name='password'
                                label='パスワード'
                                type='password'
                                autoComplete='current-password'
                                value={currentItem.password}
                                onChange={e => dispatch(setCurrentItemValue({ password: e.target.value }))}
                                error={errors.password ? true : false}
                                helperText={errors.password ? errors.password : ''}
                            />
                            <Button type='submit' fullWidth variant='contained' color='primary' sx={{ mt: 3, mb: 2 }}>
                                ログイン
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href='/accounts/password/forgot' variant='body2' color='primary'>
                                        パスワードをお忘れですか？
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </div>
        </MainLayout>
    );
};

export default SignInPage;
