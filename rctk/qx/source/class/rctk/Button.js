qx.Class.define("rctk.Button",
{
    extend : rctk.Base,

    construct : function(id, text)
    {
        this.base(arguments, id);
        this.control = new qx.ui.form.Button(text);
        this.control.addListener("execute", function(e) { this.clicked(e); }, this);
    },
    members: {
        clicked: function(e) {
            if(this.enabled.click) {
                qx.log.Logger.debug("Button clicked");
                this.fireDataEvent('event', {'type':'click', 'control':this});
            }
        }
    }
});

