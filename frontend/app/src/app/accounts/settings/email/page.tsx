'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const EmailSettingsPage = dynamic(() => import('@/components/pages/admin/users/settings/EmailSettings'), {
    loading: () => <Loading />
});

const Page = () => {
    return <EmailSettingsPage />;
};

export default Page;
