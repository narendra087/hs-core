<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SidebarMenu extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'icon',
        'url',
        'parent_id',
        'order',
        'is_active',
        'is_parent'
    ];

    public function children()
    {
        return $this->hasMany(SidebarMenu::class, 'parent_id')->orderBy('order');
    }

    public function parent()
    {
        return $this->belongsTo(SidebarMenu::class, 'parent_id');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeForRole($query, $role)
    {
        return $query->where(function ($q) use ($role) {
            $q->whereJsonContains('roles', $role)
                ->orWhereNull('roles');
        });
    }
}
