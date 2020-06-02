import { controller, injectable, get, put, post, del, head, options, all, inject, middleware, patch, disable } from "../../src";

@injectable()
class User {
    public getUser() {
        return {
            userId: 1,
            name: "hello"
        };
    }
}

async function addUser(ctx, next) {
    ctx.user = {
        userId: 2,
        name: "world"
    };

    await next();
}

@controller()
@injectable()
class Contro {
    @inject()
    private _user: User;

    @get("/get")
    public get(ctx) {
        ctx.body = "success";
    }

    @put("/put")
    public put(ctx) {
        ctx.body = "success";
    }

    @post("/post")
    public post(ctx) {
        ctx.body = "success";
    }

    @del("/del")
    public del(ctx) {
        ctx.body = "success";
    }

    @head("/head")
    public head(ctx) {
        ctx.body = "success";
    }

    @options("/options")
    public options(ctx) {
        ctx.body = "success";
    }

    @patch("/patch")
    public patch(ctx) {
        ctx.body = "success";
    }

    @all("/all")
    public all(ctx) {
        ctx.body = "success";
    }

    @get("/user")
    public getUser(ctx) {
        ctx.body = this._user.getUser();
    }

    @get("/disable")
    @disable()
    public getDisable(ctx) {
        ctx.body = this._user.getUser();
    }

    @get("/middleware")
    @middleware(addUser)
    public checkUser(ctx) {
        const { user } = ctx;

        if (user.userId === 2) {
            return ctx.body = "success";
        }

        ctx.body = "failure";
    }
}

@controller()
@injectable()
@disable()
class Disable {}

@controller()
@injectable()
class NotRouter {}
