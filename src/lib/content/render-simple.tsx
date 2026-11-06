import type { Metadata } from "next";
import { PageHero, CtaStrip } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { ABOUT_DEFAULT, CONTACT_DEFAULT, type AboutStored, type ContactStored } from "@/lib/content/simple";
import { getPageContent } from "@/lib/content/page-content.server";
import { getSettings } from "@/lib/settings.server";
import { telHref } from "@/lib/settings";
import { getIcon } from "@/lib/icons";
import { Phone, Mail, MapPin } from "lucide-react";

function metaFrom(path: string, metaTitle: string, metaDescription: string): Metadata {
  return {
    alternates: { canonical: path },
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
      title: metaTitle,
      description: metaDescription,
    },
  };
}

/* ---------------------------------- About ---------------------------------- */

export async function getAboutPage(): Promise<AboutStored> {
  return getPageContent("/about", ABOUT_DEFAULT);
}

export async function aboutMetadata(): Promise<Metadata> {
  const d = await getAboutPage();
  return metaFrom("/about", d.metaTitle, d.metaDescription);
}

export async function renderAboutPage() {
  const d = await getAboutPage();
  return (
    <>
      <PageHero eyebrow={d.eyebrow} crumb={d.crumb} title={d.title} intro={d.intro} />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 space-y-6 text-base leading-relaxed text-foreground/80 md:text-lg">
          {d.introParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section className="bg-muted/40 border-y border-border py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-orange">
              {d.groupEyebrow}
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{d.groupHeading}</h2>
            <p className="mt-4 text-foreground/75 md:text-lg">{d.groupIntro}</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {d.partners.map((partner) => (
              <article key={partner.name} className="rounded-lg border border-border bg-white p-7 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-widest text-cold-blue">
                  {partner.kicker}
                </div>
                <h3 className="mt-2 font-display text-2xl font-bold">{partner.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75">{partner.body}</p>
                {partner.linkUrl && (
                  <a
                    href={partner.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex text-sm font-semibold uppercase tracking-wide text-orange hover:text-orange-hover"
                  >
                    {partner.linkLabel}
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-orange">
              {d.complianceEyebrow}
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{d.complianceHeading}</h2>
            <p className="mt-4 text-foreground/75 md:text-lg">{d.complianceIntro}</p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {d.compliance.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <li key={item.label} className="flex items-start gap-3 rounded border border-border bg-muted/30 p-5">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-cold-blue" />
                  <span className="text-sm font-medium">{item.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="bg-navy py-16 md:py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-orange">
              {d.supportEyebrow}
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{d.supportHeading}</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {d.support.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <div key={item.title} className="rounded border border-white/10 bg-white/5 p-6 transition hover:border-cold-blue/60">
                  <Icon className="h-6 w-6 text-cold-blue" />
                  <div className="mt-3 font-display text-lg font-semibold">{item.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2">
          <div className="rounded-lg border-l-4 border-cold-blue bg-muted/30 p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-cold-blue">
              {d.missionLabel}
            </div>
            <p className="mt-4 text-lg leading-relaxed text-foreground/80">{d.missionText}</p>
          </div>
          <div className="rounded-lg border-l-4 border-orange bg-muted/30 p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-orange">
              {d.promiseLabel}
            </div>
            <p className="mt-4 text-lg leading-relaxed text-foreground/80">{d.promiseText.replace(/\s*Promise tagline\s*/g, " ").trim()}</p>
            <p className="mt-2 font-display text-xl font-bold">{d.promiseTagline}</p>
          </div>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}

/* --------------------------------- Contact --------------------------------- */

export async function getContactPage(): Promise<ContactStored> {
  return getPageContent("/contact", CONTACT_DEFAULT);
}

export async function contactMetadata(): Promise<Metadata> {
  const d = await getContactPage();
  return metaFrom("/contact", d.metaTitle, d.metaDescription);
}

export async function renderContactPage() {
  const [d, settings] = await Promise.all([getContactPage(), getSettings()]);
  const { address } = settings;
  const fullAddress = `${address.streetAddress}, ${address.addressLocality} ${address.addressRegion} ${address.postalCode}`;
  return (
    <>
      <PageHero eyebrow={d.eyebrow} crumb={d.crumb} title={d.title} intro={d.intro} />

      <section className="bg-muted/30 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-3">
          <aside className="space-y-6 lg:col-span-1">
            <div className="rounded-lg border border-border bg-white p-6">
              <h3 className="font-display text-lg font-semibold">{d.directContactTitle}</h3>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-orange" />
                  <div>
                    <a
                      href={`tel:${telHref(settings.telephone)}`}
                      className="font-semibold text-foreground hover:text-cold-blue"
                    >
                      {settings.telephone}
                    </a>
                    <div className="text-xs text-muted-foreground">Call 24/7</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-orange" />
                  <a href={`mailto:${settings.email}`} className="text-foreground hover:text-cold-blue">
                    {settings.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-orange" />
                  <span>{fullAddress}</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-navy p-6 text-white">
              <h3 className="font-display text-lg font-semibold">{d.serviceAreaTitle}</h3>
              <p className="mt-2 text-sm text-white/70">{d.serviceAreaText}</p>
            </div>
          </aside>

          <div className="lg:col-span-2">
            <ContactForm config={d.form} />
          </div>
        </div>
      </section>
    </>
  );
}
