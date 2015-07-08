'use strict';

/**
 * @ngdoc function
 * @name binaryRecipesApp.controller:ViewRecipeModalCtrl
 * @description This controller is for viewing full recipe
 * # ViewRecipeModalCtrl
 * Controller of the binaryRecipesApp
 */
angular.module('binaryRecipesApp')
  .controller('ViewRecipeModalCtrl', ['$modalInstance', '$scope', 'recipe', function ($modalInstance, $scope, recipe) {

    // recipe to be shown
    $scope.recipe = recipe;

    
    /** Methods **/

    /*
     * Closes the modal on ok button click
     */
    $scope.ok = function() {
        $modalInstance.dismiss('cancel');
    }
   
  }]);
