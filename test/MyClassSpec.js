var MyClass = require('./../lib/MyClass');

describe('MyClass', function () {
  it('has default name', function () {
    var test = new MyClass();
    expect(test.getName()).toBe('John Doe');
  });

  it('can set name', function () {
    var test = new MyClass('test');
    expect(test.getName()).toBe('test');
  });
});
