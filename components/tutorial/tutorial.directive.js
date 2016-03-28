(function () {
    angular.module('scDocumentation')
    .directive('scDocTutorial', function (scDocConfig, scData) {
        return {
            require: [],
            templateUrl: 'components/tutorial/tutorial.html',
            scope: {
               tutorialId : '@',
             },
            controller: function ($scope, $element, $routeParams, scData) {

                var editor = ace.edit("editor");
                editor.setTheme("ace/theme/monokai");
                editor.getSession().setMode("ace/mode/javascript");

                var rowCounter = 0;
                var lastRowLength = 0;

                $scope.correctResult=[];
                scData.Entity.get({ id: $scope.tutorialId}, function (entity) {

                  // get the correct solution
                  var content = entity.content;
                  var solutionExpression = new RegExp('<p class="solution">');
                  while(solutionExpression.test(content)){
                     var solutionContent = content.match(new RegExp("<p class=\"solution\">"+"(.*)"+"<\/p>"));
                     $scope.correctResult.push(solutionContent[1]);
                     content = content.replace(/<p class=\"solution\"\>/,"");
                   }

                  //get the assignment
                  var assignment="";
                  var assignExpression = new RegExp('<p class="assignment">');
                  var userInputRow = 0;
                  var lineBeforeInputLength = 0;

                  while(assignExpression.test(content)){
                     var assignContent = content.match(new RegExp("<p class=\"assignment\">"+"(.*)"+"<\/p>"));

                     if(assignContent[1] == "user input expected"){
                       assignment = assignment + " " + "\n";
                       lineBeforeInputLength = lastRowLength;
                       userInputRow = rowCounter;
                     } else {
                        assignment = assignment + assignContent[1]+"\n";
                     }

                     content = content.replace(/<p class=\"assignment\"\>/,"");
                     rowCounter = rowCounter+1;
                     lastRowLength = assignContent[1].length;
                   }

                  editor.setValue(assignment,1);
                  editor.gotoLine(userInputRow+1);
                  var session  = editor.getSession();
                  var Range = ace.require('ace/range').Range;
                  var range = new Range(0, 0, userInputRow-1, lineBeforeInputLength);
                  var range2 = new Range(userInputRow+1, 0, rowCounter, lastRowLength);
                  //var markerId = session.addMarker(range, "readonly-highlight");

                  editor.keyBinding.addKeyboardHandler({
                  handleKeyboard : function(data, hash, keyString, keyCode, event) {
                      if (hash === -1 || (keyCode <= 40 && keyCode >= 37)) return false;

                      if (intersects(range)) {
                          return {command:"null", passEvent:false};
                      }
                      if (intersects(range2)) {
                          return {command:"null", passEvent:false};
                      }
                  }
                  });

                  range.start  = session.doc.createAnchor(range.start);
                  range.end    = session.doc.createAnchor(range.end);
                  range.end.$insertRight = true;

                  range2.start  = session.doc.createAnchor(range2.start);
                  range2.end    = session.doc.createAnchor(range2.end);
                  range2.end.$insertRight = true;

                  function intersects(range) {
                      return editor.getSelectionRange().intersects(range);
                  }

                });


                //console
                var jqconsole = $('#console').jqconsole('', '>>>');

                var startPrompt = function () {
                  // Start the prompt with history enabled.
                  jqconsole.Prompt(true, function (input) {
                    if( input == 'matrix' ) {
                      var c = $('#console')
                      c.matrix({'height':c.height(),'width':c.width()})
                      jqconsole.Write("There is no spoon\n", 'jqconsole-output');
                    }

                    // Output input with the class jqconsole-output.
                    jqconsole.Write(input + '\n', 'jqconsole-output');
                    // Restart the prompt.
                    startPrompt();
                  });
                };
                startPrompt();


                $scope.runCode = function runCode() {
                  var code = editor.getValue();
                  try {
                    eval(code);
                  } catch (e) {
                    jqconsole.Write(e.message + '\n', 'jqconsole-error');
                  }
                };

                $scope.clearConsole = function clearConsole(){

                   jqconsole.Clear();
                };

                console.log = function(value){
                  if ($scope.correctResult.indexOf(value) > -1) {
                    jqconsole.Write(value + '\n', 'jqconsole-output');
                    jqconsole.Write("You have answered correctly!" + '\n', 'jqconsole-output');

                  } else {
                    jqconsole.Write(value + '\n', 'jqconsole-error');
                    jqconsole.Write("That is not the right answer" + '\n', 'jqconsole-error');
                  }
                };
            }
        }
    });

})();
