<?php

namespace App\Validator\Constraints;


use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class InArray extends Constraint
{

    public $array = [];
    public $message = "The value must be one of...";

    public function validatedBy()
    {
        return \get_class($this).'Validator';
    }

}