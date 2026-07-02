import Image from "next/image";

export type GalleryImage = { src: string; alt?: string };

/**
 * Admin-managed photo gallery section used by the hire/buy templates.
 * Layout adapts to the photo count: one photo renders as a cinematic
 * full-width banner, two as an even pair, three or more as a staggered
 * editorial grid. Renders nothing until at least one photo has an image,
 * so pages without uploads are unchanged.
 */
export function PageGallery({
  title,
  intro,
  images,
  tone = "white",
}: {
  title?: string;
  intro?: string;
  images: GalleryImage[];
  tone?: "white" | "muted";
}) {
  const photos = images.filter((img) => img.src);
  if (photos.length === 0) return null;
  const staggered = photos.length >= 3;
  return (
    <section className={`${tone === "muted" ? "bg-muted/40" : "bg-white"} py-16 md:py-20`}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-xs font-semibold uppercase tracking-[0.25em] text-orange">
          Gallery
        </div>
        <div className="mt-3 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            {title || "Photo Gallery"}
          </h2>
          {photos.length > 1 && (
            <span className="hidden pb-1 text-sm font-medium text-muted-foreground sm:block">
              {photos.length} photos
            </span>
          )}
        </div>
        {intro && (
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/75 md:text-lg">
            {intro}
          </p>
        )}

        {photos.length === 1 ? (
          <div className="mt-10">
            <GalleryTile
              img={photos[0]}
              aspectClass="aspect-[4/3] sm:aspect-[21/9]"
              sizes="(max-width: 1200px) 100vw, 1152px"
            />
          </div>
        ) : (
          <div
            className={`mt-10 grid gap-4 sm:grid-cols-2 ${staggered ? "lg:grid-cols-3" : ""}`}
          >
            {photos.map((img, i) => (
              <GalleryTile
                key={`${img.src}-${i}`}
                img={img}
                aspectClass="aspect-[4/3]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={staggered && i % 3 === 1 ? "lg:mt-10" : ""}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function GalleryTile({
  img,
  aspectClass,
  sizes,
  className = "",
}: {
  img: GalleryImage;
  aspectClass: string;
  sizes: string;
  className?: string;
}) {
  return (
    <a
      href={img.src}
      target="_blank"
      rel="noreferrer"
      title="View full size"
      className={`group relative block self-start overflow-hidden rounded-lg border border-border bg-navy shadow-sm transition duration-300 hover:shadow-xl motion-safe:hover:-translate-y-1 ${aspectClass} ${className}`}
    >
      <Image
        src={img.src}
        alt={img.alt || "Gallery photo"}
        fill
        sizes={sizes}
        className="object-cover motion-safe:transition motion-safe:duration-700 motion-safe:group-hover:scale-[1.06]"
      />
      {img.alt ? (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy/80 to-transparent opacity-90 transition duration-300 group-hover:opacity-100" />
          <span className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-4 text-sm font-medium text-white">
            <span aria-hidden className="h-px w-5 shrink-0 bg-orange" />
            <span className="truncate">{img.alt}</span>
          </span>
        </>
      ) : (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
      )}
    </a>
  );
}
