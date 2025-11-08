import React, { useState } from "react";

function ReceiptUploader() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://100.27.190.37:5000/upload-receipt", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setMessage(data.message || "✅ Receipt uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("❌ Failed to upload file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginTop: "20px",
      }}
    >
      <h3>🧾 Upload Receipt</h3>

      <label htmlFor="receiptFile" style={{ display: "block", marginBottom: "5px" }}>
        Choose receipt file:
      </label>

      <input
        id="receiptFile"
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={(e) => setFile(e.target.files[0])}
        title="Select receipt file to upload"
        style={{ display: "block", marginBottom: "10px" }}
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
}

export default ReceiptUploader;
