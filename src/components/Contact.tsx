import React, { useState } from "react";

// Define a functional component for the Contact form section
const Contact: React.FC = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // State to manage form submission status and feedback messages
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Handler for form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Update the specific field while keeping other fields unchanged
    }));
  };

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate that all required fields are filled
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      // Push error event to Google Tag Manager
      const errorEvent = {
        event: "form_submission_error",
        formName: "contact_form",
        error: "Missing fields",
      };
      window.dataLayer?.push(errorEvent);
      console.log("GTM Event pushed:", errorEvent);

      // Show error message to user
      setSubmitStatus({
        type: "error",
        message: "Please fill in all fields.",
      });
      return;
    }

    // Push successful submission event to Google Tag Manager
    const successEvent = {
      event: "form_submission",
      formName: "contact_form",
      formData: formData,
    };
    window.dataLayer?.push(successEvent);
    console.log("GTM Event pushed:", successEvent);

    // Reset form and show success message
    setFormData({ name: "", email: "", subject: "", message: "" });
    setSubmitStatus({
      type: "success",
      message: "Thank you! Your message has been sent successfully.",
    });

    // Clear success message after 5 seconds
    setTimeout(() => {
      setSubmitStatus({ type: null, message: "" });
    }, 5000);
  };

  // Render the contact form
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8" id="contact">
      <div className="max-w-lg mx-auto">
        {/* Form header section */}
        <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
          Contact Us
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Have questions? We'd love to hear from you.
        </p>
        <div className="mt-8">
          {/* Status message display (success/error) */}
          {submitStatus.message && (
            <div
              className={`mb-4 p-4 rounded-md ${
                submitStatus.type === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {submitStatus.message}
            </div>
          )}
          {/* Contact form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name input field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            {/* Email input field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {/* Subject input field */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            {/* Message textarea field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            {/* Submit button */}
            <div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
