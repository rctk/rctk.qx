qx.Class.define("rctk.Window",
{
    extend: rctk.Container,

    construct : function(core, id)
    {
        this.base(arguments, core, id);
        this.opened = false;
    },
    members: {
        create: function(data) {
            this.control = new qx.ui.window.Window(data.title || "Window");

            // disable for now - jquery doesn't support these either, and where
            // do minimized windows go?
            this.control.setAllowMaximize(false);
            this.control.setAllowMinimize(false);
            this.control.setShowMaximize(false);
            this.control.setShowMinimize(false);
            this.set_properties(data);
            this.control.addListener("close", 
                                     function(e) { this.closed(e); }, this);
        },
        set_properties: function(update) {
            this.base(arguments, update);
            if('opened' in update) {
                if(update.opened) {
                    this.control.open();
                    this.opened = true;
                }
                else {
                    this.control.close();
                    this.openened = false;
                }
            }
            if('modal' in update) {
                this.control.setModal(update.modal);
            }
            if('resizable' in update) {
                var r = update.resizable;
                this.control.setResizable(r, r, r, r);
            }
            if('position' in update && update.position) {
                this.position(update.position);
            }
        },
        closed: function(e) {
            if(this.enabled.close) {
                this.fireDataEvent('event', {'type':'close', 
                                             'control':this,
                                             'sync':true});
            } 
            else {
                this.core.sync(this);
            }
        },
        value: function() {
            return {'openend': this.opened};
        },
        position: function(position) {
            var x = 0;
            var y = 0;

            var parent = this.control.getLayoutParent();
            var parent_bounds = parent.getBounds();
            var hint = this.control.getSizeHint();

            var self_height = hint.height;
            var self_width = hint.width;
            var parent_height = parent_bounds.height;
            var parent_width = parent_bounds.width;

            var position_x = "center";
            var position_y = "center";

            if(!qx.lang.Type.isArray(position)) {
                position = [position];
            }

            if(position.length > 1) {
                position_x = position[0];
                position_y = position[1];
            }
            else if(position[0] in {'top':1, 'bottom':1}) {
                position_y = position[0];
            } else if(position[0] in {'left':1, 'right':1}) {
                position_x = position[0];
            }

            switch(position_x) {
            case 'left':
                x = 0;
                break;
            case 'right':
                x = parent_width - self_width;
                break;
            case "center":
                x = Math.round((parent_width - self_width) / 2);
                break;
            default:
                x = position_x;
            }

            switch(position_y) {
            case 'top':
                y = 0;
                break;
            case 'bottom':
                y = parent_height - self_height;
                break;
            case "center":
                y = Math.round((parent_height - self_height) / 2);
                break;
            default:
                y = position_y;
            }
            this.control.moveTo(x, y);
        }
    }
});

