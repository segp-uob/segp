# Continious integration
continuous integration (CI) is the practice of merging all developers' working copies to a shared branch regularly. Ideally building, testing and deployment is automated. 


1.Implement version control of your choice (Git, Bitbucket, SVN, etc).
2.Write tests for the critical components in your code base (and treat your tests as production code).
3.Get a suitable continuous integration and delivery service that will enable you to run those precious tests on every push to the repository and also deploy your builds where you need them.

The benefits are fast feedback, no surprises, detect issues early & improve testability. 


## Setting upstream repository

During development, you typically use the ng serve command to build, watch, and serve the application from local memory (covered in the last worksheet), using webpack-dev-server. When you are ready to deploy, however, you must use the ng build command to build the app and deploy the build artifacts elsewhere. By deafult this will locally create the static build files in your /dist folder...

Both *ng build* and *ng serve* clear the output folder before they build the project, but only the *ng build* command writes the generated build artifacts to the output folder (/dist).

When it comes to hosting these files remotely, everything required to render your application, is now contained within this /dist folder (after build). When you create a project using AngularCLI your folder will already be initialised as a git repo. However, this will only exist on your local machine. So the first step is to make sure our project is added to a remote git repository. Use git status to check whether there is an upstream repository already:
```
git status
```
 Make sure you are in the root of your project and add the remote: 

```
git remote add origin https://github.com/<username>/<repositoryname>.git
```
Check git status again to make sure this is setup. 

## Deployment

Once we have a remote repository setup we need to add a tool we are going to use to easily move build outputs into a publically visible location. From here they can be served to your users. First add angular-cli-ghpages package to your project:

```
ng add angular-cli-ghpages
```
Once 
You can either manually enter your username and password for git each time (but this is not advised):
```
ng deploy --repo=https://github.com/<username>/<repositoryname>.git --name="Your Git Username" --email=your.mail@example.org
```
## Granting ghpages permissions
The ghpages package doesn't have access to your RSA authentication key as it is a read only package. The best, and most secure way, to give the package access to your git repo is by granting a specific token and setting this as an environmental variable. Tokens can always be revoked so this is the *correct* way to do this. Therefore you should take a look at "personal access tokens" To enable the ghpages tool to upload to your git repository you will need to create a token first in your git acccount - and set it as a variable in your CLI. You only need to do this once:

```
export GH_TOKEN=<TOKEN>
# to list all environmental variables just call 'set'
```
Because you don't want to export the variable every time you open a new bash terminal (you can if you want) it would make sense to add this variable to your environment so it is added everytime you start:
```
sudo -H gedit /etc/environment
## add the following line to this file and restart
GH_TOKEN="<TOKEN>"
```
Now we are ready. Just issue the ng deploy command to see the site live at https://<username>.github.io/<repo>/:
```
ng deploy
```
Initially you won't see anything load at https://<username>.github.io/<repo>/. Open up the inspector/console in your browser **can you see why? ...**

You will find that the paths for the scripts are incorrect so can't be loaded - there's a missing directory path. This occurs because of the way Angularcli builds projects and Github routes traffic. Don't worry it's an easy fix. Head back into your build and try again but this time specify a location for your assets:

### Deploying with specific production url

```
ng build --deploy-url /<repo>/ --prod
ng deploy --no-build
```

We specify 'no-build' because we know that the build in the /dist folder has the corrected deploy urls. We skip the build process during deployment: this is useful because we are sure that we haven't changed anything and want to deploy with the latest artifact (with corrected script paths!).

Now visit https://<username>.github.io/<repo>/ again!

## Going further

Follow the 'learn angular' tutorials you've just loaded!
