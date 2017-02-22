//获取元素
var getElem = function(selector){
    return document.querySelector(selector);
}

//获取所有元素
var getAllElem = function(selector){
    return document.querySelectorAll(selector);
}

//获取元素样式
var getCls = function(element){
    return element.getAttribute("class");
}

//设置元素样式
var setCls = function(element,cls){
    return element.setAttribute("class",cls);
}

//为元素添加样式
var addCls = function(element,cls){
    var baseCls = getCls(element);
    if(baseCls.indexOf(cls)===-1){
        setCls(element,baseCls+" "+cls);
    }
}

//为元素删除样式
var delCls = function(element,cls){
    var baseCls = getCls(element);
    if(baseCls.indexOf(cls)!=-1){
        setCls(element,baseCls.replace(cls,' ').replace(/\s+/g,' '))
    }
}

//把所有需要设置动画的元素设为对象
var screenAnimateElements = {
    '.section1':[
    '.header__nav',
    '.header__nav-h1',
    '.header__nav-item',
    '.section1__contain-h2',
    '.section1__contain-p'
    ],
    '.section2':[
    '.section2__contain-h2',
    '.section2__contain-p',
    '.section2_redline',
    '.section2__person',
    '.section2__rocket'
    ],
    '.section3':[
    '.section3__contain-h2',
    '.section3__contain-p',
    '.section3_redline',
    '.section3__img',
    '.section3__icon'
    ],
    '.section4':[
    '.section4__contain-h2',
    '.section4__contain-p',
    '.section4_redline',
    '.section4__img',
    '.section4__icon-text'
    ],
    '.section5':[
    '.section5__contain-h2',
    '.section5__contain-p',
    '.section5_redline',
    '.section5__img',
    '.section5_img'
    ]
}
var navAnimateElements = {
    '.section1':[
    '.header__nav',
    '.header__nav-h1',
    '.header__nav-item'
    ]
}
//设置屏内的元素播放动画(添加动画样式)
var playAnimateDone = function(screenCls){
    var animateElements = screenAnimateElements[screenCls]; 
    for(var i=0; i<animateElements.length; i++){
        var element = getAllElem(animateElements[i]);
            for(var j=0; j<element.length; j++){
                var baseCls = element[j].getAttribute('class');
                addCls(element[j],animateElements[i].substr(1)+'_animate_done'); 
            }
    }
}
//设置顶部菜单字体改变样式的动画
var addNavChange = function(screenCls){
    var animateElements = navAnimateElements[screenCls];
    for(var i=0; i<animateElements.length; i++){
        var element = getAllElem(animateElements[i]);
        for(var j=0; j<element.length; j++){
            var baseCls = element[j].getAttribute('class');
       addCls(element[j],animateElements[i].substr(1)+'_animate_change'); 
        }
    }
}
//删除顶部菜单字体改变样式的动画
var delNavChange = function(screenCls){
    var animateElements = navAnimateElements[screenCls];
    for(var i=0; i<animateElements.length; i++){
        var element = getAllElem(animateElements[i]);
        for(var j=0; j<element.length; j++){
            var baseCls = element[j].getAttribute('class');
       delCls(element[j],animateElements[i].substr(1)+'_animate_change'); 
        }
    }
}

//页面加载后就开始第一屏动画
window.onload = function(){
    playAnimateDone('.section1');
}

//当前屏的导航菜单变红色
var navItems = getAllElem('.header__nav-item');
var outlineItems = getAllElem('.outline__item');

var switchNavActive = function(idx){
    for(var i=0; i<navItems.length; i++){
        delCls(navItems[i],'nav_active');
    }
    addCls(navItems[idx],'nav_active');
}

switchNavActive(0);//默认第一个导航菜单为红色

//顶部滑动门效果
var navTip = getElem('.header__nav-tip');
var slideTip = function(){
    //获取当前位置的导航菜单
    var currentNav = getElem('.nav_active');
    var idx = currentNav.id;
    navTip.style.left=120*idx+'px';
}

for(var i=0; i<navItems.length; i++){
    navItems[i].id=i;//为每个导航菜单加一个id值
    //鼠标移入滑动到指定位置（匹配id值）
    navItems[i].onmouseover=function(){
        navTip.style.left=120*this.id+'px';
    }
}
//鼠标移出回到原始位置
var navBlock = getElem('.right');
navBlock.onmouseout = slideTip; //注意这里调用函数不能加括号

//滚动到哪就播放到哪
window.onscroll = function(){
    var top = document.body.scrollTop || document.documentElement.scrollTop;

    /*侧边栏动画*/
    var a = getElem('.outline');
    if(top>=200){
        addCls(a,'outline_animate_done');
    }
    if(top<200){
        delCls(a,'outline_animate_done');
    }
    /*侧边栏动画*/
    
    if(top>100){
        addNavChange('.section1');
    }
    if(top<100){
        delNavChange('.section1');
    }
    if(top>=640*1-300){
        playAnimateDone('.section2');
    }
    if(top>=640*2-300){
        playAnimateDone('.section3');
    }
    if(top>=640*3-300){
        playAnimateDone('.section4');
    }
    if(top>=640*4-300){
        playAnimateDone('.section5');
    }

    //当前屏导航菜单变红色，滑动门到当前位置
    if(top<640*1-100){
        switchNavActive(0);
        slideTip();
    }
    if(top>640*1-100){
        switchNavActive(1);
        slideTip();
    }
    if(top>640*2-100){
        switchNavActive(2);
        slideTip();
    }
    if(top>640*3-100){
        switchNavActive(3);
        slideTip();
    }
    if(top>640*4-100){
        switchNavActive(4);
        slideTip();
    }
}

//双向定位
var setNavJump = function(i,lib){
    var item = lib[i];
    var timer = null;
    var isTop = true;
    item.onclick = function(){
        document.body.scrollTop = i*640;//点击滚动到指定屏
        document.documentElement.scrollTop = i*640;//点击滚动到指定屏
    }
}
for(var i=0; i<navItems.length; i++){
    setNavJump(i,navItems);
}

for(var i=0; i<outlineItems.length; i++){
    setNavJump(i,outlineItems);
}
