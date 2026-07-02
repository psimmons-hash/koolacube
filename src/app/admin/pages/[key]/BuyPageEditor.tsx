"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BuyStored, BuySizeStored } from "@/lib/content/buy";
import { savePageContent, resetPageContent } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StringList, PairList, IconPicker, GalleryList } from "@/components/admin/fields";
import { Plus, Trash2, Check } from "lucide-react";

export default function BuyPageEditor({
  path,
  initial,
}: {
  path: string;
  initial: BuyStored;
}) {
  const router = useRouter();
  const [form, setForm] = useState<BuyStored>(initial);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof BuyStored>(key: K, value: BuyStored[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await savePageContent(path, { ...form });
    setSaving(false);
    if (res.error) return setError(res.error);
    setSaved(true);
    router.refresh();
  }

  async function onReset() {
    if (!confirm("Reset this page to the built-in default copy? Your edits will be removed."))
      return;
    setResetting(true);
    const res = await resetPageContent(path);
    setResetting(false);
    if (res.error) return setError(res.error);
    router.refresh();
    router.push("/admin/pages");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Section title="Hero">
        <div className="space-y-4">
          <Field label="Breadcrumb">
            <Input value={form.crumb} onChange={(e) => set("crumb", e.target.value)} />
          </Field>
          <Field label="Title (H1)">
            <Input value={form.title} onChange={(e) => set("title", e.target.value)} />
          </Field>
          <Field label="Intro">
            <Textarea rows={3} value={form.intro} onChange={(e) => set("intro", e.target.value)} />
          </Field>
        </div>
      </Section>

      <Section title="Options">
        <div className="space-y-4">
          <Field label="Section title">
            <Input value={form.optionsTitle} onChange={(e) => set("optionsTitle", e.target.value)} />
          </Field>
          <PairList
            label="Options"
            items={form.options}
            onChange={(v) => set("options", v)}
            a={{ key: "title", placeholder: "Option title" }}
            b={{ key: "desc", placeholder: "Description", textarea: true }}
          />
        </div>
      </Section>

      <Section title="Overview">
        <div className="space-y-4">
          <Field label="Section title">
            <Input value={form.overviewTitle} onChange={(e) => set("overviewTitle", e.target.value)} />
          </Field>
          <StringList
            label="Paragraphs"
            items={form.overview}
            onChange={(v) => set("overview", v)}
            placeholder="A paragraph of overview copy…"
            multiline
          />
        </div>
      </Section>

      <Section title="Advantages">
        <div className="space-y-4">
          <Field label="Section intro (optional)">
            <Textarea
              rows={2}
              value={form.advantagesIntro ?? ""}
              onChange={(e) => set("advantagesIntro", e.target.value)}
            />
          </Field>
          <AdvantageList items={form.advantages} onChange={(v) => set("advantages", v)} />
        </div>
      </Section>

      <Section title="Specifications & sizes">
        <div className="space-y-4">
          <Field label="Specs section title">
            <Input value={form.specsTitle} onChange={(e) => set("specsTitle", e.target.value)} />
          </Field>
          <StringList
            label="Specifications"
            items={form.specs}
            onChange={(v) => set("specs", v)}
            placeholder="e.g. Internal lighting included"
          />
          <Field label="Sizes section title">
            <Input value={form.sizesTitle} onChange={(e) => set("sizesTitle", e.target.value)} />
          </Field>
          <Field label="Sizes intro (optional)">
            <Input value={form.sizesIntro ?? ""} onChange={(e) => set("sizesIntro", e.target.value)} />
          </Field>
          <SizeList items={form.sizes} onChange={(v) => set("sizes", v)} />
          <Field label="Sizes note (optional)">
            <Input value={form.sizesNote ?? ""} onChange={(e) => set("sizesNote", e.target.value)} />
          </Field>
        </div>
      </Section>

      <Section title="Why buy">
        <div className="space-y-4">
          <Field label="Section title">
            <Input value={form.whyTitle} onChange={(e) => set("whyTitle", e.target.value)} />
          </Field>
          <PairList
            label="Reasons"
            items={form.why}
            onChange={(v) => set("why", v)}
            a={{ key: "title", placeholder: "Reason title" }}
            b={{ key: "desc", placeholder: "Description", textarea: true }}
          />
        </div>
      </Section>

      <Section title="Photo gallery">
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground">
            The gallery section only appears on the page once at least one photo is added. The
            first photo is also used as the product image in search-engine structured data.
          </p>
          <Field label="Section title (optional — defaults to “Photo Gallery”)">
            <Input
              value={form.galleryTitle ?? ""}
              onChange={(e) => set("galleryTitle", e.target.value)}
            />
          </Field>
          <Field label="Section intro (optional)">
            <Textarea
              rows={2}
              value={form.galleryIntro ?? ""}
              onChange={(e) => set("galleryIntro", e.target.value)}
            />
          </Field>
          <GalleryList
            label="Photos"
            items={form.gallery ?? []}
            onChange={(v) => set("gallery", v)}
          />
        </div>
      </Section>

      <Section title="SEO">
        <div className="space-y-4">
          <Field label="Meta title">
            <Input value={form.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} />
          </Field>
          <Field label="Meta description">
            <Textarea
              rows={2}
              value={form.metaDescription}
              onChange={(e) => set("metaDescription", e.target.value)}
            />
          </Field>
        </div>
      </Section>

      {error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </Button>
        <Button type="button" variant="outline" onClick={onReset} disabled={resetting}>
          {resetting ? "Resetting…" : "Reset to default"}
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

function SizeList({
  items,
  onChange,
}: {
  items: BuySizeStored[];
  onChange: (items: BuySizeStored[]) => void;
}) {
  const set = (i: number, patch: Partial<BuySizeStored>) =>
    onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground">Sizes</label>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="space-y-2 rounded-lg border border-border p-3">
            <div className="flex items-center gap-2">
              <Input
                value={it.size}
                onChange={(e) => set(i, { size: e.target.value })}
                placeholder="e.g. 6m Unit"
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => onChange(items.filter((_, idx) => idx !== i))}
                title="Remove"
              >
                <Trash2 className="h-3.5 w-3.5 text-destructive" />
              </Button>
            </div>
            <Input
              value={it.suited}
              onChange={(e) => set(i, { suited: e.target.value })}
              placeholder="Suited to…"
            />
            <Input
              value={it.availability}
              onChange={(e) => set(i, { availability: e.target.value })}
              placeholder="Availability (e.g. New & Ex-Hire)"
            />
          </div>
        ))}
      </div>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => onChange([...items, { size: "", suited: "", availability: "" }])}
      >
        <Plus className="h-3.5 w-3.5" /> Add size
      </Button>
    </div>
  );
}

function AdvantageList({
  items,
  onChange,
}: {
  items: BuyStored["advantages"];
  onChange: (items: BuyStored["advantages"]) => void;
}) {
  const set = (i: number, patch: Partial<BuyStored["advantages"][number]>) =>
    onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground">Advantage cards</label>
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="space-y-2 rounded-lg border border-border p-3">
            <div className="flex items-start justify-between gap-2">
              <IconPicker value={it.icon} onChange={(icon) => set(i, { icon })} />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => onChange(items.filter((_, idx) => idx !== i))}
                title="Remove"
              >
                <Trash2 className="h-3.5 w-3.5 text-destructive" />
              </Button>
            </div>
            <Input
              value={it.title}
              onChange={(e) => set(i, { title: e.target.value })}
              placeholder="Advantage title"
            />
            <Textarea
              rows={2}
              value={it.desc}
              onChange={(e) => set(i, { desc: e.target.value })}
              placeholder="Description"
            />
          </div>
        ))}
      </div>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => onChange([...items, { icon: "Zap", title: "", desc: "" }])}
      >
        <Plus className="h-3.5 w-3.5" /> Add advantage
      </Button>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
