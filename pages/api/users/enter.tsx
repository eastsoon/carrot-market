import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler( req: NextApiRequest, res: NextApiResponse<ResponseType>){
    const { phone, email } = req.body;
    const user = phone ? { phone: +phone } : email ? { email } : null;
    if(!user) return res.status(400).json({ok : false});
    const payload = Math.floor(100000 + Math.random()*900000) + "";
    const token = await client.token.create({
        data : {
            payload,
            user : {
                connectOrCreate : {
                    where:{
                        ...user,
                    },
                    create: {
                        name : "Anonymous",
                        ...user,
                    },
                },
            },
        },
    });
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

    return res.json({
        ok : true,
    });
}

export default withHandler("POST", handler);