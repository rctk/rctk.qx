qx.Class.define("rctk.Container", {
    extend: rctk.Base,

    construct: function(core, id) {
        this.base(arguments, core, id);
        this.container = null;
        this.children = {};
        this.tab = true;
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
                var p = new qx.ui.tabview.Page(data.title || "new tab");
                // simpler layout?
                p.setLayout(new qx.ui.layout.Grid(0, 0));
                this.container.add(p, {'row':0, 'column':0});
                this.debug("Adding  control " + control);
                p.add(control.control, {'row':0, 'column':0});
            }
            else {
                this.children[control.id] = control;
            }
        },
        setLayout: function(type) {
            var layout;
            if(type == "new") {
                layout = new qx.ui.layout.Grid(0, 0);
                this.container = this.control;
                this.container.setLayout(layout);
            }
            else if(type == "tabbed") {
                this.container = new qx.ui.tabview.TabView();
                layout = new qx.ui.layout.Grid(0, 0);
                this.control.setLayout(layout);
                this.control.add(this.container, {'row':0, 'column':0});
                this.tab = true;
            }
            else {
                this.error("No layout set");
            }
        },
        relayout: function(config) {
            if(this.tab) {
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
                this.container.add(control.control, {row:cell.row, column:cell.column, rowSpan:cell.rowspan||1, colSpan:cell.colspan||1})
            }
        }
    }
});
