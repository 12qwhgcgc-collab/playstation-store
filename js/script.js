document.addEventListener("DOMContentLoaded", () => {

    // начальные данные
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify([
            { login: "admin", password: "1234" }
        ]));
    }

    if (!localStorage.getItem("orders")) {
        localStorage.setItem("orders", JSON.stringify([]));
    }

    const authBlock = document.getElementById("authBlock");
    const loginForm = document.getElementById("loginForm");
    const loginInput = document.getElementById("login");
    const passwordInput = document.getElementById("password");
    const loginStatus = document.getElementById("loginStatus");
    const logoutBtn = document.getElementById("logoutBtn");

    const currentUser = localStorage.getItem("currentUser");

    // если пользователь уже вошёл
    if (currentUser && authBlock) {
        authBlock.style.display = "none";
    }

    // авторизация
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const login = loginInput.value.trim();
            const password = passwordInput.value.trim();

            const users = JSON.parse(localStorage.getItem("users"));
            const user = users.find(u => u.login === login && u.password === password);

            if (user) {
                localStorage.setItem("currentUser", login);
                loginStatus.textContent = "Вы вошли как " + login;
                authBlock.style.display = "none";
            } else {
                loginStatus.textContent = "Неверный логин или пароль";
            }
        });
    }

    // выход
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            location.reload();
        });
    }

    // покупка товара
    document.querySelectorAll(".buy-btn").forEach(btn => {
        btn.addEventListener("click", () => {

            const user = localStorage.getItem("currentUser");
            const status = btn.nextElementSibling;

            if (!user) {
                status.textContent = "Сначала войдите в систему";
                return;
            }

            const productTitle = document.querySelector("h1").textContent;

            const orders = JSON.parse(localStorage.getItem("orders"));

            orders.push({
                user: user,
                product: productTitle,
                date: new Date().toLocaleString()
            });

            localStorage.setItem("orders", JSON.stringify(orders));

            status.textContent = "Покупка оформлена";
        });
    });

});
