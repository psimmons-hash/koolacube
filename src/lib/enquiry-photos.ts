export type EnquiryPhoto = { filename: string; content: string };

// Resize on the device: keep three images below the server action's 1 MB limit.
export async function preparePhotos(files: File[]): Promise<EnquiryPhoto[]> {
  const selected = files.filter(file => file.size > 0);
  if (selected.length > 3) throw new Error("Please choose up to 3 photos.");
  const photos: EnquiryPhoto[] = [];
  for (const [index, file] of selected.entries()) {
    if (!file.type.startsWith("image/") || file.size > 20 * 1024 * 1024) {
      throw new Error("Choose image files up to 20 MB each.");
    }
    const url = URL.createObjectURL(file);
    try {
      const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        const timer = setTimeout(() => reject(new Error("This photo could not be opened. Try a JPEG, PNG or screenshot.")), 15000);
        img.onload = () => { clearTimeout(timer); resolve(img); };
        img.onerror = () => { clearTimeout(timer); reject(new Error("This photo could not be opened. Try a JPEG, PNG or screenshot.")); };
        img.src = url;
      });
      let size = 1600;
      let content = "";
      for (let attempt = 0; attempt < 6; attempt++) {
        const ratio = Math.min(1, size / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.naturalWidth * ratio));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * ratio));
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Unable to prepare photos on this device.");
        context.fillStyle = "#fff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        content = canvas.toDataURL("image/jpeg", 0.78).split(",")[1];
        if (content.length <= 266664) break;
        size = Math.round(size * 0.75);
      }
      if (!content || content.length > 266664) throw new Error("This photo is too large. Please choose a smaller image.");
      photos.push({ filename: `enquiry-photo-${index + 1}.jpg`, content });
    } finally { URL.revokeObjectURL(url); }
  }
  return photos;
}
