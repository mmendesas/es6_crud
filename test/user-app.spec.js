// import chai
let chai = require('chai');
let path = require('path');
let jsdom = require('jsdom')

chai.should();

// let UserApp = require(path.join(__dirname, '../src/user-app'));
// let Rectangle = require(path.join(__dirname, '../src/rectangle'));

import Rectangle from '../src/rectangle';
import UserApp from '../src/user-app';

describe('UserApp', () => {
    let rectangle;
    let user;

    beforeEach(() => {
        // const jsdom = new jsdom("<html></html>");
        const { window } = jsdom;

        global.document = jsdom;
        global.window = window;
        global.navigator = {
            userAgent: "node.js"
        };
        // jsdom();
        // document.innerHTML = '../index.html';

        rectangle = new Rectangle(10, 20);

        // console.log(global.window);

        // window.addEventListener('load', () => new UserApp());
    });

    it('returns some text', () => {
        // let test = user.someText('mteste');
        // console.log(user.area());
        rectangle.width.should.equal(10);
        console.log(rectangle.width);
    });
})