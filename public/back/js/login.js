$(function() {

    $('#form').bootstrapValidator({
     
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',    
          invalid: 'glyphicon glyphicon-remove',   
          validating: 'glyphicon glyphicon-refresh' 
        },
       
        fields: {
           username: {
           
             validators: {
           
               notEmpty: {
                 message: "用户名不能为空"
               },
              
               stringLength: {
                 min: 2,
                 max: 6,
                 message: "用户名长度必须是 2-6 位"
               },
              //  callback 专门用于配置回调的提示
               callback: {
                 message: "用户名不存在"
               }
             }
           },
    
           password: {
        
             validators: {
             
               notEmpty: {
                 message: "密码不能为空"
               },
               
               stringLength: {
                 min: 6,
                 max: 12,
                 message: "密码长度必须是 6-12 位"
               },
               callback: {
                 message: "密码错误"
               }
             }
           }
         }
      })

      // 2.插件校验功能,在事件中,阻止默认提交(防止跳转),通过ajax提交即可
      $('#form').on('success.form.bv',function(e){

        // 阻止默认提交
        e.preventDefault();

        // console.log('阻止跳转');
        $.ajax({
          type:'post',
       
          url:'/employee/employeeLogin',
           // 表单序列化
          data: $('#form').serialize(),
          dataType: 'json',
          success: function( info ) {

            // console.log( info );
            if(info.error===1000){
          $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
             return;
            }
            if(info.error===1001){
          $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
             return;
              
            }
            if(info.success){
              location.href ='index.html';
              return;

            }
          }
        })

      })
})



  /*
  * 3. 重置功能,
  *    默认 type="reset" 按钮, 只会重置表单内容
  *    此时, 内容和校验状态都需要重置, 需要调用插件的实例方法
  *
  *    $('#form').data("bootstrapValidator") 创建插件实例
  *    resetForm();     不传参, 只重置校验状态
  *    resetForm(true); 传true, 内容和状态都重置
  * */

$('[type="reset"]').click(function() {

  $('#form').data("bootstrapValidator").resetForm(); 

})