<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class NonceGeneratorExtension extends AbstractExtension
{

    /** @var String|null */
    private $nonce;

    public function getNonce() : string
    {
        // generation occurs only when $this->nonce is still null
        if (!$this->nonce) {
            //$this->nonce = base64_encode(random_bytes(20));
            $this->nonce = hash('sha256', random_bytes(20));
        }

        return $this->nonce;
    }

    public function getFunctions()
    {
        return [
            new TwigFunction('csp_nonce', [$this, 'getNonce']),
        ];
    }

}

