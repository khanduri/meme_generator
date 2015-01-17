
var transform = function(canvas, context, centerx, centery, image, operations){
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.translate(canvas.width / 2, canvas.height / 2);

    if (operations.scale !== undefined)
        context.scale(operations.scale, operations.scale);

    if (operations.rotate !== undefined)
        context.rotate(operations.rotate * Math.PI / 180);

    context.translate(-canvas.width / 2, -canvas.height / 2);
    context.drawImage(image, centerx, centery);
    context.restore();
    return context;
}

var imprintImageToCanvas = function(canvas, image, height, width){
    var context = canvas.getContext('2d');
    context.drawImage(image, height, width);
    return context;
}

$(document).ready(function(){
    var deviceWidth = window.innerWidth;
    var size = Math.min(640, deviceWidth-20);

    var image = $('#default-image')[0];

    var canvas = $('canvas')[0];
    canvas.width = size;
    canvas.height = size;
    var centerx = canvas.width/2 - image.width/2;
    var centery = canvas.height/2 - image.height/2;
    var context = imprintImageToCanvas(canvas, image, centerx, centery);

    var operations = {
        scale: $('#scale-image').value,
        rotate: $('#rotate-image').value
    }

    $('#scale-image').change(function(){
        operations.scale = this.value;
        context = transform(canvas, context, centerx, centery, image, operations);
    });

    $('#rotate-image').change(function(){
        operations.rotate = this.value;
        context = transform(canvas, context, centerx, centery, image, operations);
    });
});
