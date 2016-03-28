(function () {
    angular.module('scDocumentation')
    .controller('LessonController', function ($scope, $location, $routeParams, scData, $sce, scUtil) {
        scData.Entity.get({ id: $routeParams.lessonId}, function (entity) {

            $scope.title = entity.name;
            $scope.parentTitle = entity.parent.name;
            $scope.entityId = entity.id;

            if(entity.content) {

                var content = entity.content;

                //skip the content from the interactive tutorial
                if(entity.parent.name == "Tutorial"){

                  if(content.contains("<div class=\"interactive-tutorial\">")){
                    content = content.replace(/<div class=\"interactive-tutorial\">(\n.*)*<\/div>/," ");
                  }
                }

                // change all <pre class="tricia-code"> with <pre ng-prism class="language-javascript">
                var regExpression = new RegExp('<pre class="tricia-code">');

                while(regExpression.test(content)){
                 var codeContent = content.match(new RegExp("<pre class=\"tricia-code\">" + "(([^<]*\n)*)" + "<\/pre>"));
                 content = content.replace(/<pre class=\"tricia-code\">(([^<]*\n)*)<\/pre>/,"<pre class=\"language-javascript\"><code>"+codeContent[1]+"<\/code><\/pre><br\/>");
                }

              // change the url link to img tags
               var imgRegExpress = new RegExp('<img src="/file/');
                while(imgRegExpress.test(content)){
                  var imageContent = content.match(new RegExp("<img src=\"\/file\/"+"(.*)"+"\/SocioCortex-Documentation"));
                  var imageId = imageContent[1].split("/")[0];

                  var fullUrl = scUtil.getFullUrl(scUtil.paths.files + "/" + imageId + "/content");
                  content = content.replace(/<img src=\"\/file\/.*\/>/,"<img src=" + fullUrl + "\/>");
                }

                // change the url link to link tags
                var linkRegExpress = new RegExp('<a href="/pages/');
                while(linkRegExpress.test(content)) {
                  var linkContent = content.match(new RegExp("<a href=\"\/pages\/"+"(.*)"+"\/"));
                  var linkId = linkContent[1].split("/")[0];
                  var linkName = linkContent[1].split("/")[1];
                  content = content.replace(/<a href=\"\/pages\/.*>.*<\/a>/,"<a href=\"#\/" + linkId + "\/" + linkName + "\/a>");
                }
                $scope.content = $sce.trustAsHtml(content);
                Prism.highlightAll();
            }
            else {
                $scope.content = "";
            }

        }, function (error) {
            $location.path("/error/404");
        });
    });
})();
