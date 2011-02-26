qx.Class.define("rctk.Window",
{
    extend: rctk.Container,

    construct : function(id, title)
    {
        this.base(arguments, id)
        this.control = new qx.ui.window.Window(title);
    },
    members: {
        update: function(update) {
            this.base(arguments, update);
            if('state' in update) {
                if(update.state == 'open') {
                    this.control.open();
                }
                else {
                    this.control.close();
                }
            }
        }
    }
});

