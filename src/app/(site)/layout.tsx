import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { GoogleAds } from "@/components/GoogleAds";
import { localBusinessSchema, websiteSchema } from "@/lib/jsonld";
import { getSettings } from "@/lib/settings.server";

function PropositionStrip() {
  const promises = [
    { title: "Cold Room Hire & Sales", detail: "Commercial cold rooms and freezer rooms for long-term hire or purchase" },
    { title: "Service & Breakdown Support", detail: "Maintenance and breakdown support provided within our service area" },
    { title: "Relocatable Cold & Freezer Rooms", detail: "Flexible commercial refrigeration without permanent construction" },
    { title: "Cm3 Prequalified Contractor", detail: "Prequalified for contractor compliance and supplier onboarding" },
  ];

  return (
    <section className="bg-secondary px-5 py-5 text-secondary-foreground" aria-label="Koolacube service commitments and contractor credentials">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {promises.map((promise) => (
          <div key={promise.title} className="border-white/15 px-4 text-center lg:border-r lg:last:border-r-0">
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
