import { Button } from "@/components/ui/button";
import SocialLinks from "@/components/common/social/SocialLinks";
import type { SocialLink } from "@/types/social";
import { Facebook, Github, Linkedin } from "lucide-react";

export interface HeroLeftProps {
  firstName: string;
  lastName?: string;
  onContactHref?: string;
  socials?: SocialLink[];
}

export default function HeroLeft({
  firstName,
  lastName,
  onContactHref = "/#contact",
  socials = [
    { label: "LinkedIn", href: "https://linkedin.com", icon: <Linkedin className="h-4 w-4" /> },
    { label: "Facebook", href: "https://facebook.com", icon: <Facebook className="h-4 w-4" /> },
    { label: "Github", href: "https://github.com", icon: <Github className="h-4 w-4" /> },
  ],
}: HeroLeftProps) {
  return (
    <div className="flex flex-col items-center md:items-start gap-6">
      <div className="text-xs text-zinc-400">Hey, I am</div>
      <div className="space-y-1">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-black flex md:block gap-1 md:gap-0 dark:text-zinc-50">
          <span className="text-black dark:text-zinc-50">{firstName}</span>
          {lastName ? (
            <>
              <span className="block text-amber-500 dark:text-gray-500">{lastName}</span>
            </>
          ) : null}
        </h1>
      </div>
      <Button asChild className="w-fit bg-amber-500 text-white dark:text-black hover:bg-amber-600">
        <a href={onContactHref}>contact me</a>
      </Button>
      <div>
        <div className="mb-2 text-xs text-center md:text-left text-zinc-400">my socials</div>
        <SocialLinks items={socials} />
      </div>
    </div>
  );
}
