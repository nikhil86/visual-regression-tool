/*global _, _s*/
define(function(require) {
    var Super = require('views/base'),
        B = require('bluebird'),
        Template = require('hbs!./filter.tpl');


    var View = Super.extend({

    });

    View.prototype.initialize = function(options) {
        //super(options)
        Super.prototype.initialize.call(this, options);
    };

    View.prototype.render = function() {
        var that = this;
        return B.resolve()
            .then(function() {

                that.$el.html(that.getTemplate()({
                    id: that.id,
                    data: that.options.params
                }));
            })
            .then(function() {
                console.log('calling renderFields()');
                that.renderFields();
            })
            .then(function() {
                that.mapControls();

                var events = {};
                events['click ' + that.toId('search')] = 'searchButtonClickHandler';
                events['click ' + that.toId('clear')] = 'clearButtonClickHandler';
                that.delegateEvents(events);
            })
            .then(function() {
                that.postRender();
            });
    };

    View.prototype.renderFields = function() {
        console.log('called')
        //render the fields and prepopulated values from this.options.params
    };

    View.prototype.postRender = function() {

    };


    View.prototype.clearFields = function() {

    };
    
    View.prototype.getTemplate = function() {
        return Template;
    };

    View.prototype.searchButtonClickHandler = function(event) {
        event.preventDefault();
        this.controls.page.val(1);
        this.trigger('search');
    };
    
    View.prototype.clearButtonClickHandler = function(event) {
        event.preventDefault();
        this.controls.page.val(1);
        this.clearFields();
        this.trigger('search');
    };



    return View;


});