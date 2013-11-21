$(document).ready(function () {
  $("#start-togetherjs").click(TogetherJS);
  $("#l1").draggable();
  $("#l2").draggable();
  $("#o1").draggable();
  $("#o2").draggable();

  // L pieces action
  var rotate, flipover, target;
  $(".rotate").click(function(){
    target   = $(this).parent("div");
    flipover = target.data("flipover");
    rotate   = target.data("rotate") + 90;
    if (rotate === 360) {
      rotate = 0;
    }
    target.data("rotate", rotate);

    target.css({
      "-webkit-transform": "rotateZ(" + rotate + "deg)" + "rotateY(" + flipover + "deg)",
         "-moz-transform": "rotateZ(" + rotate + "deg)" + "rotateY(" + flipover + "deg)",
          "-ms-transform": "rotateZ(" + rotate + "deg)" + "rotateY(" + flipover + "deg)",
           "-o-transform": "rotateZ(" + rotate + "deg)" + "rotateY(" + flipover + "deg)",
              "transform": "rotateZ(" + rotate + "deg)" + "rotateY(" + flipover + "deg)"
    });

    // sync pieces
    if (TogetherJS.running) {
      TogetherJS.send({type: "piece-change", element: '#' + target.attr('id'), inlineStyle: target.attr('style')});
    }
  });

  $(".flipover").click(function(){
    target = $(this).parent("div");
    rotate   = target.data("rotate");
    flipover = target.data("flipover") + 180;
    if (flipover === 360) {
      flipover = 0;
      $('.fa-undo').attr('class', 'fa fa-repeat fa-stack-1x');
    } else {
      $('.fa-repeat').attr('class', 'fa fa-undo fa-stack-1x');
    }
    target.data("flipover", flipover);

    target.css({
      "-webkit-transform": "rotateZ(" + rotate + "deg)" + "rotateY(" + flipover + "deg)",
         "-moz-transform": "rotateZ(" + rotate + "deg)" + "rotateY(" + flipover + "deg)",
          "-ms-transform": "rotateZ(" + rotate + "deg)" + "rotateY(" + flipover + "deg)",
           "-o-transform": "rotateZ(" + rotate + "deg)" + "rotateY(" + flipover + "deg)",
              "transform": "rotateZ(" + rotate + "deg)" + "rotateY(" + flipover + "deg)"
    });

    // sync pieces
    if (TogetherJS.running) {
      TogetherJS.send({type: "piece-change", element: '#' + target.attr('id'), inlineStyle: target.attr('style')});
    }
  });

  // sync pieces
  $('#l1').on('mouseup', function() {
    if (TogetherJS.running) {
      TogetherJS.send({type: "piece-change", element: '#l1', inlineStyle: $(this).attr('style')});
    }
  })
  $('#l2').on('mouseup', function() {
    if (TogetherJS.running) {
      TogetherJS.send({type: "piece-change", element: '#l2', inlineStyle: $(this).attr('style')});
    }
  })
  $('#o1').on('mouseup', function() {
    if (TogetherJS.running) {
      TogetherJS.send({type: "piece-change", element: '#o1', inlineStyle: $(this).attr('style')});
    }
  })
  $('#o2').on('mouseup', function() {
    if (TogetherJS.running) {
      TogetherJS.send({type: "piece-change", element: '#o2', inlineStyle: $(this).attr('style')});
    }
  })

  // listen piece-change
  TogetherJS.hub.on("piece-change", function (msg) {
    $(msg.element).attr('style', msg.inlineStyle);
  });
});
