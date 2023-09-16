# Screen Drawer

Simple twitch extension that supports drawing arrows over streams.

## To run locally

1. Install the dependencies:

```
npm install
```

2. Create a certificate. This is necessary to host the extension locally, twitch only supports ```Https```.

*Note*: Make sure you set ```Common Name``` to 127.0.0.1.

```
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

3. Run the following to serve the site:

```
npm run start
```

4. Navigate to the [viewer_overlay.html](./src/video_overlay.html). This should be hosted at [https://localhost:8080/video_overlay.html](https://localhost:8080/video_overlay.html).