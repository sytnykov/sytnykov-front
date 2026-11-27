export interface TelegramFormData {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  course?: string;
  messageFrom?: string;
  company?: string;
  /** ms since the form was opened — used for the anti-spam time check */
  elapsed?: number;
}

const sendTelegramMessage = async (
  data: TelegramFormData
): Promise<boolean> => {
  try {
    const response = await fetch("/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        page: typeof window !== "undefined" ? window.location.pathname : "",
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("Sending error in Telegram:", error);
    return false;
  }
};

export default sendTelegramMessage;
