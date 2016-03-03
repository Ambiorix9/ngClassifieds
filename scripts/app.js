angular
	.module('ngClassifieds', ['ngMaterial', 'ui.router', 'firebase'])
	.config(function($mdThemingProvider, $stateProvider) {
	
		$mdThemingProvider.theme('default')
			.primaryPalette('teal')
			.accentPalette('orange');
	
		$stateProvider
			.state('classifieds', {
				url: '/classifieds',
				templateUrl: 'components/classifieds/classifieds.tpl.html',
				controller: 'classifiedsCtrl',
				controllerAs: 'vm'
			})
			.state('classifieds.new', {
				url: '/new',
				templateUrl: 'components/classifieds/new/classifieds.new.tpl.html',
				controller: 'newClassifiedsCtrl',
				controllerAs: 'vm'
			})
			.state('classifieds.edit', {
				url: '/edit/:id',
				templateUrl: 'components/classifieds/edit/classifieds.edit.tpl.html',
				controller: 'editClassifiedsCtrl',
				controllerAs: 'vm',
				params: {
					classified: null
				}
			});	
	});