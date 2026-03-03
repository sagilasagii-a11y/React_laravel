<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index() { return response()->json(Project::orderBy('sort_order')->get()); }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required','string'],
            'description' => ['nullable','string'],
            'tech_stack' => ['nullable','string'],
            'demo_url' => ['nullable','string'],
            'github_url' => ['nullable','string'],
            'image_url' => ['nullable','string'],
            'sort_order' => ['nullable','integer'],
        ]);
        return response()->json(Project::create($data), 201);
    }

    public function update(Request $request, Project $project)
    {
        $data = $request->validate([
            'title' => ['required','string'],
            'description' => ['nullable','string'],
            'tech_stack' => ['nullable','string'],
            'demo_url' => ['nullable','string'],
            'github_url' => ['nullable','string'],
            'image_url' => ['nullable','string'],
            'sort_order' => ['nullable','integer'],
        ]);
        $project->update($data);
        return response()->json($project);
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(['message' => 'Deleted']);
    }
}