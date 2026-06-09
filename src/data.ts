import { ServiceGuide, InquiryCategory } from "./types";

export const SERVICE_GUIDES: Record<InquiryCategory, ServiceGuide> = {
  electricity: {
    title: "Electricity (EB)",
    titleTa: "மின்சார சேவை (EB)",
    icon: "⚡",
    shortDesc: "Bills, Smart Meter, connection enquiries",
    shortDescTa: "மின் கட்டணம், ஸ்மார்ட் மீட்டர், புதிய இணைப்பு",
    badge: "TANGEDCO 2026",
    badgeTa: "மின் வாரியம் 2026",
    bannerTitle: "TANGEDCO Digital Inquiry Portal",
    bannerTitleTa: "மின்சார வாரிய டிஜிட்டல் விசாரணை",
    idLabel: "10-Digit Consumer Account Number",
    idLabelTa: "10-இலக்க நுகர்வோர் கணக்கு எண்",
    idPlaceholder: "e.g., 0912345678",
    idPlaceholderTa: "எ.கா: 0912345678",
    highlights: [
      "100% transition to real-time Smart Meters tracked on 'Vetri EB' app.",
      "Get high bill audits and immediate billing adjustment reviews.",
      "New connections validated in 48 hours once digital Patta is verified.",
      "Bypasses physical brokers via transparent direct payment modes."
    ],
    highlightsTa: [
      "'வெற்றி மின்' செயலி மூலம் நிகழ்நேர ஸ்மார்ட் மீட்டர் பயன்பாடு கண்காணிப்பு.",
      "அதிகப்படியான மின்கட்டணம் குறித்த உடனடி தணிக்கை மற்றும் திருத்தம்.",
      "டிஜிட்டல் பட்டா மூலம் 48 மணிநேரத்திற்குள் புதிய மின்சார இணைப்பு அனுமதி.",
      "நேரடி கட்டண முறை மூலம் இடைத்தரகர்கள் இல்லாத வெளிப்படையான சேவை."
    ],
    ctaText: "Register EB Smart Inquiry",
    ctaTextTa: "மின்சார விசாரணை பதிவு செய்"
  },
  ration: {
    title: "Ration / TNPDS",
    titleTa: "ரேஷன் / TNPDS",
    icon: "🍚",
    shortDesc: "Home delivery & new smart family cards",
    shortDescTa: "வீட்டு உபயோக விநியோகம் & புதிய ஸ்மார்ட் அட்டை",
    badge: "Pasiyilla Thamizhagam",
    badgeTa: "பசியில்லா தமிழகம்",
    bannerTitle: "Smart Family Card Service Hub",
    bannerTitleTa: "ஸ்மார்ட் குடும்ப அட்டை விநியோக மையம்",
    idLabel: "Aadhaar Card or Smart Card Number",
    idLabelTa: "ஆதார் கார்டு அல்லது ஸ்மார்ட் அட்டை எண்",
    idPlaceholder: "e.g., 3409 1234 5678",
    idPlaceholderTa: "எ.கா: 3409 1234 5678",
    highlights: [
      "Schedule secure door-step ration delivery via the new TNPDS 2.0 app.",
      "New Smart Ration Card processing and physical delivery in 7 working days.",
      "Verify biometric scanning parameters or correct spelling instantly.",
      "Report foodstuff quality standard violations directly to secretariat helpline 1967."
    ],
    highlightsTa: [
      "TNPDS 2.0 புதிய செயலி மூலம் வீட்டு வாசலிலேயே ரேஷன் பொருட்கள் விநியோகம்.",
      "ஏழு நாட்களுக்குள் புதிய ஸ்மார்ட் கார்டு ஒப்புதல் மற்றும் நேரடி விநியோகம்.",
      "பயோமெட்ரிக் கைரேகை சிக்கல்கள் மற்றும் பெயர் திருத்தங்களை உடனே சரிசெய்தல்.",
      "ரேஷன் பொருட்களின் தரம் குறித்து 1967 என்ற எண்ணிற்கு நேரடி புகார் அளித்தல்."
    ],
    ctaText: "Register Ration Request",
    ctaTextTa: "ரேஷன் சேவைக்கு விண்ணப்பி"
  },
  land: {
    title: "Patta & Land Records",
    titleTa: "பட்டா & நில ஆவணங்கள்",
    icon: "📄",
    shortDesc: "Digital name transfer & survey details",
    shortDescTa: "பட்டா பெயர் மாற்றம் & நில அளவை விவரங்கள்",
    badge: "100% Digital Transfer",
    badgeTa: "100% டிஜிட்டல் பட்டா மாற்றம்",
    bannerTitle: "Automated Patta registry system",
    bannerTitleTa: "வெளிப்படையான பட்டா பதிவு மேலாண்மை",
    idLabel: "Survey Number & Subdivision File",
    idLabelTa: "நிலத்தின் புல எண் மற்றும் உட்பிரிவு விவரம்",
    idPlaceholder: "e.g., Survey 142/3A, Madurai North",
    idPlaceholderTa: "எ.கா: புல எண் 142/3A, மதுரை வடக்கு",
    highlights: [
      "Fully automated Patta name transfers linked to sub-registrar deeds.",
      "Query instant digitized land maps to inspect survey sub-divisions.",
      "Apply online to seek land surveyor allocation automatically.",
      "All services hosted on central eservices.tn.gov.in node."
    ],
    highlightsTa: [
      "சார்பதிவாளர் அலுவலக ஆவணங்களுடன் இணைக்கப்பட்ட 100% தானியங்கி பட்டா மாற்றம்.",
      "டிஜிட்டல் மயமாக்கப்பட்ட நில வரைபடங்களை உடனுக்குடன் சரிபார்த்தல்.",
      "அரசு நில அளவையாளர் ஒதுக்கீட்டிற்கு இணையவழியில் எளிய விண்ணப்பம்.",
      "மத்திய eservices.tn.gov.in இணையவழியில் அனைத்துச் சேவைகளும் இணைப்பு."
    ],
    ctaText: "Launch Patta Transfer Draft",
    ctaTextTa: "பட்டா சேவை விசாரணை"
  },
  women: {
    title: "Women Schemes",
    titleTa: "மகளிர் நலம்",
    icon: "👩",
    shortDesc: "₹1,500 monthly benefit status tracker",
    shortDescTa: "மாதம் ₹1,500 உரிமைத் தொகை நிலை",
    badge: "Vetri Magalir Scheme",
    badgeTa: "மகளிர் உரிமைத் திட்டம்",
    bannerTitle: "Vetri Magalir Benefit Tracking Portal",
    bannerTitleTa: "மகளிர் உரிமைத்தொகை கண்காணிப்புத் தளம்",
    idLabel: "12-Digit Smart Card or Bank Account Number",
    idLabelTa: "12-இலக்க ரேஷன் கார்டு அல்லது வங்கி கணக்கு எண்",
    idPlaceholder: "e.g., 120987654321",
    idPlaceholderTa: "எ.கா: 120987654321",
    highlights: [
      "Guaranteed monthly support of ₹1,500 directly deposited to Aadhaar-enabled bank accounts.",
      "Deposited on the 1st of every single month for flawless planning.",
      "Open to female heads of families with total family income below ₹5 Lakhs per year.",
      "Lodge payment discrepancy cases for automated review within 48 hours."
    ],
    highlightsTa: [
      "ஆதார் இணைக்கப்பட்ட நுகர்வோர் வங்கிக் கணக்குகளில் மாதம் ₹1,500 நேரடி வரவு.",
      "ஒவ்வொரு மாதமும் 1-ஆம் தேதியன்றே தடையின்றி உரிமைத்தொகை வரவு வைக்கப்படும்.",
      "ஆண்டு வருமானம் ₹5 இலட்சத்திற்கும் குறைவாக உள்ள குடும்பத் தலைவிகள் தகுதியானவர்கள்.",
      "தொகை வரவில்லை எனில் நேரடி மறுபரிசீலனைக்கு 48 மணிநேரத்திற்குள் தீர்வு."
    ],
    ctaText: "Track Eligibility Support",
    ctaTextTa: "உரிமைத்தொகை விவரம் சரிபார்"
  },
  edu: {
    title: "Education Hub",
    titleTa: "கல்வி & திறன்கள்",
    icon: "🎓",
    shortDesc: "Free student tablets & Robotics Labs",
    shortDescTa: "இலவச டேப்லெட் & ரோபாட்டிக்ஸ் பயிற்சி",
    badge: "Future Skill Hubs",
    badgeTa: "எதிர்கால திறன் மையம்",
    bannerTitle: "Vettri Education Empowerment Portal",
    bannerTitleTa: "வெற்றி கல்வி மற்றும் வழிகாட்டுதல் மையம்",
    idLabel: "EMIS Student Registration Number",
    idLabelTa: "EMIS மாணவர் பதிவு எண்",
    idPlaceholder: "e.g., EMIS 202611003",
    idPlaceholderTa: "எ.கா: EMIS 202611003",
    highlights: [
      "August 2026 release cycle of free premium touch tablets for students in 11th & 12th Std.",
      "Access 'Vetri Skill Labs' offering free certificate coding, robotics, and cyber courses.",
      "Govt scholarship applications directly queried and settled via state portal nodes.",
      "Direct guidance coaching modules for higher education options."
    ],
    highlightsTa: [
      "ஆகஸ்ட் 2026-ல் 11 மற்றும் 12 ஆம் வகுப்பு அரசுப்பள்ளி மாணவர்களுக்கு கல்வித் தாள்கள் (Tablets).",
      "இலவச 'வெற்றி தொழில்நுட்ப ஆய்வகங்கள்' மூலம் ரோபாட்டிக்ஸ், கோடிங் சான்றிதழ் படிப்பு.",
      "நேரடி கல்வி உதவித்தொகை விண்ணப்பம் மற்றும் மாணவர் EMIS குறியீடு எளிய சரிபார்ப்பு.",
      "உயர்கல்வி ஆர்வலர்களுக்கான சிறப்பு வழிகாட்டுதல் மற்றும் கலந்தாய்வு உதவிகள்."
    ],
    ctaText: "Register Tablet/Course Request",
    ctaTextTa: "இலவச பயிற்சி / கல்வித் தாள் பதிவு"
  },
  grievance: {
    title: "Public Grievance",
    titleTa: "பொது மக்கள் குறைதீர்ப்பு",
    icon: "📢",
    shortDesc: "Thooya Arasu zero corruption secretariat portal",
    shortDescTa: "தூய அரசு அவசர கண்காணிப்பு & CM உதவி",
    badge: "Direct Helpline 1100",
    badgeTa: "நேரடி உதவி 1100",
    bannerTitle: "Direct CM Complaint Lodging Center",
    bannerTitleTa: "முதலமைச்சர் நேரடி குறைதீர்ப்பு மையம்",
    idLabel: "Aadhaar Card or Phone Number for Tracking",
    idLabelTa: "ஆதார் அட்டை அல்லது பின்தொடர் அலைபேசி எண்",
    idPlaceholder: "e.g., 9876543210",
    idPlaceholderTa: "எ.கா: 9876543210",
    highlights: [
      "Strict zero-tolerance on corrupt practices and physical bribe demands.",
      "Upload photo, video, or document receipts of local issues directly to the state cabinet.",
      "Dial 1100 toll-free to dictate grievances securely.",
      "Cabinet guaranteed response from the Chief Secretariat within 48 hours."
    ],
    highlightsTa: [
      "லஞ்ச ஒழிப்பு மற்றும் வெளிப்படையான அதிகாரிகள் செயல்பாட்டிற்கான நேரடி கண்காணிப்பு.",
      "புகார் ஆதாரங்கள் (புகைப்படம், வீடியோ, ஆவணங்கள்) முதலமைச்சர் கண்காணிப்புக்கு நேரடி பதிவேற்றம்.",
      "1100 என்ற கட்டணமில்லா தொலைபேசி மூலம் எளிதாகப் புகாரைப் பதிவு செய்தல்.",
      "48 மணிநேரத்திற்குள் தலைமைச் செயலகத்திலிருந்து உடனடி நடவடிக்கை உத்தரவாதம்."
    ],
    ctaText: "Lodge Formal Complaint with CM",
    ctaTextTa: "முதலமைச்சருக்கு நேரடிப் புகார் அனுப்பு"
  }
};
