import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  let url = `${process.env.API_URL}/products?per_page=7&is_active=1`;
  if (type === "featured") url += "&is_featured=1";
  if (type === "bestsellers") url += "&sort=-sales_count&sort_order=desc";
  if (type === "latest") url += "&sort_by=created_at&sort_order=desc";

  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json({ products: data.data || [] });
  } catch (e) {
    return NextResponse.json({ products: [] }, { status: 500 });
  }
}