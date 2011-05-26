qx.Class.define("rctk.Text",
{
    extend: rctk.Base,

    construct : function(id, data)
    {
        this.base(arguments, id);
        if(data.rows > 1) {
            // is there a way to set rows/cols? XXX
            this.control = new qx.ui.form.TextArea(data.text);
        } else {
            this.control = new qx.ui.form.TextField(data.text);
        }
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
