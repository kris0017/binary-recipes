'use strict';

/**
 * @ngdoc function
 * @name binaryRecipesApp.controller:AddRecipeModalCtrl
 * @description This controller is for adding new recipe or editing existing recipe
 * # AddRecipeModalCtrl
 * Controller of the binaryRecipesApp
 */
angular.module('binaryRecipesApp')
  .controller('AddEditRecipeModalCtrl', ['$modalInstance', '$scope', 'recipeToEdit', function ($modalInstance, $scope, recipeToEdit) {

    // recipe to be edited
    $scope.recipe = recipeToEdit;

    // recipe name
    $scope.name = $scope.recipe ? $scope.recipe.name : '';

    // recipe description
    $scope.description = $scope.recipe ? $scope.recipe.description : '';
    
    /** Methods **/

    /*
     * Saves entered data on ok button click
     */
    $scope.ok = function() {
        var recipeToSave;
        if ($scope.recipe) {
            recipeToSave = {
                name: $scope.name,
                description: $scope.description,
                creationDate: $scope.recipe.creationDate,
                editDate: moment().format('DD-MM-YYYY HH:mm'),
                version: $scope.recipe.version + 1,
                id: $scope.recipe.id
            }
        } else {
            recipeToSave = {
                name: $scope.name,
                description: $scope.description,
                creationDate: moment().format('DD-MM-YYYY HH:mm'),
                editDate: moment().format('DD-MM-YYYY HH:mm'),
                version: 1,
                id: moment().format('DDMMYYYYHHmmss')
            }
        }
        $modalInstance.close(recipeToSave);
    }

    /*
     * Closes the modal without saving on cancel button click.
     */
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }

    /*
     * Clears the inputs on clear button click.
     */
    $scope.clear = function() {
        $scope.name = '';
        $scope.description = '';
    }
   
  }]);
