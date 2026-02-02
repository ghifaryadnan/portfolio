import HeroLeft from "./HeroLeft";
import HeroProfile from "./HeroProfile";
import HeroRight from "./HeroRight";

export default function LandingHero() {
  return (
    <section className="darkmode">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12 items-center">
          <HeroLeft firstName="Ghifary" lastName="Adnan" />
          <div className="order-first md:order-0">
            <HeroProfile />
          </div>
          <HeroRight />
        </div>
      </div>
    </section>
  );
}
