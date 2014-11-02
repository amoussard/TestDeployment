MySecondClass = function (name) {
        this.name = 'John Doe';
        if (name) {
                this.name = name;
        }
};

MySecondClass.prototype.getName = function () {
        return this.name;
};
