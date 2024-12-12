'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const CreateArticlePage = dynamic(() => import('@/components/pages/members/articles/CreateArticle'), {
    loading: () => <Loading />
});

const Page = () => {
    return <CreateArticlePage />;
};

export default Page;