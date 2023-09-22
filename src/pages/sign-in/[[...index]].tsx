import { SignIn } from "@clerk/nextjs";
import {useRouter} from "next/router";

export default function Page() {
    const {query} = useRouter()
    const redirectUrl = query?.redirect_url ? query?.redirect_url as string : '/';

    return <div className='grid place-content-center items-center'>
        <SignIn redirectUrl={redirectUrl}/>
    </div>;
}