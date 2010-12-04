var
	fire = document.getElementById('fire'),
	context = fire.getContext('2d'),
	w = fire.width,
	h = fire.height
;

//initialize
var world = context.createImageData(w, h);
var i = 0;

function write_pixel(data, offset, r, g, b, a) {
	a = typeof(a) != 'undefined' ? a : 255;
	
	data[offset] = r;
	data[offset+1] = g;
	data[offset+2] = b;
	data[offset+3] = a;
}

function read_pixel(data, offset) {
	var values = [
		data[offset],
		data[offset + 1],
		data[offset + 2],
		data[offset + 3]
	];
	
	var i = 0;
	for (i = 0; i < values.length; i++) {
		values[i] = typeof(values[i]) == 'undefined' ? 0 : values[i];
	}
	
	return values;
}

function average_pixel(data, offset) {
	var values = [
			read_pixel(data, offset),
      read_pixel(data, offset + 4),
      read_pixel(data, offset - 4),
      read_pixel(data, offset + w * 4),
      read_pixel(data, offset + (w * 2) * 4),
      read_pixel(data, offset + (w * 3) * 4),
      read_pixel(data, offset + (w * 4) * 4),
      read_pixel(data, offset + (w * 5) * 4),
      read_pixel(data, offset + (w * 6) * 4),
      read_pixel(data, offset + (w * 7) * 4)
  ];

	//console.log(values);
	
	//throw "ack!";

	var count = [0,0,0,0];
  var i = 0, j = 0;

  for (i = 0; i < values.length; i++) {
		for (j = 0; j < count.length; j++) {
			count[j] += values[i][j];
		}
      
  }

	return [
		Math.floor(count[0] / values.length),
		Math.floor(count[1] / values.length),
		Math.floor(count[2] / values.length),
		Math.floor(count[3] / values.length)
	];
  
}

//console.log(world);

for(i = 0; i < w * h * 4; i += 4) {
	write_pixel(world.data, i, 0, 0, 0, 255);
}

context.putImageData(world, 0, 0);

//console.log(read_pixel(world.data, 0));


function render() {
	var temp_world = context.getImageData(0,0,w,h);
	world = context.getImageData(0,0,w,h);
	world = world.data;

  var i = 0;
  for (i = 0; i <= w * 4; i += 4) {
    var v = Math.floor(Math.random() * 255)
		write_pixel(temp_world.data, (h - 1) * w * 4 + (i), v, v, 0);
		write_pixel(temp_world.data, (h - 2) * w * 4 + (i), v, v, 0);
		write_pixel(temp_world.data, (h - 3) * w * 4 + (i), v, v, 0);
		write_pixel(temp_world.data, (h - 4) * w * 4 + (i), v, v, 0);
		write_pixel(temp_world.data, (h - 5) * w * 4 + (i), v, v, 0);
		write_pixel(temp_world.data, (h - 6) * w * 4 + (i), v, v, 0);
		write_pixel(temp_world.data, (h - 7) * w * 4 + (i), v, v, 0);
		
  }

	
  for (i = 0; i <= w * h * 4 - (w * 5 * 4); i += 4) {
		var new_color = average_pixel(temp_world.data, i);
    new_color -= 3;
    
    if (new_color < 0) {
        new_color = 0;
    }

    write_pixel(temp_world.data, i, new_color[0], 0, 0);
  }
  
  // then update the bottom row
	/*
  for (i = 0; i <= w * 4; i += 4) {
      temp_world.data[(h - 1) * w * 4 + (i)] = 0;
      temp_world.data[(h - 2) * w * 4 + (i)] = 0;
      temp_world.data[(h - 3) * w * 4 + (i)] = 0;
      temp_world.data[(h - 4) * w * 4 + (i)] = 0;
      temp_world.data[(h - 5) * w * 4 + (i)] = 0;
      temp_world.data[(h - 6) * w * 4 + (i)] = 0;
      temp_world.data[(h - 7) * w * 4 + (i)] = 0;
  }*/

	context.putImageData(temp_world, 0, 0);
	setTimeout('render()', 100);
}

render();