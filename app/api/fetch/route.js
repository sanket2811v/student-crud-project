import db from "../../../lib/db";

export async function GET(req) {
    try {
        // SQL query to fetch all data from the `children.information` table
        const dbquery = `SELECT * FROM children.information`;
        // Execute the query without any parameters
        const [result] = await db.query(dbquery);
        if(!result || result.length === 0){
            return Response.json({success : false , message : "Users not found"} , {status : 404})
        }
        
        return Response.json({success : true, message : "success", result:result}, {status : 200})
    } catch (error) {
        console.error(error);
        return Response.json({success : false, message : "Failure", error : error}, {status : 200})
    }
}
