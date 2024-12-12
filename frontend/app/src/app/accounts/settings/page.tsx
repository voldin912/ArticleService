'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const AccountSettingsPage = dynamic(() => import('@/components/pages/admin/users/settings/AccountSettings'), {
    loading: () => <Loading />
});

const Page = () => {
    return <AccountSettingsPage />;
};

export default Page;
