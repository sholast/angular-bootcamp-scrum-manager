angular.module('myModal').directive('myModal', function () {
  return {
    restrict: 'E',
    scope: {},
    transclude: true,
    template: ['<div>',
      '<div class="my-modal"'
      , ' style="'
      , 'position: fixed;'
      , 'top: 0;'
      , 'right: 0;'
      , 'bottom: 0;'
      , 'left: 0;'
      , 'background: rgba(0, 0, 0, 0.8);'
      , 'z-index: 99999;'
      , 'opacity: 1;'
      , 'pointer-events: auto;">'
      , '<div style="'
      , 'width: 400px;'
      , 'position: relative;'
      , 'margin: 10% auto;'
      , 'padding: 5px 20px 13px 20px;'
      , 'border-radius: 10px;'
      , 'background: #fff;'
      , 'pointer-events: auto;">'
      , '<div ng-transclude> '
      , '</div>'
      , '</div>'
      , '</div>'].join('')
  }
});
