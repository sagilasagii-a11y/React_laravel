<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PublicController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\ContactController;

Route::get('/home', [PublicController::class, 'home']);
Route::post('/contact', [ContactController::class, 'store']);

Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::get('/admin/profile', [ProfileController::class, 'show']);
    Route::post('/admin/profile', [ProfileController::class, 'upsert']);

    Route::get('/admin/skills', [SkillController::class, 'index']);
    Route::post('/admin/skills', [SkillController::class, 'store']);
    Route::put('/admin/skills/{skill}', [SkillController::class, 'update']);
    Route::delete('/admin/skills/{skill}', [SkillController::class, 'destroy']);

    Route::get('/admin/projects', [ProjectController::class, 'index']);
    Route::post('/admin/projects', [ProjectController::class, 'store']);
    Route::put('/admin/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/admin/projects/{project}', [ProjectController::class, 'destroy']);

    Route::get('/admin/experiences', [ExperienceController::class, 'index']);
    Route::post('/admin/experiences', [ExperienceController::class, 'store']);
    Route::put('/admin/experiences/{experience}', [ExperienceController::class, 'update']);
    Route::delete('/admin/experiences/{experience}', [ExperienceController::class, 'destroy']);
});