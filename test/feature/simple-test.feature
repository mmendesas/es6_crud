Feature: Cucumber test

    @simple_web
        Scenario: I want see the Google Page
            Given user navigates to 'http://www.google.com.br'        
            When user fills 'GoogleHome-SearchInput' by replacing text with 'led zeppelin wikipedia'
            And user clicks on 'GoogleResult-SiteLink'
            And user waits for 5 seconds