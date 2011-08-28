// qx.Class.include(qx.ui.core.Widget, rctk.Base);
// or: include: [rctk.Base]
qx.Class.define("rctk.Base", {
    extend: qx.core.Object,

    events: {
        'event':"qx.event.type.Data"
    },

    construct: function(core, id) {
        this.base(arguments);
        this.core = core;
        this.id = id;
        this.enabled = {};
    },
    members: {
        events: {},
        handle: function(type) {
            this.enabled[type] = true;
        },
        create: function(init) {
        },
        set_properties: function(update) {
        },
        value: function() {
            // return the current value for this control
        },
        destroy: function() {
            qx.log.Logger.debug("control.destroy not implemented");
            console.log(this);
        }
    }

});
