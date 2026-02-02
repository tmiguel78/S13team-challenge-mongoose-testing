const request = require('supertest');
const app = require('../index');
const Post = require("../models/Post.js");

describe("testing posts", () => {
    beforeAll(() => {
    return Post.deleteMany()
    });
    test('Create a post 1', async () => {
        const post = {
            title: "probando titulo 1",
            body: "probando cuerpo 1"
        }

        let postsCount = await Post.countDocuments({});
    
        expect(postsCount).toBe(0);
    
        const resPost = await request(app).post("/create").send(post).expect(201);
    
        postsCount = await Post.countDocuments({});
    
        expect(postsCount).toBe(1);
    });
    

    test("Create a post 2", async () => {
        const post = {
            title: "probando titulo 1",
            body: "probando cuerpo 1"
        }
        const newPost = await request(app).post("/create").send(post).expect(201);
    });
    test("Create a post 3", async () => {
        const post = {
            title: "probando titulo 1",
            body: "probando cuerpo 1"
        }
        const resPost = await request(app).post("/create").send(post).expect(201);
        
        expect(resPost.body._id).toBeDefined();
        expect(resPost.body.createdAt).toBeDefined();
        expect(resPost.body.updatedAt).toBeDefined();
    });
    afterAll(() => {
    return Post.deleteMany()
    });

});