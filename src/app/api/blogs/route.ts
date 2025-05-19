import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  let url = `${process.env.API_URL}/posts?per_page=6`;
  if (type === "latest") url += "&sort_by=created_at&sort_order=desc";
  if (type === "most-commented") url += "&sort_by=comments_count&sort_order=desc";
  if (type === "most-viewed") url += "&sort_by=views&sort_order=desc";

  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json({ posts: data.data || [] });
  } catch (e) {
    return NextResponse.json({ posts: [] }, { status: 500 });
  }
}