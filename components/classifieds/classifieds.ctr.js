(function() {
	"use strict";
	
	angular
		.module("ngClassifieds")
		.controller("classifiedsCtrl", function($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
			var vm = this;
			vm.categories;
			vm.classified;
			vm.classifieds;
			vm.closeSidebar = closeSidebar;
			vm.deleteClassified = deleteClassified;
			vm.editClassified = editClassified;
			vm.editing;
			vm.openSidebar = openSidebar;
			vm.saveClassified = saveClassified;
			vm.saveEdit = saveEdit;
		
			vm.classifieds = classifiedsFactory.ref;
			vm.classifieds.$loaded().then(function(classifieds) {
				vm.categories = getCategories(classifieds);
			});
		
/*			classifiedsFactory.getClassifieds().then(function(classifieds) {
				vm.classifieds = classifieds.data ;
				vm.categories = getCategories(vm.classifieds);
			});*/
		
			$scope.$on('newClassified', function(event, classified) {
				vm.classifieds.$add(classified);
				showToast('Classified saved!');
			});
		
			$scope.$on('editSaved', function(event, message){
				showToast(message);
			});
				
			var contact = {
				name: "Bob Fleming"	,
				phone: "(0141) 555-555",
				email: "bobfleming@gmail.com"
			};
		
		
			function openSidebar() {
				$state.go('classifieds.new')	;
			}

			function closeSidebar() {
				$mdSidenav('left').close();	
			}
		
			function saveClassified(classified) {
				if(classified) {
					classified.contact = contact;
					vm.classifieds.push(classified);
					vm.classified = {};
					$mdSidenav('left').close();	
					showToast("Classified saved!");
				}
			}	
		
			function editClassified(classified) {
 				$state.go('classifieds.edit', {
					id: classified.$id,
				});
			}
		
			function saveEdit() {
				vm.editing = false;
				vm.classified = {};
				closeSidebar();
				showToast("Edit saved!");
			}
			
			function deleteClassified(event, classified) {
				 var confirm = $mdDialog.confirm()
				 	.title('Are you sure yo want to delete ' + classified.title + '?')
				 	.ok('Confirm')
				 	.cancel('Cancel')
				 	.targetEvent(event);
				 $mdDialog.show(confirm).then(function() {
					 vm.classifieds.$remove(classified);
					 showToast('Classified Deleted');
				 }, function() {
					  
				 });
			}
			
			function showToast(message) {
				$mdToast.show(
					$mdToast.simple()
					.content(message)
					.position('top, right')
					.hideDelay(3000)
				);
			}
		
			function getCategories(classifieds) {
				var categories = [];
				angular.forEach(classifieds, function(item){
					angular.forEach(item.categories, function(category) {
						categories.push(category);
					});
				});

				return _.uniq(categories);
			}
			
		}); //end of controller
})();