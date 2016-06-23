(()=> {
  'use strict';

  angular
    .module('redditClient')
    .service('Articles',['$http','$q', 'URL',articlesService]);

    function articlesService ($http, $q, URL) {
      let articles = [];

      articles.get = () => {
        let defered = $q.defer();

        $http.get(URL)
          .success((data) => {
            defered.resolve(data);
          })
          .error((err) => {
            defered.reject(err);
          });
        return defered.promise;
      }

      articles.more = (name) => {
        let defered = $q.defer();
        let params = {
          after: name
        }
        $http.get(URL,{params:params})
          .success((data) => {
            defered.resolve(data);
          })
          .error((err) => {
            defered.reject(data);
          });
        return defered.promise;
      }

      articles.news = (name) => {
        let defered = $q.defer();
        let params = {
          before: name
        }
        $http.get(URL,{params:params})
          .success((data) => {
            defered.resolve(data);
          })
          .error((err) => {
            defered.reject(data);
          });
        return defered.promise;
      }

      return articles;
    }

})();
