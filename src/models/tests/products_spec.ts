import { Product, ProductStore } from '../products';

const store = new ProductStore();

describe("--- TESTING PRODUCTS MODELS ---", () => {

    describe("test create function", () => {
        it ("create function exists", async () => {
            expect(store.create("apples", 45)).toBeDefined();
        });
        it("create function adds to database", async () => {
            const result = await store.create("strawberries", 3);
            expect(result.name).toEqual("strawberries");
            expect(result.price).toEqual(3);

        });

    });

    describe("test index function", () => {
        it ("index function exists", async () => {
            expect(store.index()).toBeDefined();
        });
        it("index function returns proper length", async () => {
            const result = await store.index();
            expect(result.length).toEqual(2);

            expect(result[0].name).toEqual("apples" || "strawberries");

        });
    });

    describe("test show function", () => {
        it ("show function exists", async () => {
            expect(store.show(2)).toBeDefined();
        });
        it("show function properly shows", async () => {
            store.create("chocolate", 28);
            const result = await store.show(3);
            expect(result.name).toEqual("chocolate");
            expect(result.price).toEqual(28);

        });
    });

    
    
});
