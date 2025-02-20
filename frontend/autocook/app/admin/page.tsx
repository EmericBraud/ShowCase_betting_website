import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Admin(){
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
    }
    return(
    <div>

    </div>
    );
}