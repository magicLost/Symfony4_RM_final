<?php

namespace App\Form;


use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\Type;

class AddPortfolioPhotoType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', TextType::class, [
                'label' => 'Заголовок',
                'constraints' => [
                    new Length([
                        "max" => 255
                    ])
                ]
            ])
            ->add('desc', TextareaType::class, [
                'label' => 'Описание'
            ])
            ->add('price', NumberType::class, [
                'label' => 'Примерная стоимость',
                'constraints' => [
                    new Type(['type' => "integer"])
                ]
            ])
            ->add('token', HiddenType::class);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            // Configure your form options here
            "csrf_protection" => false
        ]);
    }

}