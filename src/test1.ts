// import { toRouterSchema } from "./lib/toRouter_v2";
import { NotFoundError } from "@utils/exception";
import { Get, Use } from "./lib/httpMethod";
import { toRouterSchema } from "@lib/toRouter_v2";



class TestContoller {
    @Get("/test")
    testMethod() {
        console.log("hello")
        throw new NotFoundError("This is a test error");
    }
}

class RootRouterTest {
    @Use("/test_root")
    test = TestContoller;

    @Get("/test_root_get")
    testRootMethod() {
        console.log("This is a root method");
    }
}

console.log(toRouterSchema(RootRouterTest));
