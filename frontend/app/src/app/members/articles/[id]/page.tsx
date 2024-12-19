'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const ArticlePage = dynamic(() => import('@/components/pages/members/articles/Article'), {
    loading: () => <Loading />
});

const Page = () => {
    return <ArticlePage />;
};

export default Page;