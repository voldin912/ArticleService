'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const SalesManagementPage = dynamic(() => import('@/components/pages/admin/users/sales_manage/SalesManagement'), {
    loading: () => <Loading />
});

const Page = () => {
    return <SalesManagementPage />;
};

export default Page;
