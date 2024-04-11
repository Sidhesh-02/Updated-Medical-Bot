import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home({setToken}) {
    const navigate = useNavigate();
    function navigateRoute(){
        if(!setToken){
            navigate("/login");
        }else{
            navigate("/interface")
        }
        
    }
  return (
    <div className="homepage py-16 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Ayurveda & Homeopathy Chatbot
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Your Personalized Holistic Health Assistant
        </p>
      </header>
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Expert Advice</h2>
          <p className="text-gray-700">
            Get advice from certified Ayurveda and Homeopathy Books.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Natural Remedies</h2>
          <p className="text-gray-700">
            Discover natural remedies and treatments based on ancient healing practices.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Customized Recommendations</h2>
          <p className="text-gray-700">
            Receive personalized recommendations tailored to your specific health concerns.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Continuous Learning</h2>
          <p className="text-gray-700">
            Stay informed with articles and tips about holistic wellness.
          </p>
        </div>
      </section>
      <section className="text-center mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Ready to improve your health naturally?
        </h2>
        <button onClick={navigateRoute} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
          Start Chatting
        </button>
      </section>
    </div>
  );
}
