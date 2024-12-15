import { FormEvent, useEffect, useRef, useState } from 'react';
import { postFormdata, postRequest } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { Avatar, Button, Chip, styled, TextField } from '@mui/material';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import AdminLayout from '@/components/templates/layout/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';
import { FaAngleLeft, FaAngleRight, FaUpload, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { appendMessage } from '@/store/features/utils';

const inter = Inter({
    subsets: ['latin'], // Specify character subsets (e.g., 'latin', 'latin-ext')
    weight: ['400', '500', '700'], // Optional: specify font weights you need
    variable: '--font-inter' // Optional: define a custom CSS variable for the font
});

const ArticleButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    fontWeight: 600,
    padding: '8px 50px',
    lineHeight: '24px',
    backgroundColor: '#00A4E5',
    fontFamily: inter.variable,
    '&:hover': {
        backgroundColor: '#1e88e5',
        boxShadow: 'none'
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#1e88e5',
        borderColor: '#005cbf'
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)'
    }
});

const ProfileTextSettingsPage = () => {
    const { user, updateUser } = useAuth();
    const [text, setText] = useState('')
    const [textErr, setTextErr] = useState(false)
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("****",user?.user_info)
        if(user?.user_info.profile_text)
            setText(user.user_info.profile_text)
    }, []);

    const handleBack = () => {
        router.push('/accounts/settings');
    };

    const handleTextUpdate = async () => {
        setTextErr(false)
        if (!text) {
            setTextErr(true);
            return;
        }
        const formData = new FormData();
        formData.append('profile_text', text);
        const res = await postRequest('/profile/text', formData);
        if (res.status == 200) {
            console.log("****",res.data)
            updateUser && updateUser(res.data, () => {
                dispatch(appendMessage({ type: 'success', message: 'プロフィール文章が正常に変更されました!' }));
            })
        }
        if (res.status == 422 && res.data.errors) {
            console.log("****voldin err****",res.data.errors)
        }
    };

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin', 'member']}>
                <AdminLayout>
                    <h2 className='font-bold text-[28px] py-2'>アカウント管理</h2>
                    <MainPannel>
                        <button
                            className='text-[20px] px-[80px] py-2 flex items-center cursor-pointer font-noto-sans text-lg font-normal leading-[46px] tracking-[0.1em] text-[#00000080]'
                            onClick={() => handleBack()}
                        >
                            <FaAngleLeft className='pt-[4px]' /> 戻る
                        </button>
                        <div className='p-[24px_80px]'>
                            <div className='flex justify-between items-center text-[18px] pb-[12px] w-full border-b border-solid'>
                                <div className='flex items-center gap-[12px] w-full'>
                                    <h4 className='font-bold text-[18px] w-[250px]'>プロフィール文章</h4>
                                    <TextField
                                        label='プロフィール文章'
                                        variant='outlined'
                                        multiline
                                        fullWidth 
                                        value={text}
                                        onChange={e=>setText(e.target.value)}
                                        error={textErr}
                                        helperText={textErr ? 'プロフィール文章を入力してください。' : ''}
                                    />
                                    
                                </div>
                            </div>
                            <div className='flex items-center justify-center py-5'>
                                <ArticleButton
                                    variant='contained'
                                    onClick={handleTextUpdate}
                                >
                                    変更
                                </ArticleButton>
                            </div>
                        </div>
                    </MainPannel>
                </AdminLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default ProfileTextSettingsPage;
