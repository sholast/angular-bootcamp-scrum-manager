(function () {
  'use strict';

  angular
    .module('bcPopup', [])
    .service('bcPopup', bcPopup);

  /* @ngInject */
  function bcPopup($q,
                   $injector,
                   $log,
                   $templateRequest,
                   $rootScope,
                   $controller,
                   $compile,
                   $document) {
    this.open = open;

    ////////////////

    function open(options) {
      var deffered = $q.defer();
      var resolves = options.resolve || {};
      var parentScope = options.scope || $rootScope;
      var promises = _.mapValues(resolves, function (resolveFunc) {
        return $injector.invoke(resolveFunc);
      });

      var resultPromise = $q.all(promises);
      var resolvedInstances = null;

      resultPromise.then(function (_resolvedInstances) {
        resolvedInstances = _resolvedInstances;
        return $q.when(
          options.template ||
          $templateRequest(options.templateUrl)
        ).then(function (template) {
          var scope = parentScope.$new();
          $controller(options.controller, _.assign(
            {$scope: scope},
            resolvedInstances
          ));

          scope.close = function (result) {
            deffered.resolve(result);
            element.remove();
            scope.$destroy();
          };

          var compiledTemplateLinker = $compile(template);
          var element = compiledTemplateLinker(scope);
          angular.element($document[0].body).append(element);

        }).catch(function (err) {
          $log.error(err);
          deffered.reject(err);
        })

      });

      $log.log(promises);

      //$controller

      return deffered.promise;

    }
  }

})();

