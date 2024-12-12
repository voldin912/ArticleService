import { font_genjyuu_bold, font_genjyuu_regular } from "@/app/layout";

export default function Footer() {
    return (
      <footer className="bg-[#4C4C4C] text-white py-[120px]">
        <div className="text-center space-y-4">
          {/* Main Heading */}
          <h1 className={`${font_genjyuu_bold.className} text-[36px] font-bold leading-[53.47px] tracking-[0.2em]`}>投稿広場</h1>
  
          {/* Subtitle */}
          <p className={`${font_genjyuu_regular.className} text-[16px] font-normal leading-[23.77px] tracking-[0.1em]`}>みんなの記事投稿情報共有プラットフォーム</p>
  
          {/* Secondary Heading */}
          <p className="text-[16px] font-bold leading-[35px] tracking-[0.1em] text-center pt-[35px]">投稿広場とは</p>
  
          {/* Links */}
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="hover:underline">
              特定商取引法に基づく表記
            </a>
            <a href="#" className="hover:underline">
              利用規約
            </a>
            <a href="#" className="hover:underline">
              プライバシーポリシー
            </a>
            <a href="#" className="hover:underline">
              会社概要
            </a>
          </div>
        </div>
      </footer>
    );
  }
  