import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';

function Testimonial() {
  const context = useContext(myContext);
  const { mode } = context;

  const testimonials = [
    {
      name: 'Aiko Tanaka',
      role: 'Fashion Enthusiast',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      text: 'I absolutely love shopping from Urahara Shop! The quality of the clothes is amazing, and their anime-inspired collection is just what I’ve always looked for. Definitely my go-to store now!',
    },
    {
      name: 'Kenta Yamamoto',
      role: 'Digital Artist',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      text: 'The customer service is top-notch and the designs are straight out of my favorite series. I wore a shirt from Urahara Shop to a convention and got so many compliments!',
    },
    {
      name: 'Miyu Asano',
      role: 'Cosplayer',
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      text: 'Urahara Shop delivers the perfect mix of casual fashion and otaku vibes. I ordered a hoodie last month and it’s still my favorite piece. Highly recommended!',
    },
  ];

  return (
    <div className={`${mode === 'dark' ? 'bg-[#0e0e0e]' : 'bg-pink-50'} py-16`}>
      <section>
        <div className="container mx-auto px-4">
          <h1
            className={`text-center text-4xl font-extrabold mb-2 ${
              mode === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            Testimonials
          </h1>
          <h2
            className={`text-center text-2xl font-medium mb-12 ${
              mode === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            What our <span className="text-pink-500 font-bold">customers</span> are saying
          </h2>

          <div className="flex flex-wrap justify-center gap-8">
            {testimonials.map((item, i) => (
              <div
                key={i}
                className={`w-full md:w-[30%] bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg hover:shadow-pink-400 dark:hover:shadow-pink-600 transition-all duration-300 p-6 text-center border border-pink-100 dark:border-pink-500/10`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-full mx-auto mb-6 border-4 border-pink-400"
                />
                <p
                  className={`text-base leading-relaxed ${
                    mode === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}
                >
                  “{item.text}”
                </p>
                <span className="inline-block h-1 w-12 rounded bg-pink-500 mt-6 mb-3" />
                <h3
                  className={`font-semibold tracking-wider text-lg ${
                    mode === 'dark' ? 'text-pink-400' : 'text-pink-600'
                  }`}
                >
                  {item.name}
                </h3>
                <p className={`text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {item.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Testimonial;
