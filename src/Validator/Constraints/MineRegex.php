<?php

namespace App\Validator\Constraints;


use Symfony\Component\Validator\Constraint;


/**
 * @Annotation
 */
class MineRegex extends Constraint
{
    public $message = "Incorrect characters";
    public $pattern = "/[a-zA-Z0-9-_]*/";

    public function validatedBy()
    {
        return get_class($this).'Validator';
    }
}