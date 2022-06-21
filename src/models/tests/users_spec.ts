import { User, UserStore } from '../users';

const store = new UserStore();

describe("--- TESTING USERS MODELS ---", () => {

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
