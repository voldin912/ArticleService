// assets
import { MdKey, MdDashboard } from 'react-icons/md';
import { LuUsers, LuMail } from 'react-icons/lu';

// constant
const icons = {
    MdDashboard,
    LuUsers,
    LuMail
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'admin',
    title: '管理者',
    caption: '会員管理..',
    type: 'group',
    children: [
        {
            id: 'users',
            title: '会員管理',
            type: 'collapse',
            icon: icons.LuUsers,

            children: [
                {
                    id: 'users-list',
                    title: '会員一覧',
                    type: 'item',
                    url: '/admin/users/',
                    target: true
                },
                {
                    id: 'users-create',
                    title: '会員新規登録',
                    type: 'item',
                    url: '/admin/users/create',
                    target: true
                }
            ]
        }
    ]
};

export default pages;
