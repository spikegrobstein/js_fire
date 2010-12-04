var
	fire = document.getElementById('fire'),
	context = fire.getContext('2d'),
	w = fire.width,
	h = fire.height
;

//initialize
var world = context.createImageData(w, h);
var i = 0;

for(i = 0; i < w * h * 4; i += 4) {
	var value = (Math.random() >= 0.5 ? 0 : 255)
	world.data[i] = 0;
	world.data[i+1] = 0;
	world.data[i+2] = 0;
	world.data[i+3] = 255;
}

context.putImageData(world, 0, 0);

function average(a) {
    var count = 0;
    var i = 0;
    for (i = 0; i < a.length; i++) {
        count += a[i];
    }
    
    return count / a.length;
}

function render() {
	var temp_world = context.getImageData(0,0,w,h);
	world = context.getImageData(0,0,w,h);
	world = world.data;

    var i = 0;
    for (i = 0; i <= w * 4; i += 4) {
        var v = Math.floor(Math.random() * 255)
        world[(h - 1) * w * 4 + (i)] = v;
        world[(h - 2) * w * 4 + (i)] = v;
        world[(h - 3) * w * 4 + (i)] = v;
        world[(h - 4) * w * 4 + (i)] = v;
        world[(h - 5) * w * 4 + (i)] = v;
        world[(h - 6) * w * 4 + (i)] = v;
        world[(h - 7) * w * 4 + (i)] = v;
    }

    for (i = 0; i <= w * h * 4 - (w * 5); i += 4) {
        var new_color = average([
            world[i],
            world[i + 4],
            world[i - 4],
            world[i + w * 4],
            world[i + (w * 2) * 4],
            world[i + (w * 3) * 4],
            world[i + (w * 4) * 4],
            world[i + (w * 5) * 4],
            world[i + (w * 6) * 4],
            world[i + (w * 7) * 4]
        ]);
        
        new_color -= 3;
        
        //console.log(new_color + "|" + world[i]);
        
        if (new_color < 0) {
            new_color = 0;
        }
        
        temp_world.data[i] = new_color;
        
        /*
        if (temp_world.data[i] > 130 && temp_world.data[i] < 150) {
            if (Math.random() > 0.99990) {
                temp_world.data[i] += 100;
                temp_world.data[i - 4] += 100;
                temp_world.data[i + 4] += 100;
            }
        }
        
        if (temp_world.data[i] > 90 && temp_world.data[i] < 110) {
            if (Math.random() > 0.99990) {
                temp_world.data[i] += 100;
                temp_world.data[i - 4] += 100;
                temp_world.data[i + 4] += 100; 
            }
        }*/
    }
    
    // then update the bottom row
    for (i = 0; i <= w * 4; i += 4) {
        temp_world.data[(h - 1) * w * 4 + (i)] = 0;
        temp_world.data[(h - 2) * w * 4 + (i)] = 0;
        temp_world.data[(h - 3) * w * 4 + (i)] = 0;
        temp_world.data[(h - 4) * w * 4 + (i)] = 0;
        temp_world.data[(h - 5) * w * 4 + (i)] = 0;
        temp_world.data[(h - 6) * w * 4 + (i)] = 0;
        temp_world.data[(h - 7) * w * 4 + (i)] = 0;
    }
	context.putImageData(temp_world, 0, 0);

	setTimeout('render()', 10);
}

render();