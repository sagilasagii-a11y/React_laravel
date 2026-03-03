<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show()
    {
        return response()->json(Profile::first());
    }

    public function upsert(Request $request)
    {
        $data = $request->validate([
            'full_name' => ['required','string'],
            'title' => ['nullable','string'],
            'about' => ['nullable','string'],
            'email' => ['nullable','string'],
            'phone' => ['nullable','string'],
            'location' => ['nullable','string'],
            'github_url' => ['nullable','string'],
            'linkedin_url' => ['nullable','string'],
            'cv_url' => ['nullable','string'],
        ]);

        $profile = Profile::first();
        if ($profile) {
            $profile->update($data);
        } else {
            $profile = Profile::create($data);
        }

        return response()->json($profile);
    }
}