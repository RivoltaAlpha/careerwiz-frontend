import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";

const Landing = () => {
    return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
        <main className="flex-grow">
            <Header />
            <Hero />
            <Main />
            <Footer />
        </main> 
    </div>
    )
}

export default Landing
