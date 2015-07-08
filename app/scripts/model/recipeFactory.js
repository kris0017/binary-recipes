'use strict';

/**
 * @ngdoc function
 * @name binaryRecipesApp.factory:recipeFactory
 * @description This factory persists and retrieves recipes from localStorage.
 * # recipeFactory
 * Factory of the binaryRecipesApp
 */
angular.module('binaryRecipesApp')
  .factory('recipeFactory', ['$q', function ($q) {

    // key to get array with recipes from local storage
    var RECIPE_ARRAY = 'recipe-array';

    // key to get array with previous versions of all recipes from local storage
    var RECIPE_HISTORY = 'recipe-history';

    var storage = {
        recipeArray: JSON.parse(localStorage.getItem(RECIPE_ARRAY) || '[]'),
        historyObj: JSON.parse(localStorage.getItem(RECIPE_HISTORY) || '{}'),

        _getFromLocalStorage: function () {
            return JSON.parse(localStorage.getItem(RECIPE_ARRAY) || '[]');
        },

        _saveToLocalStorage: function (recipeArray) {
            localStorage.setItem(RECIPE_ARRAY, JSON.stringify(recipeArray));
        },

         _getHistoryFromLocalStorage: function () {
            return JSON.parse(localStorage.getItem(RECIPE_HISTORY) || '{}');
        },

        _saveHistoryToLocalStorage: function (historyObj) {
            localStorage.setItem(RECIPE_HISTORY, JSON.stringify(historyObj));
        },

        delete: function (recipe) {
            var deferred = $q.defer();

            storage.historyObj[recipe.id] = undefined;
            storage._saveHistoryToLocalStorage(storage.historyObj);

            storage.recipeArray.splice(storage.recipeArray.indexOf(recipe), 1);

            storage._saveToLocalStorage(storage.recipeArray);
            deferred.resolve(storage.recipeArray);

            return deferred.promise;
        },

        get: function () {
            var deferred = $q.defer();

            angular.copy(storage._getFromLocalStorage(), storage.recipeArray);
            deferred.resolve(storage.recipeArray);

            return deferred.promise;
        },

        add: function (recipe) {
            var deferred = $q.defer();

            // create object for saving history for current object
            storage.historyObj[recipe.id] = {};
            storage.historyObj[recipe.id][recipe.version] = recipe;
            storage._saveHistoryToLocalStorage(storage.historyObj);

            // save recipe to array with recipes
            storage.recipeArray.push(recipe);

            storage._saveToLocalStorage(storage.recipeArray);
            deferred.resolve(storage.recipeArray);

            return deferred.promise;
        },

        edit: function (recipe) {
            var deferred = $q.defer();

            $.each(storage.historyObj, function(key, value) {
                if (key === recipe.id) {
                    value[recipe.version] = recipe;
                    return false;
                }
            });
            storage._saveHistoryToLocalStorage(storage.historyObj);

            for (var i = 0; i < storage.recipeArray.length; i++) {
                if (storage.recipeArray[i].id === recipe.id) {
                    storage.recipeArray[i] = recipe;
                    break;
                }
            }
            
            storage._saveToLocalStorage(storage.recipeArray);
            deferred.resolve(storage.recipeArray);

            return deferred.promise;
        },

        getHistory: function (recipe) {
            var deferred = $q.defer();

            angular.copy(storage._getHistoryFromLocalStorage(), storage.historyObj);

            $.each(storage.historyObj, function(key, value) {
                if (key === recipe.id) {
                    deferred.resolve(value);
                    return false;
                }
            });

            return deferred.promise;
        }
    };

    return storage;
    
  }]);
