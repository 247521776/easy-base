import request = require("supertest");
import { Application } from "../src";

const port = 3032;
const successCode = 200;
const successResult = "success";

describe("Http Server Test", () => {
    const application = new Application({
        rootPath: `${process.cwd()}/test`,
        loadFiles: ["./decorator"]
    });

    let server;

    before(async () => {
        await application.init();
        server = application.listen(port);
    });

    after((done) => {
        server.close(done);
    });

    it("decorator @get test", (done) => {
        request(server)
            .get("/get")
            .expect(successCode, successResult, done);
    });

    it("decorator @put test", (done) => {
        request(server)
            .put("/put")
            .expect(successCode, successResult, done);
    });

    it("decorator @post test", (done) => {
        request(server)
            .post("/post")
            .expect(successCode, successResult, done);
    });

    it("decorator @patch test", (done) => {
        request(server)
            .patch("/patch")
            .expect(successCode, successResult, done);
    });

    it("decorator @del test", (done) => {
        request(server)
            .del("/del")
            .expect(successCode, successResult, done);
    });

    it("decorator @all test", (done) => {
        request(server)
            .get("/all")
            .expect(successCode, successResult, done);
    });

    it("decorator @options test", (done) => {
        request(server)
            .options("/options")
            .expect(successCode, successResult, done);
    });

    it("decorator @head test", (done) => {
        request(server)
            .head("/head")
            .expect(successCode, done);
    });
});
