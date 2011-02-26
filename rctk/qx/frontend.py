import os

from rctk.frontend import Frontend as Base
class QXFrontend(Base):
    name = "Qooxdoo"
    def __init__(self, tk):
        self.tk = tk

    @classmethod
    def workingdir(cls):
        return os.path.dirname(__file__)

    def index_html(self):
        return "QX"
