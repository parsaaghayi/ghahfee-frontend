import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // پارامترها رو از query string می‌گیریم
  const is_active = searchParams.get("is_active") || "1";
  const sort_by = searchParams.get("sort_by") || "order";
  const sort_order = searchParams.get("sort_order") || "asc";
  const per_page = searchParams.get("per_page") || "5";

  // آدرس بک‌اند (از env یا مستقیم)
  const backendUrl = process.env.API_URL;

  // ساختن URL نهایی برای بک‌اند
  const url = `${backendUrl}/menus?is_active=${is_active}&sort_by=${sort_by}&sort_order=${sort_order}&per_page=${per_page}`;

  // درخواست به بک‌اند
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();

  return NextResponse.json(data);
}