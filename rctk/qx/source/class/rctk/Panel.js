qx.Class.define("rctk.Panel",
{
    extend : rctk.Container,

    construct : function(core, id)
    {
        this.base(arguments, core, id);
        this.control = new qx.ui.container.Composite();
        this.control.setLayout(new qx.ui.layout.Grid(0, 0));
        this.tab = false;
    },
    members: {
    }
});

