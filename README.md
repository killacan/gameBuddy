# Game Buddy

## Background and Overview

The idea for Game Buddy was born from frustration with current systems for finding people to play with and the general toxicity of some gaming communities. Current solutions for getting together with other people to play games with are lacking. Random matchmaking will sometimes get you with toxic players or bad players, and it can be impossible in team based games to consistently find people to play with. It can also be hard to discover new communities to play with. 

Game Buddy resolves this problem by having built in discovery mechanisms to find consistent people to play with, and with using the Riot API we are able to help facilitate connections between people of equal skill levels. Being able to connect with the same people, or avoid people with low ratings, either through toxicity or throwing games means that you will be able to more consistently have an enjoyable experience playing team based games.

Game Buddy is built with the MERN stack, utilizing 4 different technologies: MongoDB, Express, React, and Node. 

## Functionality and MVPs
<img src="/frontend/src/components/SplashCarousel/slide-1.png" alt="splash-page-art"/>
<img src="/frontend/src/components/SplashCarousel/slide-3.png" alt="game-index-art"/>
<img src="/frontend/src/components/SplashCarousel/slide-4.png" alt="profile-page-art"/>

-   User Auth (Login, Sign Up, Demo Login)
-   User has many GameRooms, User has many Reviews
-   GameRoom/Session CRUD (Create, Delete, Update)
-   Reviews/Rating CRUD for a User
-   Riot API to fetch ranking level for each User
-   Websocket API for two way communication between user’s browser and a server 
-   Search Bar / Filter system for GameRooms?
-   Production READMe.

### Potential Bonus Features
- Real time voice communications with players in a room. 

## Technologies and Technical Challenges

Our project is going to be a fully functional web app that allows users to create rooms that they will be able to use to more easily connect with other players. 

### Technologies

Our project is going to be a full MERN stack Web application. We are going to be utilizing MongoDB, Express.js, React.js, and Node.js. This is going to allow us to use JavaScript on both the front and back end. The database is going to be NoSQL in MongoDB.

#### WebSocket

The first major technical challenge is going to be using WebSocket to connect players and allow them to chat with each other.  WebSocket is a protocol that allows for two-way communication over TCP. 

#### Riot API

Our second major technical challenge is going to be integrating the Riot API in order to do stat checks / verification. This is going to be the most unique feature or out app and set it apart from the competition.
