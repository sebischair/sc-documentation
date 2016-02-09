## SC Documentation

### Hosted SC Documentation Website
(Soon) available at http://documentation.sociocortex.com

### Build
#### 1) Clone this Repository
Make sure that the path does not contain any special characters (e.g. umlauts), as those might interfere with the build process later on.

#### 2) Install Node.js

#### 3) Open a Suitable Console
**Windows**: Node.js command prompt

**OSX/Linux**: Terminal
#### 4) `npm install`

#### 5) Install Dependencies
`npm install` (build dependencies)

`bower install` (front-end dependencies)

#### 6) Build
- `grunt build`: Wires the dependencies defined within bower.json to the application (insert scripts into index.html)
- `grunt serve`: Builds the project, starts a web server, and opens the client in your default browser. Updates automatically when you edit the code
````
