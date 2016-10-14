## webextension devtools experiments

This project contains a webextension experiment related to devtools related APIs.

It currently contains:

- `browser.experiments.devtols.open([panel]).then(cb)`, a method which open the developer toolbox on the current active tab, optionally selecting a panel (one of "inspector", "webconsole" or "jsdebugger")

## Using an experimental API in 4 simple steps

1. Run a Firefox DevEdition or Nightly (with version >=51) and navigate to [about:debugging](about:debugging)
2. Choose "Load Temporary Add-on" and select (a file from) the
   `experiment/` directory in this project.  You should see
   a new entry in the list of extensions titled "Experimental API".
3. Choose "Load Temporary Add-on" and select (a file from) the
   `extension/` directory in this project.  You should see a new entry
   in the list of extensions titled "hello test".
4. A toolbox should be opened and the webconsole panel selected (and in the Browser Console / Addon Debugger Console a "Congratulations! The Developer Toolbox has been opened!!!" log message should be visible)

### The webextension permissions property and how it is related with the experiment API addon

The webextension in the [`extension/`](extension) directory
is quite simple.
One thing to note is that [`manifest.json`](extension/manifest.json)
includes the permission `"experiments.devtools"`.
This permission creates a dependency between this webextension
and an API extension with an ID of the form `"devtools@(something)"`.

The add-ons manager currently enforces this dependency in that it will
not enable a webextension if it depends on an API extension that is
not installed and active, but it does not attempt to install or enable
the API extension -- that must be done manually by the user.  If a
webextension depends on an API extension that is not available, the
webextension is simply disabled.

The background script is pretty simple and it just call the experimental method:

```
browser.experiments.devtools.open("webconsole").then(() => {
  ...
});
```
