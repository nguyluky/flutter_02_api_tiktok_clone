import z from "zod/v4";

const testSchema = z.object({
    file: z.file()
})
const data = testSchema.parse({
    file: new File(["content"], "test.mp4", {type: "video/mp4" })
})
