qx.Class.define("rctk.StaticHTMLText",
{
    extend: rctk.StaticText,

    construct : function(id, text)
    {
        this.base(arguments, id, text);
        this.debug("StaticHTMLText " + text);
        this.control.setRich(true);
    }
});
