Feature: Cucumber test

    @simple_web
        Scenario: I want to register a single user
            # register some user
            Given user navigates to 'http://localhost:5555'        
            When user fills 'UserApp-name' by replacing text with 'marcio mendes'
            When user fills 'UserApp-email' by replacing text with 'mendes@test.com'
            When user fills 'UserApp-cpf' by replacing text with '12345678911'
            When user fills 'UserApp-phone' by replacing text with '11915550123'
            And user clicks on 'UserApp-btnSave'
            And user waits for 3 seconds

    @simple_web
        Scenario: I want to check if my user was registered
            Given user navigates to 'http://localhost:5555'        
            And user clicks on 'UserApp-btnChangeView'
            And the 'UserList-name:[1]' has text equals to 'marcio mendes'
            And the 'UserList-email:[1]' has text equals to 'mendes@test.com'
            And the 'UserList-cpf:[1]' has text equals to '12345678911'
            And the 'UserList-phone:[1]' has text equals to '11915550123'
            And user waits for 3 seconds

    @simple_web
        Scenario: I want to delete some user
            Given user navigates to 'http://localhost:5555'        
            And user clicks on 'UserApp-btnChangeView'
            And user clicks on 'UserList-btnDelete:[1]'
            And user waits for 3 seconds