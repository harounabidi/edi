import { NextResponse } from "next/server"
import prisma from "@/lib/db"

/*
orderdate, ordernumber, customerid, totalamount
*/

export async function GET() {
  const orders = await prisma.order.findMany()
  return NextResponse.json({ orders })
}
