import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Assuming these are available
import { RevealOnScroll } from "./RevealOnScroll"; // Assuming RevealOnScroll is in components
import StartRating from "./UI/StartRating"; // Assuming StartRating is in components

const reviewsData = [
    {
        id: 1,
        name: "Sarah M.",
        address: "New York, USA",
        image: "/images/avatar.png", // Placeholder image
        review:
            "This service has been a game-changer for my daily motivation. The personalized texts are always spot-on, and the gentle follow-ups truly help me stay consistent. Highly recommend for anyone needing that extra push!",
        rating: 5,
    },
    {
        id: 2,
        name: "David L.",
        address: "London, UK",
        image: "/images/avatar.png", // Placeholder image
        review:
            "I love getting my daily prompts! It's like having a personal coach in my pocket. The fact that they check in if I don't reply shows they genuinely care about my progress. Fantastic support!",
        rating: 5,
    },
    {
        id: 3,
        name: "Aisha K.",
        address: "Dubai, UAE",
        image: "/images/avatar.png", // Placeholder image
        review:
            "Initially, I was skeptical, but this service truly delivers. The texts are thoughtful and relevant, and the follow-up system is brilliant. It keeps me accountable without being intrusive. My productivity has definitely improved.",
        rating: 4,
    },
    {
        id: 4,
        name: "Mark T.",
        address: "Sydney, Australia",
        image: "/images/avatar.png", // Placeholder image
        review:
            "Simple, effective, and exactly what I needed. The daily reminders are a great way to kickstart my day, and knowing they'll follow up if I forget keeps me engaged. Excellent value!",
        rating: 4,
    },
    {
        id: 5,
        name: "Olivia P.",
        address: "Toronto, Canada",
        image: "/images/avatar.png", // Placeholder image
        review:
            "I've tried many productivity apps, but this one stands out because of the personal touch. The daily texts feel like they're written just for me, and the follow-up ensures I never lose momentum. So glad I subscribed!",
        rating: 5,
    },
];

export function ReviewsSection() {
    const containerRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    // Function to check scroll position and update arrow visibility
    const checkScroll = () => {
        const container = containerRef.current;
        if (container) {
            setShowLeftArrow(container.scrollLeft > 0);
            // Check if there's more content to scroll to the right
            setShowRightArrow(
                container.scrollWidth > container.clientWidth &&
                container.scrollLeft < container.scrollWidth - container.clientWidth - 1
            );
        }
    };

    // Effect to set up scroll and resize listeners
    useEffect(() => {
        checkScroll(); // Initial check on component mount
        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", checkScroll);
            window.addEventListener("resize", checkScroll);
        }
        // Cleanup function to remove event listeners
        return () => {
            if (container) {
                container.removeEventListener("scroll", checkScroll);
            }
            window.removeEventListener("resize", checkScroll);
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

    // Function to scroll the container by one card width
    const scrollByCard = (direction) => {
        const container = containerRef.current;
        if (!container) return;

        // Get the width of the first card, or use a default if not found
        const firstCard = container.querySelector(".review-card");
        // 24px for gap-6 (tailwind default)
        const cardWidth = firstCard ? firstCard.clientWidth + 24 : 300;
        const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    return (
        <section className="py-20 bg-[#f4f7f7] shadow-inner"> {/* Subtle inner shadow for depth */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-10">
                    <RevealOnScroll>
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            Hear From Our <span className="text-secondary">Happy Subscribers</span>
                        </h2>
                    </RevealOnScroll>
                    <RevealOnScroll>
                        <div className="w-24 h-1 bg-secondary mx-auto mb-4 rounded-full" /> {/* Light blue accent line */}
                    </RevealOnScroll>
                    <RevealOnScroll>
                        <p className="text-lg text-gray-600 max-w-xl mx-auto">
                            Discover how our daily texting and follow-up service is helping people stay motivated and connected.
                        </p>
                    </RevealOnScroll>
                </div>

                <div className="relative">
                    {/* Card Scroll Container */}
                    <div
                        ref={containerRef}
                        className="flex overflow-x-auto 
                        [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-track]:bg-white-100
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-white-300
                        dark:[&::-webkit-scrollbar-track]:bg-white-700
                        dark:[&::-webkit-scrollbar-thumb]:bg-white-500
                        no-scrollbar scroll-snap-type-x mandatory gap-6 bg-white/50 py-4 px-4 scroll-smooth rounded-xl" // Added rounded-xl for consistency
                        onScroll={checkScroll} // Ensure scroll check is active
                        >
                        {reviewsData.map((review) => (
                            <RevealOnScroll key={review.id}> {/* Key prop moved to RevealOnScroll */}
                                <div
                                    className="flex-shrink-0 w-72 snap-start rounded-xl overflow-hidden shadow-xl bg-white 
                             transform transition duration-300 hover:scale-105 hover:shadow-2xl group
                             border border-gray-100" // Added a subtle border
                                >
                                    <div className="p-6"> {/* Increased padding slightly */}
                                        <div className="flex items-center gap-4 mb-4"> {/* Increased gap and added margin-bottom */}
                                            <img
                                                className="w-14 h-14 rounded-full object-cover" // Blue border for avatar
                                                src={review.image}
                                                alt={review.name}
                                            />
                                            <div>
                                                <p className="text-xl font-semibold text-gray-800">{review.name}</p> {/* Darker name text */}
                                                <p className="text-sm text-gray-500">{review.address}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 mb-4"> {/* Added margin-bottom */}
                                            <StartRating rating={review.rating} />
                                        </div>

                                        <p className="text-gray-700 text-base leading-relaxed line-clamp-4"> {/* Adjusted text color and line height */}
                                            "{review.review}"
                                        </p>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    {showLeftArrow && (
                        <button
                            onClick={() => scrollByCard("left")}
                            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg border border-gray-200 z-10 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-300" // Light blue hover
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>
                    )}
                    {showRightArrow && (
                        <button
                            onClick={() => scrollByCard("right")}
                            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg border border-gray-200 z-10 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-300" // Light blue hover
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-700" />
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}

export default ReviewsSection;
