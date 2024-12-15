import { FormEvent, useEffect, useState } from 'react';
import { postRequest } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrentItem, setError } from '@/store/features/user';

import { Avatar, Button, Chip } from '@mui/material';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import AdminLayout from '@/components/templates/layout/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';
import { FaAngleRight, FaUser } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const AccountSettingsPage = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [avatar, setAvatar] = useState<string | null>(null);

    useEffect(()=>{
        if(user?.user_info.avatar)
        setAvatar(process.env.NEXT_PUBLIC_BACKEND_URL+user?.user_info.avatar)
    },[])

    const changeAvatar = () => {
        router.push('/accounts/settings/avatar')
    }

    const changeName = () => {
        router.push('/accounts/settings/name')
    }

    const changeProfileText = () => {
        router.push('/accounts/settings/profile_text')
    }

    const changeEmail = () => {
        router.push('/accounts/settings/email')
    }

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin', 'member']}>
                <AdminLayout>
                    <h2 className='font-bold text-[28px] py-2'>アカウント管理</h2>
                    <MainPannel>
                        <h3 className='font-bold text-[24px] pt-[60px] px-[80px]'>基本情報</h3>
                        <div className='p-[24px_80px]'>
                            <div className='flex justify-between items-center text-[18px] pb-[12px] w-full border-b border-solid'>
                                <div className='flex items-center'>
                                    <h4 className='font-bold text-[18px] w-[250px]'>プロフィール画像</h4>
                                    {
                                        avatar?<img src={avatar} alt="Avatar Preview" style={{ width: 60, height: 60, borderRadius: "50%" }}
                                    /> : <Chip
                                        sx={{
                                            height: '60px',
                                            width: '60px',
                                            alignItems: 'center',
                                            borderRadius: '50%',
                                            transition: 'all .2s ease-in-out',
                                            backgroundColor: '#3B7B4A',
                                            '& .MuiChip-label': {
                                                lineHeight: 0
                                            }
                                        }}
                                        label={<FaUser size='30px' color={'#fff'} />}
                                        variant='outlined'
                                        aria-controls={'menu-list-grow'}
                                        aria-haspopup='true'
                                        color='primary'
                                    />
                                    }
                                    
                                </div>
                                <div className='flex items-center cursor-pointer font-noto-sans text-lg font-normal leading-[46px] tracking-[0.1em] text-[#00A4E5] hover:text-[#6ecaee]' onClick={()=>changeAvatar()}>変更する <FaAngleRight className='pt-[4px]'/></div>
                            </div>
                        </div>
                        <div className='p-[24px_80px]'>
                            <div className='flex justify-between items-center text-[18px] pb-[12px] w-full border-b border-solid'>
                                <div className='flex items-center'>
                                    <h4 className='font-bold text-[18px] w-[250px]'>ユーザー名</h4>
                                    <div className='text-[18px] text-lg font-normal leading-[46px] tracking-[0.1em]'>{user?.user_info.name}</div>
                                </div>
                                <div className='flex items-center cursor-pointer font-noto-sans text-lg font-normal leading-[46px] tracking-[0.1em] text-[#00A4E5] hover:text-[#6ecaee]' onClick={()=>changeName()}>変更する <FaAngleRight className='pt-[4px]'/></div>
                            </div>
                        </div>
                        <div className='p-[24px_80px]'>
                            <div className='flex justify-between items-center text-[18px] pb-[12px] w-full border-b border-solid'>
                                <div className='flex items-center'>
                                    <h4 className='font-bold text-[18px] w-[250px]'>プロフィール文章</h4>
                                    <div className='max-w-[320px] overflow-hidden text-ellipsis whitespace-nowrap text-[18px] text-lg font-normal leading-[46px] tracking-[0.1em]'>{user?.user_info.profile_text}</div>
                                </div>
                                <div className='flex items-center cursor-pointer font-noto-sans text-lg font-normal leading-[46px] tracking-[0.1em] text-[#00A4E5] hover:text-[#6ecaee]' onClick={()=>changeProfileText()}>変更する <FaAngleRight className='pt-[4px]'/></div>
                            </div>
                        </div>
                        <div className='p-[24px_80px]'>
                            <div className='flex justify-between items-center text-[18px] pb-[12px] w-full border-b border-solid'>
                                <div className='flex items-center'>
                                    <h4 className='font-bold text-[18px] w-[250px]'>メールアドレス</h4>
                                    <div className='max-w-[320px] overflow-hidden text-ellipsis whitespace-nowrap text-[18px] text-lg font-normal leading-[46px] tracking-[0.1em]'>{user?.email}</div>
                                </div>
                                <div className='flex items-center cursor-pointer font-noto-sans text-lg font-normal leading-[46px] tracking-[0.1em] text-[#00A4E5] hover:text-[#6ecaee]' onClick={()=>changeEmail()}>変更する <FaAngleRight className='pt-[4px]'/></div>
                            </div>
                        </div>
                        <div className='p-[24px_80px]'>
                            <div className='flex justify-between items-center text-[18px] pb-[12px] w-full border-b border-solid'>
                                <div className='flex items-center'>
                                    <h4 className='font-bold text-[18px] w-[250px]'>パスワード</h4>
                                    <div className='text-[18px] text-lg font-normal leading-[46px] tracking-[0.1em]'>********</div>
                                </div>
                                <div className='flex items-center cursor-pointer font-noto-sans text-lg font-normal leading-[46px] tracking-[0.1em] text-[#00A4E5] hover:text-[#6ecaee]'>変更する <FaAngleRight className='pt-[4px]'/></div>
                            </div>
                        </div>
                    </MainPannel>
                </AdminLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default AccountSettingsPage;
