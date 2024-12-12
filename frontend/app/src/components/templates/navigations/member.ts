import { AiOutlineHome } from 'react-icons/ai';
import { RiCustomerService2Line } from 'react-icons/ri';
import { IoMailUnreadOutline } from 'react-icons/io5';
import { VscNotebookTemplate } from 'react-icons/vsc';
import { MdSettings } from 'react-icons/md';

// constant
const icons = {
    AiOutlineHome,
    RiCustomerService2Line,
    IoMailUnreadOutline,
    VscNotebookTemplate,
    MdSettings
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'member',
    title: '一般',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'アカウント設定',
            type: 'item',
            url: '/dashboard',
            icon: icons.MdSettings,
            breadcrumbs: false
        }
    ]
};

export default pages;
