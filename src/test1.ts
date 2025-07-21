import { toRouterSchema } from "./lib/toRouter_v2";
import { Get } from "./lib/httpMethod";


class TestContoller {
    @Get("/test")
    testMethod() {
        return "Hello, World!";
    }
}

console.log(toRouterSchema(TestContoller));
