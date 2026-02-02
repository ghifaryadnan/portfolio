import Navbar from "@/components/common/navbar/Navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar
        items={[
          { label: "skills", href: "/#skills" },
          { label: "work", href: "/#work" },
          { label: "testimonials", href: "/#testimonials" },
        ]}
        ctaLabel="Download My Resume"
        ctaHref="/resume.pdf"
      />
      {children}
    </>
  );
}
