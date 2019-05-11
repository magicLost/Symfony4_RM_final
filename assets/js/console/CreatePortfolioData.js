const fs = require('fs');
const path = require('path');

//const args = process.argv.slice(2);

//npm run create:portfolio-data
//export default
class CreatePortfolioData
{


    constructor(){

        //path from portfolio_data to static/sample-works
        this.dirWithImagesToSite = './../../static/sample-works';

        this.content = '';

        this.categories = [
            "Широкоформатная печать",
            "Плоттерная резка",
            "Оклейка автомобилей",
            "Изготовление табличек",
            "Ростовые фигуры",
            "Ролл-ап (ROLL-UP) стенды",
            "Оклейка витрин",
            "Информационные стенды",
            "Полиграфия",
            "Стритлайны и штендеры"
        ];

        this.photos = [{name: 'shirokoform', 300: [], 600: []}];

        this.icons = [];

        try{

            //this.dirWithImages = path.join('./', 'static');
            this.fileToWrite = path.join( __dirname, '..', 'data', 'portfolio_data.js');
            this.dirWithImagesToNode = path.join(__dirname, '..', '..', 'static', 'sample-works');

        }catch(error){

            console.log(error);

        }

        this.fillArraysForImport();

        this.writeImports();
        this.writeCategories();
        this.writeIcons();
        this.writePhotos();

        this.writeFile();

    }


    fillArraysForImport(){

        this.walkThrowMainImagesDir()

    };



    walkThrowMainImagesDir(){

        const categoriesDirs = fs.readdirSync(this.dirWithImagesToNode);

        let index = 0;

        for(let categoryDir of categoriesDirs){

            this.walkThrowCategory(categoryDir, index);

            index++;

        }

        //return categoriesDirs;

    };

    walkThrowCategory(nameDir, index){

        this.photos[index] = { name: nameDir, desc: [] };

        const insideCategoriesDirs = fs.readdirSync(path.join(this.dirWithImagesToNode, nameDir));

        for(let insideCategoryDir of insideCategoriesDirs){

            if(this.isFile(path.join(this.dirWithImagesToNode, nameDir, insideCategoryDir))){

                //fill icons array
                this.icons.push(this.dirWithImagesToSite + "/" + nameDir + "/" + insideCategoryDir);

            }else{

                if(insideCategoryDir === '300'){

                    this.photos[index]["300"] = fs.readdirSync(path.join(this.dirWithImagesToNode, nameDir, insideCategoryDir)).map((fileName, i) => {

                        this.photos[index].desc.push({
                            title: ("Описание-" + index + "-" + i),
                            id: nameDir + "/" + fileName,
                            text: "Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла...",
                            price: "5 000 000 $"
                        });

                        return this.dirWithImagesToSite + "/" + nameDir + "/" + insideCategoryDir + "/" + fileName;

                    });


                }

                if(insideCategoryDir === '600'){

                    this.photos[index]["600"] = fs.readdirSync(path.join(this.dirWithImagesToNode, nameDir, insideCategoryDir)).map((fileName) => {

                        return this.dirWithImagesToSite + "/" + nameDir + "/" + insideCategoryDir + "/" + fileName;

                    });

                }

            }


        }

    };



    writeImports(){

        //import photos
        for(let photos of this.photos){

            for(let photo of photos["300"]){

                this.content += `
                    import ${path.basename(photo, '.jpg')} from "${photo}";
                `

            }

            for(let photo of photos["600"]){

                this.content += `
                    import ${path.basename(photo, '.jpg')} from "${photo}";
                `

            }

        }


        //import icons
        for(let icon of this.icons){

            this.content += `
            import ${path.basename(icon, '.jpg')} from "${icon}";
            `

        }

    };

    writeCategories(){

        this.content += `
              export const categories = [
                 {title: "Оклейка автомобилей", href: '#auto'},
                 {title: "Плоттерная резка", href: '#plotter'},
                 {title: "Широкоформатная печать", href: '#print'}
            ];
         `;

    };

    writeIcons(){

        this.content += `
              export const icons = [
         `;

        for(let icon of this.icons){

            this.content += `
                ${path.basename(icon, '.jpg')},
            `

        }

        this.content += `
              ];
         `;

    };

    writePhotos(){

        this.content += `
              export const photos = [
         `;

        for(let photo of this.photos){

            this.content += `
                {
                name: "${photo.name}",
            `;

            /*write photo 300*/
            this.content += `
                300: [
            `;

            for(let photo300 of photo["300"]){

                this.content += `
                    ${path.basename(photo300, '.jpg')},
            `

            }

            this.content += `
                ],
            `;
            /**/

            /*write photo 300*/
            this.content += `
                600: [
            `;

            for(let photo600 of photo["600"]){

                this.content += `
                    ${path.basename(photo600, '.jpg')},
            `

            }

            this.content += `
                ],
            `;
            /**/

            /*write desc*/
            this.content += `
                desc: [
            `;

            for(let desc of photo.desc){

                this.content += `
                    {
                        title: "${desc.title}",
                        id: "${desc.id}",
                        text: "${desc.text}",
                        price: "${desc.price}"
                    },
                `
            }

            this.content += `
                ],
            `;
            /**/

            this.content += `
                },
            `;

        }

        this.content += `
              ];
         `;


    };



    writeFile(){

        fs.writeFile(this.fileToWrite, this.content, (error) => {

            if(error) throw error; // если возникла ошибка
            console.log("Асинхронная запись файла завершена. Содержимое файла:");

        });

    };



    isFile(pathToFile){

        return fs.lstatSync(pathToFile).isFile();

    }

}

const createPortfolioData = new CreatePortfolioData();






