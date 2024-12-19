<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SidebarMenusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dashboardId = DB::table('sidebar_menus')->insertGetId([
            'title' => 'Dashboard',
            'icon' => '',
            'url' => '',
            'parent_id' => null,
            'order' => 1,
            'is_active' => true,
            'is_parent' => true,
            'roles' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('sidebar_menus')->insert([
            'title' => 'Home',
            'icon' => 'house',
            'url' => '/',
            'parent_id' => $dashboardId,
            'order' => 1,
            'is_active' => true,
            'is_parent' => false,
            'roles' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('sidebar_menus')->insert([
            'title' => 'Users',
            'icon' => 'users',
            'url' => '/users',
            'parent_id' => $dashboardId,
            'order' => 2,
            'is_active' => true,
            'is_parent' => false,
            'roles' => json_encode(['admin']),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('sidebar_menus')->insert([
            'title' => 'Components',
            'icon' => 'components',
            'url' => '/design-system',
            'parent_id' => $dashboardId,
            'order' => 999,
            'is_active' => true,
            'is_parent' => false,
            'roles' => json_encode(['admin']),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
