qx.Class.define("rctk.StaticText",
{
    extend: rctk.Base,

    construct : function(id, text)
    {
        this.base(arguments, id);
        this.debug("Adding statictext " + text);
        this.control = new qx.ui.basic.Label(text);
    },
    members: {
        update: function(update) {
            this.base(arguments);
            if('text' in update) {
                this.control.setValue(update.text);
            }
        }
    }
});
