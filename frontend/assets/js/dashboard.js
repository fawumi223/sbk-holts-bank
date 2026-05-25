const API_URL = "http://localhost:3000";

// Send message over the network to the Express backend
async function sendMessage() {
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;

  try {
    await fetch(`${API_URL}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender: "customer", text: text })
    });
    input.value = "";
    loadMessages(); // Refresh UI immediately after sending
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

// Fetch all messages from backend array and render them dynamically
async function loadMessages() {
  try {
    const res = await fetch(`${API_URL}/messages`);
    const messages = await res.json();
    const chatBox = document.getElementById("chatBox");
    if (!chatBox) return;

    chatBox.innerHTML = ""; // Clear old message UI blocks

    messages.forEach(msg => {
      const msgDiv = document.createElement("div");
      const isAdmin = msg.sender === "admin";
      
      // Dynamic CSS assignment based on who sent the packet
      msgDiv.className = `chat-message ${isAdmin ? 'admin-message' : 'customer-message'}`;
      
      msgDiv.innerHTML = `
        <strong>${isAdmin ? 'SBK Support' : 'Marie Coste'}</strong>
        <p>${msg.text}</p>
        <span style="font-size:10px; opacity:0.5; display:block; text-align:right; margin-top:5px;">${msg.timestamp}</span>
      `;
      chatBox.appendChild(msgDiv);
    });

    // Auto scroll down to latest message
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    console.error("Error loading chat messages:", error);
  }
}

// Check for new messages automatically every 3 seconds
setInterval(loadMessages, 3000);
loadMessages(); // Initial call when the page mounts
