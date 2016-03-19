function showAd(a) {
  var d = document;
  var b = d.body;
  var w = window;
  var ww = window.innerWidth;
  var wh = window.innerHeight;

  // remove ad div if exists
  var div = d.getElementById('adpro_div');
  if(div) div.parentNode.removeChild(div);

  div = d.createElement('div');
  div.setAttribute('id','adpro_div');
  div.style.cssText='position:absolute;top:0px;left:0px;width:'+(ww-10)+'px;height:'+(wh-50)+'px;display:block;z-index:100;background:#435966;color:white;font-family:"Open Sans",sans-serif,Georgia,Verdana,Helvetica,Arial;line-height:130%;font-size:16px;padding:50px 5px 0px 5px;text-align:center;';
  b.appendChild(div);

  var adDismiss = function(e){
    var div = d.getElementById('adpro_div');
    if(div) div.parentNode.removeChild(div);
    e.preventDefault();
  };
  var adClicked = function(e){
    adDismiss();
    window.open(a.url, 'newWindow');
  };

  var dvcss = [
    'width:100%;height:100px;margin:0px;font-size:20px;display:inline-flex;padding:5px;',
    'height:240px;margin:0px;padding:5px;',
    'padding:20px 60px;font-weight:300;',
  ];
  var dvs = [];
  for(var i=0; i<dvcss.length; i++) {
    var dv = d.createElement('div');
    dv.style.cssText=dvcss[i];
    div.appendChild(dv);
    dvs.push(dv);
  }

  var stars = '', i=0, n=Math.floor(a.rating);
  for(i=0; i<n; i++) stars += '★';
  for(;i<5;i++) stars += '☆';
  dvs[0].innerHTML = 
    '<div style="width:40%;text-align:right;"><img src="'+a.icon.url+'" width="'+a.icon.width+'" height="'+a.icon.height+'" style="margin:10px;"/></div>'+
    '<div style="width:60%;text-align:left;padding:10px;">' + a.title + '<br/><br/>' + stars + '</div>';

  var img = d.createElement('img');
  img.setAttribute('src', a.cover.url);
  img.setAttribute('width', a.cover.width);
  img.setAttribute('height', a.cover.height);
  dvs[1].appendChild(img);
  dvs[2].innerHTML = '<div style="text-align:left;">' + a.body.replace(/[\n]/g,'<br/>').replace(/[ ]/,'&nbsp;') + '</div>';

  var btn = d.createElement('button');
  btn.innerHTML = a.buttonText;
  btn.style.cssText='position:absolute;bottom:10px;right:10px;width:160px;height:36px;font-size:16px;padding:10px;';
  div.appendChild(btn);

  var x = d.createElement('button');
  x.innerHTML = 'X';
  x.style.cssText='position:absolute;width:24px;height:24px;top:2px;left:2px;padding:3px;z-index:101;background:black;color:white;border:2px solid white;border-radius:12px;box-shadow:1px 1px 1px 1px rgba(0,0,0,0.75);';
  div.appendChild(x);

  dvs[1].addEventListener('click', adClicked);
  dvs[2].addEventListener('click', adClicked);
  btn.addEventListener('click', adClicked);
  x.addEventListener('click', adDismiss);
}

function preloadimages(arr){
  var newimages=[], loadedimages=0;
  var postaction=function(){};
  var arr=(typeof arr!="object")? [arr] : arr;
  function imageloadpost(){
    loadedimages++;
    if (loadedimages==arr.length){
      postaction(newimages); //call postaction and pass in newimages array as parameter
    }
  }
  for (var i=0; i<arr.length; i++){
    newimages[i]=new Image();
    newimages[i].src=arr[i]
    newimages[i].onload=function(){
      imageloadpost();
    }
    newimages[i].onerror=function(){
      imageloadpost();
    }
  }
  return { //return blank object with done() method
    done:function(f){
      postaction=f || postaction; //remember user defined callback functions to be called when images load
    }
  }
}

function prepareShowAd(a) {
  preloadimages([a.icon.url, a.cover.url]).done(function(images){
    if(images.length === 2)
      showAd(a);
  });
}

var iconUrl = 'icon.jpg';
var coverUrl = 'cover.jpg';
var adRes = {
  title: 'Musical.ly',
  body: '#1 music video community. \nMusical.ly makes it easy and fun to create amazing videos and impress your friends. Simply select a sound and start lip syncing! Anyone can be an awesome singer with musical.ly!',
  url: 'https://play.google.com/store/apps/details?id=com.zhiliaoapp.musically',
  icon: {
    url: iconUrl,
    width: 80,
    height: 80
  },
  cover: {
    url: coverUrl,
    height: 240,
  },
  rating: 4.5,
  buttonText: 'Install'
};

prepareShowAd(adRes);



