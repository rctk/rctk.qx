qx.Class.define("rctk.Panel",
{
    extend : rctk.Container,

    construct : function(core, id)
    {
        this.base(arguments, core, id);
        this.control = new qx.ui.container.Composite();
        this.tab = false;
    },
    members: {
    }
});

