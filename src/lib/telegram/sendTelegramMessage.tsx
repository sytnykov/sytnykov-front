export interface TelegramFormData {
  name: string;
  phone: string;
  message?: string;
}

const sendTelegramMessage = async (
  data: TelegramFormData
): Promise<boolean> => {
  try {
    const response = await fetch("/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return response.ok;
  } catch (error) {
    console.error("Sending error in Telegram:", error);
    return false;
  }
};

export default sendTelegramMessage;
