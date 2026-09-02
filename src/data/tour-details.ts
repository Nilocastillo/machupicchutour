export interface TourGalleryImage {
	src: string;
	alt: string;
	caption: string;
	width: number;
	height: number;
}

export type TourFactIconName = "duration" | "service" | "pickup" | "cancellation" | "guide" | "difficulty";

export interface TourFact {
	label: string;
	value: string;
	icon: TourFactIconName;
	difficultyLevel?: "easy" | "moderate" | "difficult";
}

export interface TourDay {
	day: number;
	title: string;
	paragraphs: string[];
	stats: Array<{ label: string; value: string }>;
}

export interface TourPolicySection {
	title: string;
	paragraph?: string;
	items?: string[];
}

export interface TourFaqItem {
	question: string;
	answer: string;
}

export interface TourTravelerPrice {
	key: string;
	label: string;
	note: string;
	price: number;
	initial: number;
	min: number;
	max: number;
}

export interface TourHotelOption {
	value: string;
	label: string;
	supplement: number;
}

export interface TourBookingPricing {
	service: string;
	depositRate: number;
	travelers: TourTravelerPrice[];
	hotels: TourHotelOption[];
}

export interface DetailedTour {
	slug: string;
	title: string;
	shortTitle: string;
	metaTitle: string;
	metaDescription: string;
	price: string;
	currency: string;
	booking: TourBookingPricing;
	gallery: TourGalleryImage[];
	facts: TourFact[];
	about: string[];
	itinerary: TourDay[];
	included: string[];
	excluded: string[];
	recommendations: string[];
	policyIntroduction: string;
	policies: TourPolicySection[];
	faqs: TourFaqItem[];
}

export const tourDetails: DetailedTour[] = [
	{
		slug: "llama-picnic-and-machu-picchu-tour-3d-2n",
		title: "3 Day Llama Trek to Machu Picchu with a Picnic",
		shortTitle: "Llama Picnic & Machu Picchu — 3 Days",
		metaTitle: "3 Day Llama Picnic & Machu Picchu Tour | Peru",
		metaDescription:
			"Enjoy a 3-day llama picnic and Machu Picchu tour with Sacred Valley scenery, train travel, hotels and guided visits organized from Cusco.",
		price: "700",
		currency: "USD",
		booking: {
			service: "Group",
			depositRate: 0.5,
			travelers: [
				{ key: "adults", label: "Adults", note: "Minimum 1", price: 700, initial: 1, min: 1, max: 12 },
				{ key: "students", label: "Students", note: "Student ID", price: 680, initial: 0, min: 0, max: 12 },
				{ key: "children", label: "Children", note: "2 to 12 years", price: 680, initial: 0, min: 0, max: 12 },
			],
			hotels: [
				{ value: "no-hotel", label: "No hotel", supplement: 0 },
				{ value: "2-stars", label: "2 Stars", supplement: 228 },
				{ value: "3-stars", label: "3 Stars", supplement: 315 },
				{ value: "4-stars", label: "4 Stars", supplement: 724 },
				{ value: "5-stars", label: "5 Stars", supplement: 2037 },
			],
		},
		gallery: [
			{
				src: "/tours/llama-picnic/llama-picnic.webp",
				alt: "Travelers sharing an Andean picnic with a llama in the Sacred Valley",
				caption: "Llama picnic in the Sacred Valley",
				width: 1365,
				height: 768,
			},
			{
				src: "/tours/llama-picnic/machu-picchu.webp",
				alt: "Travelers on a guided visit overlooking the Machu Picchu citadel",
				caption: "Guided visit to Machu Picchu",
				width: 1500,
				height: 800,
			},
			{
				src: "/tours/llama-picnic/ollantaytambo.webp",
				alt: "Inca terraces and archaeological remains at Ollantaytambo",
				caption: "Ollantaytambo in the Sacred Valley",
				width: 1500,
				height: 800,
			},
			{
				src: "/tours/llama-picnic/andean-llamas.webp",
				alt: "Travelers standing with decorated llamas in the Sacred Valley",
				caption: "An authentic encounter with Andean llamas",
				width: 1500,
				height: 800,
			},
		],
		facts: [
			{ label: "Duration", value: "3 days / 2 nights", icon: "duration" },
			{ label: "Service", value: "Group", icon: "service" },
			{ label: "Pickup", value: "Hotel", icon: "pickup" },
			{ label: "Cancellation", value: "Non-refundable", icon: "cancellation" },
			{ label: "Guide", value: "English · Spanish · Portuguese", icon: "guide" },
			{ label: "Difficulty", value: "Easy", icon: "difficulty", difficultyLevel: "easy" },
		],
		about: [
			"The Llama Picnic and Machu Picchu Tour 3D/2N offers a unique Peru travel experience combining nature, culture, and Andean spirituality. This Sacred Valley tour begins with an authentic llama picnic, where you interact with these iconic Andean animals while enjoying breathtaking mountain landscapes.",
			"From this immersive cultural experience, the journey continues to Machu Picchu, one of the most iconic destinations in South America and a UNESCO World Heritage Site. The Machu Picchu guided tour reveals the history, architecture, and spiritual significance of this ancient Inca citadel.",
			"This Machu Picchu tour package also includes visits to hidden gems such as Pinkuylluna and Ñaupa Iglesia, offering a deeper connection with Inca history and sacred Andean sites. It is the perfect combination of adventure travel, cultural immersion, and scenic exploration in Cusco, Peru.",
		],
		itinerary: [
			{
				day: 1,
				title: "Llama Picnic Experience & Journey to Aguas Calientes",
				paragraphs: [
					"The tour starts with pickup from your hotel in Cusco and transfer to the Sacred Valley for a llama picnic experience. This cultural activity allows you to interact with llamas in a peaceful natural setting while enjoying local products and Andean landscapes.",
					"After the picnic, continue to Ollantaytambo to board the tourist train to Aguas Calientes. Upon arrival, transfer to your hotel and rest for the next day.",
				],
				stats: [
					{ label: "Maximum altitude", value: "2,800 m · Sacred Valley" },
					{ label: "Overnight altitude", value: "2,040 m · Aguas Calientes" },
					{ label: "Transfer time", value: "5–6 hours" },
					{ label: "Experience", value: "Cultural, scenic and immersive" },
					{ label: "Overnight", value: "Hotel in Aguas Calientes" },
				],
			},
			{
				day: 2,
				title: "Machu Picchu Guided Tour & Return to Ollantaytambo",
				paragraphs: [
					"Early in the morning, ascend to Machu Picchu, one of the New Seven Wonders of the World. During the guided tour, explore its main sectors, including ceremonial areas, agricultural terraces, and urban zones, while learning about its history and symbolism.",
					"After the visit, return to Aguas Calientes and take the train back to Ollantaytambo. Upon arrival, transfer to your hotel and overnight stay in this living Inca town.",
				],
				stats: [
					{ label: "Altitude", value: "2,430 m · Machu Picchu" },
					{ label: "Guided tour", value: "2.5–3 hours" },
					{ label: "Transfer time", value: "6–7 hours" },
					{ label: "Walking level", value: "Moderate" },
					{ label: "Overnight", value: "Ollantaytambo · 2,792 m" },
				],
			},
			{
				day: 3,
				title: "Pinkuylluna, Ñaupa Iglesia & Return to Cusco",
				paragraphs: [
					"The final day begins with a visit to Pinkuylluna, an ancient Inca storage site located on the mountainside opposite Ollantaytambo, offering panoramic views of the Sacred Valley.",
					"Then, continue to Ñaupa Iglesia, one of the most mystical Inca ceremonial sites, built inside a natural cave and used for spiritual rituals connected to mountain energy.",
					"After exploring these sacred sites, return to Cusco, completing a unique journey filled with culture, archaeology, and Andean spirituality.",
				],
				stats: [
					{ label: "Maximum altitude", value: "3,050 m · Pinkuylluna" },
					{ label: "Hiking time", value: "1–1.5 hours" },
					{ label: "Total duration", value: "5–6 hours" },
					{ label: "Experience", value: "Archaeological, spiritual and scenic" },
					{ label: "End of tour", value: "Cusco · 3,399 m" },
				],
			},
		],
		included: [
			"Pickup from your hotel in Cusco's central area",
			"Tourist transportation throughout the tour",
			"Professional guide in Spanish, English or Portuguese",
			"Llama picnic experience in the Sacred Valley",
			"Round-trip tourist train — Expedition or Voyager",
			"Round-trip bus between Aguas Calientes and Machu Picchu",
			"Entrance ticket to Machu Picchu, subject to availability",
			"Shared guided tour in Machu Picchu",
			"One night hotel in Aguas Calientes",
			"One night hotel in Ollantaytambo",
		],
		excluded: [
			"Meals not specified in the program",
			"Additional drinks during the picnic",
			"Entrance to Huayna Picchu or Machu Picchu Mountain",
			"Personal expenses",
			"Tips for the guide and driver",
			"Travel insurance",
			"Services not mentioned in the included list",
		],
		recommendations: [
			"Original passport or ID",
			"Comfortable, warm layers",
			"Waterproof jacket or rain poncho",
			"Trekking shoes with good grip",
			"Sunscreen, sunglasses and a hat",
			"Small backpack permitted at Machu Picchu",
			"Reusable water bottle",
			"Cash in Peruvian soles for personal expenses",
			"Camera or phone with a charged battery",
			"Personal medication if needed",
		],
		policyIntroduction:
			"All cancellations must be requested in writing by email or through your sales advisor. The date the request is received will be considered the official cancellation date.",
		policies: [
			{
				title: "Cancellations",
				items: [
					"Up to 5 business days before the tour: 50% penalty plus a 6% payment processing fee. If only a 50% deposit was made, that amount is non-refundable.",
					"Less than 5 business days before the tour: 100% penalty.",
					"No show: 100% penalty.",
				],
			},
			{
				title: "Important conditions",
				items: [
					"Machu Picchu entrance tickets, train tickets, and bus tickets are personal, non-transferable, and non-refundable.",
					"Promotional rates and special offers are non-refundable.",
				],
			},
			{
				title: "Exceptional situations",
				paragraph:
					"In case of strikes, natural disasters, or health emergencies, rescheduling options will be offered subject to availability. If the service cannot operate, a 25% administrative fee will apply.",
			},
			{
				title: "Refunds",
				paragraph:
					"Refunds are processed within 7 to 45 business days, depending on the payment method.",
			},
		],
		faqs: [
			{
				question: "Is this tour suitable for all ages?",
				answer:
					"Yes. The tour is suitable for children, adults, and seniors, with a moderate and flexible pace. Activities balance walking, transport, and rest, making the experience accessible to most travelers in good health.",
			},
			{
				question: "Is the llama picnic private or shared?",
				answer:
					"The llama picnic may be shared or private depending on availability and prior request. A private experience offers a more personalized setting for couples or small groups.",
			},
			{
				question: "Is the Machu Picchu entrance included?",
				answer:
					"Yes. The official Machu Picchu entrance ticket is included. Availability depends on booking time, so early reservation is recommended to secure preferred circuits.",
			},
			{
				question: "What type of train is used?",
				answer:
					"Tourist trains such as Expedition or Voyager are included, with comfortable seating and scenic views along the Sacred Valley and Urubamba River. Upgrades may be available upon request.",
			},
			{
				question: "Where do you stay overnight?",
				answer:
					"The tour includes one night in Aguas Calientes and one night in Ollantaytambo, in carefully selected hotels based on your chosen category.",
			},
			{
				question: "Is a Portuguese guide available?",
				answer:
					"Yes. Professional guides are available in Spanish, English, and Portuguese with prior coordination.",
			},
			{
				question: "Can I hike Huayna Picchu or Machu Picchu Mountain?",
				answer:
					"Yes. These hikes are available as optional add-ons and require advance booking because permits are limited and subject to availability.",
			},
			{
				question: "Do I need good physical condition?",
				answer:
					"No advanced fitness level is required. The tour involves light to moderate walking, manageable for travelers with a basic level of physical condition.",
			},
			{
				question: "What is the best time to travel?",
				answer:
					"The tour operates year-round. April to October is the dry season with clearer skies, while November to March offers greener landscapes, occasional rain, and fewer crowds.",
			},
		],
	},
];
