qx.Class.define("rctk.StaticText",
{
    extend: rctk.Base,

    construct : function(core, id)
    {
        this.base(arguments, core, id);
    },
    members: {
        create: function(data) {
            this.base(arguments, data);
            this.control = new qx.ui.basic.Label(data.text || '');
        },
        set_properties: function(update) {
            this.base(arguments, update);
            if('text' in update) {
                this.control.setValue(update.text);
            }
        }
    }
});
