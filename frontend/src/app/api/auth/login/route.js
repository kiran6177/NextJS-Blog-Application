import { NextResponse } from "next/server";
import { AUTH_BASE_URL, emailRegex, passwordRegex } from "../../config";


export async function POST(request) {
    const data = await request.json();
    if(data?.email?.trim() === "" && data?.password?.trim() === ""){
        return new NextResponse(JSON.stringify({error:"Please fill up the fields!!"}),{
            status : 400,
            headers:{
                "Content-Type": "application/json" 
            }   
        })
    }

    if(data?.email?.trim() === ""){
        return new NextResponse(JSON.stringify({error:"Please enter a email!!"}),{
            status : 400,
            headers:{
                "Content-Type": "application/json" 
            }
        })
    }
    

    if(!emailRegex.test(data.email)){
        return new NextResponse(JSON.stringify({error:"Please enter a valid email!!"}),{
            status : 400,
            headers:{
                "Content-Type": "application/json" 
            }
        })
    }

    if(data?.password?.trim() === ""){
        return new NextResponse(JSON.stringify({error:"Please enter a password!!"}),{
            status : 400,
            headers:{
                "Content-Type": "application/json" 
            }
        })
    }

    if(data?.password?.trim().length < 8){
        return new NextResponse(JSON.stringify({error:"Password should contain minimum 8 digits!!"}),{
            status : 400,
            headers:{
                "Content-Type": "application/json" 
            }
        })
    }

    if(!passwordRegex.test(data.password)){
        return new NextResponse(JSON.stringify({error:"Password should contain alphabets and digits!!"}),{
            status : 400,
            headers:{
                "Content-Type": "application/json" 
            }
        })
    }

    const response = await fetch(AUTH_BASE_URL+'/login',{
        method:"POST",
        headers:{
            "Content-Type": "application/json" 
        },
        credentials:"include",
        body:JSON.stringify(data)
    })
    const resultData = await response.json();
    console.log("RESDATA",resultData);
    

    const nextResponse = NextResponse.json(resultData, {
        status: response.status,
    });

    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
        nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }

    return nextResponse;
} 