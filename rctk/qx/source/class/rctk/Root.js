qx.Class.define("rctk.Root",
{
    extend : rctk.Container,

    construct : function(core, root)
    {
        this.base(arguments, core, 0);
        this.control = root;
        this.container = new qx.ui.container.Composite();
        this.container.setLayout(new qx.ui.layout.Grid(0,0));
        // canvas does not support row/column, don't specify it
        this.control.add(this.container);
    },
    members: {
    }
});

