'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const PasswordSettingsPage = dynamic(() => import('@/components/pages/admin/users/settings/PasswordSettings'), {
    loading: () => <Loading />
});

const Page = () => {
    return <PasswordSettingsPage />;
};

export default Page;
