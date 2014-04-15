/* Main logic taken from codeplayer: Magnifying glass for image zoom using Jquery and CSS3 */

$(document).ready(function() {

  var imageObject,
    originalWidth = 0,
    originalHeight = 0,
    magnifyOffset,
    xMouse,
    yMouse,
    glass = $(".glass"), //prevent iterations through DOM
    small = $(".small"),
    xPosition, 
    yPosition, 
    bgPosition, 
    xGlass, 
    yGlass;

  // Mousemove jQuery function since larger image through magnifying glass
  // must change with every mouse change over smaller thumbnail
  $(".magnify").mousemove(function(e) {
    
    // Create original size image for magnifying glass to show first time
    if(!originalWidth && !originalHeight)
    {
      imageObject = new Image();
      imageObject.src = small.attr("src");
      originalWidth = imageObject.width;
      originalHeight = imageObject.height;
    }
    // get coordinates, check boundaries, reposition image/glass if so
    else
    {
      // Coordinates of the mouse cursor in respect to .magnify
      magnifyOffset = $(this).offset();
      xMouse = e.pageX - magnifyOffset.left;
      yMouse = e.pageY - magnifyOffset.top;
      
      // Glass visible on .magnify, hidden outside
      if( xMouse > 0 && 
        yMouse > 0 &&
        xMouse < $(this).width() && 
        yMouse < $(this).height() )
      {
        glass.fadeIn(); //show
      } 
      else {
        glass.fadeOut(200); //hide
      }

      // Change background position so glass shows corresponding section
      // Center mouse over glass
      if(glass.is(":visible")) {
        // Figure out position on large image
        xPosition = Math.round(xMouse/small.width()*originalWidth - glass.width()/2)*-1;
        yPosition = Math.round(yMouse/small.height()*originalHeight - glass.height()/2)*-1;
        bgPosition = xPosition + "px " + yPosition + "px";
        
        // Reposition large image under glass
        xGlass = xMouse - glass.width()/2;
        yGlass = yMouse - glass.height()/2;
        glass.css({left: xGlass, 
          top: yGlass, 
          backgroundPosition: bgPosition});
      }
    }
  })
})