import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
        // Return a highly helpful offline/fallback simulation answer
        const fallbackText = getOfflineFallbackResponse(message);
        return res.json({ text: fallbackText, isMock: true });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Prepare contents history in Google GenAI SDK format
      // { role: "user" | "model", parts: [{ text: "..." }] }
      const contents = (history || []).map((h: any) => ({
        role: h.role === "bot" || h.role === "model" ? "model" : "user",
        parts: [{ text: h.text || h.parts?.[0]?.text || "" }]
      }));

      // Append current message
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction: `You are "Vettri Sevai AI", the official bilingual (English & Tamil) citizen enquiry assistant for the 2026 Government of Tamil Nadu under the visionary leadership of Chief Minister C. Joseph Vijay.
Context details for 2026:
1. Ground your knowledge in 2026 administration goals, including zero-tolerance for corruption, digital Patta transfers, and smart meters.
2. Main services:
   - Electricity (EB) / TANGEDCO: Smart meters, tracking via 'Vetri EB' App, high billing disputes, 48-hr new connection approval with Patta.
   - Ration / TNPDS: "Pasiyilla Thamizhagam" (Doorstep home delivery, TNPDS 2.0 app, 7-day card processing, 1967 toll-free quality line).
   - Land & Patta: Automated transfers, survey number queries, eservices.tn.gov.in database.
   - Women Welfare: "Vetri Magalir Urimai Thittam" ₹1,500 monthly credit on 1st of every month for family incomes below ₹5 Lakhs.
   - Education: Vetri Skill Labs/robotics hubs & August 2026 free tablet distributions.
   - Public Grievance: "Thooya Arasu" direct Secretariat portal, CM Helpline 1100, guaranteed 48-hour response.
3. Language & Tone: Always respond in the language used by the citizen (English or Tamil). Be polite, encouraging, formal, and bilingually ready.
4. End with helper sign-off: "Is there anything else I can help you with? / வேறு ஏதாவது உதவி வேண்டுமா? 🙏"`,
        }
      });

      const text = response.text || "I apologize, I could not generate a response right now. Please try again or use the offline guides. / மன்னிக்கவும், இப்போது பதிலளிக்க முடியவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.";
      return res.json({ text, isMock: false });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      const fallbackText = getOfflineFallbackResponse(req.body.message);
      return res.json({
        text: fallbackText,
        isMock: true,
        error: err.message
      });
    }
  });

  // Offline fallback responder to guarantee beautiful user experiences even if the api key is offline!
  function getOfflineFallbackResponse(message: string): string {
    const msg = message.toLowerCase();
    
    if (msg.includes("hi") || msg.includes("hello") || msg.includes("வணக்கம்") || msg.includes("welcome")) {
      return `வணக்கம்! 🙏 Welcome to Vettri Sevai AI (Offline Mode). I can assist you with Electricity, Ration cards, Patta transfers, Welfare policies, or Education updates. Please try typing a keyword or clicking any of the quick-guides in the sidebar to get instant services under CM C. Joseph Vijay's 2026 administration.\n\nIs there anything else I can help you with? / வேறு ஏதாவது உதவி வேண்டுமா? 🙏`;
    }
    
    if (msg.includes("eb") || msg.includes("electricity") || msg.includes("மின்சாரம்") || msg.includes("bill") || msg.includes("meter")) {
      return `⚡ **Electricity Directory (TANGEDCO 2026)**:\nAll EB connections are transitioning to Smart Meters monitored via the "Vetri EB" app. New connection requests take just 48 hours once digital Patta is verified.\n\nWould you like to register an EB enquiry? Select the "Electricity" button on the sidebar to launch the inquiry form!\n\nIs there anything else I can help you with? / வேறு ஏதாவது உதவி வேண்டுமா? 🙏`;
    }
    
    if (msg.includes("ration") || msg.includes("tnpds") || msg.includes("உணவு") || msg.includes("அட்டை") || msg.includes("rice") || msg.includes("sugar")) {
      return `🍚 **Doorstep Ration Delivery (2026 Pasiyilla Thamizhagam)**:\nYou can schedule automated home delivery using the modern TNPDS 2.0 app. New family card applications undergo fast Aadhaar validation within 7 days. Call 1967 for complaints.\n\nWould you like to lodge a ration service request? Click the "Ration" button to get started.\n\nIs there anything else I can help you with? / வேறு ஏதாவது உதவி வேண்டுமா? 🙏`;
    }

    if (msg.includes("patta") || msg.includes("land") || msg.includes("நிலம்") || msg.includes("பட்டா") || msg.includes("survey")) {
      return `📄 **Land Records & Patta Transfer**:\nAutomatic transfers are now 100% digital for registered sale deeds in 2026. Check status on eservices.tn.gov.in.\n\nType your Survey Number or use our "Patta & Land" dynamic sidebar form to draft an inquiry.\n\nIs there anything else I can help you with? / வேறு ஏதாவது உதவி வேண்டுமா? 🙏`;
    }

    if (msg.includes("women") || msg.includes("magalir") || msg.includes("support") || msg.includes("1500") || msg.includes("₹") || msg.includes("rupees")) {
      return `👩 **Vetri Magalir Urimai Thittam**:\nMonthly support of ₹1,500 is credited directly into bank accounts on the 1st of every month for women of households earning below ₹5 Lakhs per year. Verify status with your Aadhaar/Ration card.\n\nIs there anything else I can help you with? / வேறு ஏதாவது உதவி வேண்டுமா? 🙏`;
    }

    if (msg.includes("edu") || msg.includes("student") || msg.includes("scholarship") || msg.includes("tablet") || msg.includes("school")) {
      return `🎓 **Education & Vetri Skill Hubs**:\nFree tablets are being distributed in August 2026 to all 11th & 12th state board students. Vetri Skill Labs offer free certified robotics and AI courses to Tamil Nadu youths.\n\nIs there anything else I can help you with? / வேறு ஏதாவது உதவி வேண்டுமா? 🙏`;
    }

    if (msg.includes("grievance") || msg.includes("complaint") || msg.includes("secretariat") || msg.includes("corruption") || msg.includes("1100")) {
      return `📢 **CM Direct Grievance Portal (Thooya Arasu)**:\nCM C. Joseph Vijay enforces strict zero-corruption policies. Dial 1100 toll-free or file a complaint with photo evidence for secretariat action within 48 hours.\n\nIs there anything else I can help you with? / வேறு ஏதாவது உதவி வேண்டுமா? 🙏`;
    }

    return `Under the 2026 welfare administration of CM C. Joseph Vijay, your inquiry has been logged in our system. For responsive, intelligent guidance, you may key in your particular details such as Consumer Numbers, Aadhaar, Survey Numbers or select one of our tailored service widgets from the side panel! 🙏\n\nIs there anything else I can help you with? / வேறு ஏதாவது உதவி வேண்டுமா? 🙏`;
  }

  // Vite Integration for Dev vs Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Vettri Sevai server running on http://localhost:${PORT}`);
  });
}

startServer();
