async function getMessage() {
    const response = await fetch('/');
    const message = await response.text();
    document.getElementById('message').textContent = message;
  }
  
  getMessage();
  