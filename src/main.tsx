import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { isIOS } from "./lib/platform";

// --vh fix: use svh on iOS 15.4+ (handles browser chrome natively),
// otherwise compute from window.innerHeight.
const iosDevice = isIOS();
const setVH = () => {
    if (iosDevice && CSS.supports("height", "1svh")) {
          document.documentElement.style.setProperty("--vh", "1svh");
    } else {
          document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    }
};
setVH();
window.addEventListener("resize", setVH, { passive: true });
// iOS does not reliably fire "resize" on orientationchange
window.addEventListener("orientationchange", () => { setTimeout(setVH, 300); }, false);

// Add ios-device class for CSS-level iOS fixes
if (iosDevice) {
  document.documentElement.classList.add("ios-device");
}

createRoot(document.getElementById("root")!).render(<App />);
