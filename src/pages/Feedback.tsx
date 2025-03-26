import Header from "../components/Header";

export default function Feedback() {
    const handleSubmit = () => {

    }

    return (
        <div className="bg-gray-100 text-black ">
            <Header />
            <div className="mx-auto max-w-7xl px-4 flex flex-col items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full px-4 py-10">
                    {/* Chat to support */}
                    <div className="bg-white shadow-xl rounded-2xl p-12 flex flex-col items-center text-center  transition-transform hover:scale-105">
                        <div className="bg-gray-100 mb-10 rounded-full p-3">
                        <i className="text-lg text-gray-600">💬</i>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                        Chat to support
                        </h3>
                        <p className="text-sm font-semibold text-gray-600 mb-4">We’re here to help</p>
                        <a
                        href="/contact"
                        className="text-blue-500 text-sm font-medium"
                        >
                        support@CareerWiz.com
                        </a>
                    </div>

                    {/* Visit Us */}
                    <div className="bg-white shadow-lg rounded-2xl p-12 flex flex-col items-center text-center  transition-transform hover:scale-105">
                        <div className="bg-gray-100 rounded-full p-3 mb-10">
                        <i className="text-lg text-gray-600">📍</i>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Visit Us</h3>
                        <p className="text-sm font-semibold text-gray-600 mb-4">
                        Visit our office HQ
                        </p>
                        <a
                        href="https://www.google.com/maps"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 text-sm font-medium"
                        >
                        View on Google map
                        </a>
                    </div>

                    {/* Call Us */}
                    <div className="bg-white shadow-lg rounded-2xl p-12 flex flex-col items-center text-center  transition-transform hover:scale-105">
                        <div className="bg-gray-100 rounded-full p-3 mb-10">
                        <i className="text-lg text-gray-600">📞</i>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Call Us</h3>
                        <p className="text-sm font-semibold text-gray-600 mb-4">
                        Mon-Fri from 8am to 5pm
                        </p>
                        <a
                        href="tel:+254123456789"
                        className="text-blue-500 text-sm font-medium"
                        >
                        +254 123 456 789
                        </a>
                    </div>
                </div>

                <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
                    <p className="text-center text-3xl font-bold content md:text-5xl md:leading-10">
                        Share your feedback with us...
                    </p>
                </div>
                <div className="flex items-center justify-center mb-10">
                            <div className="px-2 md:px-12">
                                <p className="mt-4 text-lg ">
                                    Our friendly team would love to hear from you on how to improve our services.
                                </p>
                                <form onSubmit={handleSubmit} className="mt-8 space-y-8 h-full">
                                    <div className="grid w-full gap-y-4">
                                        <div className="grid w-full  items-center gap-1.5">
                                            <label
                                                className="text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                htmlFor="name"
                                            >
                                                Names
                                            </label>
                                            <input
                                                className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                                type="text"
                                                id="name"
                                                placeholder="Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid w-full  items-center gap-1.5">
                                        <label
                                            className="text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="text"
                                            id="email"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="grid w-full  items-center gap-1.5">
                                        <label
                                            className="text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="phone_number"
                                        >
                                            Phone number
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="tel"
                                            id="phone_number"
                                            placeholder="Phone number"
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <label
                                            className="text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="message"
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-black focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:text-black dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            id="message"
                                            placeholder="Leave us a message"
                                            cols={3}
                                        />
                                    </div>
                                    <button type="button" className="w-[300px] py-2 rounded ml-[50px] bg-cards btn btn-outline btn-primary"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
            </div>
        </div>
    );
}  