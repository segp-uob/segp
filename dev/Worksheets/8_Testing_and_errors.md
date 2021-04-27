# Testing and finding errors

> ### Milestone checklist
> - [ ] Essential: [Workshop walkthrough](https://web.microsoftstream.com/video/ee64795d-94d3-4eb1-8b24-7f7ca34f2cb9)
***

A major part of any project teams which have done very well in their software engineering project is
testing.

# Writing tests

Tests should be linked to features you are building. You are testing functions, and these might be in
the user interface (browser testing) or in the backend logic of the way your system operates.
Fundamentally a test is about assurance so every time a feature is added to your application a
corresponding test should be created.

1. Setup and teardown
2. Test pass conditions

Tests don't need to be automated! What's important is the practice of ensuring reliability rather than creating complex solutions. 

# Example Test Plan
```
Test Plan - Content page frontend (#101000000)

As an editor I want to have a way to build basic pages in the CMS so that I can add content to it without being limited to particular template.

1 Outline/prerequisites

1. Ensure you have a copy of the browser definition document
2. Ensure you know which environment you are testing against

2 Setup and Teardown

Setup

1. Ensure you have user credentials (if not create a user)
2. Login to the system

Teardown
1. Delete all content created
2. Logout
​
3 Tests

A. Test a user can add articles

1. Click on add content
2. Select `Add article`
3. Fill in all required fields
4. Click save
5. Ensure you can see all content you inputted
6. Ensure the design looks correct in all supported browsers

B. Test a user can edit articles
// setup
// steps
// teardown

C. Test a user can delete articles
// steps
```



## Staging

As your project evolves your team will be expected to have a staging environment (in Docker or
similar) aligned to a specific branch on your repository. The purpose of a STAGING environment is to
ensure that only fully functioning, tested and validated code is pushed to LIVE.

Here is an example workflow of how we might go from feature -> accepted on live.

Feature specification is reviewed and accepted. Test plans written, reviewed and pass Automated
tests written and pass Automated tests are run against the code and pass. Code in repository and
reviewed Pull request against develop branch created. Deployed to staging Browser test plan pass.
Story accepted by PO before the Sprint review.

## Mocha

We are going to be exploring the topic of testing further. Students with an interest should check out [Mocha](https://mochajs.org/) in advance.
