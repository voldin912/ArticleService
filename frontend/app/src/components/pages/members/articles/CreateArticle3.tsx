import MainPannel from '@/components/atoms/MainPannel';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import AdminLayout from '@/components/templates/layout/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';
import {  setArticleNonFreeArea, setArticleStep } from '@/store/features/shared_data';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useEffect, useState } from 'react';

const CreateArticle3Page = () => {
    const { user } = useAuth()
    const dispatch = useAppDispatch()

        // const result = useAppSelector(state => state.user.items.result);
    const content = useAppSelector(state => state.shared_data.article_data.content)
    const nonfree = useAppSelector(state => state.shared_data.article_data.nonfree)
    console.log(content)
    const block_size = 300;

    const splitContentWithButtons = (htmlContent:string) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;
    
        const segments = [];
        let charCount = 0;
        let currentSegment = "";
    
        // Recursive function to process each node
        const processNode = (node:any) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            for (let i = 0; i < text.length; i++) {
              currentSegment += text[i];
              charCount++;
    
              // Add a button when reaching the target length
              if (charCount === block_size) {
                segments.push(<div dangerouslySetInnerHTML={{ __html: currentSegment }} />);
                segments.push(
                //   <button
                //     key={segments.length}
                //     className="my-2 bg-blue-500 text-white px-4 py-2 rounded"
                //   >
                //     ラインをこの場所に変更
                //   </button>
                    <label
                        key={segments.length}
                        className={(nonfree == segments.length? "bg-[#00A4E5] text-white":"bg-[#fff] text-[#00A4E5]") + ` text-[18px] font-bold leading-[34px] tracking-[0.1em] text-center border border-[#00A4E5] rounded-md `}
                    >
                        <input
                            type="radio"
                            value={segments.length}
                            checked={nonfree === segments.length}
                            onChange={(e) => dispatch(setArticleNonFreeArea({nonfree: Number(e.target.value)}))}
                            className='hidden'
                        />
                        {nonfree == segments.length? "このラインより先を有料にする":"ラインをこの場所に変更"}
                    </label>
                );
                charCount = 0;
                currentSegment = "";
              }
            }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            currentSegment += `<${node.tagName.toLowerCase()}>`;
            node.childNodes.forEach(processNode);
            currentSegment += `</${node.tagName.toLowerCase()}>`;
          }
        };
    
        tempDiv.childNodes.forEach(processNode);
    
        // Push remaining content
        if (currentSegment) {
          segments.push(<div dangerouslySetInnerHTML={{ __html: currentSegment }} />);
        }
    
        return segments;
    };

    const contentWithButtons = splitContentWithButtons(content);
    useEffect(()=>{
        dispatch(setArticleStep({cur_step: 3}))
    },[])
    return (
        <AuthLayout>
            <PermissionLayout permission={['customer', 'owner', 'super']} role={['admin', 'member']}>
                <AdminLayout>
                    <MainPannel>
                        <h3 className='font-bold text-[24px] pt-[60px] px-[80px]'>記事投稿</h3>
                        <div className='p-[24px_80px] flex flex-col gap-[24px]'>
                            <div className="text-lg font-bold text-gray-800">
                                <span className="text-[#00A4E5]">STEP 3</span>
                                <span className="text-gray-500"> /3</span> 記事内の有料エリアを設定
                            </div>
                            {contentWithButtons.map((segment, index) => (
                                <React.Fragment key={index}>{segment}</React.Fragment>
                            ))}
                            
                        </div>
                        
                    </MainPannel>
                </AdminLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};
export default CreateArticle3Page;
