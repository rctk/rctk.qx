qx.Class.define("rctk.StaticHTMLText",
{
    extend: rctk.StaticText,

    construct : function(core, id)
    {
        this.base(arguments, core, id);
    },
    members: {
        create: function(data) {
            this.base(arguments, data);
            this.control.setRich(true);
        }
    }
});
