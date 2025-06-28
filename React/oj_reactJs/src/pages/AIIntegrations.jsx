import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useRef } from "react";

const aiFeatures = [
  {
    title: "Smart Code Suggestions",
    desc: "AI analyzes your code and suggests improvements in real-time.",
    icon: "✨",
  },
  {
    title: "Automated Test Case Generation",
    desc: "Generate edge cases and tests automatically with AI insights.",
    icon: "🧪",
  },
  {
    title: "Hints Generation",
    desc: "Get AI-generated hints for faster problem-solving.",
    icon: "💡",
  },
  {
    title: "Code Explanation",
    desc: "Understand what your code is doing with instant AI explanations.",
    icon: "📖",
  },
];

export default function AIIntegrations() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-gray-900 py-10 px-4 text-white">
      <h2 className="text-3xl font-bold text-center mb-6">AI Integrations That Empower You</h2>

      <div className="relative">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 p-2 rounded-full z-10 hover:bg-gray-700"
          onClick={() => scroll("left")}
        >
          <FaArrowLeft />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-10 scroll-smooth"
        >
          {aiFeatures.map((feature, index) => (
            <div
              key={index}
              className="min-w-[300px] flex-shrink-0 bg-gray-800 p-6 rounded-lg shadow hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>

        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 p-2 rounded-full z-10 hover:bg-gray-700"
          onClick={() => scroll("right")}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
