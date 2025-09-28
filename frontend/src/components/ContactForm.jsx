
import React, { useState } from "react";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_name: "Gmail",
        };

        // Show loading toast
        const loadingToast = toast.loading("Sending your message...");

        emailjs
            .send(
                "service_7l1do69",
                "template_914neie",
                templateParams,
                "tAztAgKR3sSsBUBEB"
            )
            .then(
                (result) => {
                    console.log("Message sent:", result.text);
                    
                    // Dismiss loading toast and show success
                    toast.dismiss(loadingToast);
                    toast.success("✅ Message sent successfully!", {
                        duration: 4000,
                        position: "top-center",
                        style: {
                            background: '#10b981',
                            color: '#fff',
                            fontWeight: 'bold',
                        },
                        iconTheme: {
                            primary: '#fff',
                            secondary: '#10b981',
                        },
                    });
                    
                    setFormData({ name: "", email: "", message: "" });
                },
                (error) => {
                    console.error("Error:", error.text);
                    
                    // Dismiss loading toast and show error
                    toast.dismiss(loadingToast);
                    toast.error("❌ Failed to send message. Please try again.", {
                        duration: 5000,
                        position: "top-center",
                        style: {
                            background: '#ef4444',
                            color: '#fff',
                            fontWeight: 'bold',
                        },
                        iconTheme: {
                            primary: '#fff',
                            secondary: '#ef4444',
                        },
                    });
                }
            )
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 relative">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Contact Us</h1>
                    <p className="text-purple-200">Get in touch with us</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-purple-100">
                            NAME
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="w-full px-4 py-3 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-purple-100">
                            EMAIL
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email ID"
                            className="w-full px-4 py-3 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm font-medium text-purple-100">
                            MESSAGE
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Write your message..."
                            rows={4}
                            className="w-full px-4 py-3 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 resize-none"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>SENDING...</span>
                            </>
                        ) : (
                            <>
                                <span>SEND</span>
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;