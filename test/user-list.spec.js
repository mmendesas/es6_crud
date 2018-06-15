// import chai
let chai = require('chai');
chai.should();


import UserList from '../src/user-list';

describe('UserList', () => {
    let userlist = new UserList([]);
    const data = [
        { name: "My name 1", cpf: "04080757247", phone: "11987654321", email: "myemail1@test.com.br" },
        { name: "My name 2", cpf: "77797584192", phone: "11987654321", email: "myemail2@test.com.br" },
        { name: "My name 3", cpf: "45486737688", phone: "11987654321", email: "myemail3@test.com.br" }
    ]

    beforeEach(() => {
        let mData = JSON.parse(JSON.stringify(data));
        userlist.setUserList(mData);
    });

    it('should contains the correct number of items', () => {
        userlist.getAllUsers().length.should.equal(3);
    });

    it('should be able to add user', () => {
        let someuser = JSON.parse(JSON.stringify(data[0]));
        someuser.name = "mteste"
        userlist.addUser(someuser);
        userlist.getAllUsers().length.should.equal(4);
    });

    it('should be able to remove user', () => {
        userlist.deleteUser(1);
        userlist.getAllUsers().length.should.equal(2);
    });
})