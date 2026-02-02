export default function HeroProfile({
  imageSrc = "/assets/ghifary-image.png",
  alt = "profile",
}: {
  imageSrc?: string;
  alt?: string;
}) {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-amber-500 text-black dark:bg-gray-500 dark:text-zinc-50 " />
      </div>
      <img
        src={imageSrc}
        alt={alt}
        className="relative z-10 h-64 w-64 sm:h-80 sm:w-80 rounded-full object-cover ring-2 ring-black/20"
      />
    </div>
  );
}
