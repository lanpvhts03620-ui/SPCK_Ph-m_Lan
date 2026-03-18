document.addEventListener("DOMContentLoaded", () => {

    const registerButton = document.getElementById("register");
    const loginButton = document.getElementById("login");
    const container = document.getElementById("container");

    const registerForm = document.querySelector(".register-container form");
    const loginForm = document.querySelector(".login-container form");

    const showMessage = (form, message, color = "red") => {
        let oldMessage = form.querySelector(".message");
        if (oldMessage) oldMessage.remove();

        const msg = document.createElement("p");
        msg.className = "message";
        msg.textContent = message;
        msg.style.color = color;
        msg.style.marginTop = "10px";

        form.appendChild(msg);
    };

    /* ===== CHUYỂN PANEL ===== */
    registerButton.addEventListener("click", () => {
        container.classList.add("right-panel-active");
    });

    loginButton.addEventListener("click", () => {
        container.classList.remove("right-panel-active");
    });

    /* ===== ĐĂNG KÝ ===== */
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = registerForm.querySelector("input[type='text']").value.trim();
        const email = registerForm.querySelector("input[type='email']").value.trim();
        const password = registerForm.querySelector("input[type='password']").value.trim();

        if (!username || !email || !password) {
            showMessage(registerForm, "Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (password.length < 6) {
            showMessage(registerForm, "Mật khẩu phải có ít nhất 6 ký tự!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const emailExists = users.some(user => user.email === email);
        if (emailExists) {
            showMessage(registerForm, "Email đã tồn tại!");
            return;
        }

        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        showMessage(registerForm, "Đăng ký thành công!", "green");

        setTimeout(() => {
            window.location.href = "index.html";
        });
    });

    /* ===== ĐĂNG NHẬP ===== */
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = loginForm.querySelector("input[type='email']").value.trim();
        const password = loginForm.querySelector("input[type='password']").value.trim();

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const validUser = users.find(user => user.email === email && user.password === password);

        if (!validUser) {
            showMessage(loginForm, "Sai email hoặc mật khẩu!");
            return;
        }

        showMessage(loginForm, `Chào ${validUser.username}! Đăng nhập thành công!`, "green");

        if (loginForm.querySelector("#checkbox").checked) {
            localStorage.setItem("rememberEmail", email);
        } else {
            localStorage.removeItem("rememberEmail");
        }

        setTimeout(() => {
            window.location.href = "index.html";
        });

        loginForm.reset();
    });

    /* ===== GHI NHỚ EMAIL ===== */
    const rememberedEmail = localStorage.getItem("rememberEmail");
    if (rememberedEmail) {
        loginForm.querySelector("input[type='email']").value = rememberedEmail;
        loginForm.querySelector("#checkbox").checked = true;
    }

});