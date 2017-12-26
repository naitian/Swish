# Swish

> A little Chrome New Tab page with [Dribbble](http://dribbble.com) shots.

## Installing

Currently, there are no prebuilt extensions, and it is not available on the Chrome web store. You can build it yourself, though.

First you need to install [Parcel](https://parceljs.org/), the web application bundler.

Copy `scripts/secret.js.sample` to `scripts/secret.js`. Then you need to generate an API key on the [Dribbble developer site](https://dribbble.com/account/applications/new), then put that in `scripts/secret.js`. If this sounds super annoying, I agree (and apologize).

Then build the thing with these things.

```bash
npm install .
parcel index.html
```

This builds the app into the `dist/` directory. Then, in Chrome, navigate to `chrome://extensions` and select "Load unpacked extension" and select the `dist/` directory.

Congrats. Your new tabs look nice now!
