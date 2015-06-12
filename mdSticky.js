(function () {
	angular.module('mdSticky', ['ngMaterial'])
	.directive('mdSticky', MdStickyDirective);
	
	MdStickyDirective.$inject = ['$mdSticky', '$compile'];
	function MdStickyDirective($mdSticky, $compile) {
		return {
			restrict: 'A',
			replace: true,
			transclude: true,
			template: '<div class="md-sticky-content"></div>',
			compile: MdStickyLink
		};
		
		function MdStickyLink(element, attrs, transclude) {
			return function postLink(scope, element, attr) {
				var outerHTML = element[0].outerHTML;
				console.log(outerHTML);
				transclude(scope, function (clone) {
					console.log(clone);
					element.append(clone);
				});
				
				transclude(scope, function (clone) {
					var stickyClone = $compile(angular.element(outerHTML).removeAttr("md-sticky"))(scope);
					stickyClone.append(clone);
					$mdSticky(scope, element, stickyClone);
				});
			};
			
		}
	}
})();