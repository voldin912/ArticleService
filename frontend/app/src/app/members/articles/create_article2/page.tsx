'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const CreateArticle2Page = dynamic(() => import('@/components/pages/members/articles/CreateArticle2'), {
    loading: () => <Loading />
});

const Page = () => {
    return <CreateArticle2Page />;
};

export default Page;