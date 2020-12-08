# Continious integration

Continuous integration (CI) is the practice of merging all developers' working copies to a shared branch regularly. Ideally building, testing and deployment is automated. We will be doing a lot of testing as we build our SPA right from simple complications and serving right through to automated unit testing. 

Watch CI Explained (20 minutes): https://www.youtube.com/watch?v=XusC2o-Y_fU

To note: you're not expected to build everything in the introduction video, or in a way that is fully automated, however, it's important that your team has some coverage at all of the stages:

src(Dev) -> build -> release(Staging) -> production(Live)

In your teams as a minimum you will need to:

1.Implement version control of your choice (Git, Bitbucket, SVN, etc) and setup Dev, Staging and Live branches.
2.Setup Staging and Live environments aligned to Staging and Live branches.
3.Write tests for the critical components in your code base (and treat your tests as production code). These tests should cover UAT (User Acceptance) and functional/unit tests. 
4.Get a suitable continuous integration and delivery service that will enable you to run those tests on every push to the repository and also deploy your builds where you need them.

There are tools such as Jenkins and Gitlab which can be used to automate the CI pipeline, however, this is not necessary and isn't covered in detail in this set of workshops. You might want to explore these tools as a team. The benefits of doing it this way are fast feedback, no surprises, detect issues early & improve testability. We will be covering 1,2 and some elements of 3, however, it's important that as a team you agree how best testing should work on your system. 


# Version control

## Branches and stages

Your git repo will allow you to create branches. As a minimum your team will need a master branch which is setup by default. It's probably easiest if this master is used as your development branch and it should be the most current version of the code shared by all developers. You will also need to have Live and Staging branches to allow a CI process. Live and Staging should also have corresponding 'environments' which we are configuring using Docker. Environments (eg served files/running systems) allow the code produced to be tested. So 'branches' should match up with 'environments' as follows:

### Live (live branch)

Your Live branch should be a version of your code which is production ready. The contents of your Express API, Angular dist and Mongo scripts should be fully tested and ready to serve 'customers' in this state. Your docker compose and dockerfiles should create instances which will serve exactly the features required to your customers. 

### Staging (staging branch)

Your Staging or sometimes called 'release' version should be where you complete a significant set of user tests and unit tests. Staging is your first opportunity to make sure that there are no issues with the feature you're deploying from your dev branch - but before pushing code to Live! Once fully tested staging features are merged with Live by the RO or PO.

### Dev (master branch)

Your dev branch is where the work happens! Usually the 'environment' for this stage is on developer's local machines serving locally (or via a Docker container). As developers we spend most of our time in development. When in development, you create a feature branch (off of development), complete the feature, and then merge back into development. This can then be added to the final version by merging into Staging. Therefore in reality a developer might also have lots of 'local' sub branches of the main dev branch -> but they should only merge and commit code they are happy with and is finalised. 

Beacause this 'dev' branch should be updated by all your developers and will be a working, moving copy of the latest shared version of your code. Perhaps using the 'Master' branch as your 'dev' is a good idea as when commits are accepted onto your dev (master) branch they should then be merged onto your staging environment for proper testing. 

## Setting upstream repository

During development of a Typescript based site (such as those built with Angular) you typically use the ng serve command to build, watch, and serve the application from local memory (covered in these worksheets), using webpack-dev-server. When you are ready to deploy, however, you must use the ng build command to build the app and deploy the build artifacts elsewhere. By deafult this will locally create the static build files in your /dist folder...

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

# Docker

We are using containers to ensure consistency in environments and to ease deployment. You don't need to know everything about Docker to use the templates we've setup for you in this workshop (and your own projects). Everyone should probably read the overview below, however, if you're interested and want to go further in your use of containerisation watch the full introduction below. 

Quick overview (10 minutes): https://docs.docker.com/get-started/overview/
Full introduction (120 minutes): https://www.youtube.com/watch?v=fqMOX6JJhGo 

## Dockerfile

### Requirements

1.Docker
2.Docker compose
3.Sudo rights

### Containers

We use two standard Docker containers maintianed by the Docker team directly (secure). To find out more about the containers and how they are setup visit the following links:

1. https://hub.docker.com/_/node
2. https://hub.docker.com/_/mongo

We use *Docker Compose* to coordinate the deployment and connection of the two containers on the system.  We use *Docker Files* as the method by which we configure our exact instance. Follow the steps set out in this worksheet and you should have a working environment you can replicate and reuse. 

## Create Docker Compose File

## Create Docker File

# Using the Docker template

## Environmental variables

It's important that sensitive information such as usernames and passwords are not stored in git repos. We therefore create a .env file locally and save our credentials there:

Create a new file in the repo
```
nano .env
```

Add the following to the .env file and save:

```
MONGO_USERNAME=sammy
MONGO_PASSWORD=your_password
MONGO_PORT=27017
MONGO_DB=sharkinfo
```
## Wait script

To ensure that the MongoDB instance is running before we connect Node we need to add a wait script: 

'wait-for.sh'

```

#!/bin/sh

# original script: https://github.com/eficode/wait-for/blob/master/wait-for

TIMEOUT=15
QUIET=0

echoerr() {
  if [ "$QUIET" -ne 1 ]; then printf "%s\n" "$*" 1>&2; fi
}

usage() {
  exitcode="$1"
  cat << USAGE >&2
Usage:
  $cmdname host:port [-t timeout] [-- command args]
  -q | --quiet                        Do not output any status messages
  -t TIMEOUT | --timeout=timeout      Timeout in seconds, zero for no timeout
  -- COMMAND ARGS                     Execute command with args after the test finishes
USAGE
  exit "$exitcode"
}

wait_for() {
  for i in `seq $TIMEOUT` ; do
    nc -z "$HOST" "$PORT" > /dev/null 2>&1

    result=$?
    if [ $result -eq 0 ] ; then
      if [ $# -gt 0 ] ; then
        exec "$@"
      fi
      exit 0
    fi
    sleep 1
  done
  echo "Operation timed out" >&2
  exit 1
}

while [ $# -gt 0 ]
do
  case "$1" in
    *:* )
    HOST=$(printf "%s\n" "$1"| cut -d : -f 1)
    PORT=$(printf "%s\n" "$1"| cut -d : -f 2)
    shift 1
    ;;
    -q | --quiet)
    QUIET=1
    shift 1
    ;;
    -t)
    TIMEOUT="$2"
    if [ "$TIMEOUT" = "" ]; then break; fi
    shift 2
    ;;
    --timeout=*)
    TIMEOUT="${1#*=}"
    shift 1
    ;;
    --)
    shift
    break
    ;;
    --help)
    usage 0
    ;;
    *)
    echoerr "Unknown argument: $1"
    usage 1
    ;;
  esac
done

if [ "$HOST" = "" -o "$PORT" = "" ]; then
  echoerr "Error: you need to provide a host and port to test."
  usage 2
fi
```
## Starting the services

To start the service run: 
```docker-compose up -d```
Visit the local site at: http://0.0.0.0/
Stop the containers: 
```docker-compose down```
List running containers: 
```Docker ps```

## Going further

Follow the 'learn angular' tutorials you've just loaded! Congratulations you've just published a site! 
