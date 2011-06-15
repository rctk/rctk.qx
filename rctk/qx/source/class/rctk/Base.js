// qx.Class.include(qx.ui.core.Widget, rctk.Base);
// or: include: [rctk.Base]
qx.Class.define("rctk.Base", {
    extend: qx.core.Object,

    events: {
        'event':"qx.event.type.Data"
    },

    construct: function(id) {
        this.base(arguments);
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
            }
        },
        create: function(init) {
        },
        update: function(update) {
        }
    }

});
