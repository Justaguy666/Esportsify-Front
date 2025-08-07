import { initHeader } from "./components/header.js";
import { setupListener } from "./setup.js";
import { renderTable } from "./table.js";


document.addEventListener('DOMContentLoaded', async () => {
  const path = window.location.pathname;
  const fileName = path.split("/").pop();
  console.log(fileName)
  
  await initHeader();
  await renderTable();
  setupListener();
});
