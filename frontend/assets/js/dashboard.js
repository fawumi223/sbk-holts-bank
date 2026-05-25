// =====================================
// LOGIN SYSTEM
// =====================================

const loginForm =
  document.getElementById("loginForm");


if(loginForm){

  loginForm.addEventListener(
    "submit",
    function(e){

      e.preventDefault();

      const username =
        document.getElementById(
          "username"
        ).value;

      const password =
        document.getElementById(
          "password"
        ).value;



      if(

        username === "Marie.holts" &&
        password === "Marie085216"

      ){

        localStorage.setItem(
          "loggedIn",
          "true"
        );

        window.location.href =
          "dashboard.html";

      }

      else{

        alert(
          "Invalid Secure Credentials"
        );

      }

    }
  );

}



// =====================================
// SESSION CHECK
// =====================================

if(
  window.location.pathname.includes(
    "dashboard.html"
  )
){

  const isLoggedIn =
    localStorage.getItem(
      "loggedIn"
    );

  if(isLoggedIn !== "true"){

    window.location.href =
      "login.html";

  }

}



// =====================================
// LOGOUT
// =====================================

function logout(){

  localStorage.removeItem(
    "loggedIn"
  );

  window.location.href =
    "login.html";

}



// =====================================
// TRANSFER RESTRICTION
// =====================================

const transferBtn =
  document.getElementById(
    "transferBtn"
  );


if(transferBtn){

  transferBtn.addEventListener(
    "click",
    function(){

      alert(

        "Transfers are currently restricted on this account. Please contact SBK-Holts Secure Support Division."

      );

      document
        .getElementById("chatInput")
        .focus();

    }
  );

}



// =====================================
// RENDER MESSAGES
// =====================================

function renderMessages(){

  const customerChat =
    document.getElementById(
      "chatBox"
    );

  const adminChat =
    document.getElementById(
      "adminChatBox"
    );


  const messages =
    JSON.parse(
      localStorage.getItem(
        "messages"
      )
    ) || [];



  // =========================
  // CUSTOMER CHAT
  // =========================

  if(customerChat){

    customerChat.innerHTML = "";


    messages.forEach(msg => {

      const div =
        document.createElement("div");



      if(msg.type === "customer"){

        div.className =
          "chat-message customer-message";

      }

      else{

        div.className =
          "chat-message admin-message";

      }



      div.innerHTML = `

        <strong>${msg.sender}</strong>

        <p>${msg.text}</p>

      `;

      customerChat.appendChild(div);

    });



    customerChat.scrollTop =
      customerChat.scrollHeight;

  }



  // =========================
  // ADMIN CHAT
  // =========================

  if(adminChat){

    adminChat.innerHTML = "";


    messages.forEach(msg => {

      const div =
        document.createElement("div");



      if(msg.type === "customer"){

        div.className =
          "chat-message customer-message";

      }

      else{

        div.className =
          "chat-message admin-message";

      }



      div.innerHTML = `

        <strong>${msg.sender}</strong>

        <p>${msg.text}</p>

      `;

      adminChat.appendChild(div);

    });



    adminChat.scrollTop =
      adminChat.scrollHeight;

  }

}



// =====================================
// CUSTOMER SEND MESSAGE
// =====================================

function sendMessage(){

  const input =
    document.getElementById(
      "chatInput"
    );


  const text =
    input.value.trim();



  if(text === "")
    return;



  const messages =
    JSON.parse(
      localStorage.getItem(
        "messages"
      )
    ) || [];



  messages.push({

    sender:
      "Marie Costa",

    text:
      text,

    type:
      "customer",

    timestamp:
      Date.now()

  });



  localStorage.setItem(

    "messages",

    JSON.stringify(messages)

  );



  input.value = "";



  renderMessages();

}



// =====================================
// ADMIN SEND MESSAGE
// =====================================

function sendAdminReply(){

  const input =
    document.getElementById(
      "adminReplyInput"
    );


  const text =
    input.value.trim();



  if(text === "")
    return;



  const messages =
    JSON.parse(
      localStorage.getItem(
        "messages"
      )
    ) || [];



  messages.push({

    sender:
      "SBK-Holts Support",

    text:
      text,

    type:
      "admin",

    timestamp:
      Date.now()

  });



  localStorage.setItem(

    "messages",

    JSON.stringify(messages)

  );



  input.value = "";



  renderMessages();

}



// =====================================
// ENTER KEY SUPPORT
// =====================================

document.addEventListener(
  "keydown",
  function(e){

    // CUSTOMER ENTER

    const customerInput =
      document.getElementById(
        "chatInput"
      );

    if(

      customerInput &&
      document.activeElement === customerInput &&
      e.key === "Enter"

    ){

      sendMessage();

    }



    // ADMIN ENTER

    const adminInput =
      document.getElementById(
        "adminReplyInput"
      );

    if(

      adminInput &&
      document.activeElement === adminInput &&
      e.key === "Enter"

    ){

      sendAdminReply();

    }

  }
);



// =====================================
// LIVE REALTIME UPDATE
// =====================================

window.addEventListener(
  "storage",
  function(){

    renderMessages();

  }
);



// =====================================
// AUTO REFRESH
// =====================================

setInterval(() => {

  renderMessages();

}, 500);



// =====================================
// INITIAL RENDER
// =====================================

renderMessages();
