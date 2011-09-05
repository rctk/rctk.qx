qx.Class.define("rctk.Panel",
{
    extend : rctk.Container,

    construct : function(core, id)
    {
        this.base(arguments, core, id);
        this.tab = false;
        this.scrolling = false;
    },
    members: {
        create: function(data) {
            this.container = new qx.ui.container.Composite();
            this.container.setLayout(new qx.ui.layout.Grid(0, 0));
            if('scrolling' in data && data.scrolling) {
                this.control = new qx.ui.container.Scroll();
                this.control.add(this.container);
                this.scrolling = true;
            }
            else {
                this.control = this.container;
            }
        },
        set_properties: function(update) {
            this.base(arguments, update);
            if(this.scrolling && 'scrollto' in update) {
                if(update.scrollto == "bottom") {
                    this.control.scrollToY(this.container.getSizeHint().height);
                }
                else if(update.scrollto == "top") {
                    this.control.scrollToY(0);
                }
                else if(update.scrollto == "left") {
                    this.control.scrollToY(0);
                }
                else if(update.scrollto == "right") {
                    this.control.scrollToY(this.container.getSizeHint().width);
                }
            }
        }
    }
});

