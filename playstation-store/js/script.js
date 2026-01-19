console.log("JS запущен");
localStorage.setItem("check", "ok");

document.addEventListener("DOMContentLoaded", () => {

    localStorage.setItem("users", JSON.stringify([
        { id: 1, login: "admin", password: "1234" }
    ]));

    if (!localStorage.getItem("orders")) {
        localStorage.setItem("orders", JSON.stringify([]));
    }

    const authBlock = document.getElementById("authBlock");
    const loginForm = document.getElementById("loginForm");
    const loginInput = document.getElementById("login");
    const passwordInput = document.getElementById("password");
    const status = document.getElementById("loginStatus");
    const toggleBtn = document.getElementById("togglePassword");
    const logoutBtn = document.getElementById("logoutBtn");

    const currentUser = localStorage.getItem("currentUser");

    if (currentUser && authBlock) {
        authBlock.style.display = "none";
    }

    if (!currentUser && logoutBtn) {
        logoutBtn.style.display = "none";
    }

    if (loginForm) {
        loginForm.addEventListener("submit", e => {
            e.preventDefault();

            const login = loginInput.value.trim();
            const password = passwordInput.value.trim();

            const users = JSON.parse(localStorage.getItem("users"));
            const user = users.find(
                u => u.login === login && u.password === password
            );

            if (user) {
                localStorage.setItem("currentUser", login);
                status.textContent = "Вы вошли как " + login;
                authBlock.style.display = "none";
                if (logoutBtn) logoutBtn.style.display = "inline-block";
            } else {
                status.textContent = "Неверный логин или пароль";
            }
        });
    }

    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener("click", () => {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                toggleBtn.textContent = "Скрыть пароль";
            } else {
                passwordInput.type = "password";
                toggleBtn.textContent = "Показать пароль";
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            location.reload();
        });
    }

    document.querySelectorAll(".buy-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const user = localStorage.getItem("currentUser");
            const statusBuy = btn.nextElementSibling;

            if (!user) {
                statusBuy.textContent = "Сначала войдите в систему";
                return;
            }

            const product = btn.closest(".product-card")
                .querySelector("h1").textContent;

            const orders = JSON.parse(localStorage.getItem("orders"));

            orders.push({
                id: orders.length + 1,
                user: user,
                product: product,
                date: new Date().toLocaleString()
            });

            localStorage.setItem("orders", JSON.stringify(orders));
            statusBuy.textContent = "Покупка оформлена";
        });
    });

});
