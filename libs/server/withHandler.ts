import { NextRequest, NextResponse } from "next/server";

export interface ResponseType{
    ok : boolean;
    [key: string] : any;
}

export default function withHandler(method:"GET" | "POST" | "DELETE", fn:(req : NextRequest, res: NextResponse) => void) {
    return async function(req : NextRequest, res: NextResponse) {
        if(req.method !== method){
            return res.status(405).end();
        }
        try {
            await fn(req, res);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({error});
        }
    }
}