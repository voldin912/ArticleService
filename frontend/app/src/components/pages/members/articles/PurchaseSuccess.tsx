import MainPannel from '@/components/atoms/MainPannel';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import AdminLayout from '@/components/templates/layout/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';
import { setArticleStep } from '@/store/features/shared_data';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const PurchaseSuccessPage = () => {
    const article = useAppSelector(state => state.shared_data.article_data)
    const dispatch = useAppDispatch()
    const router = useRouter();
    const confirmArticle = () => {
        router.push(`/members/articles/${article.id}`)
    }
    useEffect(()=>{
        dispatch(setArticleStep({cur_step: 0}))
    },[])
    return (
        <AuthLayout>
            <PermissionLayout permission={['customer', 'owner', 'super']} role={['admin', 'member']}>
                <AdminLayout>
                    <MainPannel>
                        <h1 className='font-bold text-[30px] pt-[60px] px-[80px] text-center m-[60px]'>購入が完了しました</h1>
                        <h2 className='text-[16px] text-justify'>{article.title}</h2>
                        <p className='text-[28px] font-bold'>¥ {article.price}</p>
                        <div className='text-[20px] bg-[#00A4E5] mx-auto cursor-pointer rounded-[124px] text-white leading-[34px] font-bold max-w-[394px] py-[18px] text-center' onClick={()=>confirmArticle()}>{`記事を確認する >`}</div>
                    </MainPannel>
                </AdminLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};
export default PurchaseSuccessPage;
