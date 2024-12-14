'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const AvatarSettingsPage = dynamic(() => import('@/components/pages/admin/users/settings/AvatarSettings'), {
    loading: () => <Loading />
});

const Page = () => {
    return <AvatarSettingsPage />;
};

export default Page;
