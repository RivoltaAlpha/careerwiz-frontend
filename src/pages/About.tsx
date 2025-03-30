import { FaLinkedin, FaTwitter } from "react-icons/fa";
import Header from "../components/Header";

export default function AboutUs() {
  return (
    <>
    <Header />
    <div className="p-6 space-y-16 text-black mx-auto w-full lg:w-[80%]">
      {/* Introduction Section */}
      <section className="space-y-8 bg-gray-50 p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="space-y-6 flex flex-col items-center">
          <h2 className="text-3xl font-bold">Who We Are</h2>
          <p>
            CareerWiz is an AI-driven career recommendation platform tailored for Kenyan
            students. Our mission is to empower students with data-driven, personalized
            career recommendations to help them make informed decisions about their future.
          </p>
          <h2 className="text-3xl font-bold">Mission</h2>
          <p>
            Empowering students to make informed career decisions by leveraging
            data-driven, personalized recommendations.
          </p>
          <h2 className="text-3xl font-bold">Vision</h2>
          <p>
            To become Kenya’s leading platform in bridging the career guidance gap through
            innovative technology.
          </p>
          <h2 className="text-3xl font-bold">Values</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>Innovation:</strong> Constantly innovating to provide the most accurate and helpful guidance.</li>
            <li><strong>Inclusivity:</strong> Ensuring every student, regardless of background, has access to career advice.</li>
            <li><strong>Integrity:</strong> Upholding honesty and transparency in our recommendations.</li>
            <li><strong>Impact:</strong> Striving to make a positive difference in students' career journeys.</li>
          </ul>
        </div>
      </section>

      {/*Testimonials Section */}
      <section className="space-y-6">
        <h2 className="text-4xl font-bold text-center">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          <div className="p-4 items-center justify-center shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-300">
            <img src="https://img.freepik.com/free-vector/virtual-graduation-ceremony-with-university-graduate_23-2148571732.jpg?uid=R154664640&semt=ais_hybrid" alt="" className="w-24 h-24 rounded-full border-4 border-gray-300" />
                <h3 className="text-xl mt-4 font-semibold">Alex K.</h3>
                <br/>
                <p>"CareerWiz helped me find the perfect career path based on my skills and interests. Highly recommend!" - Alex K.</p>
          </div>
          <div className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-300">
            <img src="https://img.freepik.com/free-vector/smiling-student-holds-diploma_24908-81881.jpg?uid=R154664640&semt=ais_hybrid" alt="" className="w-24 h-24 rounded-full border-4 border-gray-300" />
                <h3 className="text-xl mt-4 font-semibold">Skyla Jackson</h3>
                <br/>
                <p>"CareerWiz helped me find the perfect career path based on my skills and interests. Highly recommend!" - Skyla Jackson</p>
          </div>
          <div className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-300">
                <img src="https://img.freepik.com/free-vector/person-smiling-graduation-cap_24908-81492.jpg?uid=R154664640&semt=ais_hybrid" alt="" className="w-24 h-24 rounded-full border-4 border-gray-300" />
                <h3 className="text-xl mt-4 font-semibold">Grace Wambui</h3>
                <br/>
                <p>"CareerWiz helped me find the perfect career path based on my skills and interests. Highly recommend!" - Grace Wambui</p>
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="space-y-6 mx-auto">
        <h2 className="text-4xl font-bold text-center">Our Impact</h2>
        <div className="flex flex-col md:grid-cols-1 gap-6">
          <div className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-300">
            <p>CareerWiz helps you find the perfect career path based on my skills and interests</p>
          </div>
          <div className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-300">
            <p>Partnered with 10+ educational institutions to expand access to career guidance.</p>
          </div>
          <div className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-300">
            <p>Reduced dropout rates by 20% among students using our platform.</p>
          </div>
        </div>
      </section>



      {/* Meet the Team Section */}
      <section className="space-y-20 mx-auto">
        <h2 className="text-4xl font-bold text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 ">
          {[{
            name: 'Mwaniki Tifany',
            role: 'Software Developer',
            description: 'Tifany brings over a decade of experience in AI and machine learning, leading the development of intelligent recommendation systems at CareerWiz.',
            image: 'https://img.freepik.com/free-photo/college-students-different-ethnicities-cramming_23-2149891288.jpg?uid=R154664640&semt=ais_hybrid',
            linkedin: '#',
            twitter: '#',
            facebook: '#'
          }, {
              name: 'Magdalene komu',
              role: 'Education Specialist',
              description: "Magdalene's background in education and career guidance helps shape our platform's alignment with the needs of Kenyan students and educators.",
              image: 'https://img.freepik.com/free-photo/student-strolls-college-yard-carries-rucksack-notepads-weas-pink-shirt-knitted-vest-hoop-surrounded-by-city-street-expresses-positive-emotions_273609-55312.jpg?uid=R154664640&semt=ais_hybrid',
              linkedin: '#',
              twitter: '#',
            }].map((member, index) => (
                <div key={index} className="p-6 shadow-lg rounded-xl bg-white hover:shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className="flex flex-col items-center gap-6">
                <img src={member.image} alt="" className="w-24 h-24 rounded-full border-4 border-gray-300" />
                <h3 className="text-xl mt-4 font-semibold">{member.name}</h3>
                <p className="italic text-gray-600">{member.role}</p>
                <div className="flex space-x-4 mt-2">
                  <a href={member.linkedin} title="LinkedIn"><FaLinkedin className="text-blue-600 hover:text-blue-800" /></a>
                  <a href={member.twitter} title="Twitter"><FaTwitter className="text-blue-400 hover:text-blue-600" /></a>
                </div>
              </div>
              <p className="mt-4 text-center">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
    </>
  );
}
