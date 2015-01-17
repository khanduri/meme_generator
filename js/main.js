
var transform = function(canvas, ctx, operations){
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);

    if (operations.scale !== undefined)
        ctx.scale(operations.scale, operations.scale);

    if (operations.rotate !== undefined)
        ctx.rotate(operations.rotate * Math.PI / 180);

    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    ctx.drawImage(img, x, y);
    ctx.restore();

    return ctx;
}

var imprintImageToCanvas = function(canvas, image, height, width){
    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, height, width);
    return ctx;
}

$(document).ready(function(){
    var deviceWidth = window.innerWidth;
    var image = $('#default-image')[0];

    var canvas = $('canvas')[0];
    canvas.width = Math.min(600, deviceWidth-20);
    canvas.height = Math.min(480, deviceWidth-20);

    x = canvas.width/2 - image.width/2;
    y = canvas.height/2 - image.height/2;

    var ctx = imprintImageToCanvas(canvas, image, x, y);

    var operations = {
        scale: $('#scale-image').value,
        rotate: $('#rotate-image').value
    }

    $('#scale-image').change(function(){
        operations.scale = this.value;
        ctx = transform(canvas, ctx, operations);
    });

    $('#rotate-image').on('change mouseover', function(){
        operations.rotate = this.value;
        ctx = transform(canvas, ctx, operations);
    });

});
