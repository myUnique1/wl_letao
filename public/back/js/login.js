$(function(){
    // 1. 进行表单校验

    //使用表单校验插件
    $('#form').bootstrapValidator({
        //1.1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置

        //1.2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //1.3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度必须在2到6位之间'
                    }
                   
                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须在6到12位之间'
                    }

                }
            },
        }

    });

    // 2. 阻止默认按钮的提交,通过ajax提交
    // 2.1 使用表单校验成功事件
    $('form').on('success.form.bv',function(e){
        e.preventDefault();

        // 2.2 发送ajax
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $('form').serialize(),
            dataType: 'json',
            success: function(info){
                // console.log(info);
                if(info.error === 1000){
                    alert('用户名不存在');
                }
                if (info.error === 1001) {
                    alert('密码不正确');
                }
                if(info.success){
                    location.href = 'index.html';
                }
                
            }
        })
    })

    // 3. 重置表单
    $('[type="reset"]').on('click',function(){
        $('form').data("bootstrapValidator").resetForm(true);
    })
})