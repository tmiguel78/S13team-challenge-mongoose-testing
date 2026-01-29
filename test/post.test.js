const request = require('supertest');
const app = require('../index');

describe("testing posts", () => {

    const post = {
        title: "probando titulo 1",
        body: "probando cuerpo 1"
    }
    test("Create a post", async () => {
        newPost = await request(app).post("/create").send(post).expect(201);
    })
})
const { Post } = require("../models/Post.js");

