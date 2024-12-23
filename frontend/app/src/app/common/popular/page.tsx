'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const PopularPage = dynamic(() => import('@/components/pages/common/Popular'), {
    loading: () => <Loading />
});

const Page = () => {
    return <PopularPage />;
};

export default Page;
