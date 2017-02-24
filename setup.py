# -*- coding: utf-8 -*-

# Imports ###########################################################

import os
from setuptools import setup


# Functions #########################################################

def package_data(pkg, root_list):
    """Generic function to find package_data for `pkg` under `root`."""
    data = []
    for root in root_list:
        print root
        print "\n"
        for dirname, _, files in os.walk(os.path.join(pkg, root)):
            for fname in files:
                data.append(os.path.relpath(os.path.join(dirname, fname), pkg))

    return {pkg: data}


# Main ##############################################################

setup(
    name='refernece-block',
    version='1.0',
    description='XBlock - Referenece',
    packages=['reference_block'],
    install_requires=[
        'XBlock',
    ],
    entry_points={
        'xblock.v1': 'reference-block = reference_block:ReferenceBlock',
    },
    package_data=package_data("reference_block", ["static", "templates", "public"]),
)
