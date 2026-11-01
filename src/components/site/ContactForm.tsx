"use client";

import CallbackRequest from "@/components/CallbackRequest";
import EnquiryPhotos from "@/components/EnquiryPhotos";
import { preparePhotos } from "@/lib/enquiry-photos";
import { useState } from "react";
import { Check } from "lucide-react";
import { submitEnquiry } from "@/app/(site)/contact/actions";
import {
  OPTIONAL_FIELD_META,
  type ContactFormConfig,
  type OptionalKey,
} from "@/lib/content/contact-form";

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export function ContactForm({ config }: { config: ContactFormConfig }) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [detailsOpen, setDetailsOpen] = useState(config.optionalFields.some(field => field.visible && field.required && ["startDate", "duration", "product", "volume", "power"].includes(field.key)));
  const visibleOptional = config.optionalFields.filter((f) => f.visible);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) || "").trim();

    const data = {
      name: get("name"),
      business: get("business"),
      phone: get("phone"),
      email: get("email"),
      suburb: get("suburb"),
      need: get("need") || config.needOptions[0] || "Unsure",
      mode: get("mode") || config.modeOptions[0] || "Hire",
      startDate: get("startDate"),
      duration: get("duration"),
      product: get("product"),
      volume: get("volume"),
      power: get("power"),
      access: fd.getAll("access").map(String),
      message: get("message"),
    };

    // Validation: core fields + any visible optional field marked required.
    const errs: Record<string, string> = {};
    if (!data.name) errs.name = "Name required";
    if (data.phone.length < 6) errs.phone = "Phone required";
    if (!EMAIL_RE.test(data.email)) errs.email = "Valid email required";
    if (!data.suburb) errs.suburb = `${config.suburbLabel} required`;
    for (const f of visibleOptional) {
      if (f.required && !String(data[f.key] || "").trim()) {
        errs[f.key] = `${f.label} required`;
      }
    }
    if (config.acknowledgeRequired && fd.get("acknowledge") !== "on") {
      errs.acknowledge = "Please acknowledge to continue";
    }
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      if (["startDate", "duration", "product", "volume", "power"].some(key => errs[key])) setDetailsOpen(true);
      return;
    }

    setErrors({});
    setServerError(null);
    setSending(true);
    try {
      const files = fd.getAll("photos").filter((value): value is File => value instanceof File);
      const attachments = await preparePhotos(files);
      const result = await submitEnquiry({ ...data, attachments });
      if (result?.error) { setServerError(result.error); return; }
      setSubmitted(true);
    } catch (error) { setServerError(error instanceof Error ? error.message : "Unable to send. Please try again or call us."); }
    finally { setSending(false); }
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-cold-blue/30 bg-white p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cold-blue/10 text-cold-blue">
          <Check className="h-7 w-7" />
        </div>
        <h2 className="mt-5 font-display text-2xl font-bold">
          {config.successHeading}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {config.successText}
        </p>
      </div>
    );
  }

  const showOptional = (key: OptionalKey) =>
    visibleOptional.find((f) => f.key === key);

  return (
    <div><CallbackRequest brand="Koolacube" phone="1300 561 030" />
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 rounded-lg border border-border bg-white p-6 md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label={config.nameLabel}
          name="name"
          required
          error={errors.name}
        />
        {showOptional("business") && (
          <Field
            label={fieldLabel(config, "business")}
            name="business"
            required={fieldReq(config, "business")}
            error={errors.business}
          />
        )}
        <Field
          label={config.phoneLabel}
          name="phone"
          type="tel"
          required
          error={errors.phone}
        />
        <Field
          label={config.emailLabel}
          name="email"
          type="email"
          required
          error={errors.email}
        />
        <Field
          label={config.suburbLabel}
          name="suburb"
          required
          error={errors.suburb}
        />
        <SelectField
          label={config.needLabel}
          name="need"
          error={errors.need}
          options={config.needOptions}
        />
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-foreground">
          {config.modeLegend}
        </legend>
        <div className="mt-3 flex gap-3">
          {config.modeOptions.map((v, i) => (
            <label
              key={v}
              className="flex flex-1 cursor-pointer items-center gap-2 rounded border border-border bg-white px-4 py-3 text-sm hover:border-cold-blue has-[:checked]:border-cold-blue has-[:checked]:bg-cold-blue/5"
            >
              <input
                type="radio"
                name="mode"
                value={v}
                defaultChecked={i === 0}
                className="accent-cold-blue"
              />
              {v}
            </label>
          ))}
        </div>
      </fieldset>

      <details open={detailsOpen} onToggle={event => setDetailsOpen(event.currentTarget.open)} className="rounded border border-border p-4">
        <summary className="cursor-pointer py-2 font-semibold">Add storage and site details (optional unless marked *)</summary>
        <p className="my-3 text-sm text-muted-foreground">These details help us prepare a quote. You can send your initial enquiry without them unless a field is marked required.</p>
      {(showOptional("startDate") ||
        showOptional("duration") ||
        showOptional("product") ||
        showOptional("volume") ||
        showOptional("power")) && (
        <div className="grid gap-5 md:grid-cols-2">
          {(
            [
              "startDate",
              "duration",
              "product",
              "volume",
              "power",
            ] as OptionalKey[]
          ).map((key) =>
            showOptional(key) ? (
              <Field
                key={key}
                label={fieldLabel(config, key)}
                name={key}
                type={
                  OPTIONAL_FIELD_META[key].type === "date" ? "date" : "text"
                }
                placeholder={OPTIONAL_FIELD_META[key].placeholder}
                required={fieldReq(config, key)}
                error={errors[key]}
              />
            ) : null
          )}
        </div>
      )}

      {config.accessOptions.length > 0 && (
        <fieldset>
          <legend className="text-sm font-semibold text-foreground">
            {config.accessLegend}
          </legend>
          <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
            {config.accessOptions.map((v) => (
              <label
                key={v}
                className="flex cursor-pointer items-center gap-2 rounded border border-border bg-white px-3 py-2.5 text-sm hover:border-cold-blue has-[:checked]:border-cold-blue has-[:checked]:bg-cold-blue/5"
              >
                <input
                  type="checkbox"
                  name="access"
                  value={v}
                  className="accent-cold-blue"
                />
                {v}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      </details>

      {showOptional("message") && (
        <div>
          <label htmlFor="contact-message" className="text-sm font-semibold text-foreground">
            {fieldLabel(config, "message")}
            {fieldReq(config, "message") && (
              <span className="ml-1 text-orange">*</span>
            )}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            maxLength={2000}
            className="mt-2 w-full rounded border border-border bg-white px-3 py-2.5 text-base outline-none focus:border-cold-blue"
          />
          {errors.message && (
            <p className="mt-1 text-xs text-orange">{errors.message}</p>
          )}
        </div>
      )}

      <EnquiryPhotos />

      {config.acknowledgeText && (
        <>
          <label className="flex items-start gap-3 rounded border border-border bg-muted/30 p-4 text-sm">
            <input
              type="checkbox"
              name="acknowledge"
              className="mt-0.5 accent-cold-blue"
            />
            <span>{config.acknowledgeText}</span>
          </label>
          {errors.acknowledge && (
            <p className="text-xs text-orange">{errors.acknowledge}</p>
          )}
        </>
      )}

      {serverError && (
        <p role="alert" className="rounded border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded bg-orange px-5 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-hover disabled:opacity-60"
      >
        {sending ? "Sending…" : config.submitLabel}
      </button>
    </form></div>
  );
}

function fieldLabel(config: ContactFormConfig, key: OptionalKey): string {
  return config.optionalFields.find((f) => f.key === key)?.label ?? key;
}
function fieldReq(config: ContactFormConfig, key: OptionalKey): boolean {
  return config.optionalFields.find((f) => f.key === key)?.required ?? false;
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={`contact-${name}`} className="text-sm font-semibold text-foreground">
        {label}
        {required && <span className="ml-1 text-orange">*</span>}
      </label>
      <input
        id={`contact-${name}`}
        autoComplete={({ name: "name", business: "organization", phone: "tel", email: "email", suburb: "address-level2" } as Record<string, string>)[name]}
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded border border-border bg-white px-3 py-2.5 text-base outline-none focus:border-cold-blue"
      />
      {error && <p className="mt-1 text-xs text-orange">{error}</p>}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  error,
}: {
  label: string;
  name: string;
  options: string[];
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={`contact-${name}`} className="text-sm font-semibold text-foreground">{label}</label>
      <select
        id={`contact-${name}`}
        name={name}
        defaultValue={options[0]}
        className="mt-2 w-full rounded border border-border bg-white px-3 py-2.5 text-base outline-none focus:border-cold-blue"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-orange">{error}</p>}
    </div>
  );
}

