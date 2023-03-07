<?php

namespace App\Utils;


enum SectionType: string
{
    case Title = 'title';
    case Text = 'text';
    case Task = 'task';
}