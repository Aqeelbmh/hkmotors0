export const SITE = {
  name: "H.K. Motors",
  url: "https://hkmotorslk.com", // Assuming a domain
  tagline: "Genuine & Quality Spare Parts for Every Vehicle",
  description: "Sri Lanka's trusted supplier of genuine and high-quality aftermarket spare parts for Tata, Mahindra, Maruti, Nissan, Mitsubishi, Isuzu, and Mazda vehicles. 15+ years of automotive expertise.",
  keywords: "spare parts sri lanka, tata parts, mahindra parts, maruti alto parts, genuine car parts kandy, truck spare parts sri lanka, nissan parts, isuzu spare parts",
  phone: "+94 777 411 229",
  phoneNumbers: ["+94 777 411 229", "+94 760 927 230", "+94 74 1234 562"],
  phoneHref: "tel:+94777411229",
  whatsapp: "94777411229",
  whatsappMessage: "Hello HK Motors Specialist, I am looking for premium spare parts for my vehicle. Please assist me with my enquiry.",
  email: "hkmotors505@gmail.com",
  address: "41/2 Yakgahapitiya - Amunugama Road, Gunnepana 20270",
  hours: [
    { day: "Monday – Friday", time: "8:30 AM – 6:30 PM" },
    { day: "Saturday", time: "8:30 AM – 5:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  ogImage: "/og-image.jpg",
  twitterHandle: "@hkmotors",
};

export const whatsappLink = (msg?: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg ?? SITE.whatsappMessage)}`;
