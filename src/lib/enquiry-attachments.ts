export function validateAttachments(value: unknown): { filename: string; content: string }[] {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.length > 3) throw new Error("Please choose up to 3 photos.");
  return value.map((item, index) => {
    const content = item?.content;
    if (typeof content !== "string" || content.length > 266664 || !/^[A-Za-z0-9+/]+={0,2}$/.test(content) || content.length % 4 !== 0) {
      throw new Error("Invalid photo. Please select the photo again.");
    }
    const bytes = Buffer.from(content, "base64");
    if (bytes.length < 4 || bytes.length > 200000 || bytes[0] !== 255 || bytes[1] !== 216 || bytes[2] !== 255 || bytes.at(-2) !== 255 || bytes.at(-1) !== 217) {
      throw new Error("Invalid photo. Please select a JPEG image.");
    }
    return { filename: `enquiry-photo-${index + 1}.jpg`, content };
  });
}
