

A major part of any project teams which have done very well in their software engineering project is testing. 

# Writing tests

Tests should be linked to features you are building. You are testing functions and these might be in the user interface (browser testing) or in the backend logic of the way your system operates. Fundamentally a test is about assurance so every time a feature is added to your application a corresponding test should be created. 

1. Setup and teardown
2. Test pass conditions


## Staging

As your project evolves your team will be expected to have a staging environment (in Docker or similar) aligned to a specific branch on your repository. The purpose of a STAGING environment is to ensure that only fully functioning, tested and validated code is pushed to LIVE. 



Here is an example worflow of how we might go from feature -> accepted on live. 

Feature specification is reviewed and accepted.
Test plans written, reviewed and pass
Automated tests written and pass
Automated tests are run against the code and pass.
Code in repository and reviewed
Pull request against develop branch created.
Deployed to staging
Browser test plan pass.
Story accepted by PO before the Sprint review.


## Automated testing
