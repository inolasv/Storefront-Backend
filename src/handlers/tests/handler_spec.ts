import supertest from "supertest";
import app from '../../server';

const request = supertest(app);

let token: string;

describe("Users Handler", () => {

    it("has working create, index, and show", async () => {
        // first tests the create
        const response = await request
            .post('/users')
            .send({
                "first_name": "test_name1",
                "last_name": "test_last1",
                "password": "test_pass1"
            })

            .then(async (res) => {
                token = res.body;
                expect(res.status).toBe(200);
                    
                // tests the index
                const response1 = await request
                    .get('/users')
                    .set('Authorization', 'JWT ' + token)
                    .then(async (res) => {
                        expect(res.status).toBe(200)
                    })
                                
                const response2 = await request
                    .get('/users/1')
                    .set('Authorization', 'JWT ' + token)
                    .then(async (res) => {
                        expect(res.status).toBe(200)
                    })
            })  

    });
})

describe("Products Handler", () => {

    it("has working create and show", async () => {
        // first tests the create
        const response = await request
            .post('/products')
            .set('Authorization', 'JWT ' + token)
            .send({
                "name" : "pillows",
                "price": 23
            })
            .then(async (res) => {
                expect(res.status).toBe(200);
                    
                // tests the show               
                const response2 = await request
                    .get('/products/1')
                    .set('Authorization', 'JWT ' + token)
                    .then(async (res) => {
                        expect(res.status).toBe(200)
                    })
            })  
    });

    it("has working index", async() => {
        const response1 = await request
        .get('/products')
        .then(async (res) => {
            expect(res.status).toBe(200)
        })
    })
})

describe("Orders Handler", () => {

    it("has working create and show", async () => {
        // first tests the create
        const response = await request
            .post('/orders')
            .set('Authorization', 'JWT ' + token)
            .send({
                "user_id": 1,
                "status": "active"
            })
            .then(async (res) => {
                expect(res.status).toBe(200);
                    
                // tests the show               
                const response2 = await request
                    .get('/orders/1')
                    .set('Authorization', 'JWT ' + token)
                    .then(async (res) => {
                        expect(res.status).toBe(200)
                    })
            })  
    });

    it("has working currentOrder", async() => {
        const response1 = await request
        .get('/products?user_id=1')
        .then(async (res) => {
            expect(res.status).toBe(200)
        })
    })
})