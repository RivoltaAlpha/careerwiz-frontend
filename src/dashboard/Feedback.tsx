import React from 'react';

const Feedback: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen p-4 gap-4">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-gray-100 p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold">Sidebar</h2>
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-3/4 bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">Feedback Form</h1>

        <form className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full md:w-1/2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full md:w-1/2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <textarea
            placeholder="Message"
            className="w-full h-40 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default Feedback;