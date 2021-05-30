# go-server

This project provides a simple HTTP server that can be configured to redirect each root path to a unique endpoint on a single address.

## Configuration
Configuration is handled as a single `endpoints.json` file. This is a JSON object with each key representing a unique subpath. A special entry with key `/` is used to control behavior on the root page. Each object in the dictionary has an `action` field used to specify what action should be taken when a user navigates to that page.

#### Available Actions
* `reload`: Causes the `endpoints.json` file to be reloaded on the server.
* `redirect`: Causes a redirect to occur for the user. Must specify a `redirect_url` value to be used.
* `static`: Responds with a static file for a given route. Must specify a `file_path` value to be used.
* ...more coming soon!

#### Sample `endpoints.js`
```json
{
  "/": {
    "action": "static",
    "file_path": "./endpoints.json"
  },
  "reload": {
    "action": "reload"
  },
  "router": {
    "action": "redirect",
    "redirect_url": "https://192.168.1.1"
  },
  "plex": {
    "action": "redirect",
    "redirect_url": "https://192.168.1.150:8006"
  }
}
```
The above sample configuration defines four (4) unique endpoints available at `server` (static endpoint), `server/reload` (reload endpoint), `server/router` (redirect endpoint), and `server/plex` (redirect endpoint).

## Usage
1. Clone this repository or download the zip bundle: `git clone https://github.com/EvilKanoa/go-server.git`
1. Install NodeJS 12+
1. Run `npm install` to fetch all required dependencies.
1. Configure `endpoints.json` as explained above.
1. Run `npm start` to start the server.
1. You can reload the `endpoints.json` file by specifying the `reload` action for a given route and then navigating to that route.
