var myExtObject = (function() {

  return {
    func1: function() {
      alert('function 1 called');
    },
    func2: function() {
      alert('function 2 called');
    }
  }

})(myExtObject||{})


var webGlObject = (function() {
  return {
    init: function() {
      alert('webGlObject initialized');
    }
  }
})(webGlObject||{})
