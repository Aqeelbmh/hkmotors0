import { useState, useEffect, createContext, useContext } from "react";

type Language = "EN" | "සිං" | "தமிழ்";

const STORAGE_KEY = "hk-motors-lang";

const translations: Record<Language, Record<string, string>> = {
    EN: {
        garage_title: "My Garage",
        garage_empty: "No vehicle saved",
        search_placeholder: "Quick Search...",
        nav_home: "Home",
        nav_vehicles: "Vehicles",
        nav_inventory: "Inventory",
        nav_about: "Our Story",
        nav_support: "Support",
        hero_title: "Genuine Performance for Every Journey",
        hero_subtitle: "Sri Lanka's trusted hub for Tata, Mahindra, Maruti, and Nissan spare parts.",
        hero_cta_primary: "Explore Inventory",
        hero_cta_secondary: "Get a Quote",
        trust_title: "The Gold Standard",
        trust_heading: "Built on trust. Fueled by expertise.",
        trust_desc: "Serving the Sri Lankan automotive landscape for over 15 years.",
        category_title: "Shop by Vehicle",
        featured_parts: "Featured Parts",
        about_title: "Precision & Heritage",
        about_subtitle: "The HK Motors Story",
        about_desc: "Setting the standard for automotive reliability since 2008.",
        contact_title: "Expert Assistance",
        contact_subtitle: "We're here to help you find the perfect part.",
        contact_phone: "Phone Support",
        contact_email: "Email Enquiries",
        contact_address: "Visit our Warehouse",
    },
    "සිං": {
        garage_title: "මගේ ගරාජය",
        garage_empty: "වාහනයක් ඉතිරි කර නැත",
        search_placeholder: "සොයන්න...",
        nav_home: "මුල් පිටුව",
        nav_vehicles: "වාහන",
        nav_inventory: "ඉන්වෙන්ටරි",
        nav_about: "අප ගැන",
        nav_support: "සහාය",
        hero_title: "සෑම ගමනකටම ඔරිජිනල් අමතර කොටස්",
        hero_subtitle: "ටාටා, මහින්ද්‍රා, මරුති සහ නිසාන් අමතර කොටස් සඳහා ශ්‍රී ලංකාවේ විශ්වාසවන්ත මධ්‍යස්ථානය.",
        hero_cta_primary: "ඉන්වෙන්ටරි පරීක්ෂා කරන්න",
        hero_cta_secondary: "මිල ගණන් ලබා ගන්න",
        trust_title: "මූලික ප්‍රමිතිය",
        trust_heading: "විශ්වාසය මත පදනම්ව. ප්‍රවීණතාවයෙන් සවිබල ගැන්වේ.",
        trust_desc: "වසර 15 කට වැඩි කාලයක් ශ්‍රී ලංකාවේ මෝටර් රථ ක්ෂේත්‍රයට සේවය කරයි.",
        category_title: "වාහනය අනුව සොයන්න",
        featured_parts: "විශේෂිත කොටස්",
        about_title: "ප්‍රමිතිය සහ උරුමය",
        about_subtitle: "HK මෝටර්ස් කතාව",
        about_desc: "2008 වසරේ සිට මෝටර් රථ විශ්වසනීයත්වය සඳහා ප්‍රමිතිය පිහිටුවීම.",
        contact_title: "ප්‍රවීණ සහාය",
        contact_subtitle: "ඔබට අවශ්‍ය නිවැරදි කොටස සොයා ගැනීමට අපි උදවු කරන්නෙමු.",
        contact_phone: "දුරකථන සහාය",
        contact_email: "විද්‍යුත් තැපෑල",
        contact_address: "අපගේ ගබඩාව වෙත පැමිණෙන්න",
    },
    தமிழ்: {
        garage_title: "என் கேரேஜ்",
        garage_empty: "வாகனம் சேமிக்கப்படவில்லை",
        search_placeholder: "தேடு...",
        nav_home: "முகப்பு",
        nav_vehicles: "வாகனங்கள்",
        nav_inventory: "சரக்கு",
        nav_about: "எங்கள் கதை",
        nav_support: "ஆதரவு",
        hero_title: "ஒவ்வொரு பயணத்திற்கும் அசல் பாகங்கள்",
        hero_subtitle: "டாடா, மஹிந்திரா, மாருதி மற்றும் நிசான் உதிரி பாகங்களுக்கான இலங்கையின் நம்பகமான மையம்.",
        hero_cta_primary: "சரக்குகளை ஆராயுங்கள்",
        hero_cta_secondary: "விலைப்புள்ளி பெறவும்",
        trust_title: "தங்கத் தரம்",
        trust_heading: "நம்பிக்கையின் அடிப்படையில். நிபுணத்துவத்தால் இயக்கப்படுகிறது.",
        trust_desc: "15 ஆண்டுகளுக்கும் மேலாக இலங்கையின் வாகனத் துறைக்கு சேவை செய்கிறது.",
        category_title: "வாகனம் மூலம் வாங்கவும்",
        featured_parts: "சிறப்பு பாகங்கள்",
        about_title: "துல்லியம் மற்றும் பாரம்பரியம்",
        about_subtitle: "எச்.கே மோட்டார்ஸ் கதை",
        about_desc: "2008 முதல் வாகன நம்பகத்தன்மைக்கான தரத்தை அமைத்தல்.",
        contact_title: "நிபுணர் உதவி",
        contact_subtitle: "சரியான பகுதியை நீங்கள் கண்டுபிடிக்க நாங்கள் உதவுகிறோம்.",
        contact_phone: "தொலைபேசி ஆதரவு",
        contact_email: "மின்னஞ்சல் விசாரணைகள்",
        contact_address: "எங்கள் கிடங்கிற்கு வருகை தரவும்",
    },
};

const LanguageContext = createContext<{
    lang: Language;
    setLang: (l: Language) => void;
    t: (key: string) => string;
} | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Language>("EN");

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY) as Language;
        if (saved && translations[saved]) setLangState(saved);
    }, []);

    const setLang = (l: Language) => {
        localStorage.setItem(STORAGE_KEY, l);
        setLangState(l);
    };

    const t = (key: string) => translations[lang][key] || key;

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useI18n must be used within LanguageProvider");
    return context;
}
