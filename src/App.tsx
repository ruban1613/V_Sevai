import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  Send, 
  Languages, 
  ShieldAlert, 
  Search, 
  FileText, 
  Check, 
  RotateCcw, 
  PlusCircle, 
  User, 
  MapPin, 
  Sparkles, 
  PhoneCall, 
  HelpCircle, 
  Building,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { SERVICE_GUIDES } from './data';
import { Language, Inquiry, InquiryCategory, ChatMessage } from './types';

const TRANSLATIONS = {
  en: {
    portalTitle: "தமிழக வெற்றி அரசு",
    portalSubtitle: "Vettri Sevai Bot — CM C. Joseph Vijay Administration",
    portalYear: "Administration of CM C. Joseph Vijay | Year 2026",
    officialBadge: "OFFICIAL PORTAL 2026",
    govtBadge: "GOVT OF TAMIL NADU",
    serviceModulesHeader: "🎯 2026 Service Enquiry",
    antiCorruptionHeader: "Zero Corruption Index",
    activeService: "Active Service Guide",
    highlightsLabel: "Service Standards & Guidelines",
    registerTitle: "Register Direct 2026 Inquiry",
    citizenNameLabel: "Citizen Full Name",
    contextLabel: "Describe your service problem or inquiry query and background details",
    successMsg: "Inquiry successfully submitted! Verification status set to 'Pending Review'.",
    antiCorruptionHelpline: "Anti-Corruption Secret Cabinet Line",
    ledgerTitle: "CM Citizen Inquiry Ledger & Tracker (Real-time Live)",
    searchPlaceholder: "Search by Citizen Name, ID or description...",
    filterAll: "All Categories",
    statusFilterLabel: "All Statuses",
    noInquiries: "No inquiries matched the search filter.",
    colName: "Citizen Name",
    colCategory: "Service",
    colID: "Record Identifier",
    colDetail: "Inquiry Context",
    colStatus: "Welfare Status",
    createdTime: "Filing Time",
    chatPromptPlaceholder: "Type your problem or service enquiry here...",
    statusPending: "Pending Review",
    statusAssigned: "Assigned to Officer",
    statusProgress: "In Investigation",
    statusResolved: "Resolved Successfully",
    onlineBadge: "🦁 VETTRI SEVAI ACTIVE",
    resolvedIndex: "Resolved Enquiries",
    resolutionText: "Cabinet Resolution Index 2026",
    cabinetDirectLine: "Secretariat direct tracking with guaranteed 48-hour feedback cycle. Fully authenticated in Chennai.",
    backToGuides: "Select service modules below to populate guides:",
    changeStatus: "Simulate Cabinet Action",
    simSuccess: "Citizen request status updated in Secretariat server!",
    newTicketBtn: "File Direct Ticket",
    requiredWarn: "Please fill all fields before submitting under oath.",
    totalInquiriesTracked: "Total Registered Cases",
    latestUpdates: "Latest State Directives",
    clearText: "Clear Form",
    aboutCM: "About the 2026 Reform",
    aboutCMText: "Led by CM C. Joseph Vijay, Tamil Nadu 2026 introduces zero-bribe paperless transfers, mandatory Smart Meter validations, home-delivery food kits, and autonomous AI complaint desks.",
    actionPanel: "Secretariat Simulator Controls"
  },
  ta: {
    portalTitle: "தமிழக வெற்றி அரசு",
    portalSubtitle: "வெற்றி சேவை பாட் — முதலமைச்சர் சி. ஜோசப் விஜய் நிர்வாகம்",
    portalYear: "முதலமைச்சர் சி. ஜோசப் விஜய் நிர்வாகம் | ஆண்டு 2026",
    officialBadge: "அதிகாரப்பூர்வ போர்டல் 2026",
    govtBadge: "தமிழக அரசு",
    serviceModulesHeader: "🎯 2026 சேவை விசாரணை",
    antiCorruptionHeader: "பூஜ்ஜிய ஊழல் குறியீடு",
    activeService: "செயலில் உள்ள சேவை வழிகாட்டி",
    highlightsLabel: "சேவை தரநிலைகள் மற்றும் வழிகாட்டுதல்கள்",
    registerTitle: "நேரடி 2026 விசாரணை பதிவு",
    citizenNameLabel: "குடிமகன் முழு பெயர்",
    contextLabel: "உங்கள் சேவைப் பிரச்சனை அல்லது கேள்வியை விரிவாக விளக்கவும்",
    successMsg: "விசாரணை வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது! தற்போதைய நிலை: 'பரிசீலனையில்'.",
    antiCorruptionHelpline: "லஞ்ச ஒழிப்பு அமைச்சரவை நேரடி சேவை",
    ledgerTitle: "முதலமைச்சர் குடிமக்கள் விசாரணை பதிவேடு & கண்காணிப்பு",
    searchPlaceholder: "குடிமகன் பெயர், குறியீடு அல்லது பிரச்சனையைத் தேடவும்...",
    filterAll: "அனைத்து பிரிவுகள்",
    statusFilterLabel: "அனைத்து நிலைகள்",
    noInquiries: "தேடலுக்குரிய தகவல்கள் ஏதும் இல்லை.",
    colName: "குடிமகன் பெயர்",
    colCategory: "சேவை வகை",
    colID: "ஆவணக்குறியீடு",
    colDetail: "இருப்பு விவரங்கள் / பிரச்சனை",
    colStatus: "நலப்பணி நிலை",
    createdTime: "பதிவு செய்யப்பட்ட நேரம்",
    chatPromptPlaceholder: "உங்கள் பிரச்சனை அல்லது சேவை விசாரணையை இங்கே தட்டச்சு செய்யவும்...",
    statusPending: "பரிசீலனையில்",
    statusAssigned: "அதிகாரிக்கு ஒதுக்கப்பட்டது",
    statusProgress: "விசாரணையில் உள்ளது",
    statusResolved: "வெற்றிகரமாக தீர்க்கப்பட்டது",
    onlineBadge: "🦁 வெற்றி சேவை இயங்குகிறது",
    resolvedIndex: "தீர்க்கப்பட்ட புகார்கள்",
    resolutionText: "அமைச்சரவை தீர்வு குறியீடு 2026",
    cabinetDirectLine: "தலைமைச் செயலகத்தின் நேரடி கண்காணிப்புடன் 48 மணிநேர பதில் உத்தரவாதம். சென்னையில் சரிபார்க்கப்பட்டது.",
    backToGuides: "வழிகாட்டிகளைப் பெற கீழே உள்ள சேவை பிரிவுகளைத் தேர்ந்தெடுக்கவும்:",
    changeStatus: "அமைச்சரவை நடவடிக்கையை மாற்று",
    simSuccess: "தலைமைச் செயலக சர்வரில் குடிமகன் கோரிக்கை நிலை புதுப்பிக்கப்பட்டது!",
    newTicketBtn: "நேரடி மனு தாக்கல் செய்க",
    requiredWarn: "உறுதிமொழிக்கு முன் அனைத்துப் புலங்களையும் நிரப்பவும்.",
    totalInquiriesTracked: "பதிவு செய்யப்பட்ட மொத்த மனுக்கள்",
    latestUpdates: "சமீபத்திய அரசு வழிகாட்டுதல்கள்",
    clearText: "படிவத்தை துடைக்கவும்",
    aboutCM: "2026 அரசு சீர்திருத்தம் பற்றி",
    aboutCMText: "முதலமைச்சர் சி. ஜோசப் விஜய் தலைமையில், 2026-ல் தமிழக அரசு லஞ்சமில்லா காகிதமில்லா பட்டா பரிமாற்றம், ஸ்மார்ட் மீட்டர் கட்டாய தணிக்கை, மற்றும் அதிநவீன ஏஐ குறைதீர்ப்பு முறையை அறிமுகப்படுத்தியுள்ளது.",
    actionPanel: "தலைமைச் செயலக கட்டுப்பாட்டு உருவகப்படுத்துதல்"
  }
};

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: "VT-2026-0921",
    category: "electricity",
    citizenName: "Ramesh Sundaram",
    identifier: "0912111422",
    detail: "Requesting urgent Smart Meter reconciliation for high billing charges in June period. Device tracking shows stable reading but billing node is showing peak consumption.",
    createdAt: "2026-06-08 14:32",
    status: "Assigned"
  },
  {
    id: "VT-2026-1033",
    category: "women",
    citizenName: "Selvi Ammal",
    identifier: "120987654321",
    detail: "Checked status of Vetri Magalir Urimai Thittam monthly ₹1,500 benefit. Verification complete under household income bar of ₹5 Lakhs, funds received.",
    createdAt: "2026-06-07 09:15",
    status: "Resolved"
  },
  {
    id: "VT-2026-0441",
    category: "land",
    citizenName: "Palanisamy K.",
    identifier: "Survey 142/3A, Madurai",
    detail: "Digital Patta name transfer automatically submitted upon registry of Sale Deed. Awaiting local surveyor automation schedule in government app.",
    createdAt: "2026-06-09 08:12",
    status: "In Progress"
  },
  {
    id: "VT-2026-0012",
    category: "ration",
    citizenName: "Fathima Begum",
    identifier: "3409 5555 1289",
    detail: "Scheduled doorstep home delivery service through TNPDS 2.0. Delivery Slot approved but requested to correct spelling of family head.",
    createdAt: "2026-06-09 06:45",
    status: "Pending"
  }
];

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [selectedCategory, setSelectedCategory] = useState<InquiryCategory>('electricity');
  
  // Registration Form State
  const [citizenName, setCitizenName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [detail, setDetail] = useState('');
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Inquiries State
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('vettri_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => [
    {
      id: "welcome-1",
      sender: "bot",
      text: "வணக்கம்! 🙏 Welcome to the Vettri Sevai Enquiry Portal 2026. I am Vetri, your AI assistant to guide you under the visionary governance of Hon'ble CM C. Joseph Vijay.\n\nI can help you audit Electricity smart meters, schedule doorstep Ration deliveries, register Land Patta transfers, trace Magalir Urimai benefits, or lodge public anti-corruption complaints directly with the Secretariat.\n\nSelect a quick service module on the left or type your inquiry below!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isSendingChat, setIsSendingChat] = useState(false);
  const [chatLoadingPlaceholder, setChatLoadingPlaceholder] = useState<string | null>(null);

  // Ref for chat auto scroll
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Clock time in 2026
  const [systemTime, setSystemTime] = useState("");

  useEffect(() => {
    localStorage.setItem('vettri_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Handle UTC date to display robust 2026 dates
  useEffect(() => {
    const updateTime = () => {
      // Anchor year in 2026
      const now = new Date();
      const year = 2026;
      const month = now.toLocaleString(lang === 'en' ? 'en-US' : 'ta-IN', { month: 'short' });
      const date = now.getDate().toString().padStart(2, '0');
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      
      if (lang === 'en') {
        setSystemTime(`Jun ${date}, 2026 ${timeStr} UTC`);
      } else {
        setSystemTime(`ஜூன் ${date}, 2026 ${timeStr} UTC`);
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'ta' : 'en';
    setLang(nextLang);
    // Push a status update regarding language
    const msg: ChatMessage = {
      id: "lang-" + Date.now(),
      sender: "bot",
      text: nextLang === 'en' 
        ? "Language updated to English. How can I help you find state facilities?" 
        : "மொழி தமிழ் ஆக மாற்றப்பட்டது. அரசு சேவைகள் மற்றும் திட்டங்களை விரைவாக கண்டறிய நான் எவ்வாறு உதவலாம்?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, msg]);
  };

  const handleServiceSelect = (category: InquiryCategory) => {
    setSelectedCategory(category);
    setFormSuccess(null);
    setFormError(null);
    
    // Automatically pre-populate some example placeholder if clean
    if (!identifier) {
      const guide = SERVICE_GUIDES[category];
      setIdentifier("");
    }

    // Inform bot about module change
    const guideName = lang === 'en' ? SERVICE_GUIDES[category].title : SERVICE_GUIDES[category].titleTa;
    const updateMsg: ChatMessage = {
      id: "select-" + Date.now(),
      sender: "bot",
      text: lang === 'en' 
        ? `Loaded Service Directory: **${guideName}**. Fill out the inquiry registration card to lodge a case or ask me anything regarding its eligibility requirements!`
        : `சேவை வழிகாட்டி ஏற்றப்பட்டது: **${guideName}**. இத்திட்டம் தொடர்பான விவரங்களை அறிய அல்லது புகாரை தலைமைச் செயலகத்திற்கு அனுப்ப படிவத்தைப் பயன்படுத்தவும்!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, updateMsg]);
  };

  // Submit dynamic inquiry
  const handleRegisterInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccess(null);
    setFormError(null);

    if (!citizenName.trim() || !detail.trim()) {
      setFormError(t('requiredWarn'));
      return;
    }

    const newInquiry: Inquiry = {
      id: `VT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      category: selectedCategory,
      citizenName: citizenName.trim(),
      identifier: identifier.trim() || "N/A (General Claim)",
      detail: detail.trim(),
      createdAt: `2026-06-09 ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`,
      status: 'Pending'
    };

    setInquiries(prev => [newInquiry, ...prev]);
    setFormSuccess(t('successMsg'));
    
    // Push confirmation message inside chat thread
    const successChat: ChatMessage = {
      id: "confinq-" + Date.now(),
      sender: "bot",
      text: lang === 'en'
        ? `📝 **Secretariat System Alert**: Hello ${citizenName.trim()}, your enquiry regarding **${SERVICE_GUIDES[selectedCategory].title}** has been received by CM Cabinet systems. Tracking ID: **${newInquiry.id}**. Instant notification dispatch sent. Status is set to: *Pending Review*.`
        : `📝 **அமைச்சரவை அவசர எச்சரிக்கை**: வணக்கம் ${citizenName.trim()}, **${SERVICE_GUIDES[selectedCategory].titleTa}** திட்டத்திற்கான தங்களது மனு தலைமைச் செயலக சர்வரில் பதிவு செய்யப்பட்டது. கண்காணிப்பு எண்: **${newInquiry.id}**. உங்களது மனு பரிசீலனையில் உள்ளது.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, successChat]);

    // Clear form
    setCitizenName('');
    setIdentifier('');
    setDetail('');
  };

  // Clear form helper
  const handleClearForm = () => {
    setCitizenName('');
    setIdentifier('');
    setDetail('');
    setFormSuccess(null);
    setFormError(null);
  };

  // Delete an inquiry
  const handleDeleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(inq => inq.id !== id));
  };

  // Change Inquiry Status for simulation
  const handleUpdateStatus = (id: string, nextStatus: 'Pending' | 'Assigned' | 'In Progress' | 'Resolved') => {
    setInquiries(prev => prev.map(inq => {
      if (inq.id === id) {
        return { ...inq, status: nextStatus };
      }
      return inq;
    }));
    
    // Dynamic text notification
    const matched = inquiries.find(inq => inq.id === id);
    const serviceTitle = matched ? (lang === 'en' ? SERVICE_GUIDES[matched.category].title : SERVICE_GUIDES[matched.category].titleTa) : "Service";
    const notifyMsg: ChatMessage = {
      id: "notify-" + Date.now(),
      sender: "bot",
      text: lang === 'en'
        ? `⚙️ **Simulation Notification**: Service Ticket **${id}** status updated to [**${nextStatus}**] on state servers. Verified by CM Secretariat Audit.`
        : `⚙️ **உருவகப்படுத்துதல் அறிவிப்பு**: சேவை மனு **${id}** தற்போதைய நிலை [**${nextStatus === 'Resolved' ? 'வெற்றிகரமாகத் தீர்க்கப்பட்டது' : nextStatus}**] என்றவாறு மாற்றம் செய்யப்பட்டுள்ளது.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, notifyMsg]);
  };

  // Chat Submission to API
  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = chatInput.trim();
    if (!query) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: "chat-user-" + Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsSendingChat(true);
    setChatLoadingPlaceholder(lang === 'en' ? 'Consulting Vettri Sevai Database...' : 'தலைமைச் செயலக தகவல் சேகரிக்கப்படுகிறது...');

    try {
      // Map message history to required platform format
      const historyPayload = chatMessages.map(msg => ({
        role: msg.sender === 'bot' ? 'model' : 'user',
        text: msg.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, history: historyPayload })
      });

      if (!response.ok) {
        throw new Error("Server error responding to citizen");
      }

      const data = await response.json();
      
      const botMsg: ChatMessage = {
        id: "chat-bot-" + Date.now(),
        sender: "bot",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, botMsg]);

    } catch (err: any) {
      console.error(err);
      // Fallback response handled client-side if anything goes offline
      const fallbackText = getClientFallbackResponse(query);
      const botMsg: ChatMessage = {
        id: "chat-bot-" + Date.now(),
        sender: "bot",
        text: fallbackText + " (Local Guided Database Rescue Mode)",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, botMsg]);
    } finally {
      setIsSendingChat(false);
      setChatLoadingPlaceholder(null);
    }
  };

  // Dynamic offline support responder helper client-side (to complement the server-side fallback)
  const getClientFallbackResponse = (query: string): string => {
    const textLower = query.toLowerCase();
    if (textLower.includes("eb") || textLower.includes("electricity") || textLower.includes("மின்")) {
      return lang === 'en' 
        ? "⚡ **TANGEDCO Smart Meter Update (2026)**:\nYour high-bill complaint or smart meter calibration inquiry has been queued for immediate investigation. Under CM Vijay's directive, new connections take 48 hours. Please fill out our dynamic inquiry card on the left sidebar to obtain formal priority."
        : "⚡ **TANGEDCO ஸ்மார்ட் மீட்டர் அறிவிப்பு (2026)**:\nஅதிகப்படியான மின் விநியோகக் கட்டணம் மற்றும் கணக்கீடு புகார்கள் தலைமை மின்சார வாரியப் பிரிவுக்கு அனுப்பப்பட்டுள்ளது. புதிய மின்சார இணைப்புகள் 48 மணிநேரத்திற்குள் சரிபார்க்கப்படும். இடதுபுறம் உள்ள படிவத்தை பூர்த்தி செய்து சமர்ப்பிக்கவும்.";
    }
    if (textLower.includes("ration") || textLower.includes("ரேஷன்") || textLower.includes("உணவு")) {
      return lang === 'en'
        ? "🍚 **Pasiyilla Thamizhagam Ration Hub**:\nHome delivery queues are monitored via TNPDS 2.0 app. New Smart Card approvals take 7 working days. If you face biometric failures, please file a ticket with our Ration Service Guide on the left form."
        : "🍚 **பசியில்லா தமிழகம் ரேஷன் மையம்**:\nTNPDS 2.0 செயலி மூலம் அவசர உணவுப் பொருட்கள் விநியோகம் கண்காணிக்கப்படுகிறது. புதிய ஸ்மார்ட் கார்டு ஒப்புதல் பெற 7 வேலை நாட்கள் ஆகும். உங்கள் புகாரை ரேஷன் படிவத்தில் பதிவு செய்யவும்.";
    }
    if (textLower.includes("patta") || textLower.includes("land") || textLower.includes("நில") || textLower.includes("பட்டா")) {
      return lang === 'en'
        ? "📄 **Digital Patta Transfer Agency**:\nAutomatic registrar mappings are currently synchronized. Enter your Survey Number and subdivision data in the Patta Form on the left to request direct revenue officer follow-up."
        : "📄 **டிஜிட்டல் பட்டா பரிமாற்ற வழிகாட்டி**:\nசார்பதிவாளர் அலுவலக ஆவணங்களுடன் பட்டா தானியங்கி முறையில் பெறப்படுகிறது. நில அளவை எண் மூலம் மனு எழுப்ப இடதுபுற பட்டா படிவத்தைப் பயன்படுத்தவும்.";
    }
    if (textLower.includes("women") || textLower.includes("magalir") || textLower.includes("உரிமை") || textLower.includes("1500")) {
      return lang === 'en'
        ? "👩 **Vetri Magalir Urimai Thittam Tracking**:\nMonthly support of ₹1,500 is auto-credited on the 1st day of every month to families earning under ₹5 Lakhs annual bar. Submit your family smart card on the left panel to request immediate ledger review."
        : "👩 **மகளிர் உரிமைத் தொகை திட்டம்**:\nஆண்டு வருமானம் ₹5 லட்சத்திற்கு உட்பட்ட குடும்பங்களுக்கு மாதந்தோறும் ₹1,500 நிதி உதவி வழங்கப்படுகிறது. உங்களது நிலை அறிய மகளிர் பக்கத்தில் பதிவு செய்யவும்.";
    }
    return lang === 'en'
      ? `Dear Citizen, your state query regarding "${query}" has been successfully queued in the 2026 secretariat system. We stand ready under Chief Minister C. Joseph Vijay’s zero-tolerance policy. Is there anything else I can help you with? 🙏`
      : `அன்பான குடிமகன், தாங்கள் சமர்ப்பித்த "${query}" கோரிக்கை 2026 தலைமைச் செயலக கணினியில் பதியப்பட்டுள்ளது. தங்களுக்கு வேறு ஏதேனும் உதவி வேண்டுமா? 🙏`;
  };

  const t = (key: keyof typeof TRANSLATIONS['en']): string => {
    return TRANSLATIONS[lang][key] || TRANSLATIONS['en'][key];
  };

  // Filtered inquiries calculation
  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = 
      inq.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'all' ? true : inq.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' ? true : inq.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const activeGuide = SERVICE_GUIDES[selectedCategory];

  return (
    <div className="flex flex-col min-h-screen bg-[#fffdf0] text-[#1a1e3c] font-sans border-[6px] md:border-[10px] border-[#800000]">
      
      {/* HEADER NAVIGATION */}
      <nav className="bg-[#800000] border-b-4 border-[#FFD700] flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 flex-shrink-0 gap-4">
        <div className="flex items-center gap-4 text-center md:text-left self-stretch justify-center md:justify-start">
          <div className="w-14 h-14 bg-[#FFD700] rounded-full flex items-center justify-center text-3xl font-black text-[#800000] shadow-lg border-2 border-white select-none">
            🦁
          </div>
          <div>
            <h1 className="text-[#FFD700] text-2xl font-black tracking-tighter leading-none uppercase">
              {t('portalTitle')}
            </h1>
            <p className="text-white text-xs font-bold uppercase tracking-widest mt-1">
              {t('portalSubtitle')}
            </p>
          </div>
        </div>
        
        {/* RIGHT INFO CONTROLS */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="hidden lg:block text-right pr-2">
            <p className="text-white text-[10px] uppercase font-bold tracking-widest opacity-80">STABLE CORE SECURE</p>
            <p className="text-[#FFD700] text-xs font-mono font-bold leading-none mt-0.5">{systemTime}</p>
          </div>
          
          <button 
            onClick={toggleLanguage}
            id="lang-toggle-btn"
            className="px-4 py-2 bg-white text-[#800000] font-black text-xs rounded border-2 border-[#FFD700] flex items-center gap-2 hover:bg-[#fffde7] transition-all cursor-pointer shadow-[3px_3px_0px_#FFD700]"
          >
            <Languages size={14} className="text-[#800000]" />
            {lang === 'en' ? 'தமிழ்' : 'English'}
          </button>

          <span className="px-4 py-2 bg-[#FFD700] text-[#800000] font-black text-xs rounded border-2 border-[#800000] select-none shadow-[3px_3px_0px_#fff]">
            {t('officialBadge')}
          </span>
        </div>
      </nav>

      {/* STATE DIRECTIVE TAPE */}
      <div className="bg-[#FFD700] text-[#800000] font-extrabold text-[11px] md:text-xs uppercase tracking-wider py-1.5 px-4 overflow-hidden border-b-2 border-[#800000] flex items-center gap-6 justify-center text-center">
        <span className="flex items-center gap-1">
          <ShieldAlert size={14} className="animate-spin text-[#800000]" />
          <span>{lang === 'en' ? "WARNING: Corruption under CM Vijay is strictly zero-tolerance. Citizen details verified. " : "எச்சரிக்கை: லஞ்சம் வாங்குவதோ கொடுப்பதோ தண்டனைக்குரியது. 2026 நேரடி கண்காணிப்பு."}</span>
        </span>
        <span className="hidden md:inline border-l border-red-800 h-4 md:mx-2"></span>
        <span className="hidden md:inline">🏛️ Chennai Fort St. George Hub: Connected</span>
      </div>

      {/* MAIN CONTAINER */}
      <main className="flex-1 flex flex-col xl:flex-row p-4 md:p-6 gap-6 overflow-hidden">
        
        {/* COLUMN 1: SIDEBAR CONTROLS & ACTIVE GUIDE */}
        <div className="w-full xl:w-[380px] flex flex-col gap-5 flex-shrink-0">
          
          {/* SERVICE QUICK SELECT CARD */}
          <div className="bg-white border-4 border-[#800000] p-4 shadow-[6px_6px_0px_#FFD700] rounded">
            <h2 className="text-[#800000] font-black text-sm mb-3 leading-tight uppercase underline decoration-[#FFD700] decoration-4 underline-offset-4 tracking-tight flex items-center gap-2">
              <span>{t('serviceModulesHeader')}</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-2.5">
              {(Object.keys(SERVICE_GUIDES) as InquiryCategory[]).map((cat) => {
                const item = SERVICE_GUIDES[cat];
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleServiceSelect(cat)}
                    className={`flex items-center gap-3 p-3 text-left rounded transition-all cursor-pointer border-2 font-bold ${
                      isSelected 
                        ? 'bg-[#800000] text-white border-[#FFD700] shadow-[3px_3px_0px_rgba(255,215,0,0.5)]' 
                        : 'bg-white text-[#1a1e3c] border-[#800000] hover:bg-[#fff9d3]'
                    }`}
                  >
                    <span className="text-2xl flex-shrink-0 bg-yellow-100 p-1 rounded border border-yellow-300">
                      {item.icon}
                    </span>
                    <div className="leading-tight min-w-0">
                      <p className="font-extrabold text-xs truncate uppercase tracking-tight">
                        {lang === 'en' ? item.title : item.titleTa}
                      </p>
                      <p className={`text-[10px] truncate ${isSelected ? 'text-[#FFD700]' : 'text-[#718096]'}`}>
                        {lang === 'en' ? item.shortDesc : item.shortDescTa}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AMBASSADOR COUNTER CARD */}
          <div className="bg-[#800000] text-white border-4 border-[#FFD700] p-4 rounded shadow-[6px_6px_0px_#800000] flex flex-col justify-center">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[#FFD700] text-[10px] uppercase font-black tracking-widest leading-none">
                {t('antiCorruptionHeader')}
              </span>
              <span className="bg-[#FFD700] text-[#800000] text-[9px] font-black px-1.5 py-0.5 rounded">
                SECURE 1100
              </span>
            </div>
            
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[#FFD700] text-4xl font-black leading-none tracking-tighter">94%</span>
              <span className="text-xs text-slate-100 font-bold opacity-90">{t('resolvedIndex')}</span>
            </div>
            
            <div className="border-t border-red-700/60 my-2 pt-2">
              <p className="text-[10px] text-white font-semibold leading-relaxed">
                {t('cabinetDirectLine')}
              </p>
            </div>
          </div>

          {/* REFORM DESCRIPTION CARD */}
          <div className="bg-white border-4 border-[#800000] p-4 rounded shadow-[6px_6px_0px_#800000]">
            <h3 className="text-[#800000] font-black text-xs uppercase mb-1 tracking-wider leading-none">
              ℹ️ {t('aboutCM')}
            </h3>
            <p className="text-[11px] text-[#4a5568] leading-relaxed font-medium mt-1">
              {t('aboutCMText')}
            </p>
          </div>

        </div>

        {/* COLUMN 2: GENERAL SERVICE GUIDE & INQUIRY FORM */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* THE BOLD ACTIVE GUIDE BANNER */}
          <div className="bg-white border-4 border-[#800000] rounded p-5 shadow-[8px_8px_0px_#800000] flex flex-col gap-3">
            
            {/* Guide Title Header */}
            <div className="flex items-center justify-between border-b-2 border-dashed border-[#800000]/30 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl bg-[#FFD700] p-1.5 rounded-md border border-[#800000] shadow-[2px_2px_0px_#800000]">
                  {activeGuide.icon}
                </span>
                <div>
                  <h3 className="text-[#800000] text-lg font-black leading-tight uppercase tracking-tight">
                    {lang === 'en' ? activeGuide.bannerTitle : activeGuide.bannerTitleTa}
                  </h3>
                  <span className="bg-[#fffde7] text-[#800000] text-[10px] font-black border border-[#FFD700] px-2.5 py-0.5 rounded inline-block mt-0.5">
                    {lang === 'en' ? activeGuide.badge : activeGuide.badgeTa}
                  </span>
                </div>
              </div>
              
              <div className="text-right text-[#800000] text-xs font-black">
                {t('activeService')}
              </div>
            </div>

            {/* Targets/Highlights bullets */}
            <div>
              <p className="text-xs text-[#800000] uppercase font-black tracking-widest mb-2 flex items-center gap-1.5">
                <CheckCircle size={15} />
                {t('highlightsLabel')}
              </p>
              
              <ul className="space-y-1.5 md:space-y-2">
                {(lang === 'en' ? activeGuide.highlights : activeGuide.highlightsTa).map((hi, i) => (
                  <li key={i} className="flex gap-2 text-xs text-[#1a1e3c] font-semibold leading-relaxed">
                    <span className="text-[#800000] font-black">✓</span>
                    <span>{hi}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SUBMIT INQUIRY CARD BLOCK FORM */}
            <form onSubmit={handleRegisterInquiry} className="bg-[#fffdf0] border-2 border-dashed border-[#800000] p-4 rounded mt-2">
              <h4 className="text-xs font-black text-[#800000] uppercase tracking-wider mb-3 pb-1 border-b border-[#800000]/20">
                ✏️ {t('registerTitle')} - {lang === 'en' ? activeGuide.title : activeGuide.titleTa}
              </h4>

              {formSuccess && (
                <div className="mb-3 p-2.5 bg-[#e6fffa] border-2 border-[#319795] text-[#234e52] text-xs font-black rounded flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>{formSuccess}</span>
                </div>
              )}

              {formError && (
                <div className="mb-3 p-2.5 bg-[#fff5f5] border-2 border-[#e53e3e] text-[#9b2c2c] text-xs font-black rounded flex items-center gap-2">
                  <AlertCircle size={16} />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                
                {/* Name */}
                <div>
                  <label className="block text-[10px] font-black text-[#800000] uppercase tracking-wider mb-1">
                    {t('citizenNameLabel')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={citizenName}
                    onChange={(e) => setCitizenName(e.target.value)}
                    placeholder="e.g. Ramesh Sundaram"
                    className="w-full bg-white border-2 border-[#800000] px-3 py-1.5 text-xs focus:ring-2 focus:ring-[#FFD700] focus:outline-none rounded font-bold"
                  />
                </div>

                {/* Identifier */}
                <div>
                  <label className="block text-[10px] font-black text-[#800000] uppercase tracking-wider mb-1">
                    {lang === 'en' ? activeGuide.idLabel : activeGuide.idLabelTa}
                  </label>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={lang === 'en' ? activeGuide.idPlaceholder : activeGuide.idPlaceholderTa}
                    className="w-full bg-white border-2 border-[#800000] px-3 py-1.5 text-xs focus:ring-2 focus:ring-[#FFD700] focus:outline-none rounded font-bold"
                  />
                </div>

              </div>

              {/* Inquiry Detail Context */}
              <div className="mb-3">
                <label className="block text-[10px] font-black text-[#800000] uppercase tracking-wider mb-1">
                  {t('contextLabel')} *
                </label>
                <textarea
                  required
                  rows={2}
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  placeholder="..."
                  className="w-full bg-white border-2 border-[#800000] px-3 py-2 text-xs focus:ring-2 focus:ring-[#FFD700] focus:outline-none rounded font-bold"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleClearForm}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#1a1e3c] font-black text-[10px] uppercase border border-[#800000] rounded cursor-pointer transition-all"
                >
                  {t('clearText')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#800000] hover:bg-red-900 text-[#FFD700] font-black text-[10px] uppercase rounded border-2 border-[#FFD700] cursor-pointer transition-all shadow-[2px_2px_0px_rgba(0,0,0,0.15)] flex items-center gap-1.5"
                >
                  <PlusCircle size={13} />
                  {lang === 'en' ? activeGuide.ctaText : activeGuide.ctaTextTa}
                </button>
              </div>

            </form>

          </div>

        </div>

        {/* COLUMN 3: HISTORICAL CHAT / LIVE DIRECTIVES INTEGRATED WITH SYSTEM */}
        <div className="w-full xl:w-[420px] flex flex-col bg-white border-4 border-[#800000] rounded shadow-[10px_10px_0px_#800000] overflow-hidden flex-shrink-0">
          
          {/* Chat Header */}
          <div className="bg-[#FFD700] px-4 py-3 border-b-4 border-[#800000] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#800000] rounded-full animate-pulse"></span>
              <h3 className="font-black text-xs text-[#800000] uppercase tracking-wider">
                {t('onlineBadge')}
              </h3>
            </div>
            
            <span className="text-[9px] font-black text-white bg-[#800000] px-2 py-0.5 rounded">
              GEMINI MODEL SECURED
            </span>
          </div>

          {/* Chat message logs */}
          <div className="flex-1 p-4 bg-[#fffde7] overflow-y-auto max-h-[380px] xl:max-h-none flex flex-col gap-3 min-h-[250px]">
            {chatMessages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div key={msg.id} className={`flex flex-col max-w-[90%] ${isBot ? 'self-start' : 'self-end'}`}>
                  {/* Sender Header */}
                  <div className={`text-[9px] font-black uppercase mb-0.5 tracking-widest ${isBot ? 'text-[#800000]' : 'text-[#718096] text-right'}`}>
                    {isBot ? `🦁 Vetri AI Guide` : `👤 Citizen inquiry`} — <span className="font-mono text-[8px]">{msg.timestamp}</span>
                  </div>
                  
                  {/* Bubble */}
                  <div className={`p-3 rounded-xl border border-[#800000]/20 text-xs leading-relaxed whitespace-pre-wrap ${
                    isBot 
                      ? 'bg-white text-[#1a1e3c] rounded-tl-none shadow-sm' 
                      : 'bg-[#800000] text-[#FFD700] rounded-tr-none border-none font-bold'
                  }`}>
                    {msg.text.split('\n').map((line, lineI) => (
                      <p key={lineI} className={line.trim() === '' ? 'h-2' : ''}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}

            {isSendingChat && (
              <div className="flex flex-col max-w-[80%] self-start pb-2">
                <div className="text-[9px] font-black uppercase tracking-wider text-[#800000] animate-bounce">
                  ⚡ {chatLoadingPlaceholder}
                </div>
                <div className="p-3 bg-white border border-red-200 rounded-xl rounded-tl-none text-xs text-[#718096]">
                  <span className="inline-block w-20 bg-slate-200 h-2 animate-pulse rounded mr-1"></span>
                  <span className="inline-block w-12 bg-slate-200 h-2 animate-pulse rounded mr-1"></span>
                  <span className="inline-block w-8 bg-slate-200 h-2 animate-pulse rounded"></span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Chat Form Input */}
          <form onSubmit={handleSendChat} className="p-3 bg-white border-t-4 border-[#FFD700] flex gap-2 items-center">
            <input
              type="text"
              value={chatInput}
              disabled={isSendingChat}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={t('chatPromptPlaceholder')}
              className="flex-1 h-11 bg-[#fffdf0] border-2 border-[#800000] rounded px-4 text-xs font-bold font-sans focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            />
            
            <button 
              type="submit" 
              disabled={!chatInput.trim() || isSendingChat}
              className="h-11 w-11 bg-[#800000] hover:bg-red-900 border border-[#FFD700] text-[#FFD700] rounded flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform disabled:opacity-40"
            >
              <Send size={15} />
            </button>
          </form>

        </div>

      </main>

      {/* SECTION: CITIZEN LEDGER & SECRETARIAT SIMULATOR (DURABLE PERSISTENCE LOG) */}
      <section className="mx-4 md:mx-6 mb-6 p-4 md:p-5 bg-white border-4 border-[#800000] rounded shadow-[8px_8px_0px_#800000]">
        
        {/* Ledger Header */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-b-2 border-dashed border-[#800000]/40 pb-4 mb-4">
          <div>
            <span className="text-[10px] font-black text-[#800000] tracking-widest uppercase bg-[#FFD700] px-2 py-0.5 rounded border border-[#800000] select-none">
              {t('totalInquiriesTracked')}: {filteredInquiries.length}
            </span>
            <h2 className="text-[#800000] text-base md:text-lg font-black tracking-tight uppercase leading-snug mt-1">
              💼 {t('ledgerTitle')}
            </h2>
          </div>

          {/* Combined Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full md:w-56 bg-[#fffde7] border-2 border-[#800000] rounded pl-8 pr-3 py-1 text-xs font-bold focus:outline-none"
              />
              <Search size={14} className="absolute left-2.5 top-2 text-[#800000]/60" />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-white border-2 border-[#800000] rounded px-2.5 py-1 text-xs font-bold focus:outline-none text-[#800000]"
            >
              <option value="all">📁 {t('filterAll')}</option>
              {Object.keys(SERVICE_GUIDES).map(cat => (
                <option key={cat} value={cat}>
                  {SERVICE_GUIDES[cat as InquiryCategory].icon} {lang === 'en' ? SERVICE_GUIDES[cat as InquiryCategory].title : SERVICE_GUIDES[cat as InquiryCategory].titleTa}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border-2 border-[#800000] rounded px-2.5 py-1 text-xs font-bold focus:outline-none text-[#800000]"
            >
              <option value="all">🔍 {t('statusFilterLabel')}</option>
              <option value="Pending">⏳ {t('statusPending')}</option>
              <option value="Assigned">👤 {t('statusAssigned')}</option>
              <option value="In Progress">⚙️ {t('statusProgress')}</option>
              <option value="Resolved">✅ {t('statusResolved')}</option>
            </select>

          </div>
        </div>

        {/* Responsive Table Ledger */}
        <div className="overflow-x-auto border-2 border-[#800000] rounded">
          <table className="w-full text-left border-collapse bg-[#fffdf0]">
            <thead>
              <tr className="bg-[#800000] text-white text-[10px] md:text-xs uppercase font-extrabold tracking-wider border-b border-[#800000]">
                <th className="p-3 border-r border-[#800000]/20">ID</th>
                <th className="p-3 border-r border-[#800000]/20">{t('colCategory')}</th>
                <th className="p-3 border-r border-[#800000]/20">{t('colName')}</th>
                <th className="p-3 border-r border-[#800000]/20">{t('colID')}</th>
                <th className="p-3 border-r border-[#800000]/20">{t('colDetail')}</th>
                <th className="p-3 border-r border-[#800000]/20">{t('colStatus')}</th>
                <th className="p-3 text-center">{t('actionPanel')}</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-[#800000]/20">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#718096] font-bold">
                    <HelpCircle size={24} className="mx-auto text-slate-400 mb-1 animate-bounce" />
                    {t('noInquiries')}
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => {
                  const sGuide = SERVICE_GUIDES[inq.category];
                  
                  // Status badge styling
                  let statusBg = "bg-orange-100 text-orange-800 border-orange-300";
                  let statusLabel = t('statusPending');
                  if (inq.status === 'Assigned') {
                    statusBg = "bg-blue-100 text-blue-800 border-blue-300";
                    statusLabel = t('statusAssigned');
                  } else if (inq.status === 'In Progress') {
                    statusBg = "bg-purple-100 text-purple-800 border-purple-300";
                    statusLabel = t('statusProgress');
                  } else if (inq.status === 'Resolved') {
                    statusBg = "bg-green-100 text-green-800 border-green-300";
                    statusLabel = t('statusResolved');
                  }

                  return (
                    <tr key={inq.id} className="hover:bg-white transition-all font-semibold odd:bg-[#fffdf5]">
                      {/* Ticket ID */}
                      <td className="p-3 font-mono text-[10px] text-[#800000] border-r border-[#800000]/10 shrink-0">
                        {inq.id}
                      </td>

                      {/* Category icon + short title */}
                      <td className="p-3 border-r border-[#800000]/10 shrink-0">
                        <span className="inline-flex items-center gap-1.5 uppercase font-black text-[10px] text-[#800000] bg-[#fffde7] px-2 py-0.5 rounded border border-[#FFD700]">
                          <span>{sGuide.icon}</span>
                          <span>{lang === 'en' ? sGuide.title : sGuide.titleTa}</span>
                        </span>
                      </td>

                      {/* Citizen Name */}
                      <td className="p-3 text-[#1a1e3c] font-bold border-r border-[#800000]/10">
                        {inq.citizenName}
                      </td>

                      {/* ID reference */}
                      <td className="p-3 font-mono text-[10px] text-slate-700 bg-[#fffdf0] border-r border-[#800000]/10">
                        {inq.identifier}
                      </td>

                      {/* Details context */}
                      <td className="p-3 text-[11px] text-[#4a5568] max-w-sm border-r border-[#800000]/10 leading-relaxed font-semibold">
                        {inq.detail}
                      </td>

                      {/* Welfare status */}
                      <td className="p-3 border-r border-[#800000]/10 text-center shrink-0">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-black border inline-block ${statusBg}`}>
                          {statusLabel}
                        </span>
                        <div className="text-[8px] text-slate-400 mt-0.5 font-mono">{inq.createdAt}</div>
                      </td>

                      {/* Sim actions */}
                      <td className="p-3">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-1">
                          
                          {/* Loop other status toggles */}
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleUpdateStatus(inq.id, 'In Progress')}
                              title="Investigate"
                              className="px-1.5 py-0.5 bg-purple-50 text-purple-700 text-[9px] font-black rounded border border-purple-200 hover:bg-purple-100 cursor-pointer"
                            >
                              ⚙️ Investigate
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(inq.id, 'Resolved')}
                              title="Resolve Case"
                              className="px-1.5 py-0.5 bg-green-50 text-green-700 text-[9px] font-black rounded border border-green-200 hover:bg-green-100 cursor-pointer"
                            >
                              ✓ Resolve
                            </button>
                          </div>

                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            title="Delete case"
                            className="p-1 text-red-700 hover:bg-red-100 rounded border border-red-200 flex items-center justify-center cursor-pointer ml-1"
                          >
                            <Trash2 size={11} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </section>

      {/* FOOTER BAR */}
      <footer className="mt-auto bg-[#FFD700] border-t-4 border-[#800000] flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-3.5 text-[#800000] text-[10px] md:text-xs font-black uppercase tracking-wider text-center gap-2">
        <div>
          {lang === 'en' 
            ? "Fort St. George Head office, Secretariat Chennai - 600009" 
            : "தலைமைச் செயலகம் கோட்டை செயின்ட் ஜார்ஜ், சென்னை - 600009"}
        </div>
        <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
          <span>🛡️ {t('antiCorruptionHelpline')}: 1100</span>
          <span>📧 cm.secretariat@tn.gov.in</span>
          <span>v1.2.6-stable</span>
        </div>
      </footer>

    </div>
  );
}
