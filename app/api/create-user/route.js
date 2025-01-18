import { act, experimental_taintObjectReference } from "react";
import db from "../../../lib/db";

export async function POST(req) {
    try {
        const users = await req.json(); 
        console.log(users);

        const {name , standard , age , status , fees} = users;

        if(!name || !standard || !age || !status || !fees){
            return Response.json({success : false , message : "All fields are Mandatory "} ,{status : 400})
        }
        function validateObject(obj) {
            // Define the rules for each key
            const rules = {
                name : 'string' , 
                age : 'number' ,
                // id : "number",
                standard : 'number' ,
                status : 'string' ,
                fees : 'number'
            };
        
            for(const key in obj){
                if(obj.hasOwnProperty(key)){
                    const expectedType = rules[key] 

                    if(!expectedType){
                        continue ;
                    }
                    const actualType = typeof obj[key] 
                    if(actualType !== expectedType){
                        return Response.json({success : false , message : `${key} should be of type ${expectedType}, but got ${actualType}` , status : 400})
                    }
                }
            }
            return { success: true, message: "Object is valid" }
          }
      
        // SQL query to insert the data.
        const dbquery = `INSERT INTO information (name , standard , age , status , fees ) VALUES (?, ?, ?, ? , ?)`;
      
        const [result] = await db.query(dbquery, [name, standard , age , status , fees]);
        return new Response(
            JSON.stringify({ success: true, message: "Added", result }),
            { status: 200}
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ success: false, message: "Not Added", error }),
            { status: 500}
        );
    }
}
