<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required','string'],
            'email' => ['required','email'],
            'subject' => ['nullable','string'],
            'message' => ['required','string'],
        ]);

        return response()->json(ContactMessage::create($data), 201);
    }
}