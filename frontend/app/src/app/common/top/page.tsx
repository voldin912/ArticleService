'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const TopPage = dynamic(() => import('@/components/pages/common/TopPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <TopPage />;
};

export default Page;
