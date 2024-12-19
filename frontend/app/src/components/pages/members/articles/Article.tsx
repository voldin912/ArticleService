import MainPannel from '@/components/atoms/MainPannel';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import AdminLayout from '@/components/templates/layout/AdminLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { IUser } from '@/interfaces';
import { setArticleStep } from '@/store/features/shared_data';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getRequest } from '@/utils/axios';
import { useTheme } from '@emotion/react';
import { Chip } from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';

interface Article {
    cur_step: number;
    id: number;
    image: string;
    title: string;
    content: string;
    category: string;
    price: number;
    nonfree: number;
    created_by: IUser;
    created_at: string;
    has_bought: boolean;
}

const ArticlePage = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams();
    const {user, isAuthenticated} = useAuth();
    const theme = useTheme()
    const [article, setArticle] = useState<Article | null>(null)
    console.log("****voldin isAuthenticated", isAuthenticated, user)
    useEffect(()=>{
        (async()=>{
            const res =await getRequest(`/v0/articles/${id}`)
            setArticle(res.data)
            console.log(res.data)
        })()
    },[])
    return (
        <AuthLayout>
            <AdminLayout>
                <MainPannel>
                    {
                        article && <div className='max-w-[667px] mx-auto'>
                            <img className='w-full rounded-[20px]' src={process.env.NEXT_PUBLIC_BACKEND_URL+article.image} alt="" />
                            <h1 className='font-bold text-[18px] my-2 whitespace-pre-wrap break-all'>{article.title}</h1>
                            {
                                user && article.has_bought == false && article.created_by.id != user.id && <div>
                                    <div className='flex items-center justify-between py-[26px]'>
                                        <div className='flex items-center gap-[12px]'>
                                            {
                                                article.created_by.user_info.avatar && <img src={process.env.NEXT_PUBLIC_BACKEND_URL + article.created_by.user_info.avatar} alt="" />
                                            }
                                            {
                                                article.created_by.user_info.avatar == null && <div>
                                                    <Chip
                                                        sx={{
                                                            height: '48px',
                                                            alignItems: 'center',
                                                            borderRadius: '27px',
                                                            transition: 'all .2s ease-in-out',
                                                            backgroundColor: '#eef2f6',
                                                            '&[aria-controls="menu-list-grow"], &:hover': {
                                                                borderColor: '#00A4E5 !important',
                                                                background: '#00A4E5 !important',
                                                                color: '#eef2f6 !important',
                                                                '& svg': {
                                                                    stroke: '#eef2f6',
                                                                    color: '#eef2f6!important'
                                                                }
                                                            },
                                                            '& .MuiChip-label': {
                                                                lineHeight: 0
                                                            }
                                                        }}
                                                        label={<FaRegUser size='1.5rem' color='' />}
                                                        variant='outlined'
                                                        aria-haspopup='true'
                                                        color='primary'
                                                    />
                                                </div>
                                            }
                                            {article.created_by.user_info.name}
                                        </div>
                                        <div>¥ {article.price}</div>
                                    </div>
                                    <div className='flex items-center justify-end pb-[26px]'>
                                        <div className='cursor-pointer text-[20px] text-white bg-[#00A4E5] rounded-[124px] flex items-center justify-center gap-[20px] w-[340px] h-[64px] '>
                                            <svg width="29" height="31" viewBox="0 0 29 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M28.6595 7.6733L7.83792 5.90321L7.52123 3.97412C7.23038 2.21366 5.92454 0.849232 4.27502 0.587003L0.576688 0L0.294922 2.04146L3.99371 2.62998C4.82191 2.76106 5.48025 3.44761 5.62567 4.33341L8.61375 22.504C8.89417 24.2095 10.2746 25.452 11.8893 25.4525H24.8533L25.2387 23.3877H11.8894C11.2094 23.3888 10.6268 22.8633 10.5094 22.1452L10.0906 19.6027H26.0937L28.6595 7.6733Z" fill="white"/>
                                                <path d="M12.6229 26.5594C11.48 26.5594 10.5537 27.5539 10.5537 28.7801C10.5537 30.0064 11.48 31 12.6229 31C13.7661 31 14.6926 30.0064 14.6926 28.7801C14.6926 27.5539 13.7661 26.5594 12.6229 26.5594Z" fill="white"/>
                                                <path d="M21.8172 26.5594C20.674 26.5594 19.748 27.5539 19.748 28.7801C19.748 30.0064 20.674 31 21.8172 31C22.9604 31 23.8871 30.0064 23.8871 28.7801C23.8871 27.5539 22.9604 26.5594 21.8172 26.5594Z" fill="white"/>
                                            </svg>
                                            購入手続きへ進む
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className='whitespace-pre-wrap break-all' dangerouslySetInnerHTML={{ __html: article.content }} />
                            
                            {
                                user && article.has_bought == false && article.created_by.id != user.id && <div>
                                    <div className="text-center py-8 border-t border-gray-300">

                                    <div className="flex items-center justify-center space-x-4 mb-4">
                                        <div className="flex-1 border-t border-gray-300"></div>
                                        <span className="text-sm text-gray-500">この続きを見るには購入する必要があります</span>
                                        <div className="flex-1 border-t border-gray-300"></div>
                                    </div>

                                    <p className="text-2xl font-bold text-gray-800">¥ {article.price}</p>
                                    </div>
                                    <div className='cursor-pointer text-[20px] text-white bg-[#00A4E5] rounded-[124px] flex items-center justify-center gap-[20px] w-[340px] py-2 mx-auto h-[64px]'>
                                        <svg width="29" height="31" viewBox="0 0 29 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M28.6595 7.6733L7.83792 5.90321L7.52123 3.97412C7.23038 2.21366 5.92454 0.849232 4.27502 0.587003L0.576688 0L0.294922 2.04146L3.99371 2.62998C4.82191 2.76106 5.48025 3.44761 5.62567 4.33341L8.61375 22.504C8.89417 24.2095 10.2746 25.452 11.8893 25.4525H24.8533L25.2387 23.3877H11.8894C11.2094 23.3888 10.6268 22.8633 10.5094 22.1452L10.0906 19.6027H26.0937L28.6595 7.6733Z" fill="white"/>
                                            <path d="M12.6229 26.5594C11.48 26.5594 10.5537 27.5539 10.5537 28.7801C10.5537 30.0064 11.48 31 12.6229 31C13.7661 31 14.6926 30.0064 14.6926 28.7801C14.6926 27.5539 13.7661 26.5594 12.6229 26.5594Z" fill="white"/>
                                            <path d="M21.8172 26.5594C20.674 26.5594 19.748 27.5539 19.748 28.7801C19.748 30.0064 20.674 31 21.8172 31C22.9604 31 23.8871 30.0064 23.8871 28.7801C23.8871 27.5539 22.9604 26.5594 21.8172 26.5594Z" fill="white"/>
                                        </svg>
                                        購入手続きへ進む
                                    </div>
                                </div>
                            }
                        </div> 
                    }
                </MainPannel>
            </AdminLayout>
        </AuthLayout>
    );
};
export default ArticlePage;
