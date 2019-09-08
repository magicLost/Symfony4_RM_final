<?php

namespace App\EventListener;


use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class CSPSubscriber implements EventSubscriberInterface
{

    public  function onKernelResponse(FilterResponseEvent $event)
    {

        //script-src 'self' 'sha256-V8ghUBat8RY1nqMBeNQlXGceJ4GMuwYA55n3cYBxxvs=';
        $scriptDirectory = "script-src 'self';";
        $styleDirectory = "style-src 'self';";

        //report-uri: https://example.com/csp/report;
        $mineHeaders = [
            "Content-Security-Policy-Report-Only" =>
                "default-src 'self';" . $scriptDirectory . $styleDirectory . " img-src 'self';  object-src none; frame-src none; font-src none",
            "Access-Control-Allow-Origin" => "*"
        ];


        //headers for auth on game page
        $headers = $event->getResponse()->headers;

        $headers->add($mineHeaders);

        //dump($headers);

    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::RESPONSE => 'onKernelResponse'
        ];
    }

}