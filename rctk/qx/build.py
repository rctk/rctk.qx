#!/usr/bin/python

import os
from config import VERSION

os.system("qooxdoo/qooxdoo-%s-sdk/tool/bin/generator.py" % VERSION)

f = open("source/script/rctk.js", "r")
data = f.read()
f.close()
data  = data.replace('"__out__":{"sourceUri":"script"', '"__out__":{"sourceUri":"/media/script"')
f = open("source/script/rctk.js", "w")
f.write(data)
f.close()

