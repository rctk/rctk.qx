qx.Class.define("rctk.Image",
{
    extend: rctk.Base,

    construct : function(core, id)
    {
        this.base(arguments, core, id);
    },
    members: {
        create: function(data) {
            this.base(arguments, data);
            var url = "";
            if('resource' in data) {
                url = "resources/" + data.resource;
            }
            else if('url' in data) {
                url = data.url;
            }
            this.control = new qx.ui.basic.Image(url);
        },
        set_properties: function(update) {
            this.base(arguments, update);
            if('resource' in update) {
                this.control.setSource("resources/" + update.resource);
            }
            if('url' in update) {
                this.control.setSource(update.url);
            }
        }
    }
});
