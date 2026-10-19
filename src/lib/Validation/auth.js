import z from "zod"

export const visitordetailsSchema = z.object({
    name: z.string().min(3, "name must be 3 character long").max(20, "user name too long"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(5, "Message must be atlest 5 character long")
})