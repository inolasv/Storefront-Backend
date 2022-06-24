import { Product, ProductStore } from '../products';
import { Order, OrderStore } from '../orders';
import { User, UserStore } from '../users';

const p_store = new ProductStore();

describe("--- TESTING PRODUCTS MODELS ---", () => {

    describe("test create function", () => {
        it ("create function exists", async () => {
            expect(p_store.create("apples", 45)).toBeDefined();
        });

        it("create function adds to database", async () => {
            const result = await p_store.create("strawberries", 3);
            expect(result.name).toEqual("strawberries");
            expect(result.price).toEqual(3);

        });

    });

    describe("test index function", () => {
        it ("index function exists", async () => {
            expect(p_store.index()).toBeDefined();
        });
        it("index function returns proper length", async () => {
            const result = await p_store.index();
            expect(result.length).toEqual(3);
            expect(result[0].name).toEqual("pillows");

        });
    });

    describe("test show function", () => {
        it ("show function exists", async () => {
            expect(p_store.show(2)).toBeDefined();
        });
        it("show function properly shows", async () => {
            p_store.create("chocolate", 28);
            const result = await p_store.show(4);
            expect(result.name).toEqual("chocolate");
            expect(result.price).toEqual(28);

        });
    });
    
});

const u_store = new UserStore();

describe("--- TESTING USERS MODELS ---", () => {

    describe("test create function", () => {
        it ("create function exists", async () => {
            const add: User = {
                first_name: "user1",
                last_name: "last1",
                password_digest: "password1"
            };
            expect(u_store.create(add)).toBeDefined();
        });

        it("create function adds to database", async () => {
            const add: User = {
                first_name: "user2",
                last_name: "last2",
                password_digest: "password2"
            };
            const result = await u_store.create(add);
            expect(result.first_name).toEqual("user2");
            expect(result.last_name).toEqual("last2");
        });

    });

    describe("test index function", () => {
        it ("index function exists", async () => {
            expect(u_store.index()).toBeDefined();
        });
        it("index function returns proper vals", async () => {
            const result = await u_store.index();
            expect(result.length).toEqual(3);

            expect(result[1].first_name).toEqual("user1");
            expect(result[2].first_name).toEqual("user2");
            expect(result[1].last_name).toEqual("last1");
            expect(result[2].last_name).toEqual("last2");


        });
    });

    describe("test show function", () => {
        it ("show function exists", async () => {
            expect(u_store.show(2)).toBeDefined();
        });
        it("show function properly shows", async () => {
            const add: User = {
                first_name: "user3",
                last_name: "last3",
                password_digest: "password3"
            }

            await u_store.create(add);

            const result = await u_store.show(4);
           
            expect(result.first_name).toEqual("user3");
            expect(result.last_name).toEqual("last3");

        });
    });

});



const o_store = new OrderStore();

describe("--- TESTING ORDERS MODELS ---", () => {

    describe("test create function", () => {
        it ("create function exists", async () => {
            expect(o_store.create(1, "active")).toBeDefined();
        });
        it("create function adds to database", async () => {
            const result = await o_store.create(2, "active");
            expect(result.user_id).toEqual(2);
            expect(result.status).toEqual("active");
        });
    });

    describe("test currentOrder function", () => {
        it ("currentOrder function exists", async () => {
            expect(o_store.currentOrder(1)).toBeDefined();
        });

        it("currentOrder function displays correctly", async () => {
            const result = await o_store.currentOrder(1)
            expect(result.status).toEqual("active");
        });

        it("currentOrder function doenst display when not active", async () => {
            o_store.create(3, "completed")
            const result = await o_store.currentOrder(3)
            expect(result).toBeUndefined();
        });

    });

    describe("test show function", () => {
        it ("show function exists", async () => {
            expect(o_store.show(2)).toBeDefined();
        });

        it("show function properly shows", async () => {
            const newone = await o_store.create(1, "completed");
            const result = await o_store.show(5);
            expect(result.user_id).toEqual(1);
            expect(result.status).toEqual("completed");
        });
    });
    
});

