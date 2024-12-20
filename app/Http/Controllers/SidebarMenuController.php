<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\SidebarMenu;

class SidebarMenuController extends Controller
{
    // Fetch all active menu
    public function index(Request $request) {
        $userRole = $request->user()->role;

        $menus = SidebarMenu::with('children')
            ->whereNull('parent_id')
            ->forRole($userRole)
            ->active()
            ->orderBy('order')
            ->get();

        return response()->json($menus);
    }
}
