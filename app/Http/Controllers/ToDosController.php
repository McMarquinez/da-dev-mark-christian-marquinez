<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class ToDosController extends Controller
{
    
    public function index()
    {
        $tasks = Task::all();
        return $tasks;
    }

    
    public function store(Request $request)
    {
        $request->validate([
            'task' => 'required|string|max:255',
        ]);

        $task = Task::create([
            'task' => $request->input('task'),
        ]);

        return $task;
    }

    
    public function show(string $id)
    {
        //
    }

    
    public function update(Request $request, string $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 422);
        }

        $task->status = 'done';
        $task->save();

        return $task;
    }

    
    public function destroy(string $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 422);
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted successfully'], 200);
    }
}
