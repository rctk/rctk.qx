qx.Class.define("rctk.Date",
{
    extend: rctk.Text,

    construct : function(core, id)
    {
        this.base(arguments, core, id);
    },
    members: {
        create: function(data) {
            this.control = new qx.ui.form.DateField(data.value || "");
            this.install_listeners();
        },
        set_properties: function(update) {
            this.base(arguments);
            if('text' in update) {
                this.control.setValue(update.text);
            }
        }
    }
});
