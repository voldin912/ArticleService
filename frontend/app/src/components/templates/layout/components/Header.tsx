"use client"
// material-ui
import { useTheme } from '@mui/material/styles';
// import SearchSection from './SearchSection';
import SearchSection from '../sections/SearchSection';
// import NotificationSection from './NotificationSection';

import { Box, AppBar} from '@mui/material';
import { font_genjyuu_bold, font_genjyuu_regular } from '@/app/layout';
import ProfileSection from '../sections/ProfileSection';


interface Props {
    handleLeftDrawerToggle: () => void;
}

const Header = ({ handleLeftDrawerToggle }: Props) => {
    const theme: any = useTheme();

    return (
        <>
            {/* logo & toggler button */}
            <div className='p-[43px_94px_43px] flex items-center justify-between w-full max-w-[1440px] mx-auto'>
                <div>
                    <h1 className={`${font_genjyuu_bold.className} text-[36px] font-bold leading-[53.47px] tracking-[0.2em] text-left`}>投稿ランド</h1>
                    <span className={`${font_genjyuu_regular.className} text-[16px] font-normal leading-[23.77px] tracking-[0.1em] text-left`}>みんなの記事投稿販売プラットフォーム</span>
                </div>
                <div className='w-[435px]'>
                    <SearchSection />
                </div>
                <div>
                    <ProfileSection />
                </div>
            </div>
            {/* header search */}
            {/* <SearchSection /> */}

            {/* notification & profile */}
            {/* <NotificationSection />
            <ProfileSection /> */}
        </>
    );
};

export default Header;
