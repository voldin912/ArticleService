import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'; // Requires Heroicons library

export default function SearchSection() {
  return (
    <div className="flex items-center border-b border-gray-300 py-2 w-full max-w-md">
      <MagnifyingGlassIcon className="h-[25px] w-[25px] text-gray-400" />
      <input
        type="text"
        placeholder="キーワードを入力してください"
        className="ml-[35px] text-[18px] w-full border-none bg-transparent text-gray-600 placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
}
