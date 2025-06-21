import React, { useState } from "react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#news", label: "News" },
  { href: "#services", label: "Services" },
  { href: "#team", label: "Our Team" },
  { href: "#enquiry", label: "Make Enquiry" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full flex justify-center z-30 relative">
      <div
        className={`
          absolute left-1/2 top-8 z-30 
          w-[98vw] max-w-[1440px]
          bg-white shadow-md border border-gray-200
          rounded-none
          flex items-center justify-between
          px-8 py-6
          md:flex
          hidden
        `}
        style={{ transform: "translateX(-50%)" }}
      >
        <nav className="flex gap-8 text-base text-black font-normal">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="flex items-center gap-2 border border-black px-5 py-2 rounded-none bg-white text-black font-normal text-base hover:bg-gray-100 transition whitespace-nowrap"
        >
          Contact us
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      <div
        className={`
          flex items-center justify-between
          w-full px-4 py-4 bg-white border-b border-gray-200 fixed z-40
          md:hidden
        `}
        style={{ left: 0, top: 0 }}
      >
        <a
          href="#contact"
          className="flex items-center gap-2 border border-black px-4 py-2 rounded-none bg-white text-black font-normal text-base hover:bg-gray-100 transition whitespace-nowrap"
          style={{ fontSize: 16 }}
        >
          Contact us
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
        <button
          className="p-3 bg-[#F7F4F0] rounded-none flex items-center justify-center"
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 28 28">
            <line x1="7" y1="10" x2="21" y2="10" stroke="#252525" strokeLinecap="round"/>
            <line x1="7" y1="14" x2="21" y2="14" stroke="#252525" strokeLinecap="round"/>
            <line x1="7" y1="18" x2="21" y2="18" stroke="#252525" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden" onClick={() => setMenuOpen(false)}>
          <div
            className="absolute right-0 top-0 w-3/4 max-w-xs h-full bg-white shadow-xl flex flex-col pt-24 px-7"
            onClick={e => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-black hover:text-gray-700 transition font-normal text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}