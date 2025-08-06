import zod from "zod";

export const signInSchema = zod.object({
    identifier: zod.email(),
    password: zod.string().min(6),
});