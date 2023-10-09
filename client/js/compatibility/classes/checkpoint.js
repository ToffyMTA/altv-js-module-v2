/// <reference path="../../../../types/shared/index.d.ts" />
/// <reference path="../../../../types/client/index.d.ts" />
// import * as alt from "@altv/client";

requireBinding("shared/factory.js");

const { BaseObject } = requireBinding("client/compatibility/classes/baseObject.js");
const { WorldObject } = requireBinding("client/compatibility/classes/worldObject.js");

const { extendAltEntityClass } = requireBinding("shared/compatibility/utils/classes.js");

class Checkpoint extends alt.Checkpoint {
    constructor(...args) {
        // NOTE (xLuxy): This prevents the infinite loop caused by alt.*.create
        if (!args.length) return super();

        const type = args[0];
        const pos = args.length == 8 ? args[1] : { x: args[1], y: args[2], z: args[3] };
        const nextPos = args.length == 8 ? args[2] : { x: args[4], y: args[5], z: args[6] };
        const radius = args.length == 8 ? args[3] : args[7];
        const height = args.length == 8 ? args[4] : args[8];
        const color = args.length == 8 ? args[5] : args[9];
        const iconColor = args.length == 8 ? args[6] : args[10];
        const streamingDistance = args.length == 8 ? args[7] : args[11];

        const instance = alt.Checkpoint.create({ type, pos, nextPos, radius, height, color, iconColor, streamingDistance });
        return extendAltEntityClass(instance, WorldObject, BaseObject);
    }

    static get count() {
        return alt.Checkpoint.all.length;
    }
}

alt.Factory.setCheckpointFactory(Checkpoint);
cppBindings.registerCompatibilityExport("Checkpoint", Checkpoint);