import { Link, usePage } from '@inertiajs/react';
import { ChevronUp, User2 } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import axios from 'axios';
import { useEffect, useState } from 'react';

import Icon from '@/components/ui/icon';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface SidebarItemsProps {
    title: string;
    children: SidebarItemsProps[];
    order: number;
    is_parent: boolean;
    is_active: boolean;
    icon?: keyof typeof dynamicIconImports;
    url?: string;
}

export function AppSidebar() {
    const user = usePage().props.auth.user;
    const { open } = useSidebar();

    const [menu, setMenu] = useState<SidebarItemsProps[]>([]);

    useEffect(() => {
        axios
            .get('/sidebar-menus')
            .then((res) => {
                setMenu(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex flex-row items-center">
                            <img
                                src="/images/hs-logo.png"
                                width={50}
                                height={50}
                                className="object-contain"
                            />
                            {open && (
                                <span className="ms-1 text-2xl font-bold">
                                    HiveScape
                                </span>
                            )}
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {menu.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.children.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                {item?.icon && (
                                                    <Icon name={item.icon} />
                                                )}
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> {user.name}
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <Link href={route('profile.edit')}>
                                    <DropdownMenuItem className="cursor-pointer">
                                        Profile
                                    </DropdownMenuItem>
                                </Link>
                                <Link
                                    href={route('logout')}
                                    as="button"
                                    method="post"
                                    className="w-full"
                                >
                                    <DropdownMenuItem className="cursor-pointer !text-red-500">
                                        Sign out
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
