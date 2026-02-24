import { BACK_URL } from "../env";

export async function LoginAuth(email: string, password: string) {
 const res = await fetch(`${BACK_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
 });

 if (!res.ok) {
    console.log(res)
    throw new Error("Verifique las credenciales") 
 }

 const data = await res.json();
 sessionStorage.setItem("token", data.token);
 const user = JSON.stringify(data.user)
 sessionStorage.setItem("user", user);
 return; 
};


