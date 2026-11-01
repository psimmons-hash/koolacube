export default function EnquiryPhotos() {
  return <div className="space-y-2">
    <label htmlFor="enquiry-photos" className="block text-sm font-semibold">Photos (optional)</label>
    <input id="enquiry-photos" name="photos" type="file" accept="image/*" multiple aria-describedby="enquiry-photo-help" className="block w-full rounded border border-slate-300 bg-white p-3 text-base" />
    <p id="enquiry-photo-help" className="text-sm text-slate-600">Choose up to 3 photos of the equipment, fault display or site. You can use your camera or photo library. Images are resized and sent to our team with your enquiry.</p>
    <button type="button" className="text-sm underline" onClick={event => { const input = event.currentTarget.form?.elements.namedItem("photos") as HTMLInputElement | null; if (input) input.value = ""; }}>Clear photos</button>
  </div>;
}
