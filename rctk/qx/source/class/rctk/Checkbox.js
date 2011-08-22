qx.Class.define("rctk.Checkbox",
{
    extend : rctk.Base,

    construct : function(core, id)
    {
        this.base(arguments, core, id);
    },
    members: {
        create: function(data) {
            // group is a groupid. If it doesn't exist already, create it,
            // else use and add
            this.control = new qx.ui.form.RadioButton(data.text);
            this.control.addListener("execute", function(e) { this.clicked(e); }, this);
        },
        clicked: function(e) {
            if(this.enabled.click) {
                qx.log.Logger.debug("RadioButton clicked");
                this.fireDataEvent('event', {'type':'click', 'control':this});
            }
        }
    }
});

