"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { HireStored } from "@/lib/content/hire";
import { savePageContent, resetPageContent } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StringList, PairList, IconPicker, GalleryList } from "@/components/admin/fields";
import { Plus, Trash2, Check } from "lucide-react";

export default function HirePageEditor({
  path,
  initial,
}: {
  path: string;
  initial: HireStored;
}) {
  const router = useRouter();
  const [form, setForm] = useState<HireStored>(initial);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof HireStored>(key: K, value: HireStored[K]) {
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

      <Section title="Hire options">
        <div className="space-y-4">
          <Field label="Section title">
            <Input value={form.optionsTitle} onChange={(e) => set("optionsTitle", e.target.value)} />
          </Field>
          <Field label="Section intro (optional)">
            <Textarea
              rows={2}
              value={form.optionsIntro ?? ""}
              onChange={(e) => set("optionsIntro", e.target.value)}
            />
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

      <Section title="Range">
        <div className="space-y-4">
          <Field label="Section title">
            <Input value={form.rangeTitle} onChange={(e) => set("rangeTitle", e.target.value)} />
          </Field>
          <Field label="Section intro">
            <Textarea rows={2} value={form.rangeIntro} onChange={(e) => set("rangeIntro", e.target.value)} />
          </Field>
          <PairList
            label="Range items"
            items={form.range}
            onChange={(v) => set("range", v)}
            a={{ key: "title", placeholder: "Item title" }}
            b={{ key: "desc", placeholder: "Description", textarea: true }}
          />
        </div>
      </Section>

      <Section title="Advantages">
        <div className="space-y-4">
          <Field label="Section intro">
            <Textarea
              rows={2}
              value={form.advantagesIntro}
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
          <PairList
            label="Sizes"
            items={form.sizes}
            onChange={(v) => set("sizes", v)}
            a={{ key: "size", placeholder: "e.g. 6m Unit" }}
            b={{ key: "desc", placeholder: "Suited to…" }}
          />
          <Field label="Sizes note (optional)">
            <Input value={form.sizesNote ?? ""} onChange={(e) => set("sizesNote", e.target.value)} />
          </Field>
        </div>
      </Section>

      <Section title="Use cases">
        <div className="space-y-4">
          <Field label="Section title">
            <Input value={form.useCasesTitle} onChange={(e) => set("useCasesTitle", e.target.value)} />
          </Field>
          <Field label="Section intro (optional)">
            <Textarea
              rows={2}
              value={form.useCasesIntro ?? ""}
              onChange={(e) => set("useCasesIntro", e.target.value)}
            />
          </Field>
          <PairList
            label="Use cases"
            items={form.useCases}
            onChange={(v) => set("useCases", v)}
            a={{ key: "title", placeholder: "Industry" }}
            b={{ key: "desc", placeholder: "Description", textarea: true }}
          />
        </div>
      </Section>

      <Section title="Photo gallery">
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground">
            The gallery section only appears on the page once at least one photo is added.
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

      <Section title="Pricing & SEO">
        <div className="space-y-4">
          <Field label="Monthly price 'from' (ex-GST, for structured data — optional)">
            <Input
              type="number"
              value={form.monthlyPriceFrom ?? ""}
              onChange={(e) =>
                set("monthlyPriceFrom", e.target.value === "" ? undefined : Number(e.target.value))
              }
            />
          </Field>
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

function AdvantageList({
  items,
  onChange,
}: {
  items: HireStored["advantages"];
  onChange: (items: HireStored["advantages"]) => void;
}) {
  const set = (i: number, patch: Partial<HireStored["advantages"][number]>) =>
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
