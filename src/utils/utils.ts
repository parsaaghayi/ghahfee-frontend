/**
 * حذف صفرهای اضافی از انتهای قیمت
 * @param price قیمت به تومان (می‌تواند string یا number باشد)
 * @returns قیمت بدون صفرهای اضافی
 */
export const formatPrice = (price: string | number): string => {
  const num = Number(price);
  // تبدیل به رشته با جداکننده انگلیسی
  const formatted = num.toLocaleString('en-US', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    useGrouping: true
  });
  // تبدیل اعداد انگلیسی به فارسی
  const persianDigits = formatted.replace(/\d/g, d =>
    '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]
  );
  // جایگزینی کاما با span و استایل پایین‌چین
  return persianDigits.replace(/,/g, '<span style="position:relative; top:0.2em; font-size:0.8em;">,</span>');
}; 