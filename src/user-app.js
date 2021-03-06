import UserList from './user-list';

class UserApp {

    constructor() {

        // main user list
        this.userList = new UserList([]);
        this.firstPage = true;

        // dom elements
        this.userTable = document.getElementById('userList');
        this.form = document.querySelector("#mainForm");

        // loads all users.
        this.loadUsers();

        // click listener
        document.querySelector('#saveUser').addEventListener('click', () => this.saveUser());
        document.querySelector('#changeView').addEventListener('click', () => this.changeView());
    }

    loadUsers() {
        if (localStorage['user-list']) {
            // display users from current user-list
            this.userList.setUserList(JSON.parse(localStorage['user-list']));
            this.userList.getAllUsers().map(item => this.displayUser(item));
        } else {
            // get info from apiary in the first load
            fetch("https://private-21e8de-rafaellucio.apiary-mock.com/users")
                .then(response => response.json())
                .then(list => {
                    this.updateLocalStorage(list);
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

        // I know there must be a better implementation than that.
        let calledMethod = (mclass === "edit") ? (event) => this.editUser(event) : (event) => this.deleteUser(event);
        customBTN.addEventListener('click', calledMethod);

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

            this.userList.addUser(user);
            this.updateLocalStorage(this.userList.getAllUsers());
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

    deleteUser(event) {
        let currentLine = event.target.parentNode.parentNode;
        let idx = currentLine.rowIndex - 1;

        // remove line from view
        currentLine.classList.add("fadeOut");
        setTimeout(() => currentLine.remove(), 500);

        // update the list
        this.userList.deleteUser(idx);
        this.updateLocalStorage(this.userList.getAllUsers())
    }

    editUser(event) {
        let currentLine = event.target.parentNode.parentNode;
        let idx = currentLine.rowIndex - 1;
        let userToEdit = this.userList[idx];

        setTimeout(() => {
            this.form.name.value = userToEdit.name;
            this.form.email.value = userToEdit.email;
            this.form.phone.value = userToEdit.phone;
            this.form.cpf.value = userToEdit.cpf;

            this.deleteUser(event);
            this.changeView();
        }, 500);
    }

    changeView() {
        let page01 = document.querySelector("#register-page");
        let page02 = document.querySelector("#list-page");

        if (!this.firstPage) {
            page01.classList.remove("hide");
            page02.classList.add("hide");

        } else {
            page01.classList.add("hide");
            page02.classList.remove("hide");
        }

        document.querySelector("#changeView").textContent = this.firstPage ? 'Novo Usuario' : 'Ver Lista';
        this.firstPage = !this.firstPage;
    }

    updateLocalStorage(list) {
        localStorage.setItem("user-list", JSON.stringify(list));
    }
}

export default UserApp;