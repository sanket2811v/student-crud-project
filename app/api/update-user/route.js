
import db from "../../../lib/db";

export async function POST(req) {
  try {
    const users = await req.json(); 

    const { name, standard, age, status, fees, id } = users;
    // Validate all required fields
    if (!name || !standard || !age || !status || !fees || !id) {
      return new Response(JSON.stringify({ success: false, message: "All fields are mandatory" }), { status: 400 });
    }

    function validateObject(obj) {
      const rules = {
        id: 'number',
        name: 'string',
        age: 'number',
        standard: 'number',
        status: 'string',
        fees: 'number'
      };
    
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const expectedType = rules[key]
          
          if (!expectedType){
            continue;
          }
    
          const actualType = typeof obj[key]
    
          if (actualType !== expectedType) {
            return Response.json({ success: false, message: `${key} should be of type ${expectedType}, but got ${actualType}` });
          }
        }
      }
      return { success: true, message: "Object is valid" }
    }

    let validationErrors = validateObject(users);
    if (validationErrors.success !== true) {
      return new Response(JSON.stringify({ success: false, message: "Validation failed", errors: validationErrors }), { status: 400 });
    }

    const standardInt = parseInt(standard, 10);
    const ageInt = parseInt(age, 10);
    const feesInt = parseInt(fees, 10);

    // Database query
    const dbquery = `
      UPDATE children.information 
      SET name = ?, standard = ?, age = ?, status = ?, fees = ? 
      WHERE id = ?
    `;
    const [result] = await db.query(dbquery, [name, standardInt, ageInt, status, feesInt, id]);

    console.log("Database Query Result:", result);

    return new Response(JSON.stringify({ success: true, message: "Updated", result }), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ success: false, message: "Not Updated", error: error.message }), { status: 500 });
  }
}
