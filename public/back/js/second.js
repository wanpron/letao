
$(function(){

    var currentPage = 1;
    var pageSize = 5;
    render();
   function render(){

       $.ajax({
   
           type:'get',
           url:'/category/querySecondCategoryPaging',
           data:{
               page:currentPage,
               pageSize:pageSize
           },
           dataType:'json',
           success:function(info){
               console.log(info);
               var htmlStr = template( "secondTpl", info );
               $('tbody').html( htmlStr );

               $('#pagintor').bootstrapPaginator({
                bootstrapMajorVersion: 3,  // 版本号
                currentPage: info.page,  // 当前页
                totalPages: Math.ceil( info.total / info.size ), // 总页数
                onPageClicked: function( a, b, c, page ) {
                  // 更新当前页
                  currentPage = page;
                  // 重新渲染
                  render();
                }
              })

           }
           
       })
   }


//    2.点击添加按钮,显示添加模态框
   $('#addBtn').click(function(){

        $('#addModal').modal('show');
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                var htmlStr = template( "dropdownTpl", info );
                $('.dropdown-menu').html( htmlStr );
            }

        })

   })
})