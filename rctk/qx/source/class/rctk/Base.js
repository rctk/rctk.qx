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
            switch(type) {
            case 'click':
                this.enabled.click = true;
                break;
            case 'submit':
                this.enabled.submit = true;
                break;
            case 'keypress':
                this.enabled.keypress = true;
                break;
            case 'change':
                this.enabled.change = true;
                break;
            }
        },
        create: function(init) {
        },
        set_properties: function(update) {
        },
        value: function() {
            // return the current value for this control
        }
    }

});
