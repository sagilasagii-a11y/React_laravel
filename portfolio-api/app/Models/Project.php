<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title','description','tech_stack','demo_url',
        'github_url','image_url','sort_order'
    ];
}