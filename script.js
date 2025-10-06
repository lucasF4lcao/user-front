document.addEventListener("DOMContentLoaded", () => {
  const apiBase = "https://user-api-production-49af.up.railway.app";

  const toast = document.getElementById("toast");
  function showToast(message, type = "success") {
    toast.textContent = message;
    toast.style.background = type === "error" ? "#e74c3c" : "#8e44ad";
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
  }

  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabForms = document.querySelectorAll(".tab-form");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const tab = btn.getAttribute("data-tab");
      tabForms.forEach((f) => f.classList.remove("active"));
      document.getElementById(tab + "Form")?.classList.add("active");
    });
  });

  const urlParams = new URLSearchParams(window.location.search);
  const referralCodeFromURL = urlParams.get("ref");

  const registerForm = document.getElementById("registerForm");
  registerForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!validateEmail(email)) return showToast("E-mail inválido!", "error");
    if (!validatePassword(password))
      return showToast(
        "Senha deve ter pelo menos 8 caracteres com letras e números",
        "error"
      );

    try {
      const res = await fetch(`${apiBase}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          referralCode: referralCodeFromURL || "",
        }),
      });

      if (!res.ok) throw new Error("Erro ao cadastrar");
      showToast("Cadastro realizado com sucesso!");
    } catch (err) {
      showToast(err.message, "error");
    }
  });

  const loginForm = document.getElementById("loginForm");
  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    try {
      const res = await fetch(`${apiBase}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Login falhou");

      const data = await res.json();
      localStorage.setItem("token", data.token);
      window.location.href = "profile.html";
    } catch (err) {
      showToast(err.message, "error");
    }
  });

  if (window.location.pathname.endsWith("profile.html")) {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "index.html";

    const logoutBtn = document.getElementById("logoutBtn");

    fetch(`${apiBase}/users/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((user) => {
        document.getElementById("userName").innerText = user.name;
        document.getElementById("userPoints").innerText = user.points;
        document.getElementById("userAvatar").innerText = user.name
          .charAt(0)
          .toUpperCase();

        const link = `${window.location.origin}/index.html?ref=${user.referralCode}`;
        const referralInput = document.getElementById("referralLink");
        referralInput.value = link;

        document.getElementById("copyBtn").addEventListener("click", () => {
          navigator.clipboard.writeText(link);
          showToast("Link copiado!");
        });
      })
      .catch(() => {
        showToast("Erro ao carregar perfil", "error");
        localStorage.removeItem("token");
        window.location.href = "index.html";
      });

    logoutBtn?.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "index.html";
    });
  }

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function validatePassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  }
});
