/*
 * ATX Food Mood Guide
 *
 * This file implements the core React logic for the single page
 * application described in the project brief.  It uses React 18
 * (loaded globally via CDN), Tailwind CSS for styling and Framer
 * Motion for animations.  The application does not rely on a
 * complex build system; instead it runs directly in the browser.
 */

const { useState, useEffect } = React;
const { motion } = window["framerMotion"];

/*
 * A curated database of Austin restaurants.  See restaurants.json
 * for the original data.  Here we inline the JSON to avoid
 * cross‑origin issues when loading via the file protocol.
 */
const restaurants = [
  {
    name: "24 Diner",
    mood: ["comfort", "hungover"],
    cuisine: "Diner & Comfort Food",
    price: "$$",
    vibe: ["indoor", "casual"],
    description:
      "A modern take on the classic American diner serving breakfast all day.",
    neighborhood: "Downtown",
    instagrammable: true,
    weather_preference: "any",
    link: "https://goo.gl/maps/L9ANL7r3Q9F2",
  },
  {
    name: "Kerbey Lane Cafe",
    mood: ["comfort", "hungover"],
    cuisine: "American",
    price: "$",
    vibe: ["casual", "indoor"],
    description:
      "Local chain famous for its pancakes and queso served 24/7.",
    neighborhood: "Central Austin",
    instagrammable: false,
    weather_preference: "any",
    link: "https://goo.gl/maps/Ssjy2MqnoWR2",
  },
  {
    name: "Cisco's",
    mood: ["comfort", "hungover"],
    cuisine: "Tex‑Mex",
    price: "$",
    vibe: ["casual", "indoor"],
    description:
      "Historic East Austin joint serving Tex‑Mex breakfast plates and migas.",
    neighborhood: "East Austin",
    instagrammable: false,
    weather_preference: "any",
    link: "https://goo.gl/maps/VZ7t6KzKQbn",
  },
  {
    name: "Suerte",
    mood: ["adventurous", "celebratory"],
    cuisine: "Modern Mexican",
    price: "$$$",
    vibe: ["indoor", "trendy"],
    description:
      "Oaxacan‑inspired restaurant known for handmade masa and inventive cocktails.",
    neighborhood: "East Austin",
    instagrammable: true,
    weather_preference: "any",
    link: "https://goo.gl/maps/B6vxKzYHwP52",
  },
  {
    name: "Sour Duck Market",
    mood: ["adventurous", "casual"],
    cuisine: "Bakery & American",
    price: "$$",
    vibe: ["outdoor", "patio"],
    description:
      "Laid‑back eatery with a giant patio serving locally sourced food and craft beers.",
    neighborhood: "Central East Austin",
    instagrammable: true,
    weather_preference: "mild",
    link: "https://goo.gl/maps/8YYarfrHaM12",
  },
  {
    name: "La Barbecue",
    mood: ["adventurous", "celebratory"],
    cuisine: "BBQ",
    price: "$$",
    vibe: ["outdoor", "casual"],
    description:
      "Legendary pit‑smoked brisket, ribs and sausages served from a trailer with picnic tables.",
    neighborhood: "East Austin",
    instagrammable: true,
    weather_preference: "mild",
    link: "https://goo.gl/maps/so4qE7vdwzm",
  },
  {
    name: "Uchi",
    mood: ["romantic", "celebratory"],
    cuisine: "Japanese & Sushi",
    price: "$$$",
    vibe: ["indoor", "date night"],
    description:
      "James Beard award‑winning sushi house famous for refined plates and omakase.",
    neighborhood: "South Lamar",
    instagrammable: true,
    weather_preference: "any",
    link: "https://goo.gl/maps/HLqsoTGCLWv",
  },
  {
    name: "The Driskill Grill",
    mood: ["romantic", "celebratory"],
    cuisine: "Steakhouse",
    price: "$$$",
    vibe: ["indoor", "historic"],
    description:
      "Fine dining inside Austin's oldest hotel featuring elegant Texas cuisine.",
    neighborhood: "Downtown",
    instagrammable: true,
    weather_preference: "any",
    link: "https://goo.gl/maps/oxPXjNQkg5L2",
  },
  {
    name: "Jeffrey's",
    mood: ["romantic", "celebratory"],
    cuisine: "American & Steak",
    price: "$$$",
    vibe: ["indoor", "date night"],
    description:
      "Upscale Clarksville restaurant offering dry‑aged steaks and world‑class wines.",
    neighborhood: "Clarksville",
    instagrammable: true,
    weather_preference: "any",
    link: "https://goo.gl/maps/mvkr8B6HDHg",
  },
  {
    name: "The Continental Club",
    mood: ["livemusic", "nightlife"],
    cuisine: "Bar",
    price: "$",
    vibe: ["indoor", "music"],
    description:
      "Iconic South Congress club hosting nightly live music from rockabilly to blues.",
    neighborhood: "South Congress",
    instagrammable: true,
    weather_preference: "any",
    link: "https://goo.gl/maps/WB8H1S3r3jC2",
  },
  {
    name: "Antone's Nightclub",
    mood: ["livemusic", "nightlife"],
    cuisine: "Bar",
    price: "$",
    vibe: ["indoor", "music"],
    description:
      "Blues club founded by Clifford Antone; a staple of Austin's live music scene.",
    neighborhood: "Downtown",
    instagrammable: true,
    weather_preference: "any",
    link: "https://goo.gl/maps/3ZSkPXsHMwG2",
  },
  {
    name: "Saxon Pub",
    mood: ["livemusic", "nightlife"],
    cuisine: "Bar",
    price: "$",
    vibe: ["indoor", "intimate"],
    description:
      "Small listening room hosting singer‑songwriters and bands nightly.",
    neighborhood: "South Lamar",
    instagrammable: true,
    weather_preference: "any",
    link: "https://goo.gl/maps/E3D1Ns6CD7p",
  },
  {
    name: "Torchy's Tacos (Trailer)",
    mood: ["foodtruck", "casual"],
    cuisine: "Tacos",
    price: "$",
    vibe: ["outdoor", "casual"],
    description:
      "Austin‑born taco truck turned chain famous for creative fillings and queso.",
    neighborhood: "Various locations",
    instagrammable: true,
    weather_preference: "mild",
    link: "https://goo.gl/maps/z7bovHXXKjv",
  },
  {
    name: "Franklin Barbecue",
    mood: ["foodtruck", "adventurous"],
    cuisine: "BBQ",
    price: "$$",
    vibe: ["outdoor", "casual"],
    description:
      "World‑famous BBQ joint with long lines for melt‑in‑your‑mouth brisket.",
    neighborhood: "East Austin",
    instagrammable: true,
    weather_preference: "mild",
    link: "https://goo.gl/maps/BpwxNAxHhLB2",
  },
  {
    name: "Arlo's Food Truck",
    mood: ["foodtruck", "vegan"],
    cuisine: "Vegan Burgers",
    price: "$",
    vibe: ["outdoor", "casual"],
    description: "Late night truck serving plant‑based burgers and tacos.",
    neighborhood: "Downtown",
    instagrammable: true,
    weather_preference: "mild",
    link: "https://goo.gl/maps/yY7qvPkReiH2",
  },
];

/*
 * Mapping from qualitative weather conditions into suggestions for the
 * weather aware response.  This dataset is intentionally simple; in
 * production you would derive the key (hot/mild/rainy) from an API
 * such as OpenWeatherMap.  For demonstration we assume 'mild'.
 */
const WeatherMoodMatcher = {
  hot: "A/C spots, ice cream, cold beer gardens",
  mild: "Patios, food truck parks, outdoor dining",
  rainy: "Cozy indoor spots, comfort food, coffee shops",
};

function InstagramGate({ onVerify }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 fade">
      <div className="glass p-8 m-4 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--burnt-orange)' }}>
          Welcome to ATX Food Mood Guide
        </h1>
        <p className="mb-4 text-gray-100">
          Follow <span className="font-semibold">@mattheus2007</span> on Instagram for free access.
        </p>
        <button
          className="px-4 py-2 rounded text-white"
          style={{ backgroundColor: 'var(--deep-teal)' }}
          onClick={onVerify}
        >
          Verify Follow &amp; Enter
        </button>
      </div>
    </div>
  );
}

function WeatherWidget({ weather }) {
  return (
    <div className="flex items-center space-x-2 text-sm">
      <span role="img" aria-label="weather">☀️</span>
      <span>{`${weather.temp}°F`}</span>
      <span>{weather.description}</span>
    </div>
  );
}

function MoodSelector({ onSelect }) {
  const moods = [
    { key: 'comfort', label: 'Comfort', emoji: '🍳' },
    { key: 'adventurous', label: 'Adventurous', emoji: '🎉' },
    { key: 'romantic', label: 'Romantic', emoji: '💖' },
    { key: 'livemusic', label: 'Live Music', emoji: '🎸' },
    { key: 'foodtruck', label: 'Food Trucks', emoji: '🚚' },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-4">
      {moods.map((m) => (
        <motion.button
          key={m.key}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center p-4 rounded-lg shadow-lg cursor-pointer select-none"
          style={{ backgroundColor: 'var(--sage-green)', color: '#fff' }}
          onClick={() => onSelect(m.key)}
        >
          <span className="text-2xl mb-2">{m.emoji}</span>
          <span className="font-semibold text-sm">{m.label}</span>
        </motion.button>
      ))}
    </div>
  );
}

function PreferencesForm({ diet, setDiet, vibe, setVibe, onSubmit }) {
  return (
    <div className="mt-6 w-full max-w-md">
      <label className="block mb-2 text-sm font-medium text-gray-700">Dietary preferences (optional)</label>
      <input
        type="text"
        value={diet}
        onChange={(e) => setDiet(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="e.g. vegan, gluten‑free"
      />
      <label className="block mb-2 text-sm font-medium text-gray-700">Vibe preferences (optional)</label>
      <input
        type="text"
        value={vibe}
        onChange={(e) => setVibe(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="e.g. patio, rooftop, dog‑friendly"
      />
      <button
        className="w-full p-2 rounded text-white"
        style={{ backgroundColor: 'var(--burnt-orange)' }}
        onClick={onSubmit}
      >
        Get Recommendations
      </button>
    </div>
  );
}

function RecommendationCard({ restaurant }) {
  // Use the Austin skyline as a soft background on each card for now.
  const bgUrl = './assets/austin.jpg';
  return (
    <motion.div
      whileHover={{ translateY: -5 }}
      className="overflow-hidden rounded-xl shadow-lg"
      style={{ backgroundImage: `url(${bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="p-4" style={{ backdropFilter: 'brightness(0.6)' }}>
        <h3 className="text-xl font-bold text-white mb-1">{restaurant.name}</h3>
        <p className="text-sm text-white mb-1">{restaurant.cuisine} • {restaurant.price}</p>
        <p className="text-sm text-gray-200 mb-2">{restaurant.description}</p>
        <a
          href={restaurant.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-sm font-medium underline text-blue-200"
        >
          View on Google Maps
        </a>
      </div>
    </motion.div>
  );
}

function Recommendations({ results }) {
  return (
    <div className="mt-6 grid gap-4 w-full max-w-5xl md:grid-cols-3 sm:grid-cols-2">
      {results.map((r, idx) => (
        <RecommendationCard key={idx} restaurant={r} />
      ))}
    </div>
  );
}

function App() {
  const [verified, setVerified] = useState(false);
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState(null);
  const [diet, setDiet] = useState('');
  const [vibe, setVibe] = useState('');
  const [results, setResults] = useState([]);
  const [weather, setWeather] = useState({ temp: 75, description: 'Partly cloudy', mood: 'mild' });

  // In a real implementation we would query the OpenWeatherMap API using
  // an API key stored in an environment variable.  For the purposes of
  // this demo we default to Austin's typical mild weather.  You can
  // replace this function to fetch live data if you supply a valid key.
  useEffect(() => {
    if (!verified) return;
    // Example of how a fetch call could look:
    /*
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
          const temp = Math.round(data.main.temp);
          const description = data.weather[0].description;
          let moodKey = 'mild';
          if (temp > 90) moodKey = 'hot';
          else if (data.weather[0].main.toLowerCase().includes('rain')) moodKey = 'rainy';
          setWeather({ temp, description, mood: moodKey });
        });
    });
    */
  }, [verified]);

  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood);
    setStep(1);
  };
  const generateRecommendations = () => {
    // Filter restaurants by chosen mood
    let filtered = restaurants.filter((r) => r.mood.includes(mood));
    // Filter by vibe preference (if any)
    if (vibe.trim()) {
      const vibeLower = vibe.trim().toLowerCase();
      filtered = filtered.filter((r) => r.vibe.some((v) => v.toLowerCase().includes(vibeLower)));
    }
    // Filter by weather preference
    filtered = filtered.filter((r) => r.weather_preference === 'any' || r.weather_preference === weather.mood);
    // Randomize and pick up to 3
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const top3 = shuffled.slice(0, 3);
    setResults(top3);
    setStep(2);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center" style={{ backgroundImage: "url('./assets/austin.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {!verified && <InstagramGate onVerify={() => setVerified(true)} />}
      <div className="flex flex-col items-center w-full backdrop-blur-md bg-white bg-opacity-70 py-12 px-4 sm:px-8 md:px-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 text-center" style={{ color: 'var(--burnt-orange)' }}>
          ATX Food Mood Guide
        </h1>
        <p className="text-center text-gray-700 mb-4 max-w-2xl">
          Your personal Austin dining concierge. Combine your mood, vibe and Austin's ever‑changing weather to discover the perfect local eats. Keep Austin weird — and delicious!
        </p>
        <WeatherWidget weather={weather} />
        {verified && step === 0 && (
          <>
            <h2 className="mt-6 text-xl font-semibold" style={{ color: 'var(--deep-teal)' }}>
              What's your mood?
            </h2>
            <MoodSelector onSelect={handleMoodSelect} />
          </>
        )}
        {verified && step === 1 && (
          <PreferencesForm
            diet={diet}
            setDiet={setDiet}
            vibe={vibe}
            setVibe={setVibe}
            onSubmit={generateRecommendations}
          />
        )}
        {verified && step === 2 && (
          <>
            <h2 className="mt-6 text-xl font-semibold" style={{ color: 'var(--deep-teal)' }}>
              Here are your recommendations
            </h2>
            <p className="text-gray-600 mb-4">Weather vibe: {WeatherMoodMatcher[weather.mood]}</p>
            <Recommendations results={results} />
          </>
        )}
        <div className="mt-12 text-center text-sm text-gray-600">
          <p>
            Looking for the code? Check out our GitHub repository:
            <a
href="https://github.com/up24tv1/atx-food-mood-guide"
              className="text-blue-600 underline ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// Mount the React application
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
