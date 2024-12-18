import React from "react";

const Contact = ({ darkMode, hide }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      name: e.target.name.value,
      contactType: e.target.contactType.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch(
        "https://your-own-api.com/send-message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        alert("Message sent successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to send message: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the message.");
    }
  };

  return (
    <div className="h-[100vh] flex items-center justify-center py-10 bg-transparent ">
      <div
        className={`relative flex mx-[2vw] flex-wrap items-center justify-center shadow-4xl rounded-lg overflow-hidden max-w-5xl w-full md:mx-auto h-[70vh] ${
          darkMode ? "bg-green-900" : "bg-orange-200"
        }`}
      >
        {/* Left Side: Contact Form */}
        <div
          className={`w-full lg:w-2/3 p-8  ${
            darkMode
              ? "text-white bg-[#014421]"
              : "text-gray-800 bg-[#FAD5A5] rounded-full"
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">
            Let's{" "}
            <span
              className={`${darkMode ? "text-[#FFD580]" : "text-[#E97451]"}`}
            >
              Talk
            </span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="Enter your email"
                className={`w-full px-3 py-2 text-black rounded-lg ${
                  darkMode
                    ? "bg-[#355E3B] text-white"
                    : "bg-[#FAC898] text-black"
                } shadow-md focus:outline-none focus:ring-2 focus:ring-white`}
              />
            </div>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="Enter your name"
                className={`w-full px-3 py-2 text-black rounded-lg ${
                  darkMode
                    ? "bg-[#355E3B] text-white"
                    : "bg-[#FAC898] text-black"
                } shadow-md focus:outline-none focus:ring-2 focus:ring-white`}
              />
            </div>
            {/* Contact Type */}
            <div>
              <label
                htmlFor="contactType"
                className="block text-sm font-medium mb-1"
              >
                Who is contacting?
              </label>
              <select
                id="contactType"
                className={`w-full px-3 py-2 text-black rounded-lg ${
                  darkMode
                    ? "bg-[#355E3B] text-white"
                    : "bg-[#FAC898] text-black"
                } shadow-md focus:outline-none focus:ring-2  focus:ring-white`}
              >
                <option value="recruiter">Recruiter</option>
                <option value="student">Student</option>
                <option value="visitor">Visitor</option>
              </select>
            </div>
            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows="3"
                placeholder="Write your message here..."
                className={`w-full px-3 py-2  rounded-lg ${
                  darkMode ? "bg-[#355E3B]" : "bg-[#FAC898]"
                } shadow-md focus:outline-none focus:ring-2 focus:ring-white`}
              ></textarea>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className={`md:w-[30%] w-full flex items-center justify-center ${
                darkMode
                  ? "bg-[#DFFF00] hover:bg-[#DFFF11]"
                  : "bg-[#E3735E] hover:bg-[#E3735E]"
              } text-[#264E5B] TEXT font-bold text-md px-4 py-2 rounded-lg shadow-lg  transition-all duration-300 transform hover:scale-105`}
            >
              Send Message
              <img
                src="/images/send.png"
                alt="Arrow"
                className="ml-2 h-8 w-8 tint"
              />
            </button>
          </form>
        </div>

        {/* Right Side: Image with Map */}
        <div className="hidden lg:flex w-full lg:w-1/3 ">
          <div className="h-full bg-cover bg-center relative">
            <iframe
              width="350"
              height="509"
              src="https://www.openstreetmap.org/export/embed.html?bbox=88.24356079101564%2C22.476395980457973%2C88.56491088867189%2C22.690369008583705&amp;layer=mapnik&amp;marker=22.58342403920957%2C88.40423583984375"
              style={{ border: "" }}
            ></iframe>
            <br />
          </div>
        </div>
      </div>
      {hide && (
        <div
          className={`flex-col items-center justify-center hidden md:block  w-7 h-[210px] self-center ml-[auto] ${
            darkMode ? "text-white bg-lime-600" : "text-gray-800 bg-orange-400"
          }`}
        >
          <h2
            className={`text-sm font-bold text-center px-1 py-2 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
            style={{
              writingMode: "vertical-rl",
              textOrientation: "upright",
              transform: "rotate(360deg)",
            }}
          >
            Contact me
          </h2>
        </div>
      )}
    </div>
  );
};

export default Contact;
