import { User, UserStore } from '../users';

const store = new UserStore();

describe("--- TESTING USERS MODELS ---", () => {

    describe("test create function", () => {
        it ("create function exists", async () => {
            const add: User = {
                first_name: "user1",
                last_name: "last1",
                password_digest: "password1"
            };
            expect(store.create(add)).toBeDefined();
        });

        it("create function adds to database", async () => {
            const add: User = {
                first_name: "user2",
                last_name: "last2",
                password_digest: "password2"
            };
            const result = await store.create(add);
            expect(result.first_name).toEqual("user2");
            expect(result.last_name).toEqual("last2");
        });

    });

    describe("test index function", () => {
        it ("index function exists", async () => {
            expect(store.index()).toBeDefined();
        });
        it("index function returns proper length", async () => {
            const result = await store.index();
            expect(result.length).toEqual(2);

            expect(result[0].first_name).toEqual("user1");
            expect(result[1].first_name).toEqual("user2");
            expect(result[0].last_name).toEqual("last1");
            expect(result[1].last_name).toEqual("last2");


        });
    });

    describe("test show function", () => {
        it ("show function exists", async () => {
            expect(store.show(2)).toBeDefined();
        });
        it("show function properly shows", async () => {
            const add: User = {
                first_name: "user3",
                last_name: "last3",
                password_digest: "password3"
            }

            await store.create(add);

            const result = await store.show(3);
           
            expect(result.first_name).toEqual("user3");
            expect(result.last_name).toEqual("last3");

        });
    });




});
