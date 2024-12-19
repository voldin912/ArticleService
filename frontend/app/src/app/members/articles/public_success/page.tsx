'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const PublicSuccessPage = dynamic(() => import('@/components/pages/members/articles/PublicSuccess'), {
    loading: () => <Loading />
});

const Page = () => {
    return <PublicSuccessPage />;
};

export default Page;