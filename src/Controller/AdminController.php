<?php

namespace App\Controller;


use App\Entity\Photo;
use App\Entity\PhotoSize;
use App\Entity\Category;
use App\Form\AddPortfolioPhotoType;
use App\Validator\Constraints\InArray;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Common\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints\Image;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\Type;

class AdminController extends AbstractController
{

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
    }

    /**
     * @Route("/admin/photos", name="admin_photos")
     */
    public function photos(){

        $categories_names = [];
        $photo_sizes_names = [];
        $photos = [];

        $categories = $this->doctrine->getRepository(Category::class)->findAll();
        foreach($categories as $category){
            $categories_names[] = [
                'id' => $category->getId(),
                'name' => $category->getName()
            ];
        }

        $photo_sizes = $this->doctrine->getRepository(PhotoSize::class)->findAll();
        foreach($photo_sizes as $size){
            $photo_sizes_names[] = $size->getSize();
        }

        $photoes = $this->doctrine->getRepository(Photo::class)->findAll();
        foreach($photoes as $photo){
            //$photo_sizes_names[] = $size->getSize();
            $photos[$photo->getCategory()->getId()][] = $photo->getName();
            //dump($photo->getCategory()->getName());
        }

        //dump($photos);

        return $this->render("admin/photos.html.twig", [
            'categories' => json_encode($categories_names),
            'photo_sizes' => json_encode($photo_sizes_names),
            'photos' => json_encode($photos)
        ]);

    }

    /**
     * @Route("/admin/add_photos", name="admin_add_photos", methods={"POST"})
     */
    public function add_photos(Request $request){

        //get data
        //$post = json_decode(file_get_contents('php://input'), true);
        //$post = json_decode(file_get_contents('php://input'), true);

        //get categories and photo sizes

        try{

            $categories = $this->doctrine->getRepository(Category::class)->findAll();

            $categoriesNames = $this->getCategoriesNames($categories);
            $photoSizesNames = $this->getPhotoSizesNames();

            //validate form
            $form = $this->createAddPhotoForm($categoriesNames, $photoSizesNames);

            //dump($request->headers);

            //$form->handleRequest($request);
            $form->submit($_POST);

            //TODO validate token

            /*if($form->isSubmitted() && $form->isValid()){

            }else{

            }*/

            if($form->isSubmitted() && $form->isValid()){

                $category = $this->getCategory($form->get('category')->getData(), $categories);
                $name = $this->getFileName($category->getDirName());
                $realPath = realpath(__DIR__.'../../../public.local/photo/test');

                $photosToWriteToFile = [];

                //dump($name);

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

                return $this->json(['result' => 'success', 'photo' => $photo]);



            }else{

                return $this->json([ 'result' => 'error', 'error' => $form->getErrors(true) ]);

            }


        } catch (\Exception $e) {
            // ... handle exception if something happens during file upload
            //dump($e);

            return $this->json([ 'result' => 'error', 'error' => $e->getMessage() ]);

        }




    }

    private function createAddPhotoForm($categories_names, $photo_sizes_names) : FormInterface {

        $form = $this->createForm(AddPortfolioPhotoType::class);

        $form
            ->add('category', TextType::class, [
                'required' => true,
                'constraints' => [
                    new InArray([
                        'message' => 'No such category in categories.',
                        'array' => $categories_names
                    ])
                ]
            ])
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

        //$form->add('go', SubmitType::class, ['label' => 'Go']);

        return $form;

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

    private function createToken($phone, $email){

        /*
         *
         *   let result = '';

        for(let value in data){
            result += data[value];
        }

        result = encodeURI(result);
        result = btoa(result);

        result = (result.length > 64) ? result.substr(0, 64) : result;

        return result;
         * */

        $stringToHash = $phone . $email . "Super secret phrase...";

        if(strlen($stringToHash) >  64){

            $stringToHash = substr($stringToHash, 0, 63);

        }

        return base64_encode($stringToHash);

    }

    private function getCategoriesNames($categories) : array {

        $categories_names = [];

        foreach($categories as $category){
            $categories_names[] = $category->getName();
        }

        return $categories_names;

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