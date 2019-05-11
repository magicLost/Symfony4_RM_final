<?php

namespace App\Form;


use Symfony\Component\Form\{AbstractType,
    Extension\Core\Type\EmailType,
    Extension\Core\Type\HiddenType,
    FormBuilderInterface,
    Extension\Core\Type\TelType,
    Extension\Core\Type\TextareaType,
    Extension\Core\Type\TextType};
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Regex;

class FeedBackType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', TextType::class, [
                'required' => true,
                'attr' => [
                    'class' => 'form__input-text',
                    'placeholder' => 'Олимпмада'
                ],
                'label' => 'Ваше имя',
                'label_attr' => [ 'class' => 'form__input-label' ],
                'constraints' => [
                    new NotBlank(),
                    new Length(['min' => 2, 'max' => 100]),
                    new Regex(["pattern" => "/[А-Яа-яA-Za-z0-9 -_]*/"])
                ]
            ])
            ->add('phone', TelType::class, [
                'required' => false,
                'attr' => [
                    'class' => 'form__input-text',
                    'placeholder' => '+7(921)521-13-43'
                ],
                'label' => 'Ваш телефон',
                'label_attr' => [ 'class' => 'form__input-label' ],
                'constraints' => [
                    new Length(['min' => 7, 'max' => 25]),
                    new Regex(["pattern" => "/[0-9()-+]*/"])
                ]
            ])
            ->add('email', EmailType::class, [
                'required' => false,
                'attr' => [
                    'class' => 'form__input-text',
                    'placeholder' => 'example@mail.ru'
                ],
                'label' => 'Ваш электронный адрес',
                'label_attr' => [ 'class' => 'form__input-label' ],
                'constraints' => [
                    new Email()
                ]
            ])
            ->add('comment', TextareaType::class, [
                'required' => false,
                'attr' => [
                    'class' => 'form__input-textarea',
                    'placeholder' => 'Я бы хотел(а)...'
                ],
                'label' => 'Ваш комментарий',
                'label_attr' => [ 'class' => 'form__input-label' ],
                'constraints' => [
                    new Length(['max' => 1000])
                ]
            ])
            ->add('photo_id', HiddenType::class, [
                'required' => false,
                'constraints' => [
                    new Length(['min' => 2, 'max' => 100]),
                    new Regex(["pattern" => "/[А-Яа-яA-Za-z0-9-_]*/"])
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            // Configure your form options here
            "csrf_protection" => false
        ]);
    }

}