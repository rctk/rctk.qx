qx.Class.define("rctk.Text",
{
    extend: rctk.Base,

    construct : function(core, id) {
        this.base(arguments, core, id);
    },

    members: {
        create: function(data) {
            this.base(arguments, data);
            if(data.rows > 1) {
                // is there a way to set rows/cols? XXX
                this.control = new qx.ui.form.TextArea(data.value || "");
            } else {
                this.control = new qx.ui.form.TextField(data.value || "");
            }
            this.install_listeners();
        },
        install_listeners: function() {
            this.control.addListener("input", function(e) 
               { this.keypressed(e); }, this);
            this.control.addListener("changeValue", function(e) 
               { this.changed(e); }, this);
            this.control.addListener("keyup", function(e) {
                if(e.getKeyCode() == 13) {
                    this.submitted(e);
                }
            }, this);
        },
        set_properties: function(update) {
            this.base(arguments, update);
            if('value' in update) {
                this.control.setValue(update.text);
            }
        },
        value: function() {
            return {'value':this.control.getValue()};
        },
        /* events */
        submitted: function(e) {
            if(this.enabled.submit) {
                this.fireDataEvent("event", 
                    {'type':'submit', 'control':this, 'sync':true});
            }
        },
        keypressed: function(e) {
            if(this.enabled.keypress) {
                this.fireDataEvent("event", 
                    {'type':'keypress', 'control':this, 'sync':true});
            }
        },
        changed: function(e) {
            if(this.enabled.change) {
                this.fireDataEvent("event", 
                    {'type':'change', 'control':this, 'sync':true});
            }
            else {
                this.core.sync(this);
            }
        }
    }
});
