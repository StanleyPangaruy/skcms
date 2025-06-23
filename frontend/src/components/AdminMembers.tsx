import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import type { Member } from "../types";
import type { AxiosResponse } from "axios";

interface MemberFormState extends Partial<Member> {
  photoFile?: File;
  photoPreview?: string;
  photo_url?: string;
  committee?: string;
  about?: string;
}

const AdminMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentMember, setCurrentMember] = useState<MemberFormState>({});
  const navigate = useNavigate();

  const fetchMembers = async () => {
    try {
      const res = await axios.get("/members/");
      setMembers(res.data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.error("Failed to fetch members.");
    }
  };

  const deleteMember = async (id: number) => {
    if (!confirm("Delete this member?")) return;
    try {
      await axios.delete(`/members/${id}`);
      setMembers((prev) => prev.filter((m) => m.id !== id));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("Delete failed.");
    }
  };

  const openAddModal = () => {
    setEditMode(false);
    setCurrentMember({ name: "", position: "", committee: "", about: ""});
    setModalOpen(true);
  };

  const openEditModal = (member: Member) => {
    setEditMode(true);
    setCurrentMember({
      ...member,
      photoPreview: member.photo_url
        ? `https://skgomez.onrender.com/uploads/${member.photo_url}`
        : undefined,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", currentMember.name || "");
    formData.append("position", currentMember.position || "");
    formData.append("committee", currentMember.committee || "");
    formData.append("about", currentMember.about || "");
    if (currentMember.photoFile) {
      formData.append("photo", currentMember.photoFile);
    }

    try {
      let res: AxiosResponse<Member>;
      if (editMode) {
        res = await axios.put(`/members/${currentMember.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMembers((prev) =>
          prev.map((m) => (m.id === res.data.id ? res.data : m))
        );
      } else {
        res = await axios.post("/members", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMembers((prev) => [...prev, res.data]);
      }
      setModalOpen(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("Error saving member.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/admin");
    fetchMembers();
  }, [navigate]);

  const committeeOptions = [
    "health",
    "education",
    "economic empowerment",
    "social inclusion and equity",
    "peacebuilding and security",
    "active citizenship",
    "environment",
  ];

  return (
    <div className="min-h-screen w-screen bg-gray-50 p-6">
      <div className="w-full">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                title="Back to Dashboard"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-semibold text-gray-800">Committee Members</h1>
                <p className="text-gray-600 mt-1">Manage your team member profiles</p>
              </div>
            </div>
            <button
              onClick={openAddModal}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Member
            </button>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {members.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No members found</h3>
              <p className="text-gray-600 mb-4">Get started by adding your first team member</p>
              <button
                onClick={openAddModal}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Add First Member
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Member</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Position</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Committee</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">About</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Photo</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {members.map((m) => (
                    <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-800">{m.name}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {m.position}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {m.committee}
                        </span>
                      </td>
                       <td className="py-4 px-6">
                        <div className="font-medium text-gray-800">{m.about}</div>
                      </td>
                      <td className="py-4 px-6">
                        {m.photo_url ? (
                          <img
                            src={`https://skgomez.onrender.com/uploads/${m.photo_url}`}
                            alt={m.name}
                            className="h-12 w-12 object-cover rounded-full border-2 border-gray-200"
                          />
                        ) : (
                          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-3">
                          <button
                            onClick={() => openEditModal(m)}
                            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => m.id !== undefined && deleteMember(m.id)}
                            className="text-red-600 hover:text-red-800 font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {editMode ? "Edit Member" : "Add Member"}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 text-black">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={currentMember.name || ""}
                    onChange={(e) =>
                      setCurrentMember({ ...currentMember, name: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter member name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position *
                  </label>
                  <input
                    type="text"
                    value={currentMember.position || ""}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        position: e.target.value,
                      })
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter member position"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Committee</label>
                  <select
                    value={currentMember.committee || ""}
                    onChange={(e) =>
                      setCurrentMember({ ...currentMember, committee: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2 text-black"
                  >
                    <option value="">-- Select Committee --</option>
                    {committeeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">About</label>
                  <textarea
                    value={currentMember.about || ""}
                    onChange={(e) =>
                      setCurrentMember({ ...currentMember, about: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setCurrentMember((prev) => ({
                        ...prev,
                        photoFile: file,
                        photoPreview: file
                          ? URL.createObjectURL(file)
                          : prev.photoPreview,
                      }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                  {currentMember.photoPreview && (
                    <div className="mt-3">
                      <img
                        src={currentMember.photoPreview}
                        alt="Preview"
                        className="h-24 w-24 object-cover rounded-lg border-2 border-gray-200"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    {editMode ? "Update" : "Add"} Member
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMembers;