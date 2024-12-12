import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import PasswordForm from './sections/PasswordForm';
import ProfileForm from './sections/ProfileForm';
import AdminLayout from '@/components/templates/layout/AdminLayout';

const ProfilePage = () => {
    return (
        <AuthLayout>
            <PermissionLayout permission={['customer', 'super', 'owner']} role={['admin', 'member']}>
                <AdminLayout>
                    <div className='w-full flex flex-col gap-[24px]'>
                        <ProfileForm />
                        <PasswordForm />
                    </div>
                </AdminLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default ProfilePage;
