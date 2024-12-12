'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const MyPage = dynamic(() => import('@/components/pages/admin/users/my_page/MyPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <MyPage />;
};

export default Page;
