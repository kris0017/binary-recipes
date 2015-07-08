'use strict';

/**
 * @ngdoc function
 * @name binaryRecipesApp.controller:RecipesTableCtrl
 * @description This controller is for manipulating with table with recipes
 * # RecipesTableCtrl
 * Controller of the binaryRecipesApp
 */
angular.module('binaryRecipesApp')
  .controller('RecipesTableCtrl', ['$modal', '$log', '$scope', 'recipeFactory', function ($modal, $log, $scope, recipeFactory) {
    
    // array with recipes
    $scope.recipes = recipeFactory.recipeArray;

    /** Methods **/

    /*
     * Watchs array with recipes. If it empty - shows message to user.
     */
    $scope.$watch('recipes', function() {
        $scope.emptyData = $scope.recipes.length === 0;
    }, true);

    /*
     * Opens modal "Add recipe" on add button click.
     */
    $scope.addRecipe = function() {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'views/modals/addEditRecipeModal.html',
            controller: 'AddEditRecipeModalCtrl',
            resolve: {
                recipeToEdit: function () {
                    return undefined;
                }
            }
        });
        modalInstance.result.then(function (newRecipe) {
            saveRecipe(newRecipe);
        }, function () {
            $log.info('Modal dismissed at: ' + moment().format('DD-MM-YYYY HH:mm:ss'));
        });
    }

    /*
     * Opens modal "Edit recipe" on edit button click.
     */
    $scope.editRecipe = function(recipe) {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'views/modals/addEditRecipeModal.html',
            controller: 'AddEditRecipeModalCtrl',
            resolve: {
                recipeToEdit: function () {
                    return recipe;
                }
            }
        });
        modalInstance.result.then(function (editedRecipe) {
            editRecipe(editedRecipe);
        }, function () {
            $log.info('Modal dismissed at: ' + moment().format('DD-MM-YYYY HH:mm:ss'));
        });
    }

    /*
     * Edites recipe.
     */
    function editRecipe(editedRecipe) {
        recipeFactory.edit(editedRecipe).then(
            function(updatedArray) {
                $scope.recipes = updatedArray;
            },
            function() {
                $log.error('Editing recipe error!');
            });
    }

    /*
     * Saves recipe.
     */
    function saveRecipe(newRecipe) {
        recipeFactory.add(newRecipe).then(
            function(updatedArray) {
                $scope.recipes = updatedArray;
            },
            function() {
                $log.error('Adding recipe error!');
            });
    }

    /*
     * Removes recipe.
     */
    $scope.removeRecipe = function(recipe) {
        recipeFactory.delete(recipe).then(
            function(updatedArray) {
                $scope.recipes = updatedArray;
            },
            function() {
                $log.error('Removing recipe error!');
            });
    }

    /*
     * Show recipe history.
     */
    $scope.viewHistory = function(recipe) {
        recipeFactory.getHistory(recipe).then(
            function(history) {
                var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'views/modals/recipeHistoryModal.html',
                controller: 'RecipeHistoryModalCtrl',
                resolve: {
                        recipeHistory: function () {
                            return history;
                        }
                    }
                });
            },
            function() {
                $log.error('Getting recipe\'s history error!');
            });
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
