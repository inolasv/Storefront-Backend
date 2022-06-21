import { Product, ProductStore } from '../products';

const store = new ProductStore();

describe("--- TESTING PRODUCTS MODELS ---", () => {

    describe("test index function", () => {
        it ("index function exists", async () => {
            expect(store.index()).toBeDefined();
        });
        it("index function returns empty array when empty", async () => {
            const result = await store.index();
            expect(result).toEqual([]);
        });
    });





});
