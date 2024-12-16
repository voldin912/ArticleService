import MainPannel from '@/components/atoms/MainPannel';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import AdminLayout from '@/components/templates/layout/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';
import { setArticleContent, setArticleImage, setArticleStep, setArticleTitle } from '@/store/features/shared_data';
import { useAppDispatch } from '@/store/hooks';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateArticlePage = () => {
    const { user } = useAuth()
    const dispatch = useAppDispatch()
    const [value, setValue] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  
    // Handle file selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Get the selected file
        if (file) {
            setSelectedImage(file);
            // Create a preview URL for the image
            const imageUrl = URL.createObjectURL(file);
            setImagePreviewUrl(imageUrl);
            dispatch(setArticleImage({image:file}))
        }
    };
    useEffect(()=>{
        dispatch(setArticleStep({cur_step: 1}))
    },[])
    return (
        <AuthLayout>
            <PermissionLayout permission={['customer', 'owner', 'super']} role={['admin', 'member']}>
                <AdminLayout>
                    <MainPannel>
                        <h3 className='font-bold text-[24px] pt-[60px] px-[80px]'>記事投稿</h3>
                        <div className='p-[24px_80px] flex flex-col gap-[24px]'>
                            <div className="text-lg font-bold text-gray-800">
                                <span className="text-[#00A4E5]">STEP 1</span>
                                <span className="text-gray-500"> /3</span> 記事を書きましょう
                            </div>
                            <div
                                className={`relative flex items-center justify-center w-full h-48 border-2 border-dashed ${
                                imagePreviewUrl ? "border-gray-300" : "border-gray-400"
                                } rounded-lg bg-gray-100`}
                            >
                                {imagePreviewUrl ? (
                                // Render Image Preview
                                <img
                                    src={imagePreviewUrl}
                                    alt="Selected Preview"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                ) : (
                                // Render Placeholder
                                <label
                                    htmlFor="imageInput"
                                    className="flex flex-col items-center justify-center text-center cursor-pointer text-gray-500"
                                >
                                    <p className="text-sm font-medium">+ メイン画像を設定する</p>
                                    <p className="text-xs text-gray-400">推奨サイズ: XXpx × YYpx</p>
                                </label>
                                )}
                                {/* Hidden File Input */}
                                <input
                                    id="imageInput"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                            <TextField 
                                id="title"
                                label="記事のタイトルを入力してください"
                                variant="standard"
                                fullWidth
                                onChange={e=>dispatch(setArticleTitle({title:e.target.value}))}
                            />
                            <ReactQuill theme="snow" value={value} onChange={e=>dispatch(setArticleContent({content:e}))} />
                        </div>
                        
                    </MainPannel>
                </AdminLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};
export default CreateArticlePage;
