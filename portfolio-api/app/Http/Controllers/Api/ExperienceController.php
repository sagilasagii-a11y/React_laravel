<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index() { return response()->json(Experience::orderBy('sort_order')->get()); }

    public function store(Request $request)
    {
        $data = $request->validate([
            'company' => ['required','string'],
            'role' => ['required','string'],
            'location' => ['nullable','string'],
            'start_date' => ['nullable','string'],
            'end_date' => ['nullable','string'],
            'details' => ['nullable','string'],
            'sort_order' => ['nullable','integer'],
        ]);
        return response()->json(Experience::create($data), 201);
    }

    public function update(Request $request, Experience $experience)
    {
        $data = $request->validate([
            'company' => ['required','string'],
            'role' => ['required','string'],
            'location' => ['nullable','string'],
            'start_date' => ['nullable','string'],
            'end_date' => ['nullable','string'],
            'details' => ['nullable','string'],
            'sort_order' => ['nullable','integer'],
        ]);
        $experience->update($data);
        return response()->json($experience);
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();
        return response()->json(['message' => 'Deleted']);
    }
}