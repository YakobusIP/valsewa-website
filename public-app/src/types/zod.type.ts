import { z } from "zod";

const loginFormSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required")
});

export { loginFormSchema };
