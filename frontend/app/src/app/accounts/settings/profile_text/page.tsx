'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const ProfileTextSettingsPage = dynamic(() => import('@/components/pages/admin/users/settings/ProfileTextSettings'), {
    loading: () => <Loading />
});

const Page = () => {
    return <ProfileTextSettingsPage />;
};

export default Page;
