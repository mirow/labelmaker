'use strict';

var controllers = angular.module('controllers', []);
var app = angular.module('app', ['controllers']);
app.directive('input', function () {
  return {
    restrict: 'E',
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      if (attrs.type.toLowerCase() === 'range') {
        // change output of range to number.
        ctrl.$parsers.push(function (value) {
          var valueAsInt = parseInt(value);
          var returnValue;
          if (isFinite(valueAsInt)) {
            returnValue = valueAsInt;
          } else {
            // don't change model
            returnValue = ctrl.$modelValue;
          }
          return returnValue;
        });
      }
    }
  };
});

controllers.controller('canvasCtrl', function ($scope) {
  $scope.color = "#000000";

  $scope.fonts = [
    'Sigmar One',
    'Erica One',
    'Merriweather',
    'Titillium Web',
    'Black Ops One',
    'Frijole',
    'Corben',
    'Cinzel Decorative',
    'Sniglet',
    'Fascinate',
    'Plaster',
    'Fascinate Inline',
    'Ceviche One',
    'Press Start 2P',
    'Knewave',
    'Shojumaru',
    'Nosifer',
    'Sarina',
    'UnifrakturCook',
    'Mrs Sheppards',
    'Arbutus',
    'Chewy',
    'Domine',
    'Permanent Marker',
    'Playfair Display SC',
    'Alegreya Sans SC',
    'Berkshire Swash',
    'Creepster',
    'Oleo Script Swash Caps',
    'Life Savers',
    'Trade Winds'
  ];



  $scope.label = {
    border: new fabric.Rect({
      top: 0,
      left: 0,
      width: 400 - 10,
      height: 500 - 10,
      fill: 'transparent',
      stroke: '#990000',
      strokeLineJoin: 'round',
      strokeWidth: 10,
      strokeMiterLimit: 10,
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
      selectable: false
    }),
    backgroundBox: new fabric.Rect(
      {
        top: 10,
        left: 10,
        width: 400 - 20,
        height: 500 - 20,
        fill: 'rgb(255, 217, 102)',
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
        selectable: false
      }),
    topBox: new fabric.Rect(
      {
        top: 10-1,
        left: 10-1,
        width: 400 - 10 * 2 +2,
        height: 100,
        fill: '#000',
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
        selectable: false
      }),
    bottomBox: new fabric.Rect({
      top: 500 - 100,
      left: 10-1,
      width: 400 - 10 * 2 +2,
      height: 100,
      fill: '#000',
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
      selectable: false
    }),
    text1: new fabric.Text('Old Peculiar', {
      left: 200,
      width: 300,
      top: 30,
      fill: '#ffffff',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: 40,
      fontWeight: 'bold',
      originX: 'center',
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
      selectable: false
    }),
    text2: new fabric.Text('Special Porter', {
      left: 200,
      top: 70,
      fill: '#ffffff',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: 30,
      fontWeight: 'bold',
      originX: 'center',
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
      selectable: false

    }),
    text3: new fabric.Text('Barren River Brewery', {
      left: 200,
      top: 420,
      fill: '#ffffff',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: 30,
      fontWeight: 'bold',
      originX: 'center',
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
      selectable: false

    }),
    text4: new fabric.Text('Whatever', {
      left: 200,
      top: 450,
      fill: '#ffffff',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: 30,
      fontWeight: 'bold',
      originX: 'center',
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
      selectable: false
    }),
    text5: new fabric.Text('5.6% alc', {
      left: 20,
      top: 470,
      fill: '#ffffff',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: 10,
      fontWeight: 'bold',
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
      selectable: false
    }),
    text6: new fabric.Text('500ml', {
      left: 380,
      top: 470,
      fill: '#ffffff',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: 10,
      fontWeight: 'bold',
      originX: 'right',
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
      selectable: false
    })
  };


  $scope.canvas = new fabric.Canvas('c');
  $scope.canvas.add($scope.label.backgroundBox);
  $scope.canvas.add($scope.label.topBox);
  $scope.canvas.add($scope.label.bottomBox);
  $scope.canvas.add($scope.label.border);
  $scope.canvas.add($scope.label.text1);
  $scope.canvas.add($scope.label.text2);
  $scope.canvas.add($scope.label.text3);
  $scope.canvas.add($scope.label.text4);
  $scope.canvas.add($scope.label.text5);
  $scope.canvas.add($scope.label.text6);

  $scope.loadFile = function () {
    //Retrieve the first (and only!) File from the FileList object
    var f = document.getElementById('imageFile').files[0];
    if (f) {
      var r = new FileReader();
      r.onload = function (e) {
        $scope.processImageFile(e.target.result);
        $('#imageFile').val(null);
        $scope.$apply();
      };
      r.readAsDataURL(f);
    }
  };

  $scope.processImageFile = function (imageData) {
    $('#image').attr('src', imageData);
    $scope.label.image = new fabric.Image(document.getElementById('image'), {
      left: 200,
      top: 250,
      originX: 'center',
      originY: 'center'
    });
    $scope.canvas.add($scope.label.image);
    if ($scope.label.image.height>300) {
      $scope.label.image.scaleToHeight(300);
    } else if ($scope.label.image.width>400) {
      $scope.label.image.scaleToWidth(400-$scope.label.border.strokeWidth*2);
    }
    $scope.repaint();
  };


  $scope.load = function () {
    $scope.label.text1 = new fabric.Text('', JSON.parse(localStorage.getItem('text1')));
    $scope.label.text2 = new fabric.Text('', JSON.parse(localStorage.getItem('text2')));
    $scope.label.text3 = new fabric.Text('', JSON.parse(localStorage.getItem('text3')));
    $scope.label.text4 = new fabric.Text('', JSON.parse(localStorage.getItem('text4')));
    $scope.label.text5 = new fabric.Text('', JSON.parse(localStorage.getItem('text5')));
    $scope.label.text6 = new fabric.Text('', JSON.parse(localStorage.getItem('text6')));
    $scope.label.border = new fabric.Rect(JSON.parse(localStorage.getItem('border')));
    $scope.label.bottomBox = new fabric.Rect(JSON.parse(localStorage.getItem('bottomBox')));
    $scope.label.topBox = new fabric.Rect(JSON.parse(localStorage.getItem('topBox')));
    $scope.label.backgroundBox = new fabric.Rect(JSON.parse(localStorage.getItem('backgroundBox')));
    var img = localStorage.getItem('image');
    if (img != "undefined") {
      $scope.label.image = new fabric.Rect(JSON.parse(img));
    }

    $scope.canvas.clear();
    //$scope.canvas = new fabric.Canvas('c');
    $scope.canvas.add($scope.label.backgroundBox);
    $scope.canvas.add($scope.label.topBox);
    $scope.canvas.add($scope.label.bottomBox);
    $scope.canvas.add($scope.label.border);
    $scope.canvas.add($scope.label.text1);
    $scope.canvas.add($scope.label.text2);
    $scope.canvas.add($scope.label.text3);
    $scope.canvas.add($scope.label.text4);
    $scope.canvas.add($scope.label.text5);
    $scope.canvas.add($scope.label.text6);
    if (img != "undefined") {
      $scope.canvas.add($scope.label.image);
    }

    $scope.repaint();
  };

  $scope.save = function () {
    localStorage.setItem('backgroundBox', JSON.stringify($scope.label.backgroundBox));
    localStorage.setItem('topBox', JSON.stringify($scope.label.topBox));
    localStorage.setItem('bottomBox', JSON.stringify($scope.label.bottomBox));
    localStorage.setItem('border', JSON.stringify($scope.label.border));
    localStorage.setItem('text1', JSON.stringify($scope.label.text1));
    localStorage.setItem('text2', JSON.stringify($scope.label.text2));
    localStorage.setItem('text3', JSON.stringify($scope.label.text3));
    localStorage.setItem('text4', JSON.stringify($scope.label.text4));
    localStorage.setItem('text5', JSON.stringify($scope.label.text5));
    localStorage.setItem('text6', JSON.stringify($scope.label.text6));
    localStorage.setItem('image', JSON.stringify($scope.label.image));
  };

   $scope.setFont = function() {
     //$scope.label.text1.fontFamily = $scope.label.font;
     $scope.repaint();
   };
/*
  $scope.$watch("color", function (val) {
    if ($scope.options == 'border') {
      $scope.label.border.set({stroke: val});
    } else if ($scope.options == 'background') {
      $scope.label.backgroundBox.set({fill: val, stroke: val});
    }

    $scope.canvas.renderAll();
  });
*/
  $scope.$watchCollection("[label.text1.fontSize, label.text2.fontSize, label.borderWidth]", function () {
    var padding = (100 - $scope.label.text1.fontSize*$scope.label.text1.lineHeight - $scope.label.text2.fontSize*$scope.label.text2.lineHeight)*4/4;
    var topPadding = $scope.label.text1.fontSize/($scope.label.text1.fontSize + $scope.label.text2.fontSize)*padding;
    var bottomPadding = $scope.label.text2.fontSize/($scope.label.text1.fontSize + $scope.label.text2.fontSize)*padding;

    $scope.label.text1.top = topPadding + $scope.label.border.strokeWidth;
    $scope.label.text2.top = 100 + $scope.label.border.strokeWidth - bottomPadding - $scope.label.text2.fontSize*$scope.label.text2.lineHeight;
  });

  $scope.$watchCollection("[label.text3.fontSize, label.text4.fontSize, label.borderWidth]", function () {
    var padding = (100 - $scope.label.text3.fontSize*$scope.label.text3.lineHeight - $scope.label.text4.fontSize*$scope.label.text4.lineHeight)*4/4;
    var topPadding = $scope.label.text3.fontSize/($scope.label.text3.fontSize + $scope.label.text4.fontSize)*padding;
    var bottomPadding = $scope.label.text4.fontSize/($scope.label.text3.fontSize + $scope.label.text4.fontSize)*padding;

    $scope.label.text3.top = topPadding + 400-$scope.label.border.strokeWidth;
    $scope.label.text4.top = 500 - $scope.label.border.strokeWidth - bottomPadding - $scope.label.text4.fontSize*$scope.label.text4.lineHeight;
  });

  $scope.$watch("label.borderWidth", function (val) {
    if (!val) return;
    val = parseInt(val);

    $scope.label.border.set({
      width: 400 - val,
      height: 500 - val,
      strokeWidth: val
    });

    $scope.label.topBox.set({
      width: 400 - val*2 +2,
      top: val-1,
      left: val-1
    });
    $scope.label.bottomBox.set({
      width: 400 - val*2+2,
      top: 500 - 100 - val,
      left: val-1
    });
    $scope.label.backgroundBox.set({
      width: 400 - val*2,
      height: 500 - val*2,
      top: val-1,
      left: val-1
    });
    $scope.label.text5.left = val+10;
    $scope.label.text6.left = 400-(val+10);
    $scope.label.text5.top = 500-(val+10+$scope.label.text5.fontSize);
    $scope.label.text6.top = 500-(val+10+$scope.label.text6.fontSize);
    $scope.canvas.renderAll();
  });


  $scope.repaint = function () {


    $scope.canvas.renderAll();
  };


});

