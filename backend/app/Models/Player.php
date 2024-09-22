<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;

    // Define the table associated with the model (optional)
    protected $table = 'players';

    // Specify which attributes are mass assignable
    protected $fillable = [
        'name',
        'birth_year',
        'club',
        'nationality',
        'market_value',
        'image_link', // Add this if you're storing the image link
    ];

    public $timestamps = true;

}