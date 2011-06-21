qx.Class.define("rctk.Window",
{
    extend: rctk.Container,

    construct : function(core, id)
    {
        this.base(arguments, core, id);
    },
    members: {
        create: function(data) {
            this.control = new qx.ui.window.Window(data.title || "Window");
        },
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

