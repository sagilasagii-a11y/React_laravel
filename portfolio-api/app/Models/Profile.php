<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'full_name','title','about','email','phone','location',
        'github_url','linkedin_url','cv_url'
    ];
}