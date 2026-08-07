"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateSettings } from "./actions";
import type { EffectiveSettings, FooterColumn } from "@/lib/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Check, Plus, Trash2 } from "lucide-react";

export default function SettingsClient({
  initial,
}: {
  initial: EffectiveSettings;
}) {
  const router = useRouter();
  const [form, setForm] = useState<EffectiveSettings>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof EffectiveSettings>(key: K, value: EffectiveSettings[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }
  function setAddr(key: keyof EffectiveSettings["address"], value: string) {
    setForm((prev) => ({ ...prev, address: { ...prev.address, [key]: value } }));
    setSaved(false);
  }

  // ── Footer columns / links ────────────────────────────────────────────────
  function setColumns(columns: FooterColumn[]) {
    set("footerColumns", columns);
  }
  function setColumnHeading(ci: number, heading: string) {
    setColumns(form.footerColumns.map((c, i) => (i === ci ? { ...c, heading } : c)));
  }
  function addColumn() {
    setColumns([...form.footerColumns, { heading: "New column", links: [] }]);
  }
  function removeColumn(ci: number) {
    setColumns(form.footerColumns.filter((_, i) => i !== ci));
  }
  function setLink(ci: number, li: number, key: "label" | "href", value: string) {
    setColumns(
      form.footerColumns.map((c, i) =>
        i === ci
          ? { ...c, links: c.links.map((l, j) => (j === li ? { ...l, [key]: value } : l)) }
          : c
      )
    );
  }
  function addLink(ci: number) {
    setColumns(
      form.footerColumns.map((c, i) =>
        i === ci ? { ...c, links: [...c.links, { label: "", href: "" }] } : c
      )
    );
  }
  function removeLink(ci: number, li: number) {
    setColumns(
      form.footerColumns.map((c, i) =>
        i === ci ? { ...c, links: c.links.filter((_, j) => j !== li) } : c
      )
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const result = await updateSettings(form);
    setSaving(false);
    if (result?.error) {
      setError(result.error);
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Business details &amp; shared copy used across the site (header, footer,
          structured data and call-to-action strips).
        </p>
      </div>

      <Section title="Contact details">
        <div className="grid gap-4 sm:grid-cols-2">
          <FieldWrap label="Phone (display)">
            <Input
              value={form.telephone}
              onChange={(e) => set("telephone", e.target.value)}
              placeholder="1300 561 030"
            />
          </FieldWrap>
          <FieldWrap label="Phone (tel: link, e.g. +611300561030)">
            <Input
              value={form.telephoneE164}
              onChange={(e) => set("telephoneE164", e.target.value)}
              placeholder="1300561030"
            />
          </FieldWrap>
          <FieldWrap label="Email">
            <Input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </FieldWrap>
        </div>
      </Section>

      <Section title="Address">
        <div className="grid gap-4 sm:grid-cols-2">
          <FieldWrap label="Street address" full>
            <Input
              value={form.address.streetAddress}
              onChange={(e) => setAddr("streetAddress", e.target.value)}
            />
          </FieldWrap>
          <FieldWrap label="Suburb / locality">
            <Input
              value={form.address.addressLocality}
              onChange={(e) => setAddr("addressLocality", e.target.value)}
            />
          </FieldWrap>
          <FieldWrap label="State">
            <Input
              value={form.address.addressRegion}
              onChange={(e) => setAddr("addressRegion", e.target.value)}
            />
          </FieldWrap>
          <FieldWrap label="Postcode">
            <Input
              value={form.address.postalCode}
              onChange={(e) => setAddr("postalCode", e.target.value)}
            />
          </FieldWrap>
        </div>
      </Section>

      <Section title="Shared copy">
        <div className="space-y-4">
          <FieldWrap label="Tagline">
            <Input
              value={form.tagline}
              onChange={(e) => set("tagline", e.target.value)}
            />
          </FieldWrap>
          <FieldWrap label="Site description (SEO / structured data)">
            <Textarea
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </FieldWrap>
          <FieldWrap label="Call-to-action heading">
            <Input
              value={form.ctaTitle}
              onChange={(e) => set("ctaTitle", e.target.value)}
            />
          </FieldWrap>
          <FieldWrap label="Call-to-action subtext">
            <Input
              value={form.ctaSubtitle}
              onChange={(e) => set("ctaSubtitle", e.target.value)}
            />
          </FieldWrap>
        </div>
      </Section>

      <Section title="Footer">
        <p className="-mt-2 mb-4 text-xs text-muted-foreground">
          The footer’s Contact column is built from the details above. Edit the logo, wordmark,
          blurb, the “Backed by” badge, the bottom note and the link columns here.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <FieldWrap label="Footer logo">
            <ImageUploader
              value={form.footerLogoUrl}
              onChange={(url) => set("footerLogoUrl", url)}
              heightClass="h-24"
            />
          </FieldWrap>
          <FieldWrap label="Footer wordmark">
            <Input
              value={form.footerBrandName}
              onChange={(e) => set("footerBrandName", e.target.value)}
              placeholder="KOOLACUBE"
            />
          </FieldWrap>
        </div>
        <div className="mt-4 space-y-4">
          <FieldWrap label="Footer blurb">
            <Textarea
              rows={2}
              value={form.footerBlurb}
              onChange={(e) => set("footerBlurb", e.target.value)}
            />
          </FieldWrap>
          <FieldWrap label="“Backed by” badge (leave blank to hide)">
            <Input
              value={form.footerBackedBy}
              onChange={(e) => set("footerBackedBy", e.target.value)}
              placeholder="Backed by HVACR Group / ACRO Refrigeration"
            />
          </FieldWrap>
          <FieldWrap label="Bottom bar note (next to the copyright)">
            <Input
              value={form.footerBottomNote}
              onChange={(e) => set("footerBottomNote", e.target.value)}
              placeholder="Commercial cold room hire & sales · SE Queensland"
            />
          </FieldWrap>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label>Link columns</Label>
            <Button type="button" size="sm" variant="outline" onClick={addColumn}>
              <Plus className="h-3.5 w-3.5" /> Add column
            </Button>
          </div>

          {form.footerColumns.map((column, ci) => (
            <div key={ci} className="rounded-lg border border-border p-4">
              <div className="flex items-center gap-2">
                <Input
                  value={column.heading}
                  onChange={(e) => setColumnHeading(ci, e.target.value)}
                  placeholder="Column heading (e.g. Hire)"
                  className="font-semibold"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => removeColumn(ci)}
                  title="Remove column"
                >
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>

              <div className="mt-3 space-y-2">
                {column.links.map((link, li) => (
                  <div key={li} className="flex items-center gap-2">
                    <Input
                      value={link.label}
                      onChange={(e) => setLink(ci, li, "label", e.target.value)}
                      placeholder="Link text"
                    />
                    <Input
                      value={link.href}
                      onChange={(e) => setLink(ci, li, "href", e.target.value)}
                      placeholder="/path or https://…"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => removeLink(ci, li)}
                      title="Remove link"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button type="button" size="sm" variant="outline" onClick={() => addLink(ci)}>
                  <Plus className="h-3.5 w-3.5" /> Add link
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {error && (
        <p className="mt-4 text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      <div className="mt-6 flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save settings"}
        </Button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm text-green-600">
            <Check className="h-4 w-4" /> Saved
          </span>
        )}
      </div>
    </form>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6 rounded-xl border border-border bg-card p-5">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function FieldWrap({
  label,
  full,
  children,
}: {
  label: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`space-y-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
