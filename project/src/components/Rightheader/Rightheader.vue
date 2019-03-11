<template>
    <div class="right-header">

        <!-- 布局容器 -->
        <el-row :gutter="24">
            <!-- 左边 -->
            <el-col :span="20">
                <div class="grid-content bg-purple">
                    <i class="el-icon-news"></i>
                    <span class="title">华联超市管理系统</span>
                </div>           
            </el-col>

            <!-- 右边 -->           

            <el-col :span="4">
                <div class="grid-content bg-purple">

                    <el-row :gutter="24">
                        <el-col :span="4">
                        <!-- 头像 -->
                            <div class="avatar">
                                <img src="../../assets/img/avatar.jpg" alt="">
                            </div> 
                        </el-col> 

                        <el-col :span="20" >
                          <!-- 下拉 -->
                            <div class="dropDown">
                                <el-dropdown>
                                    <span class="el-dropdown-link">
                                        刘百万<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>德玛</el-dropdown-item>
                                        <el-dropdown-item>timor</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                             </div> 
                        </el-col> 
                    </el-row>



                                  
                </div>               
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
     
}
</script>

<style lang="less">
  @import './Rightheader.less';

</style>
