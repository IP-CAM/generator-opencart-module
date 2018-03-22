# Generator of OpenCart module basic structure and code

[![NPM version][npm-image]][npm-url]


This package provides an easy way to create a starting structure for your Opencart module.

![J9dzRT](http://cdn.makeagif.com/media/3-21-2016/J9dzRT.gif)

## Installation - Option 0
Linux, OSx, Windows:
First, install [Yeoman](http://yeoman.io) and generator-opencart-module-ru using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-opencart-module-ru
```

Then generate your new project:

```bash
yo opencart-module-ru
```

## Installation - Option 1
Windows Only:
To generate modules without the requirement of node.js and Yeoman, you can use a Windows computer with PowerShell.  No additional software is required.

To generate your new project:
First, start a powershell terminal window.  Then go to your instailation folder and execute the build script.

```PowerShell
cd <install folder>\generators\app
generate-module.ps1
```

WARNING: PowerShell script doesn't support next tools for this moment:
* OpenCart 2.3
* OCMOD
* Russian language


* Originally developed by Taiye Ogunnigbo - https://twitter.com/taiyeoguns
* Windows Powershell Script provided by Jayson Johnson - Edmonton Acrobatic Gymnastics - edmontonacro.ca

## Features

- Allows to specify module type such as Payment, Shipping, Order Total, Feed
- Supports creating modules for Opencart 1.5.x and 2.x versions.
- Supports creating modules for Opencart 2.3 version.
- Optionally add vQmod support
- Optionally add OCMOD support

## License

Apache-2.0 © [Ihor Chyshkala & Maksim Tarasenko]()


[npm-image]: https://badge.fury.io/js/generator-opencart-module.svg
[npm-url]: https://npmjs.org/package/generator-opencart-module-ru
