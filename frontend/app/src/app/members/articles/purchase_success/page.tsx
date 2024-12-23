'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const PurchaseSuccessPage = dynamic(() => import('@/components/pages/members/articles/PurchaseSuccess'), {
    loading: () => <Loading />
});

const Page = () => {
    return <PurchaseSuccessPage />;
};

export default Page;