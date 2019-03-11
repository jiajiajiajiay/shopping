<template>
    <div class="account-add">
        <!-- 面板 -->
        <el-card class="box-card">
            <!-- 面板头部 -->
            <div slot="header">
                <span>添加管理员账号</span>               
            </div>
            <!-- 面板内容部分 -->
            <div class="text item">
               
               <el-form 
                    :model="accountForm" 
                    status-icon 
                    :rules="rules" 
                    ref="accountForm" 
                    label-width="100px" 
                    size="small"
                    class="demo-ruleForm"
                    style="width:400px">
                <!-- 账号 -->
                <el-form-item label="账号" prop="account">
                    <el-input type="text" v-model="accountForm.account" autocomplete="off"></el-input>
                </el-form-item>

                <!-- 密码 -->
                <el-form-item label="密码" prop="password">
                    <el-input type="text" v-model="accountForm.password" autocomplete="off"></el-input>
                </el-form-item>

                <!-- 确认密码 -->
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="text" v-model="accountForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>

                <!-- 选择用户组 -->
                <el-form-item label="选择用户组" prop="userGroup">
                    <el-select v-model="accountForm.userGroup" placeholder="请选择用户组">
                    <el-option label="普通用户" value="普通用户"></el-option>
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                    </el-select>
                </el-form-item>

                <!-- 提交按钮 -->
                <el-form-item>                    
                    <el-button round type="primary" @click="submitForm()">添加</el-button>
                    <el-button round @click="resetForm()">重置</el-button>
                </el-form-item> 
            </el-form>
            </div>
        </el-card>
    </div>
</template>
 

<script>
// 引入qs
import qs from 'qs';

export default {
    data () {
        // 自定义验证密码
        const validatePwd = (rule, value, callback) => {
            if (value === '') { // 非空
                callback(new Error('请输入密码'))
            } else if (value.length < 3 || value.length > 5) { // 长度验证
                callback(new Error('密码长度在 3 到 5 位'))
            } else {
                // 如果确认密码不为空 再次出发一致性验证
                if (this.accountForm.checkPass !== '') {
                    this.$refs.accountForm.validateField('checkPass')
                }
                callback()
            }
        }

        // 自定义验证确认密码
        const checkPwd = (rule, value, callback) => {
            if (value === '') { // 非空
                callback(new Error('请再次输入密码'))
            } else if ( value !== this.accountForm.password ) { // 一致性验证
                callback(new Error('两次密码不一致'))
            } else {
                callback();  // 成功回调
            }
        }

        return {
            // 添加账号表单数据
            accountForm: {
                account: '',
                password: '',
                checkPass: '',
                userGroup: ''
            },
            // 验证
            rules: {
                // 账号
                account: [
                    { required: true, message: '请输入账号', trigger: 'blur' }, // 非空验证
                    { min: 3, max: 5, message: '账号长度在 3 到 5 位' } // 长度验证
                ],
                // 密码
                password: [
                    { required: true, validator: validatePwd, trigger: 'blur' } // 自定义验证
                ],
                // 确认密码
                checkPass: [
                    { required: true, validator: checkPwd, trigger: 'blur' } // 自定义验证
                ],
                // 用户组
                userGroup: [
                    { required: true, message: '请选择用户组', trigger: 'change' } // 非空验证
                ]
            }
        }
    },
    methods: {
            // 提交表单  
            submitForm() {
                this.$refs.accountForm.validate((valid) => { // 所有前端验证通过valid就是true 否则就是false
                    if (valid) { 

                        // 收集账号数据
                        const params = {
                            account: this.accountForm.account,
                            password: this.accountForm.password,
                            userGroup: this.accountForm.userGroup
                        }
                        
                        //把数据发给后端（axios）
                        this.req.post('/account/accountadd',params)
                            .then(res=>{
                                // 接收后端的数据
                                let { code,reason } = res;                               
                                // 判断
                                if(code===0){//成功

                                // 弹成功提示
                                this.$message({
                                    type:'success',
                                    message:reason
                                })

                                // 跳转到账号管理页面
                                this.$router.push('/index/accountmanage')

                                }else if(code===1){//失败弹框                               

                                // 弹失败提示
                                this.$message.error(reason)
                                }
                              
                            })
                            .catch(err=>{
                              console.log(err)
                            })


                    } else {
                        console.log('前端验证失败！不允许提交!');
                        return false;
                    }
                });
            },
            // 重置表单   
            resetForm() {
                this.$refs.accountForm.resetFields(); // 重置所有字段为空
            }
        }
}

</script>

<style lang="less">
 @import './Accountadd.less';
</style>


