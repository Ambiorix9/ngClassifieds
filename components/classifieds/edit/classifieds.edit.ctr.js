(function() {

	"use strict";

	angular
		.module('ngClassifieds')
		.controller('editClassifiedsCtrl', function($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {

		var vm = this;
		vm.closeSidebar = closeSiderbar;
		vm.saveEdit = saveEdit;
		vm.classifieds = classifiedsFactory.ref;
		vm.classified = vm.classifieds.$getRecord($state.params.id);

		$timeout(function(){
			$mdSidenav('left').open();
		});

		$scope.$watch('vm.sidenavOpen', function(sidenav){
			if(sidenav === false) {
				$mdSidenav('left')
					.close()
					.then(function() {
					$state.go('classifieds');
				});
			}
		});

		function closeSiderbar() {
			vm.sidenavOpen = false;
		}

		function saveEdit() {
			vm.classifieds.$save(vm.classified).then(function(){
				$scope.$emit('editSaved', "Edit saved!");
				vm.sidenavOpen = false;
			});
		}

	});
})();