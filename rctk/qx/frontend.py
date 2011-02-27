import os

from rctk.frontend import Frontend as Base
class QXFrontend(Base):
    name = "Qooxdoo"
    ##qxpath = "qooxdoo/qooxdoo-trunk/framework/"
    qxpath = "qooxdoo/qooxdoo-1.3-sdk/framework/"
    def __init__(self, tk):
        self.tk = tk

    @classmethod
    def serve(cls, path):
        """
            Perhaps split into static_media and media
            for static stuff that can be served by the class,
            and dynamic stuff that may depend on the session/toolkit
        """
        path = path[6:] # strip "media/"
        path = path.replace("..", "") ## .. tricks
        
        type = "application/data"
        if path.endswith("css"):
            type = "text/css"
        elif path.endswith("js"):
            type = "text/js"
        elif path.endswith("png"):
            type = "image/png"
        elif path.endswith("gif"):
            type = "image/gif"
        elif path.endswith("jpg"):
            type = "image/jpeg"

        if path.startswith("qx/"):
            path = cls.qxpath + path[3:]
        #elif path.startswith("rctk/"):
        #    path = path[5:] # source is included in path
        elif not path.startswith("source/"):
            path = "source/" + path 

        data = open(os.path.join(cls.workingdir(), path), "r").read()
        return (type, data)

    @classmethod
    def workingdir(cls):
        return os.path.dirname(__file__)

    def index_html(self):
        ## basically the same as serve_static("/media/index.html")[1]
        return open(os.path.join(self.workingdir(), "source/index.html"), "r").read()
