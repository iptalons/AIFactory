// Call Worker API endpoints instead of Gemini directly
const API_BASE = ''; // Empty string means same origin (Worker)

export const generateFactoryResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt }),
    });

    const data = await response.json();

    if (data.error) {
      return `දෝෂයක්: ${data.error}`;
    }

    return data.response || "ක්ෂමාවන්න, මට පිළිතුරක් ලබා දීමට නොහැකි විය.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "දෝෂයක් සිදුවිය. කරුණාකර ඔබගේ අන්තර්ජාල සම්බන්ධතාවය පරීක්ෂා කරන්න.";
  }
};

export const translateToSinhala = async (englishText: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE}/api/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: englishText }),
    });

    const data = await response.json();

    if (data.error) {
      return `දෝෂයක්: ${data.error}`;
    }

    return data.translation || "පරිවර්තනය අසාර්ථක විය.";
  } catch (error) {
    console.error("Translation Error:", error);
    return "පරිවර්තනය කිරීමේදී දෝෂයක් සිදුවිය.";
  }
};

export const draftBusinessEmail = async (details: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE}/api/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ details }),
    });

    const data = await response.json();

    if (data.error) {
      return `දෝෂයක්: ${data.error}`;
    }

    return data.email || "ලිපිය සැකසීම අසාර්ථක විය.";
  } catch (error) {
    console.error("Email Draft Error:", error);
    return "ලිපිය සැකසීමේදී දෝෂයක් සිදුවිය.";
  }
};