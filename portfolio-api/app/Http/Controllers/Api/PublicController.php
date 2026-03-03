<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\Skill;
use App\Models\Project;
use App\Models\Experience;

class PublicController extends Controller
{
    public function home()
    {
        return response()->json([
            'profile' => Profile::first(),
            'skills' => Skill::orderBy('sort_order')->get(),
            'projects' => Project::orderBy('sort_order')->get(),
            'experiences' => Experience::orderBy('sort_order')->get(),
        ]);
    }
}