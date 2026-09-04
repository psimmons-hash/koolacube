import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { GoogleAds } from "@/components/GoogleAds";
import { localBusinessSchema, websiteSchema } from "@/lib/jsonld";
import { getSettings } from "@/lib/settings.server";

function PropositionStrip() {
  const promises = [
    { title: "Same-Day Service", detail: "Responsive commercial support across South East Queensland" },
    { title: "Five-Year Workmanship Guarantee", detail: "Our workmanship is backed for five years" },
    { title: "One Contractor", detail: "Cold rooms, refrigeration, HVAC and electrical" },
  ];

  return (
    <section className="bg-secondary px-5 py-5 text-secondary-foreground" aria-label="Koolacube service commitments">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3 md:gap-0">
        {promises.map((promise) => (
          <div key={promise.title} className="border-white/15 px-4 text-center md:border-r md:last:border-r-0">
            <strong className="block font-display text-base font-bold uppercase tracking-[0.06em]">{promise.title}</strong>
            <span className="mt-1 block text-sm text-secondary-foreground/75">{promise.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <GoogleAds />
      <JsonLd data={[localBusinessSchema(settings), websiteSchema()]} />
      <SiteHeader
        telephone={settings.telephone}
        telephoneE164={settings.telephoneE164}
      />
      <PropositionStrip />
      <main className="flex-1">{children}</main>
      <SiteFooter settings={settings} />
    </div>
  );
}
