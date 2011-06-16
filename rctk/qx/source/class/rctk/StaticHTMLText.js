qx.Class.define("rctk.StaticHTMLText",
{
    extend: rctk.StaticText,

    construct : function(id)
    {
        this.base(arguments, id, "");
    },
    members: {
        create: function(data) {
            this.base(arguments, data);
            this.control.setRich(true);
        }
    }
});
