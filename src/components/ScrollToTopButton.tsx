import { useEffect, useState, type ReactElement } from "react";

export default function ScrollToTopButton(): ReactElement | null {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(24);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      const footer = document.querySelector("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (footerRect.top < windowHeight) {
          const visibleFooterHeight = windowHeight - footerRect.top;
          setBottomOffset(visibleFooterHeight + 16);
        } else {
          setBottomOffset(24);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      style={{ bottom: bottomOffset + "px" }}
      className="fixed right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#FF7A29] text-[#081320] shadow-lg transition-all duration-300 hover:bg-[#FFB066] hover:scale-110 focus:outline-none"
      aria-label="Torna in cima"
    >
      <i className="fa-solid fa-angle-up text-lg" aria-hidden="true" />
    </button>
  );
}
