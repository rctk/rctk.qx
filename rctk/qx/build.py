#!/usr/bin/python

import os

os.system("qooxdoo/qooxdoo-1.4-sdk/tool/bin/generator.py")

f = open("source/script/rctk.js", "r")
data = f.read()
f.close()
data  = data.replace('"__out__":{"sourceUri":"script"', '"__out__":{"sourceUri":"/media/script"')
f = open("source/script/rctk.js", "w")
f.write(data)
f.close()

