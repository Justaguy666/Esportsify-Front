import { setupListener } from "./setup.js";
import { renderTable } from "./table.js";

// main.js
(function setGlobalFavicons() {
  const LOGO = '/src/public/images/logo.png'; // logo bạn đang dùng

  const head = document.head;
  // Xoá favicon cũ nếu có
  head.querySelectorAll('link[rel="icon"],link[rel="shortcut icon"],link[rel="apple-touch-icon"]').forEach(el => el.remove());

  // Favicon chuẩn (PNG)
  const icon = document.createElement('link');
  icon.rel   = 'icon';
  icon.type  = 'image/png';
  icon.sizes = '32x32';
  icon.href  = LOGO + '?v=1'; // thêm query để tránh cache cũ
  head.appendChild(icon);

  // iOS home screen (tuỳ chọn)
  const apple = document.createElement('link');
  apple.rel  = 'apple-touch-icon';
  apple.href = LOGO + '?v=1';
  head.appendChild(apple);

  // Màu thanh địa chỉ mobile (tuỳ chọn)
  let theme = head.querySelector('meta[name="theme-color"]');
  if (!theme) { theme = document.createElement('meta'); theme.name = 'theme-color'; head.appendChild(theme); }
  theme.content = '#0B1020';
})();

document.addEventListener('DOMContentLoaded', async () => {
  await renderTable();
  setupListener();
});
