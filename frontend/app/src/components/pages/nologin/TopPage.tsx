import MainLayout from "@/components/templates/layout/MainLayout";
import { useRouter } from "next/navigation";


const TopPage = () => {
    const router = useRouter();
    const categories = [
        "ライフスタイル",
        "ノウハウ",
        "オタ活",
        "ゲーム",
        "ギャンブル",
        "スピリチュアル",
        "北海道・東北",
        "東京都",
        "関東",
        "愛知県",
        "中部・近畿",
        "中国・四国・九州"
      ];
    const articles = [
        {
          title: "記事タイトル記事タイトル記事タイトル",
          creator: "クリエイター名",
          price: "¥1,980",
          image: "/images/image1.jpeg", // Replace with actual image URLs
        },
        {
          title: "記事タイトル記事タイトル記事タイトル",
          creator: "クリエイター名",
          price: "¥1,980",
          image: "/images/image2.jpeg", // Replace with actual image URLs
        },
        {
          title: "記事タイトル記事タイトル記事タイトル",
          creator: "クリエイター名",
          price: "¥1,980",
          image: "/images/image3.jpeg", // Replace with actual image URLs
        },
        {
          title: "記事タイトル記事タイトル記事タイトル",
          creator: "クリエイター名",
          price: "¥1,980",
          image: "/images/image3.jpeg", // Replace with actual image URLs
        },
      ];
    const popular_clicked = () => {
        router.push('/nologin/popular')
    }
    return (
        <MainLayout>
            <section className="max-w-[1440px] mx-auto px-[94px]">
                {/* Title */}
                <h2 className="text-xl font-bold mb-4">カテゴリー</h2>

                {/* Grid Layout for Categories */}
                <div className="grid grid-cols-4 gap-4">
                    {categories.map((category, index) => (
                    <button
                        key={index}
                        className="px-6 py-3 border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-100"
                    >
                        {category}
                    </button>
                    ))}
                </div>
            </section>
            <section className="max-w-[1440px] mx-auto px-[94px] py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">人気の記事</h2>
                    <a href="#" onClick={()=>popular_clicked()} className="text-sm text-gray-500 hover:underline">
                    もっと見る
                    </a>
                </div>

                {/* Article Grid */}
                <div className="grid grid-cols-4 gap-6">
                    {articles.map((article, index) => (
                    <div
                        key={index}
                        className="p-4"
                    >
                        {/* Article Image */}
                        <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-[150px] object-cover rounded-md mb-4"
                        />

                        {/* Article Details */}
                        <h3 className="text-sm font-bold text-gray-800 mb-2">
                        {article.title}
                        </h3>
                        <div className="flex items-center mb-2">
                        <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-500">{article.creator}</span>
                        </div>
                        <p className="text-sm font-bold text-gray-800 float-right">{article.price}</p>
                    </div>
                    ))}
                </div>
            </section>
            <section className="max-w-[1440px] mx-auto px-[94px] py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">フォロー中のクリエイターの記事</h2>
                    <a href="#" className="text-sm text-gray-500 hover:underline">
                    もっと見る
                    </a>
                </div>

                {/* Article Grid */}
                <div className="grid grid-cols-4 gap-6">
                    {articles.map((article, index) => (
                    <div
                        key={index}
                        className="p-4"
                    >
                        {/* Article Image */}
                        <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-[150px] object-cover rounded-md mb-4"
                        />

                        {/* Article Details */}
                        <h3 className="text-sm font-bold text-gray-800 mb-2">
                        {article.title}
                        </h3>
                        <div className="flex items-center mb-2">
                        <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-500">{article.creator}</span>
                        </div>
                        <p className="text-sm font-bold text-gray-800 float-right">{article.price}</p>
                    </div>
                    ))}
                </div>
            </section>
            <section className="max-w-[1440px] mx-auto px-[94px] py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">カテゴリーAの記事</h2>
                    <a href="#" className="text-sm text-gray-500 hover:underline">
                    もっと見る
                    </a>
                </div>

                {/* Article Grid */}
                <div className="grid grid-cols-4 gap-6">
                    {articles.map((article, index) => (
                    <div
                        key={index}
                        className="p-4"
                    >
                        {/* Article Image */}
                        <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-[150px] object-cover rounded-md mb-4"
                        />

                        {/* Article Details */}
                        <h3 className="text-sm font-bold text-gray-800 mb-2">
                        {article.title}
                        </h3>
                        <div className="flex items-center mb-2">
                        <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-500">{article.creator}</span>
                        </div>
                        <p className="text-sm font-bold text-gray-800 float-right">{article.price}</p>
                    </div>
                    ))}
                </div>
            </section>
            <section className="bg-blue-50 py-16 px-4">
                <div className="max-w-[720px] mx-auto text-center">
                    {/* Heading */}
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    投稿広場に記事を投稿しよう！
                    </h1>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-7 mb-6">
                    投稿広場なら、販売手数料XX円・たった3ステップで記事の販売をスタートできます！
                    <br />
                    あなたの知識を有料記事として販売し、今すぐに収益化が可能です。手軽に副業ライターとしてデビューしてみませんか？
                    </p>

                    {/* Button */}
                    <button className="bg-blue-500 text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-blue-600">
                    詳しく見る
                    </button>
                </div>
            </section>
        </MainLayout>
    );
};

export default TopPage;
