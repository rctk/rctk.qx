qx.Class.define("rctk.Panel",
{
    extend : rctk.Container,

    construct : function(id)
    {
        this.base(arguments, id);
        this.control = new qx.ui.container.Composite();
        this.tab = false;
    },
    members: {
    }
});

