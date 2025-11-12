import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type Props = {
  onUploadSuccess?: (tx: any) => void;
};

export default function UploadReceiptModal({ onUploadSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

 
  const BACKEND = "http://100.27.190.37:5000";

  const handleUpload = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!file) {
    toast.error("Please select a receipt image");
    return;
  }

  // debug: ensure file captured
  console.log("Selected file:", file, "type:", file.type, "size:", file.size);

  const formData = new FormData();
  // IMPORTANT: backend expects field name "file"
  formData.append("file", file);
  if (category) formData.append("category", category);

  // debug: print entries
  for (const pair of formData.entries()) {
    console.log("FormData entry:", pair[0], pair[1]);
  }

  setLoading(true);
  try {
    const res = await fetch(`${BACKEND}/upload-receipt`, {
      method: "POST",
      body: formData, // DO NOT set Content-Type manually
    });

    // read JSON safely
    const data = await res.json().catch(() => ({ ok: false, error: 'Invalid JSON in response', status: res.status }));
    console.log("Response status:", res.status, "body:", data);

    if (!res.ok) {
      console.error("Upload error:", data);
      toast.error(data.error || `Server error ${res.status}`);
      return;
    }

    console.log("✅ Upload success:", data);
    toast.success("Receipt processed successfully!");
    if (onUploadSuccess) onUploadSuccess(data.transaction);
  } catch (err) {
    console.error("❌ Upload failed:", err);
    toast.error("Upload failed, check console for details");
  } finally {
    setLoading(false);
    setFile(null);
    setCategory("");
  }
};


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Upload Receipt</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Receipt</DialogTitle>
          <DialogDescription>
            Upload an image receipt — Textract will automatically extract the amount and date.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <Label>Receipt Image</Label>
            <Input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                console.log("file input change, files:", e.target.files);
                setFile(e.target.files?.[0] || null);
              }}
              required
            />
          </div>

          <div>
            <Label>Category (optional)</Label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Groceries, Fuel"
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Upload & Analyze"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
