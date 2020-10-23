let menuMobile = document.querySelector('.btn-menu');
menuMobile.addEventListener('click', function() {
    this.classList.toggle('open');
    document.querySelector('.nav__bar').classList.toggle('nav__bar-active');
})

//lang ul
$(document).ready(function() {
    $('.lang-text').on('click', function(e) {
        e.stopPropagation();
        $('.lang-ul').toggleClass('active');
    });
    $('body').on('click', function (e) {
        $('.lang-ul').removeClass('active');
    });
    $('.lang-ul a').on('click', function() {
        let langItem = $(this).html();
        $('.lang-text span').html(langItem);
        $(this).parents('.lang').removeClass(active)
    });
})
//back to top
// let backToTop = $('.right');
// console.log(backToTop)
// backToTop.on('click', function() {
//     window.scrollTo({
//         top: 0, 
//         left: 0, 
//         behavior: 'smooth' 
//        });
// })

let backToTop = document.querySelector('.right');
backToTop.addEventListener('click', function() {
    scroll.scrollTo(0);

});
//video play
let videoModel = document.querySelector('.video__model');
let videoItem = document.querySelector('.video__model iframe');
document.querySelectorAll('.video__list .video__list-item .video__btn').forEach(function(e) {
    e.addEventListener('click', function() {
        let videoID = this.getAttribute('data-src');
        // console.log(videoID)
        videoItem.setAttribute('src','https://www.youtube.com/embed/' + videoID );
        videoModel.style.display = 'flex';
    });
});
document.querySelector('.video__model .close').addEventListener('click', function(){
    videoModel.style.display = 'none';
    videoItem .setAttribute('src', '');
});
//loader 
$(window).on('load', function() {
    $('.loader-container').fadeOut(2000);
});

//photoswipe
var initPhotoSwipeFromDOM = function(gallerySelector) {
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;
        for(var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            if(figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute('data-size').split('x');
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if(figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML; 
            }
            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 
            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if(!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }
            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if(index >= 0) {
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};
        if(hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }
        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };
    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function(index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },
            showAnimationDuration : 0,
            hideAnimationDuration : 0
        };
        if(fromURL) {
            if(options.galleryPIDs) {
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if( isNaN(options.index) ) {
            return;
        }
        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    var galleryElements = document.querySelectorAll( gallerySelector );
    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

$(window).load(function () {
    initPhotoSwipeFromDOM('.carousel-img');
});

//slider
let $carousel = $('.slider__wrap');
$carousel.flickity({
    cellAlign: 'left',
    wrapAround: true,
    contain: true,
    prevNextButtons: false,
    // pageDots: false;
    on: {
        ready: function() {
            let dotted = $('.flickity-page-dots'),
                paging = $('.slider__bottom-paging .dotted');
                dotted.appendTo(paging);
            
        },
        change: function( index ) {
          console.log( 'Slide changed to' + index );
          let sliderNumber = $('.slider__bottom-paging .number');
          let indexPage = index + 1;
          sliderNumber.text(indexPage.toString().padStart(2, 0));
        }
      }
});
 $('.slider .--prev').on('click', function() {
    $carousel.flickity('previous');
 });
 $('.slider .--next').on('click', function() {
    $carousel.flickity('next');
 });

 //scroll
 const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 0.8
});

// slider album
// let sliderAlbum = $('.allbum__wrap');
// sliderAlbum.flickity({
//     cellAlign: 'left',
//     wrapAround: true,
//     contain: true,
//     prevNextButtons: false,
// })
//scroll MENu


