import { Order, OrderStore } from '../orders';

const store = new OrderStore();

describe("test current order function", () => {
    it ("test current order function exists", async () => {
        expect(store.currentOrder("90")).toBeDefined();
    });
    it ("test test", () => {
        expect(false).toBeFalse();
    });
});