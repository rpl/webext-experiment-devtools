const {utils: Cu} = Components;
const {Management} = Cu.import("resource://gre/modules/Extension.jsm", {});
const {gDevTools} = Cu.import("resource://devtools/client/framework/gDevTools.jsm", {});
const { devtools } = Cu.import("resource://devtools/shared/Loader.jsm", {});

class API extends ExtensionAPI {
  getAPI(context) {
    return {
      experiments: {
        devtools: {
          open(panel) {
            let tab = Management.global.TabManager.activeTab;
            return gDevTools.showToolbox(devtools.TargetFactory.forTab(tab), panel).then(() => {});
          },
        },
      },
    };
  }
}
