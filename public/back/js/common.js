
$(document).ajaxStart(function() {
    // 开启进度条
    NProgress.start();
  })
  $(document).ajaxStop(function() {
    // 结束进度条
      NProgress.done();
   
  })
  
  // 二级菜单切换
  $(function(){

    $('.lt_aside .category').click(function(){

      $(this).next().stop().slideToggle();
    })

    // 左边侧边栏切换功能
    $('.icon_left').click(function(){
      $('.lt_aside').toggleClass("hidemenu");
      $('.lt_topbar').toggleClass("hidemenu");
      $('.lt_main').toggleClass("hidemenu");

    })

      // 退出功能

      $('.icon_right').click(function(){
        $('#logoutModal').modal('show');

      });

      // 点击退出按钮,发送ajax请求,实现退出
      $('#logoutBtn').click(function(){
        $.ajax({

          type:'get',
          url:'/employee/employeeLogout',
          datatype:'json',
          success:function( info ){
            console.log(info);
            if(info.success) {
             
          location.href = "login.html";

            }
          }
        })

      })


  })