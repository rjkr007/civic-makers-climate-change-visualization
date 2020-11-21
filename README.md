<br />
<p align="center">
  <h1 align="center"><a href="https://codeforaustralia.github.io/civic-makers-climate-change-visualization/">Civic Makers Climate-Change Visualization</a></h1>

  <p align="center">
    An awesome README to tell you everything you need to know about this project.
  </p>
</p>

## Table of Contents

- [About the Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
- [Starting up the development environment after first set up](#starting-up-the-development-environment-after-first-set-up)
- [Accessing the Application](#accessing-the-application)
- [How to Deploy the Application](#how-to-deploy-the-application)
- [Contributing](#contributing)
- [Asking for help](#asking-for-help)
- [Project Conventions](#project-conventions)
- [Contributors](#contributors)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->

## About The Project

This is a website that will inform visitors about the following:

- Why act on climate change now?
- What you can do about it?
- Why you should get all your friends and family to help too.
- Timeline of significant climate-change related events (including related Australian Parliament Motions/Bills/Divisions).
- Which Members of Parliament (MP) voted for/against motions/bills/divisions.
- MP statistics of their previous voting record and a measure of how accountable they are of keeping their promises.
- Contact forms to MPs to influence their future decisions.
- How to share the above information with others.

## Built With

- [React](https://reactjs.org/)
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- If database is required: [MongoDB](https://www.mongodb.com/)

<!-- GETTING STARTED -->

##  Getting Started

For more indepth instructions please see this [link](https://docs.google.com/document/d/1_Xz9BDUdD2zFesFQC_Zl64CHbjufQWjVTdEalExVhr8/edit)


0. Open a command line interface (Terminal on mac or equivalent on windows)

   *  Tip: For a linux/mac experience on Windows, you can download https://cmder.net/.

1. If you are a MAC user, please install Xcode using the following command
```
xcode-select --install 
```

2. Install nvm, a version manager for node.js (for more information see: https://github.com/nvm-sh/nvm)

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.0/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

nvm --version

```

3. Clone the project source code.

```
git clone https://github.com/AVu120/civic-makers-climate-change-visualization.git
```

4. Navigate into the project directory.

```
cd civic-makers-climate-change-visualization
```

5. Install node using nvm:

```
nvm install
nvm use
```
6. Double check you are using the right version of node by typing the following command. the version number should match the version number mentioned in [.nvmrc](./nvmrc) file:

```
$ cat .nvmrc 
14.15.1

$ node --version
v14.15.1
```

7. Navigate to clients folder and run npm install

```
cd client
npm install
```
8. run npm start (while in clients folder)

```
npm start
```

9. In another terminal, navigate to the server folder and install express and nodemon

```
# go to the project directory
cd civic-makers-climate-change-visualization
nvm use
cd server
npm install
```

10. Run npm start (while in server folder)

```
npm start
```

11. Go to http://localhost:3000/ . You should see a short welcome message if the app is running.

##  Starting up the development environment after first set up

1. If you haven't already done so, run the steps from the above [Getting Started section](#getting-started).

2. When necessary, install only the client dependencies you need (e.g. react-scripts to 'npm run build' and testing libraries).

```
cd client
npm i react-scripts etc.
```

## Accessing the Application

The application is currently hosted on [Github Pages](https://codeforaustralia.github.io/civic-makers-climate-change-visualization/).

On your local development instance, enter `http://localhost:3000` into any web-browser to view the app.

## How to deploy the application

The application is currently hosted on [Github Pages](https://codeforaustralia.github.io/civic-makers-climate-change-visualization/).

To deploy the app to Github Pages, run the following commands:
```
cd client/
npm install  ## [optional] only install dependencies if you haven't done so earlier!
npm run deploy
```
The command will perform the following actions:
1. build the react app (using `npm run build`)
2. push the build artifacts to the `gh-pages` branch

This repo has been set up to serve the content in `gh-pages` branch on Github Pages

The [`gh-pages` tool](https://create-react-app.dev/docs/deployment/#github-pages) was used to ease the deployment of this app.

<!-- ## Roadmap

See the [Road Map](https://<link-of-road-map-here>) for a list of proposed features (and known issues). -->

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request (PR).
6. After 1-2 approvals, the PR will be merged.

## Asking for Help
- Please ask on our slack channel [#civic-makers-climatechange-dev](https://app.slack.com/client/T02A8KY38/C01DALXS62K) if you:
  - have any questions regarding any of the tasks in our [Trello board](https://trello.com/b/ZXaIkclp)
  - have any questions relating to the development of the climate change app
  - need help with a task you are working on from the [Trello board](https://trello.com/b/ZXaIkclp)
  - have any other questions/proposals you'd like to put to the dev team
- please be patient with our response, as most of us are only working on this in our spare time
- If you like to find out more about what everyone is working on, please come to our weekly Wednesday evening catchups to meet the team! Please ask on [#civic-makers-climatechange](https://app.slack.com/client/T02A8KY38/C01CXCQPF8V) slack channel to get an invite.
- Some of the dev folk will usually hang around after the catchup to discuss on outstanding issues and do some remote pair/mob programming. But if the timing doesn't work for you, don't fret, please ask on [#civic-makers-climatechange-dev](https://app.slack.com/client/T02A8KY38/C01DALXS62K) to arrange a more suitable time to pair!

## Project Conventions

- [React functional components](https://programmingwithmosh.com/react/react-functional-components/) (with hooks)
- [PascalCase](https://techterms.com/definition/pascalcase) for file/folder/component/class names.
- [camelCase](https://techterms.com/definition/camelcase) for function/method names.
- CSS TBD.

## Contributors

- [hqtan](https://github.com/hqtan)
- [k7n4n5t3w4rt](https://github.com/k7n4n5t3w4rt)
- [izzypeskett](https://github.com/izzypeskett)
- [mcyph](https://github.com/mcyph)
- [mishfish123](https://github.com/mishfish123)
- [mansisheth13](https://github.com/mansisheth13)
- [annemariejayatilake](https://github.com/annemariejayatilake)
- [AVu120](https://github.com/AVu120)


<!-- LICENSE -->

<!-- ## License
TBD -->

## Contact

### Emails

- Esther (project manager) - esther.semo@gmail.com
<!-- Rest TBD -->

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [Code for Australia](https://codeforaustralia.org/)
