qx.Class.define("rctk.Date",
{
    extend: rctk.Base,

    construct : function(id, data)
    {
        this.base(arguments, id);
        // XXX initial value
        this.control = new qx.ui.form.DateField();
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
