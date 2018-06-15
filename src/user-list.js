
class UserList {
    constructor(list) {
        this.users = list;
    }

    setUserList(list) {
        this.users = list;
    }

    getAllUsers() {
        return this.users;
    }

    addUser(user) {
        this.users.push(user);
    }

    deleteUser(index) {
        this.users.splice(index, 1);
    }

}

export default UserList;