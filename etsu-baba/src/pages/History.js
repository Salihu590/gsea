import React from "react";

const History = () => {
  const events = [
    {
      title: "The Legacy of Etsu Baba",
      desc: "The great Etsu Baba established the foundations of our community, creating lasting traditions and values that continue to guide us today.",
      era: "Ancient Times",
    },
    {
      title: "Preservation Through Change",
      desc: "Despite external pressures, our community maintained its cultural identity and traditional practices, ensuring the continuity of Etsu Baba's legacy.",
      era: "Colonial Era",
    },
    {
      title: "New Beginnings",
      desc: "The post-independence era brought new opportunities for community development while maintaining our cultural heritage and values.",
      era: "Independence",
    },
    {
      title: "Diaspora and Global Connections",
      desc: "Descendants of Etsu Baba spread across the globe, maintaining connections to their roots while contributing to diverse communities worldwide.",
      era: "Modern Era",
    },
    {
      title: "Foundation Establishment",
      desc: "The Etsu Baba Progressive Foundation was officially established to unite descendants and preserve our heritage for future generations.",
      era: "2024",
    },
  ];

  return (
    <div className="px-6 py-12 font-montserrat text-gray-800">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-yellow-800">
          Our History
        </h1>
        <p className="text-lg text-gray-600">
          A journey through time tracing the legacy of Etsu Baba and the
          evolution of our community.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-16 space-y-8">
        {events.map((item, index) => (
          <div key={index} className="border-l-4 border-yellow-800 pl-4">
            <h3 className="text-xl font-bold text-yellow-800">{item.era}</h3>
            <h4 className="text-lg font-semibold mt-1">{item.title}</h4>
            <p className="text-gray-600 mt-2">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mb-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-800 mb-6">
          Historical Significance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <p className="text-gray-600 text-lg">
            <strong>Cultural Heritage:</strong> The legacy of Etsu Baba
            represents a rich tapestry of cultural traditions, customs, and
            values that have been preserved and passed down through generations.
            Our community has maintained its unique identity while adapting to
            changing times.
          </p>
          <p className="text-gray-600 text-lg">
            <strong>Community Impact:</strong> Throughout history, descendants
            of Etsu Baba have contributed significantly to their communities,
            both locally and globally. Their influence spans across various
            fields including education, politics, business, and cultural
            development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default History;
