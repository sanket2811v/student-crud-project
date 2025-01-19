import db from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 });
    }

    if(typeof id !== 'number'){
      return NextResponse.json({success : false , message : "ID must be integer but not any other dataType"} , {status : 400})
    }
    const dbquery = `DELETE FROM children.information WHERE id = ?`;
    const result = await db.query(dbquery, [id]);

    return NextResponse.json({ success: true, message: 'Deleted successfully', result }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Deletion failed', error }, { status: 500 });
  }
}
