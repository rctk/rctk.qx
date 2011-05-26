qx.Class.define("rctk.Core",
{
    extend : qx.core.Object,
    construct: function(app) { 
        this.app = app;
        this.controls = {0: new rctk.Root(app.getRoot())};
        this.queue = []; 
        this.sid = null;
    },
    members :
    {
        app: null,

        run: function() {
            qx.log.Logger.debug("RCTK: start");
            var req = new qx.io.remote.Request("start", "POST", "application/json");
            req.addListener("completed", function(e) {
                this.start(e.getResponseHeader('rctk-sid'), e.getContent());        
            }, this);
            req.setTimeout(100000); // XXX
            req.send();
        },
        start: function(sid, data) {
            this.sid = sid;
            if('title' in data) {
                document.title = data.title;
            }
            var req = new qx.io.remote.Request("pop", "POST", "application/json");
            req.addListener("completed", function(e) {
                this.handle_tasks(e.getContent());
            }, this);
            req.setRequestHeader('rctk-sid', this.sid);
            req.setTimeout(100000);
            req.send();
        },
        handle_tasks: function(data) {
            if(data) {
                for(var i=0; i < data.length; i++) {
                    this.handle_task(data[i]);
                }
            }
            this.flush();
        },
        handle_task: function(task) {
            this.debug("RCTK: task:");
            //qx.dev.Debug.debugObject(task);
            console.log(task);


            switch(task.action) {
            case "append":
                this.append(task);
                break;
            case "remove":
                break;
            case "create":
                this.create(task);
                break;
            case "destroy":
                break;
            case "update":
                this.update(task);
                break;
            case "call":
                break;
            case "handler":
                this.handler(task);
                break;
            case "layout":
                this.layout(task);
                break;
            case "relayout":
                this.relayout(task);
                break;
            case "timer":
                break;
            }
        },
        create: function(task) {
            var control;
            switch(task.control) {
            case "button":
                qx.log.Logger.debug("Setting button text to " + task.text);
                control = new rctk.Button(task.id, task.text);
                break;
            case "window":
                control = new rctk.Window(task.id, task.title);
                break;
            case "statictext":
                control = new rctk.StaticText(task.id, task.text);
                break;
            case "statichtmltext":
                control = new rctk.StaticHTMLText(task.id, task.text);
                break;
            case "panel":
                control = new rctk.Panel(task.id);
                break;
            case "checkbox":
                control = new rctk.Checkbox(task.id, task.text);
                break;
            case "text":
                control = new rctk.Text(task.id, task);
                break;
            case "date":
                control = new rctk.Date(task.id, task);
                break;
            default:
                this.error("Unknown control: " + task.control);
                return;
                break;
            }
            this.controls[task.id] = control;
            control.addListener('event', function(e) { this.event_fired(e); }, this);
        },
        update: function(task) {
            var control = this.controls[task.id];
            control.update(task.update);
        },
        append: function(task) {
            var container = this.controls[task.id];
            var child = this.controls[task.child];

            container.add(child, task);
        },
        layout: function(task) {
            // invoked when layout is set, contains explicit configuration
            var container = this.controls[task.id];
            container.setLayout(task.type);

        },
        relayout: function(task) {
            // invoked when relayout is done, after explicit layout(). Contains calculated config
            var container = this.controls[task.id];
            container.performLayout(task.config);
        },
        handler: function(task) {
            var control = this.controls[task.id];
            var type = task.type;
            control.handle(type);

        },
        event_fired: function(e) {
            this.debug("Event fired");
            console.log(e);
            var data = e.getData();
            this.queue.push({'method':'event', 'type':data.type, 'id':data.control.id, 'data':{}});
            this.flush(); // XXX order?
        },
        flush: function() {
            this.debug("Flushing queue");
            console.log(this.queue);
            if(this.queue.length > 0) {
                // show_throbber()
                var req = new qx.io.remote.Request("task", "POST", "application/json");
                req.setRequestHeader('rctk-sid', this.sid);
                req.setData("queue="+qx.lang.Json.stringify(this.queue));
                req.addListener("completed", function(e) {
                    this.handle_tasks(e.getContent());
                }, this);
                req.send();
                this.queue = [];
            }
        }
        

    }

});

