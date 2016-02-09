(function () {
    angular.module('scDocumentation')
    .controller('LessonController', function ($scope, $location, $routeParams, scData, $sce) {
        scData.Entity.get({ id: $routeParams.lessonId}, function (entity) {
            $scope.title = entity.name;

            if(entity.content) {
              // change all <span class="tricia-code"> with <code>
              var content = entity.content;
              var regExpression = new RegExp('<span class="tricia-code">');

              while(regExpression.test(content)){
               var codeContent = content.match(new RegExp("<p><span class=\"tricia-code\">" + "(.*)" + "<\/span><\/p>"));
               content = content.replace(/<p><span class=\"tricia-code\">.*<\/span><\/p>/,"<code>"+codeContent[1]+"<\/code><br\/>");
             }

             // change the url link to img tags
             var imgRegExpress = new RegExp('<img src="/file/');
              while(imgRegExpress.test(content)){
                var imageContent = content.match(new RegExp("<img src=\"\/file\/"+"(.*)"+"\/SocioCortex-Documentation"));
                var imageId = imageContent[1].split("/")[0];
                //scUtil
                content = content.replace(/<img src=\"\/file\/.*\/>/,"<img src=\"https:\/\/server.sociocortex.com\/api\/v1\/files\/"+imageId+"\/content\" \/>");
              }

              // change the url link to link tags
              var linkRegExpress = new RegExp('<a href="/pages/');
              while(linkRegExpress.test(content)) {
                var linkContent = content.match(new RegExp("<a href=\"\/pages\/"+"(.*)"+"\/"));
                var linkId = linkContent[1].split("/")[0];
                var linkName = linkContent[1].split("/")[1];
                content = content.replace(/<a href=\"\/pages\/.*>.*<\/a>/,"<a href=\"#\/" + linkId + "\/" + linkName + "\/a>");
              }
              $scope.content = content;
            }
            else {
              $scope.content = "";
            }


        }, function (error) {
            $location.path("/error/404");
        });
    });
})();
