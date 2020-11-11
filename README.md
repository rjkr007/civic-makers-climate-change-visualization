<br />
<p align="center">
  <h1 align="center">Civic Makers Climate-Change Visualiation </h1>

  <p align="center">
    An awesome README to tell you everything you need to know about this project.
  </p>
</p>

## Table of Contents

- [About the Project](#about-the-project)
- [Built With](#built-with)
- [Prerequisites to Getting Started](#prerequisites-to-getting-started)
- [Getting Started](#getting-started)
- [Accessing the Application](#accessing-the-application)
- [Contributing](#contributing)
- [Project Conventions](#project-conventions)
- [Asking for help](#asking-for-help)
- [Contributors](#contributors)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

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

## Prerequisites to Getting Started

- Docker Desktop

## Getting Started

1. Clone the project source code.

```
git clone https://github.com/AVu120/civic-makers-climate-change-visualization.git
```

2. Navigate into the project directory.

```
cd civic-makers-climate-change-visualization
```

3. Build the client & server docker images, run them as containers and have them talking to each other in 1 command.

```
docker-compose up
```

- Wait until both containers are up and running before proceeding.
- Client is running on port 3000.
- Server is running/listening on port 5000.

4. When necessary, install only the client dependencies you need (e.g. react-scripts to 'npm run build' and testing libraries).

```
cd client
npm i react-scripts etc.
```

5. When you need to add new npm packages to an image/container, stop that container first, then run

```
docker-compose build <service-name>
```

then run

```
docker-compose up
```

to restart all the containers (with the new packages).

## Accessing the Application

1. Enter localhost:3000 into any web-browser.

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

## Project Conventions

- [React functional components](https://programmingwithmosh.com/react/react-functional-components/) (with hooks)
- [PascalCase](https://techterms.com/definition/pascalcase) for file/folder/component/class names.
- [camelCase](https://techterms.com/definition/camelcase) for function/method names.
- CSS TBD.

## Asking for Help
- Please ask on our slack channel [#civic-makers-climatechange-dev](https://app.slack.com/client/T02A8KY38/C01DALXS62K) if you:
  - have any questions regarding any of the tasks in our [Trello board](https://trello.com/b/ZXaIkclp)
  - have any questions relating to the development of the climate change app
  - need help with a task you are working on from the [Trello board](https://trello.com/b/ZXaIkclp)
  - have any other questions/proposals you'd like to put to the dev team
- please be patient with our response, as most of us are only working on this in our spare time
- If you like to find out more about what everyone is working on, please come to our weekly Wednesday evening catchups to meet the team! Please ask on [#civic-makers-climatechange](https://app.slack.com/client/T02A8KY38/C01CXCQPF8V) slack channel to get an invite.
- Some of the dev folk will usually hang around after the catchup to discuss on outstanding issues and do some remote pair/mob programming. But if the timing doesn't work for you, don't fret, please ask on [#civic-makers-climatechange-dev](https://app.slack.com/client/T02A8KY38/C01DALXS62K) to arrange a more suitable time to pair!

## Contributors

- [mishfish123](https://github.com/mishfish123)
- [AVu120](https://github.com/AVu120)
- [mansisheth13](https://github.com/mansisheth13)
- [hqtan](https://github.com/hqtan)
- [k7n4n5t3w4rt](https://github.com/k7n4n5t3w4rt)
- [izzypeskett](https://github.com/izzypeskett)
- [annemariejayatilake](https://github.com/annemariejayatilake)

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
