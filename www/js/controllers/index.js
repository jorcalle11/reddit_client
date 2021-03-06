(()=> {

  'use strict';

  angular
    .module('redditClient')
    .controller('ArticlesCtrl', ['$scope','Articles',articlesCtrl]);


  function articlesCtrl ($scope, Articles) {

    $scope.articles = [];

    $scope.loadArticles = () => {
      Articles.get().then((response)=> {
        $scope.articles = response.data.children;
      });
    }

    $scope.loadMore = () => {
      if ($scope.articles.length > 0) {

        let last = $scope.articles[$scope.articles.length-1].data.name;
        Articles.more(last).then((response) => {
          response.data.children.map((article) => {
            $scope.articles.push(article);
          })
        });
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    $scope.doRefresh = () => {
      if (!$scope.articles.length) return;

      let first = $scope.articles[0].data.name;
      Articles.news(first).then((response) => {
        let newPosts = [];

        response.data.children.map((article) => {
          newPosts.push(article);
        });
        $scope.articles = newPosts.concat($scope.articles);
      });
      $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.openLink = (url) => {
      window.open(url, '_blank');
    }
  }

})();
