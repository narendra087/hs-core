import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Bell } from 'lucide-react';
import { PropsWithChildren, ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    return (
        <SidebarProvider
            style={{
                ['--sidebar-width' as string]: '15rem',
            }}
        >
            <AppSidebar />
            <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900">
                <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-6">
                        <div className="flex h-16 justify-between">
                            <div className="flex items-center">
                                <SidebarTrigger className="" />
                                <div className="flex shrink-0 items-center">
                                    <h1>Dashboard</h1>
                                </div>

                                {/* <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink
                                        href={route('dashboard')}
                                        active={route().current('dashboard')}
                                    >
                                        Dashboard
                                    </NavLink>
                                </div> */}
                            </div>
                            <div className='flex items-center'>
                                <Bell width={20} height={20} />
                            </div>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="bg-white shadow dark:bg-gray-800">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main>{children}</main>
            </div>
        </SidebarProvider>
    );
}
