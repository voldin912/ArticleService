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

const UserNameSettingsPage = () => {
    const { user, updateUser } = useAuth();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [first_name_furi, setFirstNameFuri] = useState('');
    const [last_name_furi, setLastNameFuri] = useState('');
    const [first_name_err, setFirstNameErr] = useState(false);
    const [last_name_err, setLastNameErr] = useState(false);
    const [first_name_furi_err, setFirstNameFuriErr] = useState(false);
    const [last_name_furi_err, setLastNameFuriErr] = useState(false);

    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user?.user_info) {
            setFirstName(user?.user_info.first_name);
            setFirstNameFuri(user?.user_info.first_name_furi);
            setLastName(user?.user_info.last_name);
            setLastNameFuri(user?.user_info.last_name_furi);
        }
    }, []);

    const handleBack = () => {
        router.push('/accounts/settings');
    };

    const handleUserNameUpdate = async () => {
        let hasError = false;

        // Reset error states before validation
        setFirstNameErr(false);
        setLastNameErr(false);
        setFirstNameFuriErr(false);
        setLastNameFuriErr(false);
        // Validate each field
        if (!first_name) {
            setFirstNameErr(true);
            hasError = true;
        }
        if (!last_name) {
            setLastNameErr(true);
            hasError = true;
        }
        if (!first_name_furi) {
            setFirstNameFuriErr(true);
            hasError = true;
        }
        if (!last_name_furi) {
            setLastNameFuriErr(true);
            hasError = true;
        }

        // If any error exists, do not proceed
        if (hasError) {
            console.log("***err")
            return;
        }
        const formData = new FormData();
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('first_name_furi', first_name_furi);
        formData.append('last_name_furi', last_name_furi);

        const res = await postRequest('/profile/name', formData);
        if (res.status == 200) {
            updateUser && updateUser(res.data, () => {
                dispatch(appendMessage({ type: 'success', message: 'ユーザー名が正常に変更されました!' }));
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
                                <div className='flex items-center gap-[12px]'>
                                    <h4 className='font-bold text-[18px] w-[250px]'>ユーザー名</h4>
                                    <TextField
                                        label='姓'
                                        variant='outlined'
                                        value={last_name}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setLastName(event.target.value);
                                        }}
                                        error={last_name_err}
                                        helperText={last_name_err ? '姓を入力してください。' : ''}
                                    />
                                    <TextField
                                        label='名'
                                        variant='outlined'
                                        value={first_name}
                                        onChange={e => setFirstName(e.target.value)}
                                        error={first_name_err}
                                        helperText={first_name_err ? '名を入力してください。' : ''}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-between items-center text-[18px] pt-[16px] pb-[12px] w-full border-b border-solid'>
                                <div className='flex items-center gap-[12px]'>
                                    <h4 className='font-bold text-[18px] w-[250px]'>ユーザー名(ふりがな)</h4>
                                    <TextField
                                        label='姓'
                                        variant='outlined'
                                        value={last_name_furi}
                                        onChange={e => setLastNameFuri(e.target.value)}
                                        error={last_name_furi_err}
                                        helperText={last_name_furi_err ? '姓を入力してください。' : ''}
                                    />
                                    <TextField
                                        label='名'
                                        variant='outlined'
                                        value={first_name_furi}
                                        onChange={e => setLastNameFuri(e.target.value)}
                                        error={first_name_furi_err}
                                        helperText={first_name_furi_err ? '名を入力してください。' : ''}
                                    />
                                </div>
                            </div>
                            <div className='flex items-center justify-center py-5'>
                                <ArticleButton
                                    variant='contained'
                                    onClick={handleUserNameUpdate}
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

export default UserNameSettingsPage;
