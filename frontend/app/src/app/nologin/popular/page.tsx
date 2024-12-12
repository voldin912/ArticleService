'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const PopularPage = dynamic(() => import('@/components/pages/nologin/Popular'), {
    loading: () => <Loading />
});

const Page = () => {
    return <PopularPage />;
};

export default Page;
