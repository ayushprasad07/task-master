import zod from "zod";

export const youtubeSchema = zod.object({
    title : zod.string(),
    description : zod.string(),
    url : zod.string(),
})