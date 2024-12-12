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
import UserForm from './sections/UserForm';
import AdminLayout from '@/components/templates/layout/AdminLayout';

const UserCreatePage = () => {
    const dispatch = useAppDispatch();

    const currentItem = useAppSelector(state => state.user.item.form);

    useEffect(() => {
        dispatch(clearCurrentItem());
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const res = await postRequest(`/v0/admin/users/create`, currentItem);
        if (res.status == 200) {
            dispatch(clearCurrentItem());
        }

        if (res.status == 422 && res.data.errors) {
            dispatch(setError(res.data.errors));
        }
    };

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin']}>
                <AdminLayout>
                    <TitleBar href='/admin/users'>新規会員登録</TitleBar>
                    <MainPannel>
                        <form className='w-full flex flex-col gap-[10px]' onSubmit={handleSubmit}>
                            <UserForm />

                            {/* ************************************************************************ */}
                            <div className='mt-[16px]'>
                                <Button type='submit' variant='contained' color='primary'>
                                    登録する
                                </Button>
                            </div>
                        </form>
                    </MainPannel>
                </AdminLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default UserCreatePage;
