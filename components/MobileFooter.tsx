import { ContactIcons } from "./ContactIcons";

export function MobileFooter() {
  return (
    <footer className="site-mobile-bar mt-auto border-t border-rule px-5 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <ContactIcons />
    </footer>
  );
}
