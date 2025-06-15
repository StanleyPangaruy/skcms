// src/components/Reports.tsx
import { useEffect, useState } from "react";
import axios from "../api/axios";
import type { Report } from "../types";

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    axios.get("/reports").then((res) => setReports(res.data));
  }, []);

  return (
    <section className="p-8 bg-gray-100 text-black" id="reports">
      <h2 className="text-2xl font-bold mb-4">Transparency Reports</h2>
      <ul className="space-y-3">
        {reports.map((r) => (
          <li key={r.id} className="bg-white p-4 rounded-xl shadow">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{r.title}</span>
              <a
                href={`http://localhost:8000/${r.file_path}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline text-sm"
              >
                View Report
              </a>
            </div>
            <p className="text-xs text-gray-400">{new Date(r.uploaded_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Reports;
