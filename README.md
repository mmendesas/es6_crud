# es6_crud
Simple es6 CRUD without framework

## Test the Application

### Prerequisites
    - nodejs
    - protractor

### Setting up

Here's what you need to do for test the solution:

1 - Install the application dependencies

```shell
git clone https://github.com/mmendesas/es6_crud.git
cd es6-crud/
npm install
```

2 - Run this command to start the application and access http://localhost:5555

```shell
npm start
```

3 - Access http://localhost:5555 and enjoy


### Run the e2e tests

After setiing up the application, follow these steps:

1 - Update webdriver-manager (comes with protractor installation)
```shell
webdriver-manager update
```

2 - Start the webdriver server

```shell
webdriver-manager start
```

3 - Acces the application directory and run the tests
```shell
cd es6-crud
protractor protractor.conf.js
```