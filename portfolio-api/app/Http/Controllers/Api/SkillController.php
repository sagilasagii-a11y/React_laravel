<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index() { return response()->json(Skill::orderBy('sort_order')->get()); }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required','string'],
            'icon' => ['nullable','string'],
            'level' => ['required','integer','min:0','max:100'],
            'description' => ['nullable','string'],
            'sort_order' => ['nullable','integer'],
        ]);
        return response()->json(Skill::create($data), 201);
    }

    public function update(Request $request, Skill $skill)
    {
        $data = $request->validate([
            'name' => ['required','string'],
            'icon' => ['nullable','string'],
            'level' => ['required','integer','min:0','max:100'],
            'description' => ['nullable','string'],
            'sort_order' => ['nullable','integer'],
        ]);
        $skill->update($data);
        return response()->json($skill);
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();
        return response()->json(['message' => 'Deleted']);
    }
}