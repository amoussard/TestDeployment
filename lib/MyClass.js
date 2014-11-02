/**
 * @class MyClass
 * @param name
 * @constructor
 */
var MyClass = function (name) {
    /**
     * @property name
     * @type {string}
     * @default 'John Doe'
     */
    this.name = 'John Doe';

    if (name) {
        this.name = name;
    }
};

/**
 * Return the name of the class
 *
 * @method getName
 * @return {string} Name of the class
 */
MyClass.prototype.getName = function () {
    return this.name;
};

module.exports = MyClass;