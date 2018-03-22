'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _s = require('underscore.string');

//
var classify_format, underscore_format, titleize_format, oc_version, mod_type;

// Opencart 1.5 - 2.2 path variables
var CONTROLLER_DIR = 'ready/upload/%c%/controller/%t%/',
    LANGUAGE_DIR = 'ready/upload/%c%/language/english/%t%/',
    LANGUAGE_RU_DIR = 'ready/upload/%c%/language/russian/%t%/',
    MODEL_DIR = 'ready/upload/%c%/model/%t%/',
    ADMIN_VIEW_DIR = 'ready/upload/admin/view/template/%t%/',
    CATALOG_VIEW_DIR = 'ready/upload/catalog/view/theme/default/template/%t%/',
    VQMOD_DIR = 'ready/upload/vqmod/xml/',
    OCMOD_DIR = 'ready/';

// Opencart 2.3 path variables
var CONTROLLER_23_DIR = 'ready/upload/%c%/controller/extension/%t%/',
    LANGUAGE_23_DIR = 'ready/upload/%c%/language/en-gb/extension/%t%/',
    LANGUAGE_RU_23_DIR = 'ready/upload/%c%/language/ru-ru/extension/%t%/',
    MODEL_23_DIR = 'ready/upload/%c%/model/extension/%t%/',
    ADMIN_VIEW_23_DIR = 'ready/upload/admin/view/template/extension/%t%/',
    CATALOG_VIEW_23_DIR = 'ready/upload/catalog/view/theme/default/template/extension/%t%/';

module.exports = yeoman.generators.Base.extend({
    prompting: function() {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the ' + chalk.blue('Opencart Module') + ' starter generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'module_name',
            message: 'What name would you like for your module?',
            default: this.appname
        }, {
            type: 'list',
            name: 'version',
            message: 'What version of Opencart will your module be for?',
            choices: [{
                name: 'OpenCart 1.5.x',
                value: '1_5'
            }, {
                name: 'OpenCart 2.1-2.2',
                value: '2_x'
            }, {
                name: 'OpenCart 2.3',
                value: '2_3'
            }],
            default: 2
        }, {
            type: 'list',
            name: 'module_type',
            message: 'What type of module do you want to create?',
            choices: [{
                name: 'Module',
                value: 'module'
            }, 
			{
                name: 'Payment',
                value: 'payment'
            }, 
			{
                name: 'Shipping',
                value: 'shipping'
            }, 
			{
                name: 'Order Total',
                value: 'total'
            }, 
			{
                name: 'Feed',
                value: 'feed'
            }],
            default: 0
        }, {
            type: 'confirm',
            name: 'vqmod',
            message: 'Will the module require vQmod support?',
            default: false
        }, {
            type: 'confirm',
            name: 'ocmod',
            message: 'Will the module require OCMOD support?',
            default: false
        }];

        this.prompt(prompts, function(props) {
            this.props = props;

            oc_version = this.props.version;
            mod_type = this.props.module_type;
			
            classify_format = _s(mod_type).classify().value() + _s(this.props.module_name).classify().value();
            underscore_format = _s(this.props.module_name).underscored().value();
            titleize_format = _s(this.props.module_name).titleize().value();

            done();
        }.bind(this));
    },

    writing: function() {

        this.log('Working...');

        //admin

        if (this.props.version == '2_3') {
            this.fs.copyTpl(
            this.templatePath(oc_version + '/_admin_controller.php'),
            this.destinationPath(_s(CONTROLLER_23_DIR).replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                classified_name: classify_format,
                underscored_name: underscore_format,
                module_type: mod_type
            }
        );

        this.fs.copyTpl(
            this.templatePath(oc_version + '/_admin_language.php'),
            this.destinationPath(_s(LANGUAGE_23_DIR).replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                titleized_name: titleize_format,
                underscored_name: underscore_format,
                module_type: mod_type
            }
        );

        this.fs.copyTpl(
            this.templatePath(oc_version + '/_admin_ru_language.php'),
            this.destinationPath(_s(LANGUAGE_RU_23_DIR).replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                titleized_name: titleize_format,
                underscored_name: underscore_format,
                module_type: mod_type
            }
        );

        this.fs.copyTpl(
            this.templatePath(oc_version + '/_admin_view.tpl'),
            this.destinationPath(_s(ADMIN_VIEW_23_DIR).replaceAll('%t%', mod_type).value() + underscore_format + '.tpl'), {
                underscored_name: underscore_format,
                module_type: mod_type
            }
        );

        //catalog

        this.fs.copyTpl(
            this.templatePath(oc_version + '/_catalog_controller.php'),
            this.destinationPath(_s(CONTROLLER_23_DIR).replaceAll('%c%', 'catalog').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                classified_name: classify_format,
                underscored_name: underscore_format,
                module_type: mod_type
            }
        );

        this.fs.copyTpl(
            this.templatePath(oc_version + '/_catalog_language.php'),
            this.destinationPath(_s(LANGUAGE_23_DIR).replaceAll('%c%', 'catalog').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                titleized_name: titleize_format,
                module_type: mod_type
            }
        );

        this.fs.copyTpl(
            this.templatePath(oc_version + '/_catalog_ru_language.php'),
            this.destinationPath(_s(LANGUAGE_RU_23_DIR).replaceAll('%c%', 'catalog').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                titleized_name: titleize_format,
                module_type: mod_type
            }
        );

        this.fs.copyTpl(
            this.templatePath(oc_version + '/_catalog_model.php'),
            this.destinationPath(_s(MODEL_23_DIR).replaceAll('%c%', 'catalog').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                classified_name: classify_format,
                module_type: mod_type
            }
        );

        this.fs.copyTpl(
            this.templatePath(oc_version + '/_catalog_view.tpl'),
            this.destinationPath(_s(CATALOG_VIEW_23_DIR).replaceAll('%t%', mod_type).value() + underscore_format + '.tpl'), {
                titleized_name: titleize_format,
                module_type: mod_type
            }
        );

        } else {
            this.fs.copyTpl(
            this.templatePath(oc_version + '/_admin_controller.php'),
            this.destinationPath(_s(CONTROLLER_DIR).replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                classified_name: classify_format,
                underscored_name: underscore_format,
                module_type: mod_type
            }
        );

        this.fs.copyTpl(
            this.templatePath(oc_version + '/_admin_language.php'),
            this.destinationPath(_s(LANGUAGE_DIR).replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                titleized_name: titleize_format,
                underscored_name: underscore_format,
                module_type: mod_type
            }
        );

        this.fs.copyTpl(
            this.templatePath(oc_version + '/_admin_ru_language.php'),
            this.destinationPath(_s(LANGUAGE_RU_DIR).replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                titleized_name: titleize_format,
                underscored_name: underscore_format,
                module_type: mod_type
            }
        );

        this.fs.copyTpl(
            this.templatePath(oc_version + '/_admin_view.tpl'),
            this.destinationPath(_s(ADMIN_VIEW_DIR).replaceAll('%t%', mod_type).value() + underscore_format + '.tpl'), {
                underscored_name: underscore_format,
                module_type: mod_type
            }
        );

        //catalog

        this.fs.copyTpl(
            this.templatePath(oc_version + '/_catalog_controller.php'),
            this.destinationPath(_s(CONTROLLER_DIR).replaceAll('%c%', 'catalog').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                classified_name: classify_format,
                underscored_name: underscore_format,
                module_type: mod_type
            }
        );

        this.fs.copyTpl(
            this.templatePath(oc_version + '/_catalog_language.php'),
            this.destinationPath(_s(LANGUAGE_DIR).replaceAll('%c%', 'catalog').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                titleized_name: titleize_format,
                module_type: mod_type
            }
        );

        this.fs.copyTpl(
            this.templatePath(oc_version + '/_catalog_ru_language.php'),
            this.destinationPath(_s(LANGUAGE_RU_DIR).replaceAll('%c%', 'catalog').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                titleized_name: titleize_format,
                module_type: mod_type
            }
        );

        this.fs.copyTpl(
            this.templatePath(oc_version + '/_catalog_model.php'),
            this.destinationPath(_s(MODEL_DIR).replaceAll('%c%', 'catalog').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                classified_name: classify_format,
                module_type: mod_type
            }
        );

        this.fs.copyTpl(
            this.templatePath(oc_version + '/_catalog_view.tpl'),
            this.destinationPath(_s(CATALOG_VIEW_DIR).replaceAll('%t%', mod_type).value() + underscore_format + '.tpl'), {
                titleized_name: titleize_format,
                module_type: mod_type
            }
        );
        }

        //vqmod
        if (this.props.vqmod == true) {
            this.fs.copyTpl(
                this.templatePath(oc_version + '/_vqmod.xml'),
                this.destinationPath(VQMOD_DIR + underscore_format + '.xml'), {
                    titleized_name: titleize_format,
                    underscored_name: underscore_format
                }
            );
        }

        //ocmod
        if (this.props.ocmod == true) {
            this.fs.copyTpl(
                this.templatePath(oc_version + '/_ocmod.xml'),
                this.destinationPath(OCMOD_DIR + underscore_format + '.xml'), {
                    titleized_name: titleize_format,
                    underscored_name: underscore_format    
                }
            );
        }

    },

    end: function() {
        this.log(yosay(
            'Your module starter ' + chalk.blue(titleize_format) + ' has been created successfully!'
        ));
    }
});