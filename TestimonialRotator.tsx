const TestimonialRotator = () => {
    const testimonials = [
        "“The decks are a work of art!”",
        "“Professional, precise, prompt—clean and accurate.”",
        "“Deck Masters made it easy—beautiful deck, great people.”",
        "“Couldn’t recommend them enough. Smooth operation.”"
    ];

    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % testimonials.length);
                setFade(true);
            }, 500); // Wait for fade out
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-start gap-4 mb-6 h-20">
            <Quote className="w-8 h-8 text-orange-600 flex-shrink-0 opacity-50 mt-1" />
            <p
                className={`text-2xl md:text-3xl text-stone-200 font-light italic leading-tight transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
            >
                {testimonials[index]}
            </p>
        </div>
    );
};
