import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler( req: NextApiRequest, res: NextApiResponse ){
    const { phone, email } = req.body;
    const payload = phone ? {phone: +phone} : {email};
    const user = await client.user.upsert({
        where:{
            ...payload,
        },
        create: {
            name : "Anonymous",
            ...payload,
        },
        update: {},
    });
    console.log(user);
    // if(email){
    //     user = await client.user.findUnique({
    //         where : {
    //             email,
    //         }
    //     });
    //     if(user) console.log("found it.")
    //     if(!user){
    //         console.log("Did not found. Will create.")
    //         user = await client.user.create({
    //             data : {
    //                 name : "Anonymouse",
    //                 email,
    //             }
    //         });
    //     }
    //     console.log(user);
    // }
    // if(phone){
    //     user = await client.user.findUnique({
    //         where : {
    //             phone : +phone,
    //         }
    //     });
    //     if(user) console.log("found it.")
    //     if(!user){
    //         console.log("Did not found. Will create.")
    //         user = await client.user.create({
    //             data : {
    //                 name : "Anonymouse",
    //                 phone : +phone,
    //             }
    //         });
    //     }
    //     console.log(user);
    // }

    return res.json({ok : true});
}

export default withHandler("POST", handler);