angular.module('myModal', [])
  .service('myModal', function ($q,
                                $rootScope,
                                $controller,
                                $templateRequest,
                                $compile,
                                $log,
                                $document,
                                $injector) {

    this.open = function (parameters) {

      var defer = $q.defer();
      var template;
      var promise = defer.promise;
      var newScope = $rootScope.$new(true);

      newScope.defer = defer;

      var resolves = Object.keys(parameters.resolve).map(function(key) {
        return $injector.invoke(parameters.resolve[key]);
      });

      $q.all(resolves).then(createModal, function () {
        $log.error('something wrong');
      });

      function createModal(params) {

        newScope.resolved = params;

        newScope.cancel = function () {
          $log.log('cancel');
          newScope.$destroy();
          template.remove();
        };
        newScope.ok = function () {
          $log.log('ok');
          newScope.$destroy();
          template.remove();
        };

        $controller(parameters.controller, {$scope: newScope});

        $templateRequest(parameters.templateUrl).then(function (templ) {

          var modal = angular.element(['<my-modal>'
            , templ
            , '<button ng-click="ok()" class="btn btn-default">'
            , 'Ok'
            , '</button>'
            , '<button ng-click="cancel()" class="btn btn-default">'
            , 'Cancel'
            , '</button>'
            , '</my-modal>'
          ].join(''));
          template = $compile(modal)(newScope);

          $document[0].body.appendChild(template[0]);
        });
      }

      return promise;
    };
  });
