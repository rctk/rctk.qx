import os
import rctk.core ## loads rctk.core js dependencies

from rctk.resourceregistry import getResourceRegistry
from rctk.qx.config import VERSION

from rctk.frontend import Frontend as Base
class QXFrontend(Base):
    name = "Qooxdoo"

    qxbase = "qooxdoo/qooxdoo-%s-sdk/framework" % VERSION

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
            type = "text/javascript"
        elif path.endswith("png"):
            type = "image/png"
        elif path.endswith("gif"):
            type = "image/gif"
        elif path.endswith("jpg"):
            type = "image/jpeg"

        ## requests to /media/qx map to the qx framework directory
        if path.startswith("qx/"):
            path = cls.qxbase + '/' + path[3:]
        elif not path.startswith("source/"):
            path = "source/" + path 

        data = open(os.path.join(cls.workingdir(), path), "r").read()
        return (type, data)

    @classmethod
    def workingdir(cls):
        return os.path.dirname(__file__)

    @classmethod
    def index_html(cls):
        ## basically the same as serve_static("/media/index.html")[1]
        header = getResourceRegistry().header()
        tpl = open(os.path.join(cls.workingdir(), "source/index.html"), "r").read()
        return tpl.replace('<!-- rctk-header -->', header)

class QXFrontendTrunk(QXFrontend):
    name = "Qooxdoo"
    qxpath = "qooxdoo/qooxdoo-trunk/framework/"
