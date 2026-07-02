"use client";

import { Plus, Trash2, GripVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { ICON_NAMES, getIcon } from "@/lib/icons";

/** Editable list of plain strings (e.g. applications, challenges, helps). */
export function StringList({
  label,
  items,
  onChange,
  placeholder,
  multiline,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  const update = (i: number, v: string) =>
    onChange(items.map((x, idx) => (idx === i ? v : x)));
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, ""]);

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <GripVertical className="mt-2.5 h-4 w-4 shrink-0 text-muted-foreground/40" />
            {multiline ? (
              <textarea
                className="w-full rounded-lg border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                rows={2}
                value={item}
                onChange={(e) => update(i, e.target.value)}
                placeholder={placeholder}
              />
            ) : (
              <Input
                value={item}
                onChange={(e) => update(i, e.target.value)}
                placeholder={placeholder}
              />
            )}
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => remove(i)}
              title="Remove"
            >
              <Trash2 className="h-3.5 w-3.5 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" size="sm" variant="outline" onClick={add}>
        <Plus className="h-3.5 w-3.5" /> Add
      </Button>
    </div>
  );
}

/** Editable list of two-field objects (e.g. {title, desc} or {size, desc}). */
export function PairList<T extends Record<string, string>>({
  label,
  items,
  onChange,
  a,
  b,
}: {
  label: string;
  items: T[];
  onChange: (items: T[]) => void;
  a: { key: keyof T & string; placeholder: string };
  b: { key: keyof T & string; placeholder: string; textarea?: boolean };
}) {
  const set = (i: number, key: keyof T & string, v: string) =>
    onChange(items.map((it, idx) => (idx === i ? { ...it, [key]: v } : it)));
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, { [a.key]: "", [b.key]: "" } as T]);

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border border-border p-3">
            <div className="flex items-center gap-2">
              <Input
                value={item[a.key]}
                onChange={(e) => set(i, a.key, e.target.value)}
                placeholder={a.placeholder}
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => remove(i)}
                title="Remove"
              >
                <Trash2 className="h-3.5 w-3.5 text-destructive" />
              </Button>
            </div>
            <textarea
              className="mt-2 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              rows={b.textarea ? 2 : 1}
              value={item[b.key]}
              onChange={(e) => set(i, b.key, e.target.value)}
              placeholder={b.placeholder}
            />
          </div>
        ))}
      </div>
      <Button type="button" size="sm" variant="outline" onClick={add}>
        <Plus className="h-3.5 w-3.5" /> Add
      </Button>
    </div>
  );
}

/** Editable list of photos ({src, alt}) uploaded to the media bucket. */
export function GalleryList({
  label,
  items,
  onChange,
}: {
  label: string;
  items: { src: string; alt: string }[];
  onChange: (items: { src: string; alt: string }[]) => void;
}) {
  const set = (i: number, patch: Partial<{ src: string; alt: string }>) =>
    onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((it, i) => (
          <div key={i} className="space-y-2 rounded-lg border border-border p-3">
            <ImageUploader value={it.src} onChange={(src) => set(i, { src })} heightClass="h-32" />
            <div className="flex items-center gap-2">
              <Input
                value={it.alt}
                onChange={(e) => set(i, { alt: e.target.value })}
                placeholder="Caption — shown on the photo (optional)"
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
          </div>
        ))}
      </div>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => onChange([...items, { src: "", alt: "" }])}
      >
        <Plus className="h-3.5 w-3.5" /> Add photo
      </Button>
    </div>
  );
}

/** Icon name selector with a live preview. */
export function IconPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const Preview = getIcon(value);
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground">Icon</label>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Preview className="h-5 w-5" />
        </div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 rounded-lg border border-input bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {ICON_NAMES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
