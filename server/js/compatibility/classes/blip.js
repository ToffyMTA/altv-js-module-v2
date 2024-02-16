/// <reference path="../../../../types/shared/index.d.ts" />
/// <reference path="../../../../types/server/index.d.ts" />
// import * as alt from "@altv/server";

const { SharedBlip } = requireBinding("shared/compatibility/classes/sharedBlip.js");

requireBinding("shared/factory.js");

const { extendAltEntityClass } = requireBinding("shared/compatibility/utils/classes.js");

class Blip extends alt.Blip {
    static get count() {
        return alt.Blip.all.length;
    }

    set isGlobal(value) {
        super.global = value;
    }
}

extendAltEntityClass(Blip, SharedBlip);

alt.Blip.setFactory(Blip);

cppBindings.registerCompatibilityExport("Blip", Blip);
