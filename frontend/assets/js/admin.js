const API_URL = "https://sbk-holts-bank.onrender.com";

// Send an administrative reply to the server array
async function sendAdminReply() {
  const input = document.getElementById("adminInput");
  const text = input.value.trim();
  if (!text) return;

  try {
    await fetch(`${API_URL}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender: "admin", text: text })
    });
    input.value = "";
    loadAdminMessages(); // Instant layout refresh
  } catch (error) {
    console.error("Error pushing admin reply:", error);
  }
}

// Sync script to monitor customer messages
async function loadAdminMessages() {
  try {
    const res = await fetch(`${API_URL}/messages`);
    const messages = await res.json();
    const adminChatBox = document.getElementById("adminChatBox");
    if (!adminChatBox) return;

    adminChatBox.innerHTML = "";

    messages.forEach(msg => {
      const msgDiv = document.createElement("div");
      const isAdmin = msg.sender === "admin";

      msgDiv.className = `chat-message ${isAdmin ? 'admin-message' : 'customer-message'}`;
      
      msgDiv.innerHTML = `
        <strong>${isAdmin ? 'SBK Support (You)' : 'Marie Coste'}</strong>
        <p>${msg.text}</p>
        <span style="font-size:10px; opacity:0.5; display:block; text-align:right; margin-top:5px;">${msg.timestamp}</span>
      `;
      adminChatBox.appendChild(msgDiv);
    });

    adminChatBox.scrollTop = adminChatBox.scrollHeight;
  } catch (error) {
    console.error("Error updating admin desk data:", error);
  }
}

// Keep updating the inbox panel automatically
setInterval(loadAdminMessages, 3000);
loadAdminMessages();
