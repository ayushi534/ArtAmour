import React from "react";
const Cards = ({ item, onClick }) => {
  return (
    <div
      onClick={() => onClick && onClick(item)}
      className="bg-yellow-50 rounded-2xl shadow-lg hover:shadow-2xl transition duration-150 transform hover:-translate-y-2 cursor-pointer"
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-64 sm:h-72 md:h-80 lg:h-80 object-cover rounded-t-2xl"
      />
      <div className="p-5 text-center">
        <h3 className="text-lg sm:text-xl font-semibold text-Brown mb-2">
          {item.name}
        </h3>
        <button
          onClick={(e) => { e.stopPropagation(); onClick && onClick(item); }}
          className="mt-4 px-5 py-2 bg-Brown text-Beige rounded-full hover:bg-Redwood transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Cards;

