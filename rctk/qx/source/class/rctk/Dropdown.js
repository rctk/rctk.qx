qx.Class.define("rctk.Dropdown",
{
    extend : rctk.Base,

    construct : function(core, id) {
        this.base(arguments, core, id);
    },
    members: {
        clicked: function(e) {
            if(this.enabled.click) {
                qx.log.Logger.debug("Button clicked");
                this.fireDataEvent('event', {'type':'click', 'control':this});
            }
        },
        changed: function(e) {
            this.core.sync(this);
        },
        create: function(data) {
            this.control = new qx.ui.form.SelectBox();
            this.model = new qx.data.Array();

            if(data.items) {
                for(var i=0; i < data.items.length; i++) {
                    this.model.push(qx.data.marshal.Json.createModel({'id':data.items[i][0], 'label':data.items[i][1]}));
                }
            }
            this.controller = new qx.data.controller.List(this.model, this.control, "label");

            //this.control.addListener("execute", function(e) 
            //    { this.clicked(e); }, this);
            this.controller.addListener("changeSelection", function(e) 
                { this.changed(e); }, this);
        },
        set_properties: function(data) {
        },
        append_item: function(key, label) {
            var tempItem = new qx.ui.form.ListItem(label);
            //this.control.add(tempItem);
        },
        value: function() {
            console.log(this.controller.getSelection().getItem(0).getId());
            return this.controller.getSelection().getItem(0).getId();
            
        }
    }
});

