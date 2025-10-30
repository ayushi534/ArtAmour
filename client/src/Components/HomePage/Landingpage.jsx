import React from "react";
import Image from "../../assets/data";
import Cards from "./cards";


const ProductsCards = [
  { id: 1, title: "Art", image: Image.ArtImg },
  { id: 2, title: "Pottery", image: Image.pottery },
  { id: 3, title: "Paintings", image: Image.PaintingImg },
  { id: 4, title: "Candles", image: Image.candleImg },
];

const Landingpage = () => {
  return (
    <div className="min-h-screen bg-Brown text-Beige font-sans flex flex-col">
      {/* 🔹 Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 md:py-40 lg:py-48">
        <div className="absolute inset-0">
          <img
            src={Image.fornt}
            alt="Art Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-Brown/40"></div>
        </div>

        <div className="relative z-10 space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-Cream tracking-widest drop-shadow-lg">
            Art Amour
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-Cream italic">
           Handpicked paintings for true Art Lovers 
          </h2>
          <p className="text-base sm:text-lg md:text-lg leading-relaxed mt-6 text-Beige">
            ArtAmour brings you handpicked paintings, pottery, candles, and handmade art 
            that breathe warmth and emotion into your space-crafted by passionate 
            artists around the world.
          </p>
          <button className="bg-Beige text-Brown px-8 py-3 rounded-full font-semibold hover:bg-yellow-50 transition mt-4">
            Explore Collections
          </button>
        </div>
      </section>

      {/* 🔹 Cards Section */}
      <section className="py-16 px-6 bg-Beige">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-Brown mb-12">
          Explore Artworks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {ProductsCards.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landingpage;
