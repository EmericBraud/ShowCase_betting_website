import { authOptions } from "@/lib/auth"; 
import { getServerSession } from "next-auth";


export async function getServerSessionTool(){
    return await getServerSession(authOptions);
}

export type APIresponse<data_type> = { success: false, error: string} | { success: true, data: data_type };