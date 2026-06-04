export const SITE = {
  name: "H.K. Motors",
  tagline: "Genuine & Quality Spare Parts for Every Vehicle",
  phone: "+94 77 123 4567",
  phoneHref: "tel:+94771234567",
  whatsapp: "94771234567",
  whatsappMessage: "Hello H.K. Motors, I am looking for spare parts for my vehicle. Please assist me.",
  email: "info@hkmotors.lk",
  address: "No. 142, Galle Road, Colombo 04, Sri Lanka",
  hours: [
    { day: "Monday – Friday", time: "8:30 AM – 6:30 PM" },
    { day: "Saturday", time: "8:30 AM – 5:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
};

export const whatsappLink = (msg?: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg ?? SITE.whatsappMessage)}`;
