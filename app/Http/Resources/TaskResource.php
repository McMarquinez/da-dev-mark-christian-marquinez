<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $completionDate = null;

        if($this->status == "done") {
            $completionDate = Carbon::parse($this->updated_at)->format('F j, Y');
        }

        return [
            'id' => $this->id,
            'task' => $this->task,
            'status' => $this->status,
            'date_added' => Carbon::parse($this->created_at)->format('F j, Y'),
            'date_completed' => $completionDate,
        ];
    }
}
