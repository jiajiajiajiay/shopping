<template>
    <div class="account-manage">
        <!-- 面板 -->
        <el-card class="box-card">
            <!-- 面板头部 -->
            <div slot="header">
                <span>账号管理</span>               
            </div>
            <!-- 面板内容部分 -->
            <div class="text item">
                <!-- 账号管理表格 -->
                <el-table
                    ref="accountManageTable"
                    :data="accountTableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                
                    >
                    <!-- 选择框 -->
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>

                    <!-- 账号 -->
                    <el-table-column                  
                        label="账号"
                        prop="account">                   
                    </el-table-column>

                    <!-- 用户组 -->
                    <el-table-column
                        prop="usergroup"
                        label="用户组">
                    </el-table-column>
                    
                    <!-- 日期 -->
                    <el-table-column
                        label="日期">
                        <template slot-scope="scope">{{ scope.row.ctime | filterCtime}}</template>
                    </el-table-column>

                     <!-- 操作 -->
                    
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit( scope.row.id)">
                            <i class="el-icon-edit"></i>
                            编辑</el-button>


                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete( scope.row.id)">
                            <i class="el-icon-delete"></i>
                            删除</el-button>
                        </template>

                        
                    </el-table-column>
                </el-table>

                <!-- 模态框 -->
                <el-dialog width="400px" title="账号修改" :visible.sync="dialogFormVisible">
                    <el-form :model="accountEditForm" style="width:320px">

                        <el-form-item label="账号" :label-width="formLabelWidth">
                        <el-input v-model="accountEditForm.account" autocomplete="off"></el-input>
                        </el-form-item>
                    
                        <el-form-item label="用户组" :label-width="formLabelWidth">
                            <el-select v-model="accountEditForm.usergroup" placeholder="请选择用户组">
                                <el-option label="普通用户" value="普通用户"></el-option>
                                <el-option label="超级管理员" value="超级管理员"></el-option>
                            </el-select>
                        </el-form-item>
                    
                    </el-form>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="saveEdit">确 定</el-button>
                    </div>
                </el-dialog>
                   
            </div> 
            
        </el-card>
    </div>
</template>

<script>
// 引入qs
import qs from 'qs';
import moment from 'moment'

export default {
    data(){
         return {
         accountTableData: [], 
         dialogFormVisible:false,
         accountEditForm:{
             account:'',
             usergroup:''
         },
         formLabelWidth: '110px',
         editId:0
      }
    },

    methods:{
        // 请求所有账号数据
        getAccountList(){
            this.req.get('/account/accountlist')
            .then(res=>{ 
                // 赋值给accountTableData 渲染表格
                this.accountTableData=res
            })
            .catch(err=>{
                console.log(err)
            })
        },
       
        //删除函数
        handleDelete(id) {
            // 发送删除请求给后端
            this.req.get('/account/accountdel',{id})
            .then(res=>{
                let{ code,reason }=res;
                if(code===0){
                    // 弹出提示框
                    this.$message({
                        type:'success',
                        message:reason
                       
                    }) 
                    this.getAccountList()
                    // 刷新列表数据
                }else if(code===1){
                    this.$message.error(reason);
                    
                }

            })
            .catch(err=>{
                console.log(err)
            })
        },

        //编辑函数
        handleEdit(id) {
            // 显示模态框
            this.dialogFormVisible=true;
            
            //保留要修改这一条数据的id
            this.editId=id;
            
            // 发送请求给后端
            this.req.get('/account/accountedit',{id})
                .then(res=>{
                    // 接收后端数据
                    let {account,usergroup} = res;
                    // 数据回填
                    this.accountEditForm.account = account;
                    this.accountEditForm.usergroup = usergroup;
                  
                })
                .catch(err=>{
                    console.log(err)
                })
        },

        // 保存修改
        saveEdit(){
            //关闭模态框
            this.dialogFormVisible = false;
            //收集新修改的数据和原来的id
            let parmas = {
                account:this.accountEditForm.account,
                usergroup:this.accountEditForm.usergroup,
                id:this.editId
            }
            // 把新修改的数据和老id发送给后端
            this.req.post('/account/accounteditsave',parmas)
            .then(res=>{
                // 接收后端数据
                let{ code, reason } =res;
                // 判断
                if(code===0){
                    // 弹成功提示
                    this.$message({
                        type:'success',
                        message:reason
                    })
                    // 刷列表
                    this.getAccountList();
                }else if(code===1){
                    this.$message.error(reason)
                }

            })
            .catch(err=>{
               

            })
        }
      
    },

    // 生命周期钩子函数
    created(){   
        this.getAccountList()
    },
    // 过滤器
    filters:{
        filterCtime(ctime){
            return moment(ctime).format('YYYY-MM-DD hh:mm:ss')
        }

    }

}

</script>

<style lang="less">
 @import './Accountmanage.less';
</style>


