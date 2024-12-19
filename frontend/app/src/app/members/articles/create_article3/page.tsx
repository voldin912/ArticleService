'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const CreateArticle3Page = dynamic(() => import('@/components/pages/members/articles/CreateArticle3'), {
    loading: () => <Loading />
});

const Page = () => {
    return <CreateArticle3Page />;
};

export default Page;