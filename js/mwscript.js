function updateSelection(str) {
  updateImage(str);
  updateFields(str);
}

// Creates an HTML5 canvas and uses the Fabric.js library to place the selected product image on the canvas.
// Image is pulled from the "product" table.
function updateImage(str) {
  if (str=="") {
    document.getElementById("productImage").innerHTML="";
    return;
  } 
  if (window.XMLHttpRequest) {
    xmlhttp=new XMLHttpRequest();
  } else {
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  /*xmlhttp.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200) {
      document.getElementById("productImage").innerHTML=this.responseText;
    }
  }*/

  xmlhttp.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200) {
      var canvas = new fabric.Canvas('c');
      fabric.Image.fromURL(this.responseText, function(oImg) {
        canvas.add(oImg);
      });
    }
  }

  xmlhttp.open("GET","php/getProductImage.php?q="+str,true);
  xmlhttp.send();
}

// Pulls from the "fieldheaders" table to update the "Customizable Fields" based on the selected product.
function updateFields(str) {
  if (str=="") {
    document.getElementById("productFields").innerHTML="";
    return;
  }
  if (window.XMLHttpRequest) {
    xmlhttp=new XMLHttpRequest();
  } else {
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200) {
      document.getElementById("productFields").innerHTML=this.responseText;
    }
  }
  xmlhttp.open("GET","php/getProductFields.php?q="+str,true);
  xmlhttp.send();
}