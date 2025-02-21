import Link from "next/link";

const FooterLinkSection = ({ title, links }) => {
  return (
    <nav className="flex flex-col">
      <h6 className="text-lg font-semibold mb-4">{title}</h6>
      {links.map((link, index) => (
        <Link key={index} href={link.href} className="text-gray-600 hover:text-gray-500 mb-2">
          {link.text}
        </Link>
      ))}
    </nav>
  );
};

export default function Footer() {
  const servicesLinks = [
    { href: "/", text: "Branding" },
    { href: "/", text: "Design" },
    { href: "/", text: "Marketing" },
    { href: "/", text: "Advertisement" },
  ];

  const companyLinks = [
    { href: "/", text: "About us" },
    { href: "/", text: "Contact" },
    { href: "/", text: "Jobs" },
    { href: "/", text: "Press kit" },
  ];

  const legalLinks = [
    { href: "/", text: "Terms of use" },
    { href: "/", text: "Privacy policy" },
    { href: "/", text: "Cookie policy" },
  ];

  return (
    <footer className="bg-gray-100 text-gray-600">
      <div className="container mx-auto mt-8 px-6 py-10 md:py-20 animate-fade-in grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <aside className="flex flex-col items-start">
          <Link
            href="/"
            className="text-xl md:text-2xl font-semibold text-emerald-600 font-serif mb-3"
          >
            EnaEma
          </Link>
          <p>
            EnaEma is the biggest market of grocery products. Get your daily needs from our store.
          </p>
        </aside>

        <FooterLinkSection title="Services" links={servicesLinks} />
        <FooterLinkSection title="Company" links={companyLinks} />
        <FooterLinkSection title="Legal" links={legalLinks} />
      </div>
    </footer>
  );
}
