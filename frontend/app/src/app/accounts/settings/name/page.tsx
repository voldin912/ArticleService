'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const UserNameSettingsPage = dynamic(() => import('@/components/pages/admin/users/settings/UserNameSettings'), {
    loading: () => <Loading />
});

const Page = () => {
    return <UserNameSettingsPage />;
};

export default Page;
