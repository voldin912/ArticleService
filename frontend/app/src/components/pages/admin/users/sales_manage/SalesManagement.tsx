import { FormEvent, useEffect } from 'react';
import { postRequest } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrentItem, setError } from '@/store/features/user';

import { Button } from '@mui/material';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import AdminLayout from '@/components/templates/layout/AdminLayout';

const SalesManagementPage = () => {

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin', 'member']}>
                <AdminLayout>
                    <h2 className='font-bold text-[28px] py-2'>売上管理</h2>
                    <MainPannel>
                        <div className='p-[60px_60px_5px]'>
                            <div className='flex justify-between items-center text-[19px] pb-[12px] w-full border-b border-solid'>
                                <div>今月の記事販売数</div>
                                <div>0<span className='text-[12px]'>件</span></div>
                            </div>
                        </div>
                        <div className='p-[60px_60px_5px]'>
                            <div className='flex justify-between items-center text-[19px] pb-[12px] w-full border-b border-solid'>
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

export default SalesManagementPage;
