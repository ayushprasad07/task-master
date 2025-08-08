import zod from "zod";

export const noteSchema = zod.object({
    title : zod.string(),
    description : zod.string(),
})