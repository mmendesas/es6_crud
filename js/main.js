class UserApp {

    constructor() {

        // main user list
        this.userList = [];

        // dom elements
        this.userTable = document.getElementById('userList');
        this.form = document.querySelector("#mainForm");

        // loads all users.
        this.loadUsers();

        // click listener
        document.querySelector('#saveUser').addEventListener('click', () => this.saveUser());
    }

    loadUsers() {
        if (localStorage['user-list']) {
            // display users from current user-list
            this.userList = JSON.parse(localStorage['user-list']);
            this.userList.map(item => this.displayUser(item));

        } else {
            // get info from apiary in the first load
            fetch("https://private-21e8de-rafaellucio.apiary-mock.com/users")
                .then(response => response.json())
                .then(list => {
                    localStorage.setItem("user-list", JSON.stringify(list));
                    this.loadUsers();
                });
        }
    }

    displayUser(user) {
        let row = this.userTable.insertRow();

        row.insertCell(0).innerHTML = user.name;
        row.insertCell(1).innerHTML = user.phone;
        row.insertCell(2).innerHTML = user.email;
        row.insertCell(3).innerHTML = user.cpf;

        let td = row.insertCell(4);
        td.appendChild(this.createButton("Editar", "edit"));
        td.appendChild(this.createButton("Deletar", "delete"));
    }

    createButton(mtext, mclass) {
        let customBTN = document.createElement('button');
        customBTN.setAttribute("class", mclass);
        customBTN.textContent = mtext;

        return customBTN;
    }

    saveUser() {

        this.checkFields();

        if (this.form.checkValidity()) {
            var user = {
                name: this.form.name.value,
                phone: this.form.phone.value,
                email: this.form.email.value,
                cpf: this.form.cpf.value
            }

            this.userList.push(user);
            localStorage.setItem("user-list", JSON.stringify(this.userList));
        }
    }

    checkFields() {
        let msgs = document.querySelectorAll(".msg");
        let inputs = document.querySelectorAll(".row > input")

        for (let i = 0; i < 4; i += 1) {
            // reset error messages
            msgs[i].classList.add('hide');
            inputs[i].classList.remove('error');

            if (inputs[i].value.length < 3) {
                msgs[i].classList.remove('hide');
                inputs[i].classList.add('error');
            }
        }
    }
}

// On load start the app.
window.addEventListener('load', () => new UserApp());