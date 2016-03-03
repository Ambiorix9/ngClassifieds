(function() {
	
	"use strict";
	
	angular
		.module('ngClassifieds')
		.controller('newClassifiedsCtrl', function($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {
		
			var vm = this;
			vm.closeSidebar = closeSiderbar;
			vm.saveClassified = saveClassified;
		
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
		
			function saveClassified(classified) {
				
				classified.contact = {
					name: "Bob Fleming"	,
					phone: "(0141) 555-555",
					email: "bobfleming@gmail.com"
				};
				
				if(classified) {
					$scope.$emit('newClassified', classified);
					vm.sidenavOpen = false;
				}
			}
			
	});
})();