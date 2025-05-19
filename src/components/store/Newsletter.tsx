"use client";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSuccess("ایمیل شما با موفقیت ثبت شد!");
        setEmail("");
      } else {
        const data = await res.json();
        setError(data.message || "خطایی رخ داده است.");
      }
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-20 px-2">
      <h2 className="text-4xl font-bold mb-6 text-white text-center">خبرنامه</h2>
      <p className="mb-4 text-lg text-white text-center">
        برای دریافت جدیدترین اخبار، تخفیف‌های ویژه و پیشنهادات منحصر به فرد، ایمیل خود را وارد کنید و به جمع مشترکین خبرنامه ما بپیوندید.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
        style={{ maxWidth: 700 }}
      >
        <input
          type="email"
          className="w-full md:w-[60%] rounded-full px-8 py-5 text-lg text-gray-700 mb-6 shadow-lg outline-none border-none placeholder:text-gray-400 text-center"
          placeholder="user@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-40 h-14 bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold rounded-full transition mb-2 shadow-lg"
          disabled={loading}
        >
          {loading ? "در حال ارسال..." : "ارسال"}
        </button>
        {success && <div className="text-green-400 mt-3">{success}</div>}
        {error && <div className="text-red-400 mt-3">{error}</div>}
      </form>
      <p className="mt-8 text-base text-white opacity-90 text-center">
        ما به حریم خصوصی شما احترام می‌گذاریم و هرگز ایمیل شما را با دیگران به اشتراک نمی‌گذاریم.
      </p>
    </div>
  );
} 