import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import AdminLayout from '@/components/templates/layout/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';

const CreateArticlePage = () => {
    const { user } = useAuth()
    console.log(user)
    return (
        <AuthLayout>
            <PermissionLayout permission={['customer', 'owner', 'super']} role={['admin', 'member']}>
                <AdminLayout>
                    <div></div>
                </AdminLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default CreateArticlePage;
