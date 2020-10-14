var apod = {
    //Create a random date
    randomDate: function(start, end) {
    //Randomize the date https://gist.github.com/miguelmota/5b67e03845d840c949c4
    let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  
    //Format the date
    let d = date.getDate();
    let m = date.getMonth() + 1; //In JS months start at 0
    let y = date.getFullYear();
  
    //Change the month and day strings so that they match the documented format.
    if(m < 10){
      m = '0'+m
    }
  
    if(d < 10){
      d = '0'+d
    }
  
    return `${y}-${m}-${d}`;
  },
  
//Injects the results of the API call into the DOM
buildDOM: function(result) {
  document.querySelector('apodTitle').innerHTML = result.title;
  
    if(result.media_type === 'video') {
      document.querySelector('apodImage').style.display = 'none';
      let avi = document.querySelector('apodVideo > iframe');
      avi.src=result.url;
      document.querySelector('apodVideo').style.display = 'block';
    }else{
      document.querySelector('apodVideo').style.display = 'none';
      let ai = document.querySelector('apodImage');
      avi.src=result.url;
      avi.style.display = 'block';
    }

    if(result.copyright!=undefined){
      document.querySelector('apodCopyright').innerHTML = 'Copyright:' + result.copyright;
    }
      document.querySelector('apodDate').innerHTML = 'Date:' + result.date;
      document.querySelector('apodDesc').innerHTML = result.explanation;
    },
  
  //Executes an AJAX call to an API.
  getRequest: function() {
    let _this = this;
    let date = this.randomDate(new Date(1995, 5, 16), new Date());
    let url = "https://api.nasa.gov/planetary/apod?api_key=p4XNai6uNpYsJ3AKfZ3EQaLWW5rCAZfo5eRUX1zz&date=" + date;
    $.ajax({
        url: url
    }).done(function(result){
        _this.buildDOM(result);
    }).fail(function(result){
      console.log(result);
    });
  },
  
  // Initialization method.
  init: function() {
    this.getRequest();
    },
  };  

  apod.init();

  //Click Method
  document.getElementById('btnRandApod').addEventListener('click',function(){
    apod.getRequest();
  });
