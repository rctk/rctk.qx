qx.Class.define("rctk.Container", {
    extend: rctk.Base,

    construct: function(core, id) {
        this.base(arguments, core, id);
        this.container = null;
        this.children = {};
        this.tab = false;
    },
    members: {
        append: function(control, data) {
            // has a layout been set at all?
            if(this.container === null) {
                this.debug("Init container " + this.control);
                var layout = new qx.ui.layout.Grid(0, 0);
                this.container = this.control;
                this.container.setLayout(layout);
            }
            if(this.tab) {
               // adding to a tab results in creating a new tab and adding
               // there.
                var p = new qx.ui.tabview.Page(data.title || "new tab");
                // simpler layout?
                p.setLayout(new qx.ui.layout.Canvas());
                this.container.add(p, {'row':0, 'column':0});
                this.debug("Adding  control " + control);
                p.add(control.control, {'width':'100%', 'height':'100%'});
                p.setAllowGrowX(true);
                p.setAllowGrowY(true);
            }
            this.children[control.id] = control;
        },
        setLayout: function(type) {
            var layout;
            if(type == "new") {
                layout = new qx.ui.layout.Grid(0, 0);
                //this.container = this.control;
                this.container.setLayout(layout);
            }
            else if(type == "tabbed") {

                this.container = new qx.ui.tabview.TabView();
                //layout = new qx.ui.layout.Grid(0, 0);
                //this.control.setLayout(layout);
                this.control.add(this.container, {'row':0, 'column':0});
                this.tab = true;
                this.container.setAllowGrowX(true);
                this.container.setAllowGrowY(true);
            }
            else {
                this.error("No layout set");
            }
        },
        relayout: function(config) {
            var parent = this.control.getLayoutParent();
            var parent_bounds = parent?parent.getBounds():null;
            if(this.tab) {
                if(parent_bounds) {
                    this.container.setWidth(parent_bounds.width);
                    this.container.setHeight(parent_bounds.height);
                    this.container.setAllowGrowX(true);
                    this.container.setAllowGrowY(true);
                    for(var i in this.children) {
                        if(this.children[i] instanceof qx.core.Object) {
                            var c = this.children[i];
                            console.log("RELAYOUT");
                            console.log(c);
                            //c.control.setWidth(parent_bounds.width);
                            //c.control.setHeight(parent_bounds.height);
                            c.control.setAllowGrowX(true);
                            c.control.setAllowGrowY(true);
                        } 
                    }
                }
                else {
                    this.debug("null-bounds for");
                    console.log(parent);
                }
                return;
            }

            var rows, columns;
            rows = config.size[0];
            columns = config.size[1];

            // options contains global padding
            for(var i=0; i < config.cells.length; i++) {
                var cell = config.cells[i];
                var control = this.children[cell.controlid];
                // control.control.setAlignX / Y
                // left/center/right/null/top/middle/bottom/baseline
                // allowGrowX/Y
                // XXX code below is wrong - child will match entire parent,
                // not just cell.
                this.container.add(control.control, {row:cell.row, column:cell.column, rowSpan:cell.rowspan||1, colSpan:cell.colspan||1});
                control.control.setAllowGrowX(true);
                control.control.setAllowGrowY(true);
                if(parent_bounds) {
                control.control.setWidth(parent_bounds.width);
                control.control.setHeight(parent_bounds.height);
                }
            }
        },
        remove: function(child, data) {
            qx.log.Logger.debug("container remove not implemented");
            console.log(child);
            console.log(data);
        }
    }
});
