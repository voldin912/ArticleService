import { FormEvent, useEffect, useRef, useState } from 'react';
import { postFormdata, postRequest } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrentItem, setError } from '@/store/features/user';

import { Avatar, Button, Chip, styled } from '@mui/material';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import AdminLayout from '@/components/templates/layout/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';
import { FaAngleLeft, FaAngleRight, FaUpload, FaUser } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { appendMessage } from '@/store/features/utils';

const inter = Inter({
    subsets: ['latin'], // Specify character subsets (e.g., 'latin', 'latin-ext')
    weight: ['400', '500', '700'], // Optional: specify font weights you need
    variable: '--font-inter', // Optional: define a custom CSS variable for the font
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

const AvatarSettingsPage = () => {
    const { user, updateUser } = useAuth();
    const [avatar, setAvatar] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useAppDispatch();

    useEffect(()=> {
        console.log(user?.user_info.avatar)
        if(user?.user_info.avatar)
        setPreview(process.env.NEXT_PUBLIC_BACKEND_URL+user?.user_info.avatar)
    },[])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setAvatar(file);
          setPreview(URL.createObjectURL(file));
        }
    };

    const handleBack = () => {
        router.push('/accounts/settings')
    }

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleUpload = async () => {
        if (!avatar) {
            alert("Please select an avatar file.");
            return;
        }
        const formData = new FormData();
        formData.append("avatar", avatar);
        setUploading(true);
        const res = await postFormdata(`/upload-avatar`, formData);
        if (res.status == 200) {
            updateUser && updateUser(res.data, () => {
                dispatch(appendMessage({ type: 'success', message: 'プロフィール画像が正常に変更されました!' }));
            })
        }
        if (res.status == 422 && res.data.errors) {
            console.log("****voldin err****",res.data.errors)
        }
        setUploading(false);
    }
    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin', 'member']}>
                <AdminLayout>
                    <h2 className='font-bold text-[28px] py-2'>アカウント管理</h2>
                    <MainPannel>
                        <button className='text-[20px] px-[80px] py-2 flex items-center cursor-pointer font-noto-sans text-lg font-normal leading-[46px] tracking-[0.1em] text-[#00000080]'  onClick={()=>handleBack()}><FaAngleLeft className='pt-[4px]'/> 戻る</button>
                        <div className='p-[24px_80px]'>
                            <div className='flex justify-between items-center text-[18px] pb-[12px] w-full border-b border-solid'>
                                <div className='flex items-center'>
                                    <h4 className='font-bold text-[18px] w-[250px]'>プロフィール画像</h4>
                                    { preview ? <img src={preview} alt="Avatar Preview" style={{ width: 60, height: 60, borderRadius: "50%", cursor: 'pointer' }}
                                        onClick={handleImageClick}
                                    /> :
                                    <Chip
                                        sx={{
                                            height: '60px',
                                            width: '60px',
                                            alignItems: 'center',
                                            borderRadius: '50%',
                                            transition: 'all .2s ease-in-out',
                                            backgroundColor: '#fff',
                                            '& .MuiChip-label': {
                                                lineHeight: 0
                                            },
                                        }}
                                        label={<FaUser size='30px' color={'#00A4E5'} />}
                                        variant='outlined'
                                        aria-controls={'menu-list-grow'}
                                        aria-haspopup='true'
                                        color='primary'
                                        onClick={handleImageClick}
                                    /> }
                                </div>
                                <input ref={fileInputRef} style={{ display: 'none' }} type="file" onChange={handleFileChange} accept="image/*" />
                            </div>
                            <div className='flex items-center justify-center py-5'>
                                <ArticleButton variant="contained" onClick={()=>handleUpload()} disabled={uploading} startIcon={<FaUpload className='!text-[16px]'/>}>変更</ArticleButton>
                            </div>
                        </div>
                    </MainPannel>
                </AdminLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default AvatarSettingsPage;
