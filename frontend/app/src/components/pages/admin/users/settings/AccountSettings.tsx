import { FormEvent, useEffect } from 'react';
import { postRequest } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrentItem, setError } from '@/store/features/user';

import { Avatar, Button } from '@mui/material';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import AdminLayout from '@/components/templates/layout/AdminLayout';

const AccountSettingsPage = () => {

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
                                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                </div>
                                <div>0<span className='text-[12px]'>件</span></div>
                            </div>
                        </div>
                        <div className='p-[24px_80px]'>
                            <div className='flex justify-between items-center text-[18px] pb-[12px] w-full border-b border-solid'>
                                <div>今月の売上</div>
                                <div><span>¥</span>0</div>
                            </div>
                        </div>
                    </MainPannel>
                </AdminLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default AccountSettingsPage;
