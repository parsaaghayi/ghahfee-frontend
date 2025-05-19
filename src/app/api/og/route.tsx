import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawText = searchParams.get("text") || "Hello world!";

    // محدود کردن طول متن و حذف کاراکترهای غیرمجاز
    const text = rawText
      .slice(0, 100)
      .replace(/[^\p{L}\p{N}\s\-_.]/gu, "");

    // تولید رنگ تصادفی
    function randomColor() {
      const r = Math.floor(Math.random() * 200 + 30);
      const g = Math.floor(Math.random() * 200 + 30);
      const b = Math.floor(Math.random() * 200 + 30);
      return `rgb(${r},${g},${b})`;
    }

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 128,
            background: randomColor(),
            color: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            textTransform: "capitalize",
            fontFamily: "Tahomoa , sans-serif", // اضافه شد
          }}
        >
          {text}
        </div>
      ),
      {
        width: 1200,
        height: 1200,
      },
    );
  } catch (e: any) {
    console.error("OG-IMAGE ERROR:", e);
    return new Response("خطا در تولید تصویر: " + (e?.message || e), { status: 500 });
  }
}

