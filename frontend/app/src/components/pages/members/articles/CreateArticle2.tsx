import MainPannel from '@/components/atoms/MainPannel';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import AdminLayout from '@/components/templates/layout/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';
import { setArticleCategory, setArticleContent, setArticleImage, setArticlePrice, setArticleStep, setArticleTitle } from '@/store/features/shared_data';
import { useAppDispatch } from '@/store/hooks';
import { Checkbox, FormControl, Input, InputAdornment, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Theme, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

const CreateArticle2Page = () => {
    const { user } = useAuth()
    const dispatch = useAppDispatch()
    const [cur_category, setCurCategory] = useState<string[]>([]);
    const theme = useTheme();
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            },
        },
    };

    function getStyles(category: string, categories: string[], theme: Theme) {
        return {
          fontWeight: categories.includes(category)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
        };
    }

    const handleChange = (event: SelectChangeEvent<typeof cur_category>) => {
        const {
          target: { value },
        } = event;
        const val_temp = typeof value === 'string' ? value.split(',') : value
        setCurCategory(val_temp)
        dispatch(setArticleCategory({category: val_temp }))
    };

    const categories = [
        'ライフスタイル','ノウハウ','オタ活','ゲーム','ギャンブル','スピリチュアル','北海道・東北','東京都','関東','愛知県','中部・近畿','中国・四国・九州'];
    useEffect(()=>{
        dispatch(setArticleStep({cur_step: 2}))
    },[])
    return (
        <AuthLayout>
            <PermissionLayout permission={['customer', 'owner', 'super']} role={['admin', 'member']}>
                <AdminLayout>
                    <MainPannel>
                        <h3 className='font-bold text-[24px] pt-[60px] px-[80px]'>記事投稿</h3>
                        <div className='p-[24px_80px] flex flex-col gap-[24px]'>
                            <div className="text-lg font-bold text-gray-800">
                                <span className="text-[#00A4E5]">STEP 2</span>
                                <span className="text-gray-500"> /3</span> 記事の詳細情報を登録しましょう
                            </div>
                            <div className='p-[24px_80px]'>
                                <div className='flex justify-between items-center text-[18px] pb-[12px] w-full border-b border-solid'>
                                    <div className='flex items-center'>
                                        <h4 className='font-bold text-[18px] w-[250px]'>販売金額</h4>
                                        <div className='text-[18px] w-full text-lg font-normal leading-[46px] tracking-[0.1em]'>
                                            <OutlinedInput
                                                fullWidth
                                                id="outlined-adornment-weight"
                                                endAdornment={<InputAdornment position="end">¥</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                inputProps={{
                                                'aria-label': 'weight',
                                                }}
                                                onChange={(e)=>dispatch(setArticlePrice({price: Number(e.target.value)}))}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='p-[24px_80px]'>
                                <div className='flex justify-between items-center text-[18px] pb-[12px] w-full border-b border-solid'>
                                    <div className='flex items-center w-full'>
                                        <h4 className='font-bold text-[18px] w-[250px]'>カテゴリー</h4>
                                        <div className='text-[18px] w-full text-lg relative font-normal leading-[46px] tracking-[0.1em]'>
                                            <FormControl sx={{ m: 1, width: 300 }}>
                                                <Select
                                                    labelId="demo-multiple-name-label"
                                                    id="demo-multiple-name"
                                                    multiple
                                                    value={cur_category}
                                                    onChange={handleChange}
                                                    input={<OutlinedInput />}
                                                    MenuProps={MenuProps}
                                                    >
                                                    {categories.map((category) => (
                                                        <MenuItem
                                                        key={category}
                                                        value={category}
                                                        style={getStyles(category, categories, theme)}
                                                        >
                                                        {category}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </MainPannel>
                </AdminLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};
export default CreateArticle2Page;
