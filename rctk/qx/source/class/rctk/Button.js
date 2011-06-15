qx.Class.define("rctk.Button",
{
    extend : rctk.Base,

    construct : function(id)
    {
        this.base(arguments, id);
    },
    members: {
        clicked: function(e) {
            if(this.enabled.click) {
                qx.log.Logger.debug("Button clicked");
                this.fireDataEvent('event', {'type':'click', 'control':this});
            }
        },
        create: function(data) {
            this.control = new qx.ui.form.Button(data.text || "");
            this.control.addListener("execute", function(e) { this.clicked(e); }, this);
        },
        set_properties: function(data) {
            if('text' in data) {
                this.control.setLabel(data.text);
            }
        }
    }
});

