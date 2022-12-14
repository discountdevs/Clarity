var WorkshopAuth = function () {
    this.workshop_instance = "https://ClarityWorkshopV2.n3rdl0rd.repl.co/";
}

WorkshopAuth.prototype.on_load = function () {
    if (this.login_status()) {
        $('#login').hide();
        $('#logout').show();
    }
}

WorkshopAuth.prototype.login_status = function () {
    return (localStorage.getItem('token') !== null);
}

WorkshopAuth.prototype.active_user = function () {
    if (this.login_status()) {
        return localStorage.getItem('user');
    } else {
        return false;
    }
}

WorkshopAuth.prototype.get_token = function () {
    if (this.login_status()) {
        return localStorage.getItem('token');
    } else {
        return false;
    }
}

WorkshopAuth.prototype.login = function (username, password) {
    var data = {
        'username': username,
        'password': password
    };

    $.ajax({
        url: this.workshop_instance + 'login',
        type: 'POST',
        data: data,
        success: function (data) {
            localStorage.setItem('token', data);
            localStorage.setItem('user', username);
            window.location.reload();
        }
    });
    return true;
}

WorkshopAuth.prototype.signup = function (username, password) {
    var data = {
        'username': username,
        'password': password
    };

    $.ajax({
        url: this.workshop_instance + 'signup',
        type: 'POST',
        data: data,
        success: function (data) {
            if (data == "username taken") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Username already taken!',
                });
            } else {
                this.login(username, password);
            }
        }
    });
    return true;
}

WorkshopAuth.prototype.logout = function () {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    var data = { 'username': this.active_user() };
    // Send the request to the server
    $.ajax({
        url: this.workshop_instance + 'logout',
        type: 'POST',
        data: data,
        success: function (data) {
            window.location.reload();
        }
    });
    return true;
}

WorkshopAuth.prototype.switch_instance = function (instance) {
    this.logout();
    this.workshop_instance = instance;
    this.show_login_prompt();
    return this.workshop_instance;
}

WorkshopAuth.prototype.upload_level = function (level, name, description) {
    var data = {
        'lvl': level,
        'name': name,
        'description': description,
        'token': this.get_token(),
    };

    if (data.token === false) {
        return false; // Ensure that the token is valid
    }

    $.ajax({
        url: this.workshop_instance + 'add',
        type: 'POST',
        data: data,
        success: function (data) {
            Swal.fire({
                icon: 'success',
                title: 'Whoosh!',
                text: 'Your level has been folded into a paper airplane and passed along to the workshop.',
            });
        }
    });

    return true;
}

WorkshopAuth.prototype.list_all_levels = function (callback) {
    $.ajax({
        url: this.workshop_instance + 'listall',
        type: 'GET',
        success: function (data) {
            callback(data);
        }
    });

    return true;
}

WorkshopAuth.prototype.list_levels_page = function (callback, page) {
    $.ajax({
        url: this.workshop_instance + 'list/' + page,
        type: 'GET',
        success: function (data) {
            callback(data);
        }
    });

    return true;
}

WorkshopAuth.prototype.get_level = function (callback, id) {
    $.ajax({
        url: this.workshop_instance + 'lvl/' + id,
        type: 'GET',
        success: function (data) {
            callback(data);
        }
    });

    return true;
}

WorkshopAuth.prototype.get_level_meta = function (callback, id) {
    $.ajax({
        url: this.workshop_instance + 'lvlmeta/' + id,
        type: 'GET',
        success: function (data) {
            callback(data);
        }
    });

    return true;
}

WorkshopAuth.prototype.check_instance_status = function (callback) {
    $.ajax({
        url: this.workshop_instance,
        type: 'GET',
        success: function (data) {
            if (data === "Clarity Workshop OK") {
                callback(true);
            } else {
                callback(false);
            }
        }
    });
    return true;
}

WorkshopAuth.prototype.show_signup_prompt = function () {
    Swal.fire({
        title: 'Sign up for the Clarity Workshop',
        html: `<input type="text" id="login-input" class="swal2-input" placeholder="Username">
        <input type="password" id="password-input" class="swal2-input" placeholder="Password"><br>
        Already got an account? <a href="#" style="color:aqua;" onclick="workshop.show_login_prompt()">Login</a>`,
        confirmButtonText: 'Sign up',
        focusConfirm: false,
        preConfirm: () => {
            const login = Swal.getPopup().querySelector('#login-input').value
            const password = Swal.getPopup().querySelector('#password-input').value

            if (!login && !password) {
                Swal.showValidationMessage(`Enter a username and password, you buffoon!`);
            } else {
                if (!login) {
                    Swal.showValidationMessage(`You call that a username? I call it a joke!`);
                }
                if (!password) {
                    Swal.showValidationMessage(`Your password is underwhelming, to say the least.`);
                }
            }
            return { login: login, password: password }
        }
    }).then((result) => {
        this.signup(result.value.login, result.value.password);
    });
    return true;
}

WorkshopAuth.prototype.show_login_prompt = function () {
    Swal.fire({
        title: 'Login to the Clarity Workshop',
        html: `<input type="text" id="login-input" class="swal2-input" placeholder="Username">
        <input type="password" id="password-input" class="swal2-input" placeholder="Password">
        No account? <a href="#" style="color:aqua;" onclick="workshop.show_signup_prompt()">Register</a>`,
        confirmButtonText: 'Sign in',
        focusConfirm: false,
        preConfirm: () => {
            const login = Swal.getPopup().querySelector('#login-input').value
            const password = Swal.getPopup().querySelector('#password-input').value

            if (!login && !password) {
                Swal.showValidationMessage(`Enter a username and password, you buffoon!`);
            } else {
                if (!login) {
                    Swal.showValidationMessage(`Well, somebody pressed enter too soon.`);
                }
                if (!password) {
                    Swal.showValidationMessage(`What. A. Loser. Enter a fricking password.`);
                }
            }
            return { login: login, password: password }
        }
    }).then((result) => {
        this.login(result.value.login, result.value.password);
    });
    return true;
}