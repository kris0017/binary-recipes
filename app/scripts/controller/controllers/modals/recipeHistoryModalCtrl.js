'use strict';

/**
 * @ngdoc function
 * @name binaryRecipesApp.controller:recipeHistoryModalCtrl
 * @description This controller is for viewing all previous versions of the recipe
 * # recipeHistoryModalCtrl
 * Controller of the binaryRecipesApp
 */
angular.module('binaryRecipesApp')
  .controller('RecipeHistoryModalCtrl', ['$modal', '$modalInstance', '$scope', 'recipeHistory', function ($modal, $modalInstance, $scope, recipeHistory) {

    // recipe history to be shown
    $scope.recipeHistory = recipeHistory;

    
    /** Methods **/

    /*
     * Closes the modal on ok button click
     */
    $scope.ok = function() {
        $modalInstance.dismiss('cancel');
    }

    /*
     * View recipe in modal.
     */
    $scope.viewRecipe = function(recipe) {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'views/modals/viewRecipeModal.html',
            controller: 'ViewRecipeModalCtrl',
            resolve: {
                recipe: function () {
                    return recipe;
                }
            }
        });
    }
   
  }]);
