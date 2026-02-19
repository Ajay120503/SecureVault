import { useState, useRef } from "react";
import { importPasswords } from "../../api/password.api";
import toast from "react-hot-toast";
import { UploadCloud, FileCheck } from "lucide-react";

export default function ImportPasswords() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const fileRef = useRef();

  const upload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      toast.error("Only CSV files allowed");
      fileRef.current.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setResult(null);

      const res = await importPasswords(formData);

      const data = res.data;

      setResult({
        message: data.message,
        imported: data.imported || 0,
        skippedDuplicates: data.skippedDuplicates || 0,
      });

      toast.success(data.message || "Import completed");

      // reset input
      fileRef.current.value = "";
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message || "Import failed. Check CSV format."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 px-4">
      <div className="max-w-xl w-full">
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body space-y-6">
            {/* HEADER */}
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <UploadCloud size={26} />
              </div>

              <div>
                <h2 className="text-xl font-bold">Import Passwords</h2>
                <p className="text-sm opacity-70">
                  Upload Chrome / Google Password Manager CSV
                </p>
              </div>
            </div>

            {/* FILE INPUT */}
            <input
              ref={fileRef}
              type="file"
              accept=".csv"
              disabled={loading}
              className="file-input file-input-bordered w-full"
              onChange={upload}
            />

            {/* LOADING STATE */}
            {loading && (
              <div className="flex items-center gap-3 text-primary">
                <span className="loading loading-spinner"></span>
                Securely importing passwords...
              </div>
            )}

            {/* RESULT CARD */}
            {result && (
              <div className="alert alert-success shadow-sm">
                <FileCheck size={20} />

                <div>
                  <p className="font-semibold">{result.message}</p>

                  <p className="text-sm">
                    ✅ Imported: <b>{result.imported}</b>
                  </p>

                  <p className="text-sm">
                    ⚠️ Skipped duplicates: <b>{result.skippedDuplicates}</b>
                  </p>
                </div>
              </div>
            )}

            {/* HELP */}
            <div className="text-xs opacity-60 leading-relaxed">
              Export passwords from Chrome:
              <br />
              <b>
                Chrome → Settings → Autofill → Password Manager → Export
                Passwords
              </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
