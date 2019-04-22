import CreatePortfolioData from "./CreatePortfolioData";

describe("CreatePortfolioData", () => {

    let createPortfolioData = null;

    describe("Unit tests", () => {

        beforeEach(() => {

            createPortfolioData = new CreatePortfolioData();

        });

        describe("Init", () => {

            test("", () => {

                expect(createPortfolioData.dirWithImagesToNode).toEqual('C:\\OSPanel_RM_final\\domains\\assets\\static\\sample-works');
                expect(createPortfolioData.fileToWrite).toEqual('C:\\OSPanel_RM_final\\domains\\assets\\js\\data\\portfolio_data.js');
                //expect(createPortfolioData.walkThrowImages()).toEqual([]);

            });

        });

        describe("walkThrowImages", () => {

            test("", () => {

                //expect(createPortfolioData.walkThrowImages()).toEqual([]);
                //createPortfolioData.walkThrowMainImagesDir();
                createPortfolioData.writeImports();
                createPortfolioData.writeCategories();
                createPortfolioData.writeIcons();
                createPortfolioData.writePhotos();
                //expect(createPortfolioData.icons).toEqual([]);
                //expect(createPortfolioData.photos).toEqual([]);
                expect(createPortfolioData.content).toEqual('hello');

            });

        });

    });


});

