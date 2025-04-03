import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContent } from "../../context/AppContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ReportItem = () => {
  const { type } = useParams(); // Correctly extract type from params
  const navigate = useNavigate();
  const { userData, backendUrl } = useContext(AppContent);
  const userName = userData?.name;

  const [formData, setFormData] = useState({
    type: type || "lost", // Set initial type from URL
    itemName: "",
    location: "",
    description: "",
    contact: "",
    time: "",
  });

  // Update type if URL parameter changes
  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      type: type || "lost",
    }));
  }, [type]); // Runs whenever `type` changes

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/report/create-item`, formData, {
        withCredentials: true,
      });

      if (response.data?.success) {
        toast.success(response.data?.message);
      }else{
        toast.error(response.data?.message)
      }
    } catch (error) {
      toast.error(error?.response?.message || "Error submitting report");
    } finally {
      setFormData({
        type: type || "lost",
        itemName: "",
        location: "",
        description: "",
        contact: "",
        time: "",
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-4">
          {formData.type === "lost" ? "Report a Lost Item" : "Report a Found Item"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Report Type (Lost or Found) */}
          <div className="mb-4">
            <label className="block text-gray-700">Report Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>

          {/* Item Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Item Name</label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              rows="4"
              required
            />
          </div>

          {/* Contact Information */}
          <div className="mb-4">
            <label className="block text-gray-700">Contact Information</label>
            <input
              type="text"
              name="contact"
              value={userName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
              disabled
            />
          </div>

          {/* Time of Item Loss/Found */}
          <div className="mb-4">
            <label className="block text-gray-700">Time</label>
            <input
              type="datetime-local"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Submit Report
          </button>
        </form>
      </div>
    </>
  );
};

export default ReportItem;
