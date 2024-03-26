import axios from "axios";
import emailjs from "emailjs-com";
import React, { useEffect, useState } from "react";

const AddNewAgency = () => {
  const initialState = JSON.parse(localStorage.getItem("user")) || {
    firstName: "",
    lastName: "",
    username: "",
    address: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const [user, setUser] = useState(initialState);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Reset specific field error
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      setErrors({ ...errors, file: "" }); // Reset file input error if needed
    }
  };

  useEffect(() => {
    // Khởi tạo EmailJS SDK khi component được render
    emailjs.init("e8nVRT8-ytw0WVA70");
  }, []);

  const validateForm = () => {
    let formIsValid = true;
    let newErrors = {};

    // Validation patterns
    const nameAndAddressPattern =
      /^([A-Z\u00C0-\u1EF9][a-z\u00C0-\u1EF9'´`]*(\s[A-Z\u00C0-\u1EF9][a-z\u00C0-\u1EF9'´`]*)*)$/;

    // Allows accented characters for names
    const passwordPattern = /.{8,}/; // At least 8 characters, no other restrictions in this pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email pattern

    // First name and Last name validation
    if (!user.firstName.match(nameAndAddressPattern)) {
      formIsValid = false;
      newErrors.firstName =
        "First Name is invalid. It should start with a capital letter and can include lowercase letters, spaces, accented characters, and certain special characters.";
    }
    if (!user.lastName.match(nameAndAddressPattern)) {
      formIsValid = false;
      newErrors.lastName =
        "Last Name is invalid. It should start with a capital letter and can include lowercase letters, spaces, accented characters, and certain special characters.";
    }

    if (!user.phoneNumber.match(emailPattern)) {
      formIsValid = false;
      newErrors.phoneNumber = "Email is invalid";
    }
    if (!user.username.trim()) {
      formIsValid = false;
      newErrors.username = "Username is required.";
    }
    // Address validation - simplified for demonstration
    if (!user.address.match(nameAndAddressPattern)) {
      formIsValid = false;
      newErrors.address =
        "Address is invalid. It should start with a capital letter and can include lowercase letters, spaces, accented characters, and certain special characters.";
    }

    // Password validation
    if (
      !user.password.match(passwordPattern) ||
      user.password !== user.confirmPassword
    ) {
      formIsValid = false;
      newErrors.password = "Password must be at least 8 characters long.";
      newErrors.confirmPassword = "Passwords must match.";
    }

    // Check if file was uploaded
    if (!file) {
      formIsValid = false;
      newErrors.file = "Please upload a file.";
    }
    setErrors(newErrors);
    return formIsValid;
  };

  const sendEmail = () => {
    emailjs
      .send("Aptx4869", "template_r7i6yha", {
        email: user.phoneNumber, // Sử dụng số điện thoại làm email
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
      })
      .then((response) => {
        console.log("Email sent successfully:", response);
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
        setError("Email is not exits.");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return; // Stop the form from being submitted
    }

    const formData = new FormData();
    formData.append("FirstName", user.firstName);
    formData.append("LastName", user.lastName);
    formData.append("Username", user.username);
    formData.append("Address", user.address);
    formData.append("Phone", user.phoneNumber);
    formData.append("Password", user.password);
    formData.append("FileImage", file);

    try {
      const response = await axios.post(
        "https://localhost:7137/api/Agencies/PostAgencyWithImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status) {
        setSuccess("Agency added successfully!");
        // Send email here
        sendEmail();
        // Optionally reset form here
      } else {
        setError("Failed to add agency.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during submission."
      );
    }
  };
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="flex min-h-screen bg-gray-50 justify-center items-center">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Agency
        </h2>
        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
            <img
              src={imagePreviewUrl || "default_avatar.png"}
              alt="Avatar"
              className="absolute w-full h-full object-cover"
            />
            <input
              type="file"
              name="fileImage"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={user.firstName}
                onChange={handleChange}
                className={`p-2 w-full border rounded shadow-sm ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={user.lastName}
                onChange={handleChange}
                className={`p-2 w-full border rounded shadow-sm ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
            {/* Username */}
            <div className="col-span-1 md:col-span-2">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={user.username}
                onChange={handleChange}
                className={`p-2 w-full border rounded shadow-sm ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>

            <div className="col-span-1 md:col-span-2">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={user.address}
                onChange={handleChange}
                className={`p-2 w-full border rounded shadow-sm ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Email"
                value={user.phoneNumber}
                onChange={handleChange}
                className={`p-2 w-full border rounded shadow-sm ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
                className={`p-2 w-full border rounded shadow-sm ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={user.confirmPassword}
                onChange={handleChange}
                className={`p-2 w-full border rounded shadow-sm ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={handleBack}
              type="button"
              className="px-4 py-2 text-sm font-medium text-blue-700 border border-blue-700 rounded hover:bg-blue-700 hover:text-white transition-colors duration-200"
            >
              Back
            </button>
            <div className="space-x-4">
              <button
                type="button"
                onClick={() => setUser(initialState)} // Assuming you want to clear the form
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded shadow"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddNewAgency;
