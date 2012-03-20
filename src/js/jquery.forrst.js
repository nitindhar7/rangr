/**
 *
 * jQuery plugin to impliment forrst API.
 *
 * Simple interface to the forrst.com API with support
 * for authentication, retrieving user details and
 * retrieving post details
 *
 * Fork me @ https://www.github.com/jas-/jQuery.forrst
 *
 * REQUIREMENTS:
 * - jQuery libraries (required - http://www.jquery.com)
 *
 * METHODS:
 * - authenticate: Use forrst.com API for authentication
 * - userinfo:     Obtain details on forrst user's
 * - postinfo:     Obtain details on forrst posts
 * - postcomments: Obtain post comments
 *
 * USAGE:
 *
 * Author: Jason Gerfen <jason.gerfen@gmail.com>
 * License: GPL
 *
 */

(function($){

 /* jQuery.forrst plug-in */
 $.fn.forrst = function(method){

  /* default options */
  var defaults = {
   form:        $(this).attr('id'),      // Place holder for form ID
   proxy:       $(this).attr('action'),  // Place holder for form action
   type:        $(this).attr('method'),  // Place holder for form method
   data:        {},                      // Place holder for serialized form data
   token:       '',                      // Place holder for authentication token
   callback:    function(){},            // Optional callback once form processed
   errCallback: function(){},            // Optional callback on error
   preCallback: function(){}             // Optional callback pre submit
  };

  /* define our methods */
  var methods = {

   /* Authentication */
   authenticate: function(options){
    var cmd = 'users/auth';
    options = __setup(options, cmd);
    $('#'+options.form).on('submit', function(e){
     e.preventDefault();
     __do(options);
    });
   },

   /* User info */
   userinfo: function(options){
    var cmd = 'users/info';
    var method = 'get';
    options = __setup(options, cmd, method);
    $('#'+options.form).on('submit', function(e){
     e.preventDefault();
     __do(options);
    });
   },

   /* users posts */
   userposts: function(options){
    var cmd = 'user/posts';
    options = __setup(options, cmd);
    $('#'+options.form).on('submit', function(e){
     e.preventDefault();
     __do(options);
    });
   },

   /* post info */
   postinfo: function(options){
    var cmd = 'posts/show';
    options = __setup(options, cmd);
    $('#'+options.form).on('submit', function(e){
     e.preventDefault();
     __do(options);
    });
   },

   /* return all posts */
   all: function(options){
    var cmd = 'posts/all';
    options = __setup(options, cmd);
    $('#'+options.form).on('submit', function(e){
     e.preventDefault();
     __do(options);
    });
   },

   /* posts list by type */
   postlist: function(options){
    var cmd = 'posts/list';
    options = __setup(options, cmd);
    $('#'+options.form).on('submit', function(e){
     e.preventDefault();
     __do(options);
    });
   },

   /* posts comments */
   postcomments: function(options){
    var cmd = 'post/comments';
    options = __setup(options, cmd);
    $('#'+options.form).on('submit', function(e){
     e.preventDefault();
     __do(options);
    });
   }
  };

  /* send it off to the server */
  var __do = function(options){
   options.data = getElements(options);
   $.ajax({
    data: options.data,
    dataType:'jsonp',
    type: options.type,
    url: options.proxy,
    cache: true,
    beforeSend: function(xhr){
     xhr.setRequestHeader('X-Alt-Referer', 'jQuery.forrst');
     ((options.preCallback)&&($.isFunction(options.preCallback))) ?
       options.preCallback(xhr) : false;
    },
    success: function(response){
     ((options.callback)&&($.isFunction(options.callback))) ?
      options.callback.call(response) : false;
    },
    error: function(xhr, status, error){
     ((options.errCallback)&&($.isFunction(options.errCallback))) ?
       options.errCallback.call(xhr, status, error) : false;
    }
   });
   return false;
  }

  /* setup everything */
  var __setup = function(options, cmd, method){
   options = $.extend({}, defaults, options);
   options.proxy = options.proxy+cmd;
   options.method = method;
   return options;
  }

  /* get form elements */
  var getElements = function(opts){
   var obj={};
   $.each($('#'+opts.form+' :input, input:radio:selected, input:checkbox:checked, textarea'),function(k, v){
    if ((validateString(v.name))&&(validateString(v.value))){
     obj[v.name] = v.value;
    }
   });
   return obj;
  }

  /* associative object size */
  var sizeChk = function(obj){
   var n = 0;
   $.each(obj, function(k, v){
    if (obj.hasOwnProperty(k)) n++;
   });
   return n;
  }

  /* validate string integrity */
  var validateString = function(x){
   return ((x===false)||(x.length===0)||(!x)||(x===null)||
           (x==='')||(typeof x==='undefined')) ? false : true;
  }

  /* object inspector for debugging */
  var __recurse = function(obj){
   $.each(obj, function(x,y){
    if (typeof y==='object'){
     __recurse(y);
    } else {
     console.log(x+' => '+y);
    }
   });
  }

  /* robot, do something */
  if (methods[method]){
   return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
  } else if ((typeof method==='object')||(!method)){
   return methods.init.apply(this, arguments);
  } else {
   console.log('Method '+method+' does not exist');
  }
 };
})(jQuery);