import { sendEmail } from "@/app/Mails/ContactMails"
import { connectToDb } from "@/db/db"
import { visitordetailsSchema } from "@/lib/Validation/auth"
import VisitorModel from "@/model/Visitor"
import { NextResponse } from "next/server"
import z from "zod"

export async function POST(request) {

    await connectToDb()

    try {
        const visitordetails = await request.json()

        if (!visitordetails) {
            return NextResponse.json({ messsage: "visitor Details Not Found" }, { status: 401 })
        }

        const parsedata = visitordetailsSchema.safeParse(visitordetails)

        const { success, data, error } = parsedata
        if (!success) {
            return NextResponse.json({ errors: z.flattenError(error).fieldErrors }, { status: 401 })
        }

        const { name, email, message } = parsedata.data
        // const visitor = await VisitorModel.findOne({ email })


        // if (visitor) {
        //     return NextResponse.json({ message: "The message has already been delivered previously ! " }, { status: 400 })
        // }

        const newvisitor = new VisitorModel({
            name,
            email,
            message
        })

        await newvisitor.save()



        const emailHTML = `
<h2>New Visitor Message</h2>
<p><strong>Visitor Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message}</p>
`
        try {
            await sendEmail("aryanmakhija1030@gmail.com", 'New Visitor', emailHTML);
        } catch (emailError) {
            console.error('Failed to send confirmation email:', emailError.message);
        }

        return NextResponse.json({ message: "Visitor Details Send SuccessFully" }, { status: 200 }, parsedata.error)

    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something Went Wrong" }, { status: 401 })
    }

}


export async function GET() {
    await connectToDb()
    try {
        const Visitor = await VisitorModel.findOne().sort({ createdAt: -1 })


        if (!Visitor) {
            return NextResponse.json({ message: "New Visitor Not Found" }, { status: 400 })
        }

        return NextResponse.json(Visitor, { message: "New Visitor" }, { status: 200 })


    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: "Something Went Wrong" }, { status: 401 })
    }
}