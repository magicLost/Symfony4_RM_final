<?php

namespace App\Controller;

use App\Form\FeedBackType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;


use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Component\Security\Csrf\TokenStorage\TokenStorageInterface;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index(){

        return $this->render("home/index.html.twig");

    }

    /**
     * @Route("/feedback", name="feedback")
     */
    public function feedback(){

        ////%%%%%%%%%%%%%%%%%%%%%%%%%///

        $form = $this->createForm(FeedBackType::class);

        //get data
        $post = json_decode(file_get_contents('php://input'), true);

        //CHECK TOKEN
        if(!isset($post["token"]) || $post["token"] === ''){

            //Todo logging

            return $this->json([
                'result' => "error",
                //"error" => $form->getErrors(true)
                "error" => "Server do not want to answer..."
            ]);

        }

        $token = $this->createToken(
            $post["phone"],
            $post["email"]
        );

        if($post["token"] !== $token){

            //Todo logging

            return $this->json([
                'result' => "error",
                //"error" => $form->getErrors(true)
                "error" => "Server do not want to speak..."
                //"error" => [ "js_token" => $post["token"], "token" => $token ]
            ]);

        }

        //FORM VALIDATION
        $form->submit($post);

        if($form->isSubmitted()){

            if(!$form->isValid()){

                //send email
                if(isset($post["phone_id"])){



                }else{



                }

                return $this->json([ 'result' => "success"]);

            }else{

                return $this->json([
                    'result' => "error",
                    //"error" => $form->getErrors(true)
                    "error" => $form->get("name")->getData()
                ]);

            }

        }else{

            return $this->json([ 'result' => "error", "error" => "Server do not answer..."]);

        }

    }

    private function createToken($phone, $email){

        $stringToHash = $phone . $email . "Super secret phrase...";

        if(strlen($stringToHash) >  64){

            $stringToHash = substr($stringToHash, 0, 63);

        }

        return base64_encode($stringToHash);

    }


}