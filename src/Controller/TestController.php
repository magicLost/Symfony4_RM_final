<?php

namespace App\Controller;


use App\Entity\Photo;
use App\Entity\PhotoSize;
use App\Entity\Category;
use App\Validator\Constraints\InArray;
use App\Validator\Constraints\MineRegex;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints\Image;
use Symfony\Component\Validator\Constraints\Length;

class TestController extends AbstractController
{

    private $pathToPhotosFile = __DIR__.'../../../data';
    private $photosFileName = 'photos.json';

    /**
     * @var EntityManagerInterface
     */
    private $entityManager;
    /**
     * @var ManagerRegistry
     */
    private $doctrine;

    public function __construct(EntityManagerInterface $entityManager, ManagerRegistry $doctrine)
    {
        $this->entityManager = $entityManager;
        $this->doctrine = $doctrine;

        $this->pathToPhotosFile = realpath($this->pathToPhotosFile);
    }

    /**
     * @Route("/test/upload_file", name="test_uploadFile")
     */
    public function uploadFile(Request $request){

        $categories = $this->doctrine->getRepository(Category::class)->findAll();

        $categoriesNames = $this->getCategoriesNames($categories);
        $photoSizesNames = $this->getPhotoSizesNames();

        //dump($categoriesNames);

        $form = $this->createAddPhotoForm($categoriesNames, $photoSizesNames);

        if($request->isMethod('post')){

            //dump($request->headers);

            $form->handleRequest($request);

            //validate token

            if($form->isSubmitted() && $form->isValid()){

                $category = $this->getCategory($form->get('category')->getData(), $categories);
                $name = $this->getFileName($category->getDirName());
                $realPath = realpath(__DIR__.'../../../public.local/photo/test');

                $photosToWriteToFile = [];

                //dump($name);

                try {

                    foreach($photoSizesNames as $index=>$sizesName){

                        $file = $form->get('photo_'.$sizesName)->getData();

                        $fileName = $category->getDirName().'_'.$name.'_'.$sizesName.'.'.$file->guessExtension();

                       //dump($fileName);
                        /*$file->move(
                            $realPath,
                            $fileName
                        );*/

                        $photosToWriteToFile[$category->getDirName()][$sizesName] = $fileName;

                    }

                    //add file to photos entity
                    $title = trim(strip_tags($form->get('title')->getData()));
                    $desc = trim(strip_tags($form->get('desc')->getData()));

                    $photo = new Photo();
                    $photo->setName($category->getDirName().'_'.$name);
                    $photo->setCategory($category);
                    $photo->setTitle($title);
                    $photo->setDesc($desc);

                    $photosToWriteToFile[$category->getDirName()]['desc'] = [ 'title' => $title, 'desc' => $desc];

                    //dump($photo);

                    //$this->entityManager->persist($photo);
                    //$this->entityManager->flush();

                   // dump($this->pathToPhotosFile . '\\' . $this->photosFileName);

                    //cache photo files map to the file
                    $this->writeToFile($photosToWriteToFile, $category, $categories, $photoSizesNames);

                    //return $this->json("good");

                } catch (\Exception $e) {
                    // ... handle exception if something happens during file upload
                    dump($e);
                }



            }

        }

        return $this->render('test/index.html.twig', [
            'form' => $form->createView()
        ]);

    }

    private function writeToFile($photosToWriteToFile, $category, $categories, $photoSizesNames) : void {

        if(file_exists($this->pathToPhotosFile . '\\' . $this->photosFileName)){

            $photos = json_decode(file_get_contents($this->pathToPhotosFile . '\\' . $this->photosFileName), true);

            //dump($photos);
           //dump(gettype($photos));

            foreach($photosToWriteToFile[$category->getDirName()] as $key=>$val){

                if(array_key_exists($key, $photos[$category->getDirName()])){
                    $photos[$category->getDirName()][$key][] = $val;
                }else{
                    throw new \Exception("No such key " . $key . " in photos file");
                }

            }

            file_put_contents($this->pathToPhotosFile . '\\' . $this->photosFileName, json_encode($photos));

            //dump($photos);

        }else{

            $finalResult = [];

            foreach($categories as $cat){

                if($cat->getDirName() === $category->getDirName()){

                    foreach($photoSizesNames as $sizeName){

                        $finalResult[$cat->getDirName()][$sizeName][] = $photosToWriteToFile[$cat->getDirName()][$sizeName];

                    }

                    $finalResult[$cat->getDirName()]['desc'][] = $photosToWriteToFile[$cat->getDirName()]['desc'];

                }else{

                    foreach($photoSizesNames as $sizeName){

                        $finalResult[$cat->getDirName()][$sizeName] = [];

                    }

                    $finalResult[$cat->getDirName()]['desc'] = [];

                }

            }

            file_put_contents($this->pathToPhotosFile . '\\' . $this->photosFileName, json_encode($finalResult));

            //dump($finalResult);

        }

    }

    private function getFileName() : string {

        $date = hash('sha256', date(DATE_RFC822));

        return substr($date, 0, 10);

    }

    private function createAddPhotoForm($categories_names, $photo_sizes_names) : FormInterface {

        $form = $this->createFormBuilder()
            ->add('category', TextType::class, [
            'required' => true,
            'constraints' => [
                new InArray([
                    'message' => 'No such category in categories.',
                    'array' => $categories_names
                ])
            ]
        ])
            ->add('title', TextType::class, [
                'required' => true,
                'label' => 'Заголовок',
                'constraints' => [
                    new Length([
                        "max" => 255
                    ])
                ]
            ])
            ->add('desc', TextareaType::class, [
                'required' => true,
                'label' => 'Описание',
                'constraints' => [

                ]
            ])
            ->add('token', HiddenType::class)
        ;

        $maxSize = 100;

        foreach($photo_sizes_names as $size){

            $form->add(
                'photo_'.$size,
                FileType::class,
                [
                    'required' => true,
                    'constraints' => [
                        new Image([
                            'maxSize' => (string)$maxSize."k"
                        ]),
                    ]
                ]
            );

            $maxSize *= 2;

        }

        $form->add('go', SubmitType::class, ['label' => 'Go']);

        return $form->getForm();

    }

    private function getCategoriesNames($categories) : array {

        $categories_names = [];

        foreach($categories as $category){
            $categories_names[] = $category->getName();
        }

        return $categories_names;

    }

    private function getDirName($categoryName, $categories) : string {

        for( $i = 0; $i < count($categories); $i++){

            if($categories[$i]->getName() === $categoryName){
                return $categories[$i]->getDirName();
            }

        }

    }

    private function getCategory($categoryName, $categories) : Category {

        for( $i = 0; $i < count($categories); $i++){

            if($categories[$i]->getName() === $categoryName){
                return $categories[$i];
            }

        }

        throw new \Exception("No such category " . $categoryName);

    }

    private function getPhotoSizesNames() : array {

        $photo_sizes_names = [];

        $photo_sizes = $this->doctrine->getRepository(PhotoSize::class)->findAll();
        foreach($photo_sizes as $size){
            $sizeName = $size->getSize();
            $photo_sizes_names[] = $sizeName;
        }

        return $photo_sizes_names;

    }

}