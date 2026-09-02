export interface Tour {
	title: string;
	href: string;
	image: string;
	duration: string;
	price: string;
	oldPrice?: string;
	tag?: string;
}

export interface BlogPost {
	title: string;
	href: string;
	image: string;
	category: string;
	readingTime: string;
	excerpt?: string;
}

export const trustMarks = [
	{ title: 'Award-Winning', detail: 'Local Agency', icon: 'award' },
	{ title: '24/7 Support', detail: 'Always here for you', icon: 'support' },
	{ title: 'Best Price', detail: 'Guaranteed', icon: 'shield' },
	{ title: '+1,200', detail: 'Verified Reviews', icon: 'star' },
	{ title: '-20%', detail: '2026 Deals', icon: 'deal' },
];

export const whyChooseUs = [
	'Local agency based in Cusco — we operate directly, with no middlemen.',
	'More than 15 years organizing Machu Picchu tours and trekking adventures.',
	'Over 1,200 verified reviews with an average rating of 4.9 out of 5.',
	'Certified bilingual guides with deep knowledge of Inca history and culture.',
	'24/7 support during your trip and a flexible cancellation policy.',
	'Fully customizable tours, tailored to your schedule, budget and interests.',
];

export const machuPicchuTours: Tour[] = [
	{
		title: '3 day llama trek to Machu Picchu with a picnic',
		href: '/tours/llama-picnic-and-machu-picchu-tour-3d-2n',
		image: 'https://api.machupicchutour.com/wp-content/uploads/2026/04/picnic-con-llamas.webp',
		duration: '3 days / 2 nights',
		price: '$700',
		tag: 'New experience',
	},
	{
		title: '2 day Sacred Valley & Machu Picchu tour',
		href: '/tours/sacred-valley-cusco-and-machu-picchu-with-waterfalls-2d-1n',
		image: 'https://api.machupicchutour.com/wp-content/uploads/2026/03/visita-guiada-en-machu-picchu-por-mpt.webp',
		duration: '2 days / 1 night',
		price: '$550',
		tag: 'Most booked',
	},
	{
		title: '3 day short Inca Trail & Sacred Valley',
		href: '/tours/sacred-valley-and-short-inca-trail-to-machu-picchu-3d-2n',
		image: 'https://api.machupicchutour.com/wp-content/uploads/2026/04/moray-laboratorio-agricola-inca-mpt.webp',
		duration: '3 days / 2 nights',
		price: '$648',
		tag: 'Limited permits',
	},
	{
		title: '3 day Sacred Valley & Machu Picchu via Ollantaytambo',
		href: '/tours/sacred-valley-connection-machu-picchu-3d-2n',
		image: 'https://api.machupicchutour.com/wp-content/uploads/2026/03/visita-guiada-en-machu-picchu-mpt.webp',
		duration: '3 days / 2 nights',
		price: '$620',
	},
	{
		title: '2 day Machu Picchu & Sacred Valley tour from Cusco',
		href: '/tours/machu-picchu-and-sacred-valley-tour-2d-1n-from-cusco',
		image: 'https://api.machupicchutour.com/wp-content/uploads/2025/10/eed7834a-7d63-4866-b0c9-805c4497d5f6.webp',
		duration: '2 days / 1 night',
		price: '$520',
	},
	{
		title: '2 day Sacred Valley & Machu Picchu from Ollantaytambo',
		href: '/tours/machu-picchu-sacred-valley-from-ollantaytambo-2d-1n',
		image: 'https://api.machupicchutour.com/wp-content/uploads/2025/10/88.webp',
		duration: '2 days / 1 night',
		price: '$450',
	},
	{
		title: '2 day Huchuy Qosqo trek to Machu Picchu',
		href: '/tours/tour-huchuy-qosqo-y-machu-picchu-2d-1n-desde-cusco',
		image: 'https://api.machupicchutour.com/wp-content/uploads/2026/04/HUCHUY-QOSQO-6.webp',
		duration: '2 days / 1 night',
		price: '$450',
		tag: 'Trekking',
	},
	{
		title: 'Machu Picchu by car from Cusco',
		href: '/tours/cusco-to-machu-picchu-by-car',
		image: 'https://api.machupicchutour.com/wp-content/uploads/2025/10/image-26.webp',
		duration: '2 days / 1 night',
		price: '$145',
		tag: 'Best value',
	},
];

export const travelPackages: Tour[] = [
	{
		title: 'Machu Picchu Tours from Lima — 8 days',
		href: '/tours/machu-picchu-tours-from-lima-8d-7n',
		image: 'https://api.machupicchutour.com/wp-content/uploads/2026/04/machu-picchu-visitar-las-cronicas-de-piedra-mpt-1.webp',
		duration: '8 days / 7 nights',
		oldPrice: '$999',
		price: '$871',
		tag: '2026 deal',
	},
	{
		title: 'Lima and Peru travel package — 10 days',
		href: '/tours/lima-peru-travel-packages-10d-9n',
		image: 'https://api.machupicchutour.com/wp-content/uploads/2026/04/huacachina-lobos-marinos-mpt-1.webp',
		duration: '10 days / 9 nights',
		oldPrice: '$1,100',
		price: '$970',
		tag: '2026 deal',
	},
	{
		title: 'Lima and Peru grand tour — 11 days',
		href: '/tours/lima-peru-tours-packages-11d-10n',
		image: 'https://api.machupicchutour.com/wp-content/uploads/2026/03/puno-uros-mt.webp',
		duration: '11 days / 10 nights',
		oldPrice: '$1,200',
		price: '$1,020',
		tag: '2026 deal',
	},
	{
		title: 'Complete Peru travel package — 13 days',
		href: '/tours/machu-picchu-tours-peru-travel-packages-13d-12n',
		image: 'https://api.machupicchutour.com/wp-content/uploads/2026/03/visita-guiada-en-machu-picchu-por-mpt.webp',
		duration: '13 days / 12 nights',
		oldPrice: '$1,999',
		price: '$1,852',
		tag: 'Grand tour',
	},
	{
		title: 'Machu Picchu and Rainbow Mountain from Cusco',
		href: '/tours/machu-picchu-and-rainbow-mountain-tour-5d-4n',
		image: 'https://api.machupicchutour.com/wp-content/uploads/2025/10/montana-de-colores-con-las-alpacas-mpt.webp',
		duration: '5 days / 4 nights',
		oldPrice: '$650',
		price: '$565',
		tag: 'Popular',
	},
	{
		title: 'Cusco to Puno via the Route of the Sun',
		href: '/tours/cusco-to-puno-sun-route-tour-ruta-del-sol',
		image: 'https://api.machupicchutour.com/wp-content/uploads/2026/03/raqchi_sicuani.webp',
		duration: 'Full day',
		price: '$80',
	},
	{
		title: 'Machu Picchu and Lake Titicaca from Cusco',
		href: '/tours/machu-picchu-and-lake-titicaca-tour-7d-6n-from-cusco',
		image: 'https://api.machupicchutour.com/wp-content/uploads/2026/03/santuario-historico-de-machu-picchu-webp.webp',
		duration: '7 days / 6 nights',
		oldPrice: '$999',
		price: '$850',
		tag: 'Peru classic',
	},
	{
		title: 'Paracas and Huacachina tour',
		href: '/tours/paracas-and-huacachina-tour-2d-1n-paracas-national-reserve',
		image: 'https://api.machupicchutour.com/wp-content/uploads/2025/10/islas-ballestas-desde-arriba-mpt.webp',
		duration: '2 days / 1 night',
		price: '$430',
	},
];

export const destinations = [
	{ title: 'Machu Picchu', href: '/machu-picchu-tours', image: 'https://api.machupicchutour.com/wp-content/uploads/2026/03/santuario-historico-de-machu-picchu-webp-1.webp', note: 'The wonder of the Andes' },
	{ title: 'Tours in Cusco', href: '/tours-in-cusco', image: 'https://api.machupicchutour.com/wp-content/uploads/2025/10/citytour1-scaled-1.webp', note: 'History, culture and living traditions' },
	{ title: 'Travel packages', href: '/peru-travel-packages', image: 'https://api.machupicchutour.com/wp-content/uploads/2026/04/huacachina-lobos-marinos-mpt-1.webp', note: 'Seamless journeys across Peru' },
	{ title: 'Inca Trail', href: '/inca-trail', image: 'https://api.machupicchutour.com/wp-content/uploads/2026/03/Inca-Trail.webp', note: 'Walk the legendary path' },
];

export const blogPosts: BlogPost[] = [
	{
		title: '10 extreme sports in Peru',
		href: '/extreme-sports-in-peru',
		image: 'https://api.machupicchutour.com/wp-content/uploads/2026/07/extreme-sports-in-Peru.webp',
		category: 'Adventure',
		readingTime: '11 min read',
	},
	{
		title: '10 Peruvian dishes every traveler should try',
		href: '/peruvian-dishes',
		image: 'https://api.machupicchutour.com/wp-content/uploads/2026/06/Peruvian-dishes-every-traveler-should-try.webp',
		category: 'Peruvian culture',
		readingTime: '13 min read',
	},
	{
		title: '10 activities in Cusco for an unforgettable Peru adventure',
		href: '/activities-in-cusco',
		image: 'https://api.machupicchutour.com/wp-content/uploads/2026/06/what-to-do-in-cusco-scaled.webp',
		category: 'Travel inspiration',
		readingTime: '10 min read',
	},
];

export const inclusions = [
	'Machu Picchu entrance tickets (official government-issued permits).',
	'Round-trip train tickets (Expedition, Vistadome or Hiram Bingham class).',
	'Certified bilingual guide in Spanish and English.',
	'Hotel accommodation in Aguas Calientes or Cusco.',
	'Breakfast and selected meals as specified in each itinerary.',
	'Private or small-group transport from and to your hotel.',
	'24/7 on-trip support from our local team.',
];

export const faqs = [
	{
		question: 'How far in advance should I book a Machu Picchu tour?',
		answer: 'We recommend booking at least 2 to 4 months in advance, especially during high season from May to September. Entrance permits and train tickets sell out quickly. For trekking routes such as the Inca Trail, book 5 to 6 months ahead because permits are limited by the Peruvian government.',
	},
	{
		question: 'Is altitude sickness a concern on Machu Picchu tours?',
		answer: 'Cusco sits at approximately 3,400 meters (11,150 feet). We recommend spending 1 to 2 days in Cusco before your tour, staying hydrated, avoiding heavy meals, trying coca tea and walking slowly on your first day. Our guides are trained to support travelers experiencing altitude discomfort.',
	},
	{
		question: 'Are Machu Picchu tours safe?',
		answer: 'Yes. We are a legally registered Peruvian tour operator with DIRCETUR and GERCETUR credentials. Our guides hold official MINCETUR certification, we use licensed vehicles and comply with official safety regulations for trekking and adventure activities in Cusco.',
	},
	{
		question: 'Can I get a private Machu Picchu tour?',
		answer: 'Absolutely. We specialize in private tours for couples, families and small groups. A private journey gives you a licensed guide, flexible timing and pace, carefully timed entry windows and options such as Vistadome or Hiram Bingham train service.',
	},
	{
		question: 'What should I wear and bring on a Machu Picchu tour?',
		answer: 'Bring comfortable layered clothing, sturdy walking shoes, a light rain jacket, sunscreen, insect repellent, a refillable water bottle and your original passport, which is required for entry. Trekking guests are limited to 5.5 kg (12 lb) of personal items under porter regulations.',
	},
	{
		question: 'What is the best time to visit Machu Picchu?',
		answer: 'May to September is the dry season, with clearer skies and higher demand. October to April brings fewer visitors, lush green landscapes and more rain, especially from December to February. We operate year-round and can help you choose the best dates for your preferences.',
	},
];

export const travelGuide = [
	{
		title: 'Best time to visit',
		accent: 'emerald',
		items: [
			'May–September: dry season and clear views',
			'June–August: high season; book months ahead',
			'November–April: fewer travelers and misty landscapes',
			'Inti Raymi in June: an unmissable Inca festival in Cusco',
			'Machu Picchu is spectacular all year round',
		],
	},
	{
		title: 'Altitude and health tips',
		accent: 'red',
		items: [
			'Cusco: 3,400 m — acclimatize for 1–2 days',
			'Machu Picchu: 2,430 m — lower than Cusco',
			'Try coca tea in Cusco and Aguas Calientes',
			'Stay well hydrated throughout the tour',
			'Avoid alcohol for the first 48 hours at altitude',
		],
	},
	{
		title: 'What to bring',
		accent: 'cyan',
		items: [
			'Layered clothing for changing temperatures',
			'Light rain jacket, especially November–April',
			'SPF 50+ sunscreen and sunglasses',
			'Comfortable, non-slip trekking shoes',
			'Original passport — mandatory at the entrance',
		],
	},
];

export const reviewPlatforms = ['Google', 'TripAdvisor', 'Facebook', 'Trustpilot'];

export const reviews = [
	{ author: 'Andrey S.', date: 'October 14, 2025', text: 'Punctuality, a very attentive guide and perfect organization—from the hotel pickup and train journey to lunch and the guided visits.' },
	{ author: 'Patricia N.', date: 'A year ago', text: 'The full-day Sacred Valley tour was an amazing highlight of our trip. Our driver kept us safe and ahead of the crowds, and Erik was an incredibly passionate storyteller.' },
	{ author: 'Maria R.', date: 'October 12, 2025', text: 'A very enriching experience with so much history. Even though it rained, our guide was attentive and professional throughout the tour.' },
	{ author: 'Daniel K.', date: '2 years ago', text: 'Our Rainbow Mountain tour was well organized, the guide took great care of us, and both breakfast and lunch were excellent. We totally recommend them.' },
	{ author: 'Cesar G.', date: '8 months ago', text: 'Their service is incredible. Everything was arranged so we could fully enjoy the experience: transportation, lodging, food and tourist attractions.' },
	{ author: 'Salvador M.', date: 'September 19, 2025', text: 'The service, attention and quality of our Sacred Valley guide were first class, with extensive knowledge of Inca culture and excellent explanations.' },
	{ author: 'Patty N.', date: '10 months ago', text: 'A wonderful experience. Our guide answered every question and supported us unconditionally. The guides and drivers made the trip unforgettable.' },
	{ author: 'Sarah E.', date: 'October 12, 2025', text: 'They were exceptional. Everything was organized down to the details; we booked tours, lodging and transfers and do not regret it.' },
	{ author: 'Ara S.', date: '3 years ago', text: 'The quality and friendliness of the staff were impressive. They responded quickly and offered great options without breaking our budget.' },
	{ author: 'Kevin D.', date: '2 years ago', text: 'Carolina made coordinating our group trip easy. Alex and Edmar were excellent, knowledgeable and friendly guides in the Sacred Valley and Machu Picchu.' },
	{ author: 'Enrique G.', date: '10 months ago', text: 'The agency made everything easy in Cusco. Every guide was kind, professional and knew how to explain the history of each place.' },
	{ author: 'Agustin G.', date: 'A year ago', text: 'Our Sacred Valley excursion was excellent. Veronica stayed with us throughout and made the experience as informative as possible.' },
];

export const certifications = [
	{ name: 'TripAdvisor', image: '/partners/tripadvisor.webp', type: 'Traveler reviews' },
	{ name: 'Viator', image: '/partners/viator.webp', type: 'Travel marketplace' },
	{ name: 'GetYourGuide', image: '/partners/getyourguide.webp', type: 'Travel marketplace' },
	{ name: 'WeTravel', image: '/partners/wetravel.webp', type: 'Secure payments' },
	{ name: 'DIRCETUR', image: '/partners/dircetur.webp', type: 'Regional registration' },
	{ name: 'GERCETUR', image: '/partners/gercetur.webp', type: 'Tourism certification' },
	{ name: 'Authorized operator', image: '/partners/operadorautorizado.webp', type: 'Official operator' },
	{ name: 'Claimbook', image: '/partners/claimbook.webp', type: 'Consumer protection' },
];
